package ledger

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
)
type engine struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) Engine {
	return &engine{db: db}
}

func (e *engine) CommitTransaction(ctx context.Context, ledger string, req TransactionRequest) (*Transaction, error) {
	if err := validateRequest(req); err != nil {
		return nil, err
	}

	var committed *Transaction
	err := e.withTx(ctx, func(tx *sqlx.Tx) error {
		ledgerID, err := getLedgerID(ctx, tx, ledger)
		if err != nil {
			return err
		}

		if req.IdempotencyKey != "" {
			existing, err := findByIdempotencyKey(ctx, tx, ledgerID, req.IdempotencyKey)
			if err != nil && err != sql.ErrNoRows {
				return err
			}
			if existing != nil {
				committed = existing
				return nil
			}
	}

	accountIDs, err := resolveAccounts(ctx,tx, ledgerID, req.Postings)
		if err != nil {
			return err
		}
		if err := checkFunds(ctx, tx, ledgerID, req.Postings, accountIDs); err != nil {
			return err
		}

		ts := time.Now()
		if req.Timestamp != nil {
			ts = *req.Timestamp
		}
		metadata, _ := json.Marshal(req.Metadata)

		var txID int64
		err = tx.QueryRowContext(ctx, `
			INSERT INTO transaction (ledger_id, idempotency_key,reference,metadate,timestamp)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id
		`,ledgerID, nullString(req.IdempotencyKey), nullString(req.Reference), metadata, ts,).Scan(&txID)
		if err != nil {
			return  fmt.Errorf("insert transaction: %w", err)
		}

		for i, p := range req.Postings {
			srcID := accountIDs[p.Source]
			dstID := accountIDs[p.Destination]

			var postingID int64
			err = tx.QueryRowContext(ctx, `
				INSERT INTO postings (transaction_id, ledger_id, source_id, destination_id, asset, amount, posting_index)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				RETURNING id`,
				txID, ledgerID, srcID, dstID, p.Asset, p.Amount.String(), i,			
			).Scan(&postingID)
			if err != nil {
				return fmt.Errorf("insert posting %d: %w", i, err)
			}

			if _, err = tx.ExecContext(ctx, `
				INSERT INTO moves (ledger_id, account_id, posting_id, transaction_id, asset, amount, is_source, timestamp)
				VALUES ($1, $2, $3, $4, $5, $6,true, $7)`,
				ledgerID, dstID, postingID, txID, p.Asset, p.Amount.String(), ts,
			
			); err != nil {
				return fmt.Errorf("insert debit move: %w", err)
			}

			if _, err = tx.ExecContext(ctx, `
				INSERT INTO moves (ledger_id, account_id, posting_id, transaction_id, asset, amount, is_source, timestamp)
				VALUES ($1, $2, $3, $4, $5, $6,false, $7)`,
				ledgerID, srcID, postingID, txID, p.Asset, p.Amount.String(), ts,
			); err != nil {
				return  fmt.Errorf("insert credit move: %w", err)
			}

			if !p.Source.IsWorld() {
				if _, err = tx.ExecContext(ctx, `
				INSERT INTO account_volumes (ledger_id, account_id, asset, input, output)
				VALUES ($1, $2, $3, 0,$4)
				ON CONFLICT (ledger_id, account_id, asset) DO UPDATE SET output = account_volumes.output + EXCLUDED.output, updated_at = NOW()`,
					ledgerID, srcID, p.Asset, p.Amount.String(),); err != nil {
					return fmt.Errorf("update source volume: %w", err)
					}
			}
			_, err = tx.ExecContext(ctx, `
				INSERT INTO account_volumes (ledger_id, account_id, asset, input, output)
				VALUES ($1, $2, $3, $4, 0)
				ON CONFLICT (ledger_id, account_id, asset) DO UPDATE SET input = account_volumes.input + EXCLUDED.input, updated_at = NOW()`,
				ledgerID, dstID, p.Asset, p.Amount.String()); 
				err != nil {
					return fmt.Errorf("update destination volume : %w", err)
				}
		}

		committed = &Transaction{
			ID:  txID,
			LedgerID: ledgerID,
			IdempotencyKey: req.IdempotencyKey,
			Reference: req.Reference,
			Postings: req.Postings,
			Metadata: req.Metadata,
			Timestamp: ts,
			CreatedAt: time.Now,
		}

		return nil

	
})
if err != nil {
	return  nil, err 
}
return committed, nil
}

func (e *engine) RevertTransaction(ctx context.Context, ledger string, txID int64, reason string) (*Transaction, error) {
	original, err := e.GetTransaction(ctx, ledger, txID)
	if err != nil {
		return nil, err
	}
	if original.RevertedBy != nil {
		return nil, ErrAlreadyReverted
	}

	// Build the reversal postings.
	reversed := make([]Posting, len(original.Postings))
	for i, p := range original.Postings {
		reversed[i] = Posting{
			Source:      p.Destination,
			Destination: p.Source,
			Asset:       p.Asset,
			Amount:      p.Amount,
		}
	}

	reversal, err := e.CommitTransaction(ctx, ledger, TransactionRequest{
		IdempotencyKey: fmt.Sprintf("revert:%d", txID),
		Reference:      fmt.Sprintf("revert:%s", original.Reference),
		Postings:       reversed,
		Metadata: map[string]any{
			"type":    "reversion",
			"reason":  reason,
			"reverts": txID,
		},
	})
	if err != nil {
		return nil, err
	}

	// Link the two transactions together.
	_, err = e.db.ExecContext(ctx, `
		UPDATE transactions SET reverted_by = $1 WHERE id = $2;
		UPDATE transactions SET reverts     = $2 WHERE id = $1;`,
		reversal.ID, txID,
	)
	if err != nil {
		return nil, fmt.Errorf("link reversion: %w", err)
	}

	// Also insert into the revisions log.
	_, err = e.db.ExecContext(ctx, `
		INSERT INTO revisions (ledger_id, original_tx_id, reversal_tx_id, reason)
		SELECT ledger_id, $1, $2, $3 FROM transactions WHERE id = $1`,
		txID, reversal.ID, reason,
	)
	return reversal, err
}

func (e *engine) GetBalance(ctx context.Context, ledger string, address Address, asset Asset) (*Balance, error) {
	var row struct {
		Input   int64 `db:"input"`
		Output  int64 `db:"output"`
		Balance int64 `db:"balance"`
	}
	err := e.db.QueryRowxContext(ctx, `
		SELECT av.input, av.output, av.balance
		FROM account_volumes av
		JOIN accounts a ON a.id = av.account_id
		JOIN ledgers  l ON l.id = av.ledger_id
		WHERE l.name = $1 AND a.address = $2 AND av.asset = $3`,
		ledger, address, asset,
	).StructScan(&row)

	if err == sql.ErrNoRows {
		// Account exists but has never had a transaction in this asset — zero balance.
		return &Balance{
			AccountAddress: address,
			Asset:          asset,
			Input:          NewAmount(0),
			Output:         NewAmount(0),
			Balance:        NewAmount(0),
		}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get balance: %w", err)
	}

	return &Balance{
		AccountAddress: address,
		Asset:          asset,
		Input:          NewAmount(row.Input),
		Output:         NewAmount(row.Output),
		Balance:        NewAmount(row.Balance),
	}, nil
}

func (e *engine) GetTransaction(ctx context.Context, ledger string, txID int64) (*Transaction, error) {
	var row struct {
		ID             int64          `db:"id"`
		LedgerID       int64          `db:"ledger_id"`
		IdempotencyKey sql.NullString `db:"idempotency_key"`
		Reference      sql.NullString `db:"reference"`
		Metadata       []byte         `db:"metadata"`
		RevertedBy     sql.NullInt64  `db:"reverted_by"`
		Reverts        sql.NullInt64  `db:"reverts"`
		Timestamp      time.Time      `db:"timestamp"`
		CreatedAt      time.Time      `db:"created_at"`
	}

	err := e.db.QueryRowxContext(ctx, `
		SELECT t.id, t.ledger_id, t.idempotency_key, t.reference,
		       t.metadata, t.reverted_by, t.reverts, t.timestamp, t.created_at
		FROM transactions t
		JOIN ledgers l ON l.id = t.ledger_id
		WHERE l.name = $1 AND t.id = $2`,
		ledger, txID,
	).StructScan(&row)

	if err == sql.ErrNoRows {
		return nil, ErrTransactionNotFound
	}
	if err != nil {
		return nil, err
	}

	postings, err := loadPostings(ctx, e.db, txID)
	if err != nil {
		return nil, err
	}

	var meta map[string]any
	_ = json.Unmarshal(row.Metadata, &meta)

	tx := &Transaction{
		ID:             row.ID,
		LedgerID:       row.LedgerID,
		IdempotencyKey: row.IdempotencyKey.String,
		Reference:      row.Reference.String,
		Postings:       postings,
		Metadata:       meta,
		Timestamp:      row.Timestamp,
		CreatedAt:      row.CreatedAt,
	}
	if row.RevertedBy.Valid {
		tx.RevertedBy = &row.RevertedBy.Int64
	}
	if row.Reverts.Valid {
		tx.Reverts = &row.Reverts.Int64
	}
	return tx, nil
}

func (e *engine) ListTransactions(ctx context.Context, ledger string, q TransactionQuery) ([]*Transaction, int64, error) {
	// Build dynamic query. In production, use a proper query builder or pgx named args.
	query := `
		SELECT DISTINCT t.id, t.ledger_id, t.idempotency_key, t.reference,
		       t.metadata, t.reverted_by, t.reverts, t.timestamp, t.created_at
		FROM transactions t
		JOIN ledgers l ON l.id = t.ledger_id`

	args := []any{ledger}
	argN := 2
	where := []string{"l.name = $1"}

	if q.Reference != "" {
		where = append(where, fmt.Sprintf("t.reference = $%d", argN))
		args = append(args, q.Reference)
		argN++
	}

	if q.Account != "" {
		query += ` JOIN postings p ON p.transaction_id = t.id
		           JOIN accounts src ON src.id = p.source_id
		           JOIN accounts dst ON dst.id = p.destination_id`
		where = append(where, fmt.Sprintf("(src.address = $%d OR dst.address = $%d)", argN, argN+1))
		args = append(args, q.Account, q.Account)
		argN += 2
	}

	for i, w := range where {
		if i == 0 {
			query += " WHERE " + w
		} else {
			query += " AND " + w
		}
	}

	pageSize := q.PageSize
	if pageSize == 0 || pageSize > 100 {
		pageSize = 50
	}

	query += fmt.Sprintf(" ORDER BY t.timestamp DESC LIMIT %d", pageSize)

	rows, err := e.db.QueryxContext(ctx, query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var result []*Transaction
	for rows.Next() {
		var row struct {
			ID             int64          `db:"id"`
			LedgerID       int64          `db:"ledger_id"`
			IdempotencyKey sql.NullString `db:"idempotency_key"`
			Reference      sql.NullString `db:"reference"`
			Metadata       []byte         `db:"metadata"`
			RevertedBy     sql.NullInt64  `db:"reverted_by"`
			Reverts        sql.NullInt64  `db:"reverts"`
			Timestamp      time.Time      `db:"timestamp"`
			CreatedAt      time.Time      `db:"created_at"`
		}
		if err := rows.StructScan(&row); err != nil {
			return nil, 0, err
		}
		var meta map[string]any
		_ = json.Unmarshal(row.Metadata, &meta)
		tx := &Transaction{
			ID:             row.ID,
			LedgerID:       row.LedgerID,
			IdempotencyKey: row.IdempotencyKey.String,
			Reference:      row.Reference.String,
			Metadata:       meta,
			Timestamp:      row.Timestamp,
			CreatedAt:      row.CreatedAt,
		}
		result = append(result, tx)
	}
	return result, int64(len(result)), nil
}


func (e *engine) GetAccount(ctx context.Context, ledger string, address Address, withBalances bool) (*Account, error) {
	var row struct {
		ID        int64     `db:"id"`
		LedgerID  int64     `db:"ledger_id"`
		Address   string    `db:"address"`
		Metadata  []byte    `db:"metadata"`
		CreatedAt time.Time `db:"created_at"`
	}
	err := e.db.QueryRowxContext(ctx, `
		SELECT a.id, a.ledger_id, a.address, a.metadata, a.created_at
		FROM accounts a
		JOIN ledgers l ON l.id = a.ledger_id
		WHERE l.name = $1 AND a.address = $2`,
		ledger, address,
	).StructScan(&row)
	if err == sql.ErrNoRows {
		return nil, ErrAccountNotFound
	}
	if err != nil {
		return nil, err
	}

	var meta map[string]any
	_ = json.Unmarshal(row.Metadata, &meta)

	acc := &Account{
		ID:        row.ID,
		LedgerID:  row.LedgerID,
		Address:   Address(row.Address),
		Metadata:  meta,
		CreatedAt: row.CreatedAt,
	}

	if withBalances {
		bals, err := loadBalances(ctx, e.db, row.ID)
		if err != nil {
			return nil, err
		}
		acc.Volumes = bals
	}

	return acc, nil
}

func (e *engine) ListAccounts(ctx context.Context, ledger string, q AccountQuery) ([]*Account, int64, error) {
	pageSize := q.PageSize
	if pageSize == 0 || pageSize > 100 {
		pageSize = 50
	}

	rows, err := e.db.QueryxContext(ctx, `
		SELECT a.id, a.ledger_id, a.address, a.metadata, a.created_at
		FROM accounts a
		JOIN ledgers l ON l.id = a.ledger_id
		WHERE l.name = $1 AND ($2 = '' OR a.address LIKE $2 || '%')
		ORDER BY a.address
		LIMIT $3`,
		ledger, q.AddressPrefix, pageSize,
	)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var result []*Account
	for rows.Next() {
		var row struct {
			ID        int64     `db:"id"`
			LedgerID  int64     `db:"ledger_id"`
			Address   string    `db:"address"`
			Metadata  []byte    `db:"metadata"`
			CreatedAt time.Time `db:"created_at"`
		}
		if err := rows.StructScan(&row); err != nil {
			return nil, 0, err
		}
		var meta map[string]any
		_ = json.Unmarshal(row.Metadata, &meta)
		result = append(result, &Account{
			ID:        row.ID,
			LedgerID:  row.LedgerID,
			Address:   Address(row.Address),
			Metadata:  meta,
			CreatedAt: row.CreatedAt,
		})
	}
	return result, int64(len(result)), nil
}

func validateRequest(req TransactionRequest) error {
	if len(req.Postings) == 0 {
		return ErrNoPostings
	}
	for _, p := range req.Postings {
		if err := p.Validate(); err != nil {
			return err
		}
	}
	return nil
}

func getLedgerID(ctx context.Context, tx *sqlx.Tx, name string) (int64, error) {
	var id int64
	err := tx.QueryRowContext(ctx, `SELECT id FROM ledgers WHERE name = $1`, name).Scan(&id)
	if err == sql.ErrNoRows {
		return 0, ErrLedgerNotFound
	}
	return id, err
}

func resolveAccounts(ctx context.Context, tx *sqlx.Tx, ledgerID int64, postings []Posting) (map[Address]int64, error) {
	seen := map[Address]struct{}{}
	for _, p := range postings {
		seen[p.Source] = struct{}{}
		seen[p.Destination] = struct{}{}
	}

	ids := make(map[Address]int64, len(seen))
	for addr := range seen {
		var id int64
		err := tx.QueryRowContext(ctx, `
			INSERT INTO accounts (ledger_id, address)
			VALUES ($1, $2)
			ON CONFLICT (ledger_id, address) DO UPDATE SET address = EXCLUDED.address
			RETURNING id`,
			ledgerID, addr,
		).Scan(&id)
		if err != nil {
			return nil, fmt.Errorf("resolve account %s: %w", addr, err)
		}
		ids[addr] = id
	}
	return ids, nil
}


func checkFunds(ctx context.Context, tx *sqlx.Tx, ledgerID int64, postings []Posting, accountIDs map[Address]int64) error {
	// Aggregate required per (account, asset).
	required := map[string]Amount{} // key: "accountID:asset"
	accounts := map[string]Address{}

	for _, p := range postings {
		if p.Source.IsWorld() {
			continue
		}
		key := fmt.Sprintf("%d:%s", accountIDs[p.Source], p.Asset)
		if _, ok := required[key]; !ok {
			required[key] = NewAmount(0)
			accounts[key] = p.Source
		}
		required[key] = required[key].Add(p.Amount)
	}

	if len(required) == 0 {
		return nil
	}

	for key, need := range required {
		var (
			balance int64
			addr    = accounts[key]
		)

		// Parse account ID and asset back from the key.
		var accountID int64
		var asset string
		fmt.Sscanf(key, "%d:%s", &accountID, &asset)

		err := tx.QueryRowContext(ctx, `
			SELECT COALESCE(balance, 0)
			FROM account_volumes
			WHERE ledger_id = $1 AND account_id = $2 AND asset = $3
			FOR UPDATE`,
			ledgerID, accountID, asset,
		).Scan(&balance)

		if err == sql.ErrNoRows {
			balance = 0
		} else if err != nil {
			return fmt.Errorf("lock account volume: %w", err)
		}

		available := NewAmount(balance)
		if available.Cmp(need) < 0 {
			return &InsufficientFundsError{
				Account:   addr,
				Asset:     Asset(asset),
				Available: available,
				Required:  need,
			}
		}
	}
	return nil
}

func findByIdempotencyKey(ctx context.Context, tx *sqlx.Tx, ledgerID int64, key string) (*Transaction, error) {
	var id int64
	err := tx.QueryRowContext(ctx, `
		SELECT id FROM transactions WHERE ledger_id = $1 AND idempotency_key = $2`,
		ledgerID, key,
	).Scan(&id)
	if err != nil {
		return nil, err
	}
	// We have a match — load the full transaction.
	// (We pass a nil tx here; in production you'd re-query within the same tx.)
	return nil, nil // placeholder — replace with loadTransaction(ctx, tx, id)
}

func loadPostings(ctx context.Context, q sqlx.QueryerContext, txID int64) ([]Posting, error) {
	rows, err := sqlx.QueryxContext(q, ctx, `
		SELECT src.address AS source, dst.address AS destination,
		       p.asset, p.amount
		FROM postings p
		JOIN accounts src ON src.id = p.source_id
		JOIN accounts dst ON dst.id = p.destination_id
		WHERE p.transaction_id = $1
		ORDER BY p.posting_index`,
		txID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var postings []Posting
	for rows.Next() {
		var row struct {
			Source      string `db:"source"`
			Destination string `db:"destination"`
			Asset       string `db:"asset"`
			Amount      int64  `db:"amount"`
		}
		if err := rows.StructScan(&row); err != nil {
			return nil, err
		}
		postings = append(postings, Posting{
			Source:      Address(row.Source),
			Destination: Address(row.Destination),
			Asset:       Asset(row.Asset),
			Amount:      NewAmount(row.Amount),
		})
	}
	return postings, nil
}

func loadBalances(ctx context.Context, q sqlx.QueryerContext, accountID int64) ([]Balance, error) {
	rows, err := sqlx.QueryxContext(q, ctx, `
		SELECT asset, input, output, balance FROM account_volumes WHERE account_id = $1`,
		accountID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bals []Balance
	for rows.Next() {
		var row struct {
			Asset   string `db:"asset"`
			Input   int64  `db:"input"`
			Output  int64  `db:"output"`
			Balance int64  `db:"balance"`
		}
		if err := rows.StructScan(&row); err != nil {
			return nil, err
		}
		bals = append(bals, Balance{
			Asset:   Asset(row.Asset),
			Input:   NewAmount(row.Input),
			Output:  NewAmount(row.Output),
			Balance: NewAmount(row.Balance),
		})
	}
	return bals, nil
}

func (e *engine) withTx(ctx context.Context, fn func(*sqlx.Tx) error) error {
	tx, err := e.db.BeginTxx(ctx, &sql.TxOptions{Isolation: sql.LevelSerializable})
	if err != nil {
		return err
	}
	if err := fn(tx); err != nil {
		_ = tx.Rollback()
		return err
	}
	return tx.Commit()
}

func nullString(s string) sql.NullString {
	if s == "" {
		return sql.NullString{}
	}
	return sql.NullString{String: s, Valid: true}
}
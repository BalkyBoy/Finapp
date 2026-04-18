package ledger

import "github.com/jmoiron/sqlx"
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
	})
}
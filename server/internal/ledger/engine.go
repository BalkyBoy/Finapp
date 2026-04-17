package ledger

import "github.com/jmoiron/sqlx"
type engine struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) Engine {
	return &engine{db: db}
}

func (e *engine) CommitTransaction(ctx context.Context, ledger string, req TransactionRequest) (*Transaction, error) {
	
}
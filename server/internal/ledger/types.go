package ledger

import (
	"context"
	"encoding/json"
	"fmt"
	"math/big"
	"time"
)

type Amount struct {
	val *big.Int
}

func NewAmount(kobo int64) Amount {
	return  Amount{val: big.NewInt(kobo)}
}

func (a Amount) Add(b Amount) Amount {return Amount{new(big.Int).Add(a.val, b.val)}}
func (a Amount) Sub(b Amount) Amount {return Amount{new(big.Int).Sub(a.val, b.val)}}
func (a Amount) IsPositive() bool {return a.val.Sign() > 0}
func (a Amount) IsZero() bool {return a.val.Sign() == 0}
func (a Amount) IsNegative() bool {return a.val.Sign() < 0}
func (a Amount) Cmp(b Amount) int {return a.val.Cmp(b.val)}
func (a Amount) Int64() int64 {return a.val.Int64()}
func (a Amount) String() string {return a.val.String()}
func (a Amount) MarshalJSON() ([]byte, error) {return json.Marshal(a.val.String())}


type Asset string

const (
	AssetNGN Asset = "NGN/2"
)

type Address string

const (
	WorldAccount Address = "world"
)


func (a Address) String() string {return string(a)}
func (a Address) IsWorld() bool {return a == WorldAccount}

func UserMainWallet(userID int64) Address {
	return Address(fmt.Sprintf("users:%d:main", userID))
}

func UserInvestmentWallet(userID int64) Address {
	return Address(fmt.Sprintf("users:%d:investment", userID))
}

func UserSavingsWallet(userID int64) Address {
	return Address(fmt.Sprintf("users:%d:savings", userID))
}

func InvestmentAccount(investmentID int64) Address {
	return Address(fmt.Sprintf("investments:%d", investmentID))
}

func PlatformAccount() Address {
	return Address("platform")
}

type Posting struct {
	Source	  Address `json:"source"`
	Destination Address `json:"destination"`
	Amount	  Amount  `json:"amount"`
	Asset	  Asset   `json:"asset"`
}

func (p Posting) Validate() error {
	if p.Source == p.Destination {
		return  ErrSelfPosting
	}
	if !p.Amount.IsPositive() {
		return ErrNonPositiveAmount
	}
	if p.Asset != AssetNGN {
		return ErrUnsupportedAsset
	}
	return nil
}

type TransactionRequest struct {
	Postings []Posting `json:"postings"`
	IdempotencyKey string `json:"idempotency_key"`
	Reference string `json:"reference"`
	Metadata map[string]string `json:"metadata"`
	Timestamp int64 `json:"timestamp,omitempty"`
}

type Transaction struct {
	ID int64 `json:"id"`
	LedgerID int64 `json:"ledger_id"`
	IdempotencyKey string `json:"idempotency_key"`
	Reference string `json:"reference"`
	Postings []Posting `json:"postings"`
	Metadata map[string]string `json:"metadata"`
	Timestamp int64 `json:"timestamp"`
	RevertedBy *int64 `json:"reverted_by,omitempty"`
	Reverts *int64 `json:"reverts,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

type Balance struct {
	AccountAddress Address `json:"account"`
	Asset Asset `json:"asset"`
	Input Amount `json:"input"`
	Output Amount `json:"output"`
	Balance Amount `json:"balance"`
}

type Account struct {
	ID int64 `json:"id"`
	LedgerID int64 `json:"ledger_id"`
	Address Address `json:"address"`
	Metadata map[string]string `json:"metadata"`
	CreatedAt time.Time `json:"created_at"`
	Volumes []Balance `json:"volumes,omitempty"`
}

var (
	ErrInsufficientFunds   = fmt.Errorf("insufficient funds")
	ErrSelfPosting         = fmt.Errorf("source and destination cannot be the same account")
	ErrNonPositiveAmount   = fmt.Errorf("posting amount must be positive")
	ErrMissingAsset        = fmt.Errorf("posting asset is required")
	ErrNoPostings          = fmt.Errorf("transaction must have at least one posting")
	ErrAlreadyReverted     = fmt.Errorf("transaction has already been reverted")
	ErrIdempotencyConflict = fmt.Errorf("a different transaction exists with this idempotency key")
	ErrTransactionNotFound = fmt.Errorf("transaction not found")
	ErrAccountNotFound     = fmt.Errorf("account not found")
	ErrLedgerNotFound      = fmt.Errorf("ledger not found")
)

type InsufficientFundsError struct {
	Account   Address
	Asset     Asset
	Available Amount
	Required  Amount
}

func (e *InsufficientFundsError) Error() string {
	return fmt.Sprintf(
		"insufficient funds: account %s has %s %s but needs %s",
		e.Account, e.Available, e.Asset, e.Required,
	)
}

type Engine interface {
	CommitTransaction(ctx context.Context, ledger string, req TransactionRequest) (*Transaction, error)
	RevertTransaction(ctx context.Context, ledger string, txID int64, reason string) (*Transaction, error)
	GetTransaction(ctx context.Context, ledger string, txID int64) (*Transaction, error)
	ListTransactions(ctx context.Context, ledger string, q TransactionQuery) ([]Transaction, int64 error)
	GetBalance(ctx context.Context, ledger string, account Address, asset Asset) (*Balance, error)
	ListAccounts(ctx context.Context, ledger string, q AccountQuery) ([]Account, int64, error)
	GetAccount(ctx context.Context, ledger string, account Address) (*Account, error)
}

type TransactionQuery struct {
	Reference string
	Account Address
	Metadata map[string]string
	StartTime *time.Time
	EndTime *time.Time
	PageSize int64
	PageToken string
}

type AccountQuery struct {
	AddressPrefix string
	Metadata map[string]string
	PageSize int64
	PageToken string
}
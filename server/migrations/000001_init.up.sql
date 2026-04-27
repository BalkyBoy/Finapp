CREATE TABLE users (
    id           SERIAL PRIMARY KEY,
    username     VARCHAR(255) UNIQUE NOT NULL,
    email        VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20)  UNIQUE NOT NULL,
    password_hash TEXT        NOT NULL,
    kyc_status   VARCHAR(50)  NOT NULL DEFAULT 'pending',
    is_verified  BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE otps (
    phone_number VARCHAR(20)  NOT NULL,
    code         VARCHAR(10)  NOT NULL,
    expires_at   TIMESTAMP    NOT NULL,
    used         BOOLEAN      NOT NULL DEFAULT FALSE,
    PRIMARY KEY (phone_number, code)
);

CREATE TABLE otp_requests (
    id           SERIAL PRIMARY KEY,
    phone        VARCHAR(20)  NOT NULL,
    otp_hash     TEXT         NOT NULL,
    attempts     INT          NOT NULL DEFAULT 0,
    resend_count INT          NOT NULL DEFAULT 0,
    last_sent_at TIMESTAMP    NOT NULL,
    expires_at   TIMESTAMP    NOT NULL,
    verified     BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE ledgers (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    metadata    JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE accounts (
    id         BIGSERIAL PRIMARY KEY,
    ledger_id  BIGINT NOT NULL REFERENCES ledgers(id),
    address    VARCHAR(255) NOT NULL,
    metadata   JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (ledger_id, address)
);

CREATE INDEX idx_accounts_ledger_address ON accounts (ledger_id, address);
CREATE INDEX idx_accounts_address_prefix ON accounts (ledger_id, address varchar_pattern_ops);

CREATE TABLE transactions (
    id               BIGSERIAL PRIMARY KEY,
    ledger_id        BIGINT NOT NULL REFERENCES ledgers(id),
    idempotency_key  VARCHAR(255),
    reference        VARCHAR(255),
    metadata         JSONB NOT NULL DEFAULT '{}',
    reverted_by      BIGINT REFERENCES transactions(id),
    reverts          BIGINT REFERENCES transactions(id),
    timestamp        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (ledger_id, idempotency_key)
);

CREATE INDEX idx_transactions_ledger    ON transactions (ledger_id, timestamp DESC);
CREATE INDEX idx_transactions_reference ON transactions (ledger_id, reference);
CREATE INDEX idx_transactions_metadata  ON transactions USING GIN (metadata);
CREATE INDEX idx_transactions_idem_key  ON transactions (ledger_id, idempotency_key);

CREATE TABLE postings (
    id              BIGSERIAL PRIMARY KEY,
    transaction_id  BIGINT NOT NULL REFERENCES transactions(id) ON DELETE RESTRICT,
    ledger_id       BIGINT NOT NULL REFERENCES ledgers(id),
    source_id       BIGINT NOT NULL REFERENCES accounts(id),
    destination_id  BIGINT NOT NULL REFERENCES accounts(id),
    asset           VARCHAR(20) NOT NULL DEFAULT 'NGN/2',
    amount          NUMERIC(30, 0) NOT NULL CHECK (amount > 0),
    posting_index   INT NOT NULL,
    UNIQUE (transaction_id, posting_index)
);

CREATE INDEX idx_postings_transaction ON postings (transaction_id);
CREATE INDEX idx_postings_source      ON postings (ledger_id, source_id);
CREATE INDEX idx_postings_destination ON postings (ledger_id, destination_id);
CREATE INDEX idx_postings_asset       ON postings (ledger_id, asset);

CREATE TABLE moves (
    id              BIGSERIAL PRIMARY KEY,
    ledger_id       BIGINT NOT NULL REFERENCES ledgers(id),
    account_id      BIGINT NOT NULL REFERENCES accounts(id),
    posting_id      BIGINT NOT NULL REFERENCES postings(id),
    transaction_id  BIGINT NOT NULL REFERENCES transactions(id),
    asset           VARCHAR(20) NOT NULL,
    amount          NUMERIC(30, 0) NOT NULL,
    is_source       BOOLEAN NOT NULL,
    post_commit_vol JSONB NOT NULL DEFAULT '{}',
    timestamp       TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_moves_account_asset ON moves (ledger_id, account_id, asset, timestamp DESC);
CREATE INDEX idx_moves_transaction   ON moves (transaction_id);
CREATE INDEX idx_moves_posting       ON moves (posting_id);

CREATE TABLE account_volumes (
    id         BIGSERIAL PRIMARY KEY,
    ledger_id  BIGINT NOT NULL REFERENCES ledgers(id),
    account_id BIGINT NOT NULL REFERENCES accounts(id),
    asset      VARCHAR(20) NOT NULL,
    input      NUMERIC(30, 0) NOT NULL DEFAULT 0,
    output     NUMERIC(30, 0) NOT NULL DEFAULT 0,
    balance    NUMERIC(30, 0) GENERATED ALWAYS AS (input - output) STORED,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (ledger_id, account_id, asset)
);

CREATE INDEX idx_volumes_account_asset ON account_volumes (ledger_id, account_id, asset);

CREATE TABLE revisions (
    id               BIGSERIAL PRIMARY KEY,
    ledger_id        BIGINT NOT NULL REFERENCES ledgers(id),
    original_tx_id   BIGINT NOT NULL REFERENCES transactions(id),
    reversal_tx_id   BIGINT NOT NULL REFERENCES transactions(id),
    reason           TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (original_tx_id)
);

INSERT INTO ledgers (name, description) VALUES ('ngn-main', 'Primary NGN ledger for Owopor');
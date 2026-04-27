package auth

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

// --- User ---

func (r *Repository) CreateUser(username, email, passwordHash, phoneNumber string) error {
	_, err := r.pool.Exec(context.Background(),
		`INSERT INTO users (username, email, password_hash, phone_number) VALUES ($1, $2, $3, $4)`,
		username, email, passwordHash, phoneNumber,
	)
	return err
}

func (r *Repository) FindUserByID(id int) (User, error) {
	var u User
	err := r.pool.QueryRow(context.Background(),
		`SELECT id, username, email, phone_number, password_hash, kyc_status, is_verified, created_at
		 FROM users WHERE id=$1`,
		id,
	).Scan(&u.ID, &u.Username, &u.Email, &u.PhoneNumber, &u.PasswordHash, &u.KYCStatus, &u.IsVerified, &u.CreatedAt)
	if err == pgx.ErrNoRows {
		return u, ErrUserNotFound
	}
	return u, err
}

func (r *Repository) FindUserByEmail(email string) (User, error) {
	var u User
	err := r.pool.QueryRow(context.Background(),
		`SELECT id, username, email, phone_number, password_hash, kyc_status, is_verified, created_at
		 FROM users WHERE email=$1`,
		email,
	).Scan(&u.ID, &u.Username, &u.Email, &u.PhoneNumber, &u.PasswordHash, &u.KYCStatus, &u.IsVerified, &u.CreatedAt)
	if err == pgx.ErrNoRows {
		return u, ErrInvalidCredentials
	}
	return u, err
}

func (r *Repository) UserExistsByEmail(email string) (bool, error) {
	var exists bool
	err := r.pool.QueryRow(context.Background(),
		`SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)`, email,
	).Scan(&exists)
	return exists, err
}

func (r *Repository) UserExistsByUsername(username string) (bool, error) {
	var exists bool
	err := r.pool.QueryRow(context.Background(),
		`SELECT EXISTS(SELECT 1 FROM users WHERE username=$1)`, username,
	).Scan(&exists)
	return exists, err
}

func (r *Repository) UpdateUserPhone(userID int, phone string) error {
	_, err := r.pool.Exec(context.Background(),
		`UPDATE users SET phone_number=$1 WHERE id=$2`,
		phone, userID,
	)
	return err
}

func (r *Repository) MarkUserVerified(userID int) error {
	_, err := r.pool.Exec(context.Background(),
		`UPDATE users SET is_verified=true WHERE id=$1`, userID,
	)
	return err
}

func (r *Repository) PhoneExists(phone string) (bool, error) {
	var exists bool
	err := r.pool.QueryRow(context.Background(),
		`SELECT EXISTS(SELECT 1 FROM users WHERE phone_number=$1)`, phone,
	).Scan(&exists)
	return exists, err
}

// --- OTP ---

func (r *Repository) SaveOTP(phone, otpHash string) error {
	_, err := r.pool.Exec(context.Background(),
		`INSERT INTO otp_requests (phone, otp_hash, expires_at, last_sent_at)
		 VALUES ($1, $2, $3, NOW())`,
		phone, otpHash, time.Now().Add(5*time.Minute),
	)
	return err
}

func (r *Repository) GetLatestOTP(phone string) (OTPRequest, error) {
	var o OTPRequest
	err := r.pool.QueryRow(context.Background(),
		`SELECT id, phone, otp_hash, attempts, resend_count, last_sent_at, expires_at, verified
		 FROM otp_requests WHERE phone=$1 ORDER BY created_at DESC LIMIT 1`,
		phone,
	).Scan(&o.ID, &o.Phone, &o.OTPHash, &o.Attempts, &o.ResendCount, &o.LastSentAt, &o.ExpiresAt, &o.Verified)
	if err == pgx.ErrNoRows {
		return o, ErrInvalidOTP
	}
	return o, err
}

func (r *Repository) UpdateOTP(o OTPRequest) error {
	_, err := r.pool.Exec(context.Background(),
		`UPDATE otp_requests
		 SET attempts=$1, resend_count=$2, last_sent_at=$3, otp_hash=$4
		 WHERE id=$5`,
		o.Attempts, o.ResendCount, o.LastSentAt, o.OTPHash, o.ID,
	)
	return err
}

func (r *Repository) MarkOTPVerified(id int) error {
	_, err := r.pool.Exec(context.Background(),
		`UPDATE otp_requests SET verified=true WHERE id=$1`, id,
	)
	return err
}

func (r *Repository) UserPhoneByID(userID int) (string, error) {
	var phone string
	err := r.pool.QueryRow(context.Background(),
		`SELECT phone_number FROM users WHERE id=$1`, userID,
	).Scan(&phone)
	if err != nil {
		return "", fmt.Errorf("failed to get user phone: %w", err)
	}
	return phone, nil
}

func (r *Repository) FindOrCreateUser(phone string) (User, error) {
	var u User

	err := r.pool.QueryRow(context.Background(),
		`SELECT id, phone_number, created_at FROM users WHERE phone_number=$1`,
		phone,
	).Scan(&u.ID, &u.PhoneNumber, &u.CreatedAt)

	if err == pgx.ErrNoRows {
		err = r.pool.QueryRow(context.Background(),
			`INSERT INTO users (phone_number) VALUES ($1) RETURNING id, phone_number, created_at`,
			phone,
		).Scan(&u.ID, &u.PhoneNumber, &u.CreatedAt)
		if err != nil {
			return u, fmt.Errorf("failed to create user: %w", err)
		}
		return u, nil
	}

	if err != nil {
		return u, fmt.Errorf("failed to find user: %w", err)
	}

	return u, nil
}

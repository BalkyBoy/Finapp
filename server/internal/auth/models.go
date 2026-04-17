package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	Email        string    `json:"email"`
	PhoneNumber  string    `json:"phone_number"`
	PasswordHash string    `json:"-"`
	KYCStatus    string    `json:"kyc_status"`
	IsVerified   bool      `json:"is_verified"`
	CreatedAt    time.Time `json:"created_at"`
}

type OTP struct {
	PhoneNumber string    `json:"phone_number"`
	Code        string    `json:"code"`
	ExpiresAt   time.Time `json:"expires_at"`
	Used        bool      `json:"used"`
}
type OTPRequest struct {
	ID          int       `json:"id"`
	Phone       string    `json:"phone"`
	OTPHash     string    `json:"otp_hash"`
	Attempts    int       `json:"attempts"`
	ResendCount int       `json:"resend_count"`
	LastSentAt  time.Time `json:"last_sent_at"`
	ExpiresAt   time.Time `json:"expires_at"`
	Verified    bool      `json:"verified"`
	CreatedAt   time.Time `json:"created_at"`
}
type Credentials struct {
	Username     string `json:"username"`
	Email        string `json:"email"`
	PasswordHash string `json:"password"`
	PhoneNumber  string `json:"phone_number"`
}

type Claims struct {
	Username string `json:"username"`
	UserID   int    `json:"user_id"`
	Phone    string `json:"phone"`
	jwt.RegisteredClaims
}

type RefreshToken struct {
	Token     string
	UserID    int
	ExpiresAt time.Time
}

type PasswordResetToken struct {
	Token     string
	UserID    int
	ExpiresAt time.Time
}

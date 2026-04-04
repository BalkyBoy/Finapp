package auth

import (
	"time"
	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	Email        string    `json:"email"`
	Password     string    `json:"-"`
	OAuthID      string    `json:"-"`
	OAuthProvider string   `json:"oauth_provider,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
}

type Credentials struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	UserID   int    `json:"user_id"`
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
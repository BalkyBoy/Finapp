package auth

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"
	"github.com/golang-jwt/jwt/v5"
)

func generateToken(user User, expirationTime time.Time) (string, error) {
	claims := &Claims{
		Username: user.Username,
		UserID:   user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "auth-system",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func generateRefreshToken(userID int) (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	
	token := base64.URLEncoding.EncodeToString(b)
	expiresAt := time.Now().Add(7 * 24 * time.Hour) // 7 days
	
	refreshTokens[token] = RefreshToken{
		Token:     token,
		UserID:    userID,
		ExpiresAt: expiresAt,
	}
	
	return token, nil
}

func generatePasswordResetToken(userID int) (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	
	token := base64.URLEncoding.EncodeToString(b)
	expiresAt := time.Now().Add(1 * time.Hour) // 1 hour
	
	passwordResetTokens[token] = PasswordResetToken{
		Token:     token,
		UserID:    userID,
		ExpiresAt: expiresAt,
	}
	
	return token, nil
}

func validatePassword(password string) error {
	if len(password) < 8 {
		return fmt.Errorf("password must be at least 8 characters")
	}
	// Add more validation rules as needed
	return nil
}
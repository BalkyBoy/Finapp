package auth

import (
	"time"

	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
)

var (
	users               = make(map[string]User)
	usersByID           = make(map[int]User)
	usersByEmail        = make(map[string]User)
	refreshTokens       = make(map[string]RefreshToken)
	passwordResetTokens = make(map[string]PasswordResetToken)
	userIDCounter       = 1
)

// Session store
var store = sessions.NewCookieStore([]byte("super-secret-session-key-change-in-prod"))

// JWT secrets
var (
	jwtSecret = []byte("jwt-secret-key-change-in-production")
)



func init() {
	// Initialize with test users
	hashedPass, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	user := User{
		ID:           userIDCounter,
		Username:     "alice",
		Email:        "alice@example.com",
		PasswordHash: string(hashedPass),
		CreatedAt:    time.Now(),
	}
	users[user.Username] = user
	usersByID[user.ID] = user
	usersByEmail[user.Email] = user
	userIDCounter++
}

package auth

import (
	"crypto/rand"
	"encoding/base64"
	"time"

	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
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

// OAuth configurations
var (
	googleOAuthConfig = &oauth2.Config{
		ClientID:     "YOUR_GOOGLE_CLIENT_ID",
		ClientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
		RedirectURL:  "http://localhost:8080/auth/google/callback",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}

	githubOAuthConfig = &oauth2.Config{
		ClientID:     "YOUR_GITHUB_CLIENT_ID",
		ClientSecret: "YOUR_GITHUB_CLIENT_SECRET",
		RedirectURL:  "http://localhost:8080/auth/github/callback",
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}

	oauthStateString = ""
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

	// Generate random state for OAuth
	b := make([]byte, 32)
	rand.Read(b)
	oauthStateString = base64.URLEncoding.EncodeToString(b)
}

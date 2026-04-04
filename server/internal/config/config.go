package auth

import (
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

// JWT secrets
var (
	JWTSecret     = []byte("jwt-secret-key-change-in-production")
	RefreshSecret = []byte("refresh-secret-key-change-in-production")
)

// Session key
var SessionKey = []byte("super-secret-session-key-change-in-prod")

// OAuth configurations
var GoogleOAuthConfig = &oauth2.Config{
	ClientID:     "YOUR_GOOGLE_CLIENT_ID",
	ClientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
	RedirectURL:  "http://localhost:8080/auth/google/callback",
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
	Endpoint:     google.Endpoint,
}

var GithubOAuthConfig = &oauth2.Config{
	ClientID:     "YOUR_GITHUB_CLIENT_ID",
	ClientSecret: "YOUR_GITHUB_CLIENT_SECRET",
	RedirectURL:  "http://localhost:8080/auth/github/callback",
	Scopes:       []string{"user:email"},
	Endpoint:     github.Endpoint,
}

var OAuthStateString string

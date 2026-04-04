package main

import (
	"log"
	"net/http"

	"github.com/owopor/server/internal/auth"
)

func main() {
	// JWT auth
	http.HandleFunc("/auth/register", auth.RegisterHandler)
	http.HandleFunc("/login", auth.LoginHandler)
	http.HandleFunc("/refresh", auth.RefreshTokenHandler)
	http.HandleFunc("/forgot-password", auth.ForgotPasswordHandler)
	http.HandleFunc("/reset-password", auth.ResetPasswordHandler)
	http.HandleFunc("/protected", auth.AuthMiddleware(auth.ProtectedHandler))
	http.HandleFunc("/me", auth.AuthMiddleware(auth.MeHandler))

	// Session auth
	http.HandleFunc("/session/login", auth.SessionLoginHandler)
	http.HandleFunc("/session/logout", auth.SessionLogoutHandler)
	http.HandleFunc("/session/protected", auth.SessionProtectedHandler)

	// OAuth
	http.HandleFunc("/auth/google", auth.GoogleLoginHandler)
	http.HandleFunc("/auth/google/callback", auth.GoogleCallbackHandler)
	http.HandleFunc("/auth/github", auth.GithubLoginHandler)
	http.HandleFunc("/auth/github/callback", auth.GithubCallbackHandler)

	log.Println("🚀 Complete Auth System running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

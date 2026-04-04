package auth

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if err := validatePassword(creds.Password); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if _, exists := users[creds.Username]; exists {
		http.Error(w, "Username already exists", http.StatusConflict)
		return
	}
	if _, exists := usersByEmail[creds.Email]; exists {
		http.Error(w, "Email already exists", http.StatusConflict)
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
	user := User{
		ID:        userIDCounter,
		Username:  creds.Username,
		Email:     creds.Email,
		Password:  string(hashedPassword),
		CreatedAt: time.Now(),
	}
	users[user.Username] = user
	usersByID[user.ID] = user
	usersByEmail[user.Email] = user
	userIDCounter++

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "User created successfully",
		"user":    user,
	})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user User
	var exists bool

	if strings.Contains(creds.Username, "@") {
		user, exists = usersByEmail[creds.Username]
	} else {
		user, exists = users[creds.Username]
	}

	if !exists || bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)) != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(15 * time.Minute)
	accessToken, _ := generateToken(user, expirationTime)
	refreshToken, _ := generateRefreshToken(user.ID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"expires_at":    expirationTime.Format(time.RFC3339),
		"user":          user,
	})
}

func RefreshTokenHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		RefreshToken string `json:"refresh_token"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	rt, exists := refreshTokens[req.RefreshToken]
	if !exists || time.Now().After(rt.ExpiresAt) {
		http.Error(w, "Invalid or expired refresh token", http.StatusUnauthorized)
		return
	}

	user, exists := usersByID[rt.UserID]
	if !exists {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(15 * time.Minute)
	accessToken, _ := generateToken(user, expirationTime)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"access_token": accessToken,
		"expires_at":   expirationTime.Format(time.RFC3339),
	})
}

func ForgotPasswordHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user, exists := usersByEmail[req.Email]
	if !exists {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "If the email exists, a reset link has been sent",
		})
		return
	}

	token, _ := generatePasswordResetToken(user.ID)
	// In production, send email
	// Here we log the link for demo
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Password reset link sent (check server logs for demo)",
		"token":   token,
	})
}

func ResetPasswordHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Token       string `json:"token"`
		NewPassword string `json:"new_password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	resetToken, exists := passwordResetTokens[req.Token]
	if !exists || time.Now().After(resetToken.ExpiresAt) {
		http.Error(w, "Invalid or expired reset token", http.StatusUnauthorized)
		return
	}

	if err := validatePassword(req.NewPassword); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	user := usersByID[resetToken.UserID]
	user.Password = string(hashedPassword)
	users[user.Username] = user
	usersByID[user.ID] = user
	usersByEmail[user.Email] = user

	delete(passwordResetTokens, req.Token)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Password reset successfully",
	})
}

// Protected JWT endpoint
func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	tokenString := strings.Split(authHeader, " ")[1]

	claims := &Claims{}
	jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	user := usersByID[claims.UserID]

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "JWT protected endpoint",
		"user":    user,
	})
}

func MeHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	tokenString := strings.Split(authHeader, " ")[1]

	claims := &Claims{}
	jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	user := usersByID[claims.UserID]

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

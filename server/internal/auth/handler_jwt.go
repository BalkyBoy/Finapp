package auth

import (
	"encoding/json"
	"net/http"
	"strings"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) SignupHandler(w http.ResponseWriter, r *http.Request) {
	var req SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Username == "" {
	writeError(w, "username is required", http.StatusBadRequest)
	return
}
if req.Email == "" {
	writeError(w, "email is required", http.StatusBadRequest)
	return
}
if req.Password == "" {
	writeError(w, "password is required", http.StatusBadRequest)
	return
}
if req.PhoneNumber == "" {
	writeError(w, "phone number is required", http.StatusBadRequest)
	return
}

	if err := h.service.Signup(req); err != nil {
		switch err {
		case ErrEmailTaken:
			writeError(w, err.Error(), http.StatusConflict)
		case ErrUsernameTaken:
			writeError(w, err.Error(), http.StatusConflict)
		case ErrWeakPassword:
			writeError(w, err.Error(), http.StatusBadRequest)
		default:
			writeError(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	writeJSON(w, http.StatusCreated, MessageResponse{Message: "account created, please log in"})
}

func (h *Handler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" {
		writeError(w, "email and password are required", http.StatusBadRequest)
		return
	}

	token, user, err := h.service.Login(req)
	if err != nil {
		switch err {
		case ErrInvalidCredentials:
			writeError(w, err.Error(), http.StatusUnauthorized)
		default:
			writeError(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	writeJSON(w, http.StatusOK, AuthResponse{
		Token: token,
		User:  toUserResponse(user),
	})
}

func (h *Handler) AddPhoneHandler(w http.ResponseWriter, r *http.Request) {
	claims, err := extractClaims(r)
	if err != nil {
		writeError(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req AddPhoneRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Phone == "" {
		writeError(w, "phone is required", http.StatusBadRequest)
		return
	}

	if err := h.service.AddPhone(claims.UserID, req.Phone); err != nil {
		switch err {
		case ErrPhoneTaken:
			writeError(w, err.Error(), http.StatusConflict)
		default:
			writeError(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	writeJSON(w, http.StatusOK, MessageResponse{Message: "OTP sent to your phone"})
}

// POST /auth/resend  (requires JWT)
func (h *Handler) ResendOTPHandler(w http.ResponseWriter, r *http.Request) {
	claims, err := extractClaims(r)
	if err != nil {
		writeError(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req ResendOTPRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.service.ResendOTP(claims.UserID, req.Phone); err != nil {
		switch err {
		case ErrAlreadyVerified:
			writeError(w, err.Error(), http.StatusConflict)
		case ErrTooManyRequests:
			writeError(w, err.Error(), http.StatusTooManyRequests)
		case ErrResendLimit:
			writeError(w, err.Error(), http.StatusTooManyRequests)
		default:
			writeError(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	writeJSON(w, http.StatusOK, MessageResponse{Message: "OTP resent successfully"})
}

// POST /auth/verify  (requires JWT)
func (h *Handler) VerifyOTPHandler(w http.ResponseWriter, r *http.Request) {
	claims, err := extractClaims(r)
	if err != nil {
		writeError(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req VerifyOTPRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Phone == "" || req.Code == "" {
		writeError(w, "phone and code are required", http.StatusBadRequest)
		return
	}

	if err := h.service.VerifyOTP(claims.UserID, req.Phone, req.Code); err != nil {
		switch err {
		case ErrInvalidOTP:
			writeError(w, err.Error(), http.StatusUnauthorized)
		case ErrExpiredOTP:
			writeError(w, err.Error(), http.StatusUnauthorized)
		case ErrBlocked:
			writeError(w, err.Error(), http.StatusTooManyRequests)
		default:
			writeError(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	writeJSON(w, http.StatusOK, MessageResponse{Message: "phone verified successfully"})
}

// GET /auth/me  (requires JWT)
func (h *Handler) MeHandler(w http.ResponseWriter, r *http.Request) {
	claims, err := extractClaims(r)
	if err != nil {
		writeError(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	user, err := h.service.GetUser(claims.UserID)
	if err != nil {
		writeError(w, "user not found", http.StatusNotFound)
		return
	}

	writeJSON(w, http.StatusOK, toUserResponse(user))
}

// --- helpers ---

func extractClaims(r *http.Request) (*Claims, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
		return nil, ErrUnauthorized
	}
	tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
	return ValidateJWT(tokenStr)
}

func toUserResponse(u User) UserResponse {
	return UserResponse{
		ID:          u.ID,
		Username:    u.Username,
		Email:       u.Email,
		PhoneNumber: u.PhoneNumber,
		KYCStatus:   u.KYCStatus,
		IsVerified:  u.IsVerified,
	}
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, message string, status int) {
	writeJSON(w, status, ErrorResponse{Error: message})
}

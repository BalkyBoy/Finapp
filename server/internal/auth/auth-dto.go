package auth

type SignupRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	PhoneNumber string `json:"phone_number"`
}

type AddPhoneRequest struct {
	Phone string `json:"phone"`
}

type VerifyOTPRequest struct {
	Phone string `json:"phone"`
	Code  string `json:"code"`
}

type ResendOTPRequest struct {
	Phone string `json:"phone"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// --- Responses ---

type MessageResponse struct {
	Message string `json:"message"`
}

type AuthResponse struct {
	Token string       `json:"token"`
	User  UserResponse `json:"user"`
}

type UserResponse struct {
	ID          int    `json:"id"`
	Username    string `json:"username"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	KYCStatus   string `json:"kyc_status"`
	IsVerified  bool   `json:"is_verified"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

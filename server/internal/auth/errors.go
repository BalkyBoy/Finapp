package auth

import "errors"

var (
	ErrAlreadyVerified    = errors.New("otp already verified")
	ErrTooManyRequests    = errors.New("too many requests, try again later")
	ErrResendLimit        = errors.New("resend limit reached")
	ErrInvalidOTP         = errors.New("invalid otp")
	ErrExpiredOTP         = errors.New("otp expired")
	ErrBlocked            = errors.New("too many failed attempts, blocked")
	ErrEmailTaken         = errors.New("email already in use")
	ErrUsernameTaken      = errors.New("username already taken")
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrUserNotFound       = errors.New("user not found")
	ErrPhoneTaken         = errors.New("phone number already in use")
	ErrUnauthorized       = errors.New("unauthorized")
	ErrWeakPassword       = errors.New("password does not meet requirements")
)

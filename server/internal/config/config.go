package auth

import (
)

// JWT secrets
var (
	JWTSecret     = []byte("jwt-secret-key-change-in-production")
	RefreshSecret = []byte("refresh-secret-key-change-in-production")
)

// Session key
var SessionKey = []byte("super-secret-session-key-change-in-prod")


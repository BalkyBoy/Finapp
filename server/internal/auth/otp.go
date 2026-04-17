package auth

import (
	"crypto/sha256"
	"fmt"
	"math/rand"
)

func GenerateOTP() string {
	return fmt.Sprintf("%06d", rand.Intn(1000000))
}

func HashOTP(phone, otp string) string {
	sum := sha256.Sum256([]byte(phone + ":" + otp))
	return fmt.Sprintf("%x", sum)
}

package auth

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Signup(req SignupRequest) error {
	if err := validatePassword(req.Password); err != nil {
		return err
	}

	emailExists, err := s.repo.UserExistsByEmail(req.Email)
	if err != nil {
		return err
	}
	if emailExists {
		return ErrEmailTaken
	}

	usernameExists, err := s.repo.UserExistsByUsername(req.Username)
	if err != nil {
		return err
	}
	if usernameExists {
		return ErrUsernameTaken
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	return s.repo.CreateUser(req.Username, req.Email, string(hash))
}

func (s *Service) Login(req LoginRequest) (string, User, error) {
	user, err := s.repo.FindUserByEmail(req.Email)
	if err != nil {
		return "", User{}, ErrInvalidCredentials
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return "", User{}, ErrInvalidCredentials
	}

	token, err := GenerateJWT(user.ID, user.PhoneNumber)
	if err != nil {
		return "", User{}, err
	}

	return token, user, nil
}

func (s *Service) AddPhone(userID int, phone string) error {
	phoneExists, err := s.repo.PhoneExists(phone)
	if err != nil {
		return err
	}
	if phoneExists {
		return ErrPhoneTaken
	}

	if err := s.repo.UpdateUserPhone(userID, phone); err != nil {
		return err
	}

	otp := GenerateOTP()
	hash := HashOTP(phone, otp)

	if err := s.repo.SaveOTP(phone, hash); err != nil {
		return err
	}

	return SendSMS(phone, otp)
}

func (s *Service) ResendOTP(userID int, phone string) error {
	o, err := s.repo.GetLatestOTP(phone)
	if err != nil {
		return s.AddPhone(userID, phone)
	}

	if o.Verified {
		return ErrAlreadyVerified
	}

	if time.Since(o.LastSentAt) < 30*time.Second {
		return ErrTooManyRequests
	}

	if o.ResendCount >= 3 {
		return ErrResendLimit
	}

	otp := GenerateOTP()
	hash := HashOTP(phone, otp)

	o.ResendCount++
	o.LastSentAt = time.Now()
	o.OTPHash = hash

	if err := s.repo.UpdateOTP(o); err != nil {
		return err
	}

	return SendSMS(phone, otp)
}

func (s *Service) VerifyOTP(userID int, phone, code string) error {
	o, err := s.repo.GetLatestOTP(phone)
	if err != nil {
		return ErrInvalidOTP
	}

	if time.Now().After(o.ExpiresAt) {
		return ErrExpiredOTP
	}

	if HashOTP(phone, code) != o.OTPHash {
		o.Attempts++
		_ = s.repo.UpdateOTP(o)

		if o.Attempts >= 5 {
			return ErrBlocked
		}

		return ErrInvalidOTP
	}

	if err := s.repo.MarkOTPVerified(o.ID); err != nil {
		return err
	}

	user, err := s.repo.FindOrCreateUser(phone)
	if err != nil {
		return err
	}

	_, err = GenerateJWT(user.ID, user.PhoneNumber)
	return err
}

func (s *Service) GetUser(userID int) (User, error) {
	return s.repo.FindUserByID(userID)
}

package auth

import (
	"fmt"
	"os"

	"github.com/twilio/twilio-go"
	rest "github.com/twilio/twilio-go/rest/api/v2010"
)

func SendSMS(phone, otp string) error {
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: os.Getenv("TWILIO_ACCOUNT_SID"),
		Password: os.Getenv("TWILIO_AUTH_TOKEN"),
	})

	params := &rest.CreateMessageParams{}
	params.SetTo(phone)
	params.SetFrom(os.Getenv("TWILIO_PHONE_NUMBER"))
	params.SetBody(fmt.Sprintf("Your Owopor verification code is: %s. Valid for 5 minutes.", otp))

	_, err := client.Api.CreateMessage(params)
	if err != nil {
		return fmt.Errorf("failed to send OTP SMS: %w", err)
	}

	return nil
}

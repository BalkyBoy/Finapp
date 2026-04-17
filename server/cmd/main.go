package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/owopor/server/internal/auth"
	"github.com/owopor/server/internal/database"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")

	}

	db, err := database.NewDatabase()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Pool.Close()

	authRepo := auth.NewRepository(db.Pool)
	authService := auth.NewService(authRepo)
	authHandler := auth.NewHandler(authService)

	http.HandleFunc("/auth/signup", authHandler.SignupHandler)
	http.HandleFunc("/auth/login", authHandler.LoginHandler)
	http.HandleFunc("/auth/phone", authHandler.AddPhoneHandler)
	http.HandleFunc("/auth/resend", authHandler.ResendOTPHandler)
	http.HandleFunc("/auth/verify", authHandler.VerifyOTPHandler)
	http.HandleFunc("/auth/me", authHandler.MeHandler)

	log.Println("Starting server...")
	log.Fatal(http.ListenAndServe(":8080", nil))

}

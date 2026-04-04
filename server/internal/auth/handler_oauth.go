package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

func GoogleLoginHandler(w http.ResponseWriter, r *http.Request) {
	url := googleOAuthConfig.AuthCodeURL(oauthStateString)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func GoogleCallbackHandler(w http.ResponseWriter, r *http.Request) {
	state := r.FormValue("state")
	if state != oauthStateString {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	code := r.FormValue("code")
	token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "Failed to exchange token", http.StatusInternalServerError)
		return
	}

	client := googleOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var userInfo struct {
		ID    string `json:"id"`
		Email string `json:"email"`
		Name  string `json:"name"`
	}
	json.NewDecoder(resp.Body).Decode(&userInfo)

	user, exists := usersByEmail[userInfo.Email]
	if !exists {
		user = User{
			ID:            userIDCounter,
			Username:      strings.Split(userInfo.Email, "@")[0],
			Email:         userInfo.Email,
			OAuthID:       userInfo.ID,
			OAuthProvider: "google",
			CreatedAt:     time.Now(),
		}
		users[user.Username] = user
		usersByID[user.ID] = user
		usersByEmail[user.Email] = user
		userIDCounter++
	}

	expirationTime := time.Now().Add(15 * time.Minute)
	accessToken, _ := generateToken(user, expirationTime)
	refreshToken, _ := generateRefreshToken(user.ID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"user":          user,
	})
}

func GithubLoginHandler(w http.ResponseWriter, r *http.Request) {
	url := githubOAuthConfig.AuthCodeURL(oauthStateString)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func GithubCallbackHandler(w http.ResponseWriter, r *http.Request) {
	state := r.FormValue("state")
	if state != oauthStateString {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	code := r.FormValue("code")
	token, err := githubOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "Failed to exchange token", http.StatusInternalServerError)
		return
	}

	client := githubOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var userInfo struct {
		ID    int    `json:"id"`
		Login string `json:"login"`
		Email string `json:"email"`
	}
	json.NewDecoder(resp.Body).Decode(&userInfo)

	if userInfo.Email == "" {
		emailResp, err := client.Get("https://api.github.com/user/emails")
		if err != nil {
			http.Error(w, "Failed to get user emails", http.StatusInternalServerError)
			return
		}
		var emails []struct {
			Email   string `json:"email"`
			Primary bool   `json:"primary"`
		}
		json.NewDecoder(emailResp.Body).Decode(&emails)
		emailResp.Body.Close()

		for _, e := range emails {
			if e.Primary {
				userInfo.Email = e.Email
				break
			}
		}
	}

	user, exists := usersByEmail[userInfo.Email]
	if !exists {
		user = User{
			ID:            userIDCounter,
			Username:      userInfo.Login,
			Email:         userInfo.Email,
			OAuthID:       fmt.Sprintf("%d", userInfo.ID),
			OAuthProvider: "github",
			CreatedAt:     time.Now(),
		}
		users[user.Username] = user
		usersByID[user.ID] = user
		usersByEmail[user.Email] = user
		userIDCounter++
	}

	expirationTime := time.Now().Add(15 * time.Minute)
	accessToken, _ := generateToken(user, expirationTime)
	refreshToken, _ := generateRefreshToken(user.ID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"user":          user,
	})
}

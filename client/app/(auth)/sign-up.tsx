import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "@/components/Checkbox";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "856764674333-uu5f6no67581v7ih668s3skrp7mf4qdm.apps.googleusercontent.com",
    iosClientId: "1:94539031347:ios:067705d917574ffc7e5446",
    androidClientId: "1:94539031347:android:a5f262140db335907e5446",
    webClientId: "1:94539031347:web:5f7741a2d53fec5f7e5446",
  });
  // useEffect(() => {
  //     const loginWithGoogle = async () => {
  //         if (response?.type === 'success'){
  //             const {id_token} = response.params;

  //             const credential = GoogleAuthProvider.credential(id_token);
  //             const userCredential = await signInWithCredential(auth, credential);

  //             const firebaseToken = await userCredential.user.getIdToken();

  //             const res = await fetch('http://192.168.197.67:3000/auth/firebase',{
  //                 method:'POST',
  //                 headers: {'Content-Type': 'application/json'},
  //                 body:JSON.stringify({token: firebaseToken}),
  //             });

  //             const data = await res.json();
  //             requestAnimationFrame(()=> {

  //             if (res.ok) {
  //                 if (data.requireOtp) {
  //                     router.replace('/(auth)/verification');
  //                 } else {
  //                     router.push('/(tabs)/Dashboard');
  //                 }
  //             } else {
  //                 alert(data.message || 'Google login failed')
  //             }
  //             })
  //         }
  //     };
  //     loginWithGoogle();
  // }, [response]);

  const handleSubmit = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://192.168.197.67:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });
      if (response.ok) {
        router.push("/(auth)/verification");
      } else {
        const error = await response.json();
        alert(error.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#ffff",
        }}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#EDEDED",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <Image source={require("@/assets/images/Left.png")} />
            </TouchableOpacity>

            <View>
              <Text
                style={{
                  fontFamily: "ReadexBold",
                  fontSize: 20,
                  marginBottom: 8,
                }}
              >
                Sign Up
              </Text>
              <View
                style={{
                  marginBottom: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: "ReadexRegular",
                    fontSize: 14,
                    color: "#707070",
                  }}
                >
                  It only takes a minute to create{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "ReadexRegular",
                    fontSize: 14,
                    color: "#707070",
                  }}
                >
                  your account.
                </Text>
              </View>
            </View>
            <View
              style={{
                marginBottom: 16,
                position: "relative",
              }}
            >
              <TextInput
                style={{
                  height: 56,
                  borderWidth: 1,
                  borderColor: "#EDEDED",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  fontSize: 14,
                  fontFamily: "ReadexRegular",
                  color: "#707070",
                }}
                placeholder="Enter your Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor={"#000"}
              />
            </View>
            <View
              style={{
                marginBottom: 16,
                position: "relative",
              }}
            >
              <TextInput
                style={{
                  height: 56,
                  borderWidth: 1,
                  borderColor: "#EDEDED",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  fontSize: 14,
                  fontFamily: "ReadexRegular",
                  color: "#707070",
                }}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={"#000"}
              />
            </View>
            <View
              style={{
                marginBottom: 16,
                position: "relative",
              }}
            >
              <TextInput
                style={{
                  height: 56,
                  borderWidth: 1,
                  borderColor: "#EDEDED",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  fontSize: 14,
                  fontFamily: "ReadexRegular",
                  color: "#707070",
                }}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor={"#000"}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 16,
                  top: 16,
                }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color={"#5C8943"}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 24,
                marginTop: 8,
              }}
            >
              <Checkbox
                checked={agreeToTerms}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              />
              <Text
                style={{
                  flex: 1,
                  marginLeft: 8,
                  fontFamily: "ReadexRegular",
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 20,
                }}
              >
                I agree to the Owopor{""}
                <Text
                  style={{
                    fontFamily: "ReadexRegular",
                    fontSize: 14,
                    color: "#5C8943",
                    textDecorationLine: "underline",
                  }}
                >
                  {" "}
                  Terms of Services
                </Text>
                {""} and {""}
                <Text
                  style={{
                    fontFamily: "ReadexRegular",
                    fontSize: 14,
                    color: "#5C8943",
                    textDecorationLine: "underline",
                  }}
                >
                  Policy
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#CAA362",
                height: 56,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
              onPress={() => router.push("/(auth)/verification")}
            >
              <Text
                style={{
                  fontFamily: "ReadexSemiBold",
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#ddd",
                }}
              />
              <Text
                style={{
                  fontFamily: "ReadexLight",
                  paddingHorizontal: 16,
                  color: "#8E9BAE",
                }}
              >
                OR
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#ddd",
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => promptAsync()}
              style={{
                flexDirection: "row",
                height: 56,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Image
                source={require("@/assets/images/google.png")}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  fontFamily: "ReadexSemiBold",
                  color: "#222222",
                  fontSize: 14,
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "ReadexBold",
                  fontSize: 14,
                  color: "#707070",
                }}
              >
                Already Registered?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text
                  style={{
                    fontFamily: "ReadexBold",
                    fontSize: 14,
                    color: "#5C8943",
                  }}
                >
                  {" "}
                  Login In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

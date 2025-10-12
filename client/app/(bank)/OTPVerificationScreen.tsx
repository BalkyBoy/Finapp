import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value:string, index: number) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputFocus = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const handleResendCode = () => {
    if (canResend) {
      setTimer(59);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setActiveIndex(0);
      inputRefs.current[0]?.focus();
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      console.log('Verifying OTP:', otpCode);
      Alert.alert('Success', 'Account verified successfully!');
    } else {
      Alert.alert('Error', 'Please enter the complete 6-digit code.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={{
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F8F9FA',
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#333',
        }}>
          Link Up Bank Account
        </Text>
      </View>

      {/* Content */}
      <View style={{
        flex: 1,
        paddingHorizontal: 20,
      }}>
        {/* Bank Logo */}
        <View style={{
          alignItems: 'center',
          paddingTop: 40,
          paddingBottom: 30,
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#E5E5E5',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* Mastercard Logo */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#E91E63',
                marginRight: -6,
              }} />
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#4CAF50',
              }} />
            </View>
          </View>
        </View>

        {/* Title Section */}
        <View style={{
          paddingBottom: 50,
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            marginBottom: 16,
          }}>
            Verify Your Account
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            lineHeight: 24,
            textAlign: 'center',
          }}>
            To verify your account, enter the 6 digit OTP code that we sent to your email.
          </Text>
        </View>

        {/* OTP Input */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 30,
        }}>
          {otp.map((digit, index) => (
            <View
              key={index}
              style={{
                width: 50,
                height: 60,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: activeIndex === index ? '#FF6B35' : '#E5E5E5',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: digit ? '#333' : '#999',
                  textAlign: 'center',
                  width: '100%',
                  height: '100%',
                }}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleInputFocus(index)}
                keyboardType="numeric"
                maxLength={1}
                placeholderTextColor="#999"
              />
            </View>
          ))}
        </View>

        {/* Timer */}
        <View style={{
          alignItems: 'center',
          marginBottom: 30,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#FF6B35',
          }}>
            {formatTime(timer)}
          </Text>
        </View>

        {/* Resend Section */}
        <View style={{
          alignItems: 'center',
          marginBottom: 50,
        }}>
          <Text style={{
            fontSize: 16,
            color: '#666',
            marginBottom: 20,
          }}>
            Didn't get the email?
          </Text>
          
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={!canResend}
            style={{
              paddingVertical: 18,
              width:'100%',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E5E5',
              opacity: canResend ? 1 : 0.6,
              alignItems:'center'
            }}
          >
            <Text style={{
              fontSize: 16,
              color: '#333',
              fontWeight: '500',
            }}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Verify Button */}
        <View style={{
          paddingBottom: 40,
        }}>
          <TouchableOpacity
            onPress={handleVerify}
            style={{
              backgroundColor: '#CAA362',
              paddingVertical: 18,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'white',
            }}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const Card = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleBack = () => {
    console.log('Back pressed');
  };

  const handleConfirm = () => {
    console.log('Confirm pressed', {
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
    });
    // router.push('/(bank)/OTPVerificationScreen')
  };

  const formatCardNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 6);
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    const formatted = formatCardNumber(text);
    if (formatted.length <= 19) { // 16 digits + 3 spaces
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (text: string) => {
    const formatted = formatExpiryDate(text);
    if (formatted.length <= 7) { // MM/YYYY
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setCvv(cleaned);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: '#F8F9FA',
        }}>
          <TouchableOpacity 
            onPress={handleBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: '#E5E5E5',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#333',
            flex: 1,
            textAlign: 'center',
            marginRight: 55, // Compensate for back button width
          }}>
            Link Up Bank Account
          </Text>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
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
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: 16,
            }}>
              Confirm your bank
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 24,
              textAlign: 'center',
            }}>
              For the security of your account, please confirm the data from the bank you will connect
            </Text>
          </View>

          {/* Form */}
          <View style={{
            paddingHorizontal: 20,
            flex: 1,
          }}>
            {/* Card Holder Name */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{
                fontSize: 16,
                color: '#666',
                marginBottom: 8,
                fontWeight: '500',
              }}>
                Card Holder Name
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 18,
                  fontSize: 16,
                  color: '#333',
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                }}
                placeholder="Enter card holder name"
                placeholderTextColor="#999"
                value={cardHolderName}
                onChangeText={setCardHolderName}
                autoCapitalize="words"
              />
            </View>

            {/* Card Number */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{
                fontSize: 16,
                color: '#666',
                marginBottom: 8,
                fontWeight: '500',
              }}>
                Card Number
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 18,
                  fontSize: 16,
                  color: '#333',
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                }}
                placeholder="1234 5678 9012"
                placeholderTextColor="#999"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            {/* Expiry Date and CVV Row */}
            <View style={{
              flexDirection: 'row',
              marginBottom: 40,
            }}>
              {/* Expiry Date */}
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{
                  fontSize: 16,
                  color: '#666',
                  marginBottom: 8,
                  fontWeight: '500',
                }}>
                  Expired Date
                </Text>
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <TextInput
                    style={{
                      flex: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 18,
                      fontSize: 16,
                      color: '#333',
                    }}
                    placeholder="MM/YYYY"
                    placeholderTextColor="#999"
                    value={expiryDate}
                    onChangeText={handleExpiryDateChange}
                    keyboardType="numeric"
                    maxLength={7}
                  />
                  <View style={{
                    paddingRight: 20,
                  }}>
                    <Ionicons name="calendar-outline" size={20} color="#999" />
                  </View>
                </View>
              </View>

              {/* CVV */}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{
                  fontSize: 16,
                  color: '#666',
                  marginBottom: 8,
                  fontWeight: '500',
                }}>
                  CVV
                </Text>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    paddingHorizontal: 20,
                    paddingVertical: 18,
                    fontSize: 16,
                    color: '#333',
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                  }}
                  placeholder="000"
                  placeholderTextColor="#999"
                  value={cvv}
                  onChangeText={handleCvvChange}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View style={{
          paddingHorizontal: 20,
          paddingBottom: 40,
          backgroundColor: '#F8F9FA',
        }}>
          <TouchableOpacity
            onPress={() =>  router.push('/(bank)/OTPVerificationScreen')}
            style={{
              backgroundColor: '#D4AF37',
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
              Confirm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Home Indicator */}
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Card;
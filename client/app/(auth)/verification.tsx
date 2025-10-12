import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Verification = () => {
    const [phoneNumber, setPhoneNumber] = useState('703 2358 4815');
    const [countryCode, setCountryCode] = useState('+234');
  
  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <TouchableOpacity 
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>
  
          <View style={{ paddingHorizontal: 24, paddingTop: 40 }}>
            <Text style={{
              fontSize: 20,
              fontFamily:'ReadexBold',
              marginBottom: 8,
              color: '#333',
            }}>
              Verify your Phone Number
            </Text>
            
            <Text style={{
              fontSize: 14,
              color: '#707070',
              marginBottom: 30,
              fontFamily:'ReadexRegular'
            }}>
              Enter your phone number so we can send you the verification code.
            </Text>
  
            <View style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              height: 56,
              marginBottom: 16,
              alignItems: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                borderRightWidth: 1,
                borderRightColor: '#ddd',
                height: '100%',
              }}>
                <Text style={{ color: '#4CAF50', fontWeight: '500' }}>{countryCode}</Text>
                <Ionicons name="chevron-down" size={16} color="#4CAF50" style={{ marginLeft: 4 }} />
              </View>
              
              <TextInput
                style={{
                  flex: 1,
                  height: '100%',
                  paddingHorizontal: 16,
                  fontSize: 16,
                }}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="Phone Number"
              />
            </View>
  
            <View style={{ flex: 1 }} />
  
            <TouchableOpacity 
              style={{
                backgroundColor: '#D4AF37',
                height: 56,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 24,
                top:400,
              }}
              onPress={()=> router.push('/(auth)/otp')}
            >
              <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
              }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
  )
}

export default Verification
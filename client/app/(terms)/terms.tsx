import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const terms = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EDEDED' }}>
      <View style={{ padding: 16 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          padding: 16
        }}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#EDEDED',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => router.back()}
          >
            <Image source={require('@/assets/images/Left.png')} />
          </TouchableOpacity>
        </View>

        <Text style={{
          fontFamily: 'ReadexBold',
          fontSize: 24,
          marginBottom: 20,
          textAlign: 'center'
        }}>
          Terms & Conditions
        </Text>

        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <Text style={{
            fontFamily: 'ReadexRegular',
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
            color: '#333'
          }}>
            By using this app, you agree to the following terms and conditions:
          </Text>

          <Text style={{
            fontFamily: 'ReadexSemiBold',
            fontSize: 16,
            marginBottom: 8,
            color: '#222'
          }}>
            1. Acceptance of Terms
          </Text>
          <Text style={{
            fontFamily: 'ReadexRegular',
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
            color: '#333'
          }}>
            By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>

          <Text style={{
            fontFamily: 'ReadexSemiBold',
            fontSize: 16,
            marginBottom: 8,
            color: '#222'
          }}>
            2. Privacy Policy
          </Text>
          <Text style={{
            fontFamily: 'ReadexRegular',
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
            color: '#333'
          }}>
            Your privacy is important to us. We collect and use your information in accordance with our Privacy Policy.
          </Text>

          <Text style={{
            fontFamily: 'ReadexSemiBold',
            fontSize: 16,
            marginBottom: 8,
            color: '#222'
          }}>
            3. User Responsibilities
          </Text>
          <Text style={{
            fontFamily: 'ReadexRegular',
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
            color: '#333'
          }}>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={{
            height: 56,
            backgroundColor: '#5C8943',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16
          }}
          onPress={() => router.back()}
        >
          <Text style={{
            fontFamily: 'ReadexSemiBold',
            color: '#fff',
            fontSize: 16
          }}>
            I Agree
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default terms
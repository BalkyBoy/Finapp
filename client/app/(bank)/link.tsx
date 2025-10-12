import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Link = () => {
  const handleContinue = () => {
    // Handle continue action
    console.log('Continue pressed');
  };

  const handleSkip = () => {
    // Handle skip action
    console.log('Skip pressed');
  };

  const handleBack = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      
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
            marginRight: 15,
            padding: 5,
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#333',
          flex: 1,
          textAlign: 'center',
          marginRight: 44, // Compensate for back button width
        }}>
          Link Up Bank Account
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration Container */}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
            <Image source={require('@/assets/images/Illustration2.png')}/>
          </View>
          <View>

          {/* Title */}
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            marginBottom: 16,
          }}>
            Link Your Bank Account
          </Text>

          {/* Description */}
          <Text style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            lineHeight: 24,
            paddingHorizontal: 20,
            marginBottom: 60,
          }}>
            We will securely connect you with our linking partner
          </Text>
        </View>

        {/* Buttons */}
        <View style={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}>
          {/* Continue Button */}
          <TouchableOpacity
            onPress={()=> router.push('/(bank)/acount')}
            style={{
              backgroundColor: '#D4AF37',
              paddingVertical: 18,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 20,
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
              Continue
            </Text>
          </TouchableOpacity>

          {/* Skip Button */}
          <TouchableOpacity
            onPress={handleSkip}
            style={{
              borderWidth:1,
              borderColor:"#E7E7E7",
              paddingVertical: 18,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{
              fontSize: 16,
              color: '#666',
              fontWeight: '500',
            }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Home Indicator */}
     
    </SafeAreaView>
  );
};

export default Link;
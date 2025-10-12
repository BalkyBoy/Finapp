import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const VerificationSuccessScreen = () => {
  const handleBack = () => {
    console.log('Going back...');
  };

  const handleDoLater = () => {
    console.log('Do it later...');
    router.push('/(assesment)/stepThree')
  };

  const handleConnectCard = () => {
    router.push('/(bank)/link')
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar barStyle="light-content" backgroundColor="#F2C94C" />
      
      {/* Header Section */}
      <View style={{
        backgroundColor: '#F2C94C',
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 30,
      }}>
        {/* Header with back button */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <TouchableOpacity 
            onPress={handleBack}
            style={{ marginRight: 16 }}
          >
            <Text style={{
              fontSize: 24,
              color: '#FFFFFF',
              fontWeight: '300',
            }}>
              ‹
            </Text>
          </TouchableOpacity>
          <Text style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#FFFFFF',
          }}>
            Verify personal data
          </Text>
        </View>

        {/* Progress Indicator */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          {/* Step 1 - Completed */}
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
            }}>
              1
            </Text>
          </View>
          
          <View style={{
            width: 60,
            height: 2,
            backgroundColor: '#FFFFFF',
            marginHorizontal: 8,
          }} />
          
          {/* Step 2 - Active */}
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#F2C94C',
            }}>
              2
            </Text>
          </View>
          
          <View style={{
            width: 60,
            height: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            marginHorizontal: 8,
          }} />
          
          {/* Step 3 - Inactive */}
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
            }}>
              3
            </Text>
          </View>
        </View>

        {/* Step Labels */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
          <Text style={{
            fontSize: 14,
            color: '#FFFFFF',
            opacity: 0.6,
          }}>
            Photo ID card
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#FFFFFF',
            opacity: 0.9,
          }}>
            Confirmation
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#FFFFFF',
            opacity: 0.6,
          }}>
            Verify
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
        alignItems: 'center',
      }}>
        {/* Success Icon */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: '#E8F4FD',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
          position: 'relative',
        }}>
          {/* Document Icon */}
          <View style={{
            width: 50,
            height: 60,
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}>
            {/* Document lines */}
            <View style={{
              width: 30,
              height: 3,
              backgroundColor: '#E5E7EB',
              marginBottom: 4,
            }} />
            <View style={{
              width: 25,
              height: 3,
              backgroundColor: '#E5E7EB',
              marginBottom: 4,
            }} />
            <View style={{
              width: 30,
              height: 3,
              backgroundColor: '#E5E7EB',
            }} />
          </View>
          
          {/* Checkmark */}
          <View style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#10B981',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}>
              ✓
            </Text>
          </View>
        </View>

        {/* Success Message */}
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#1F2937',
          textAlign: 'center',
          marginBottom: 16,
        }}>
          Your Account{'\n'}Successfully Verified
        </Text>

        <Text style={{
          fontSize: 16,
          color: '#9CA3AF',
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 60,
          paddingHorizontal: 20,
        }}>
          Congratulations! Your ID verification was successful and now you can fully access our services.
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={{
        paddingHorizontal: 24,
        paddingBottom: 40,
      }}>
        {/* Do it Later Button */}
        <TouchableOpacity 
          style={{
            borderWidth: 2,
            borderColor: '#D4A760',
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 16,
          }}
          onPress={handleDoLater}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#D4A760',
          }}>
            Do it Later
          </Text>
        </TouchableOpacity>

        {/* Connect Card Button */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#D4A760',
            borderRadius: 8,
            paddingVertical: 18,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={handleConnectCard}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
          }}>
            Connect Your Card
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationSuccessScreen;
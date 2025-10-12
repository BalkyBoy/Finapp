import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const Verify = () => {
  const [cameraActive, setCameraActive] = useState(false);

  const handleBack = () => {
    // Handle back navigation
    console.log('Going back...');
  };

  const handleActivateCamera = () => {
    // Handle camera activation
    setCameraActive(true);
    console.log('Activating camera...');
  };

  const handleSave = () => {
    if (!cameraActive) {
      Alert.alert('Camera Required', 'Please activate the camera first to take a photo of your ID card.');
      return;
    }
    // Handle save/capture logic
    console.log('Saving document photo...');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar hidden />
      
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
            style={{
              marginRight: 16,
            }}
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
          {/* Step 1 - Active */}
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
              1
            </Text>
          </View>
          
          {/* Line 1 */}
          <View style={{
            width: 60,
            height: 2,
            backgroundColor: '#FFFFFF',
            marginHorizontal: 8,
          }} />
          
          {/* Step 2 - Inactive */}
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
              2
            </Text>
          </View>
          
          {/* Line 2 */}
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

        {/* Step Label */}
        <Text style={{
          fontSize: 16,
          color: '#FFFFFF',
          textAlign: 'center',
          opacity: 0.9,
        }}>
          Photo ID card
        </Text>
      </View>

      {/* Main Content */}
      <View style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        alignItems: 'center',
      }}>
        {/* Camera Preview Area */}
        <View style={{
          width: '100%',
          height: 400,
          backgroundColor: '#E8F4FD',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          borderWidth: 2,
          borderColor: '#D1E7F5',
          borderStyle: 'dashed',
        }}>
          {/* Camera Icon */}
          <View style={{
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
            {/* Camera icon with slash */}
            <View style={{
              width: 60,
              height: 45,
              borderWidth: 3,
              borderColor: '#2563EB',
              borderRadius: 8,
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Camera lens */}
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#2563EB',
              }} />
              
              {/* Camera top */}
              <View style={{
                position: 'absolute',
                top: -8,
                left: 15,
                width: 12,
                height: 6,
                backgroundColor: '#2563EB',
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              }} />
            </View>
            
            {/* Slash line */}
            <View style={{
              position: 'absolute',
              width: 80,
              height: 3,
              backgroundColor: '#2563EB',
              transform: [{ rotate: '45deg' }],
            }} />
          </View>

          {/* Instruction Text */}
          <Text style={{
            fontSize: 16,
            color: '#2563EB',
            textAlign: 'center',
            fontWeight: '500',
          }}>
            position the cards according to{'\n'}the frame
          </Text>
        </View>

        {/* Activate Camera Button */}
        <TouchableOpacity 
          onPress={()=> router.push('/(bank)/link')}
          style={{
            marginBottom: 40,
            borderColor:'#D1E7F5',
            borderWidth:1,
            backgroundColor:'#E8F4FD',
            paddingVertical:18,
            width:'100%',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:8,
          }}
        >
          <Text style={{
            fontSize: 18,
            color: '#2563EB',
            fontWeight: '600',
          }}>
            Activate the camera
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={{
        paddingHorizontal: 24,
        paddingBottom: 40,
      }}>
        {/* Save Button */}
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
          onPress={()=> router.push('/(kyc)/Success')}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
          }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verify;
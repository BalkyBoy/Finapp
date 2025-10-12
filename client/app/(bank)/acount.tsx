import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const Account = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const bankOptions = [
    {
      id: 1,
      name: 'Local Bank 1',
      email: 'steve.young@gmail.com',
      logo: 'diamond',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA726'],
    },
    {
      id: 2,
      name: 'Local Bank 2',
      email: 'steve.young@gmail.com',
      logo: 'diamond',
      colors: ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5'],
    },
    {
      id: 3,
      name: 'Masters Card',
      email: 'steve.young@gmail.com',
      logo: 'mastercard',
      colors: ['#FF5722', '#4CAF50'],
    },
    {
      id: 4,
      name: 'Visas',
      email: 'steve.young@gmail.com',
      logo: 'visa',
      colors: ['#1565C0'],
    },
  ];

  const filteredBanks = bankOptions.filter(bank =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    console.log('Back pressed');
  };

  const handleBankSelect = (bank: { id?: number; name: any; email?: string; logo?: string; colors?: string[]; }) => {
    console.log('Selected bank:', bank.name);
    router.push('/(bank)/card')
  };

  const handleSkip = () => {
    console.log('Skip pressed');
  };

  const renderBankLogo = (bank: { id?: number; name?: string; email?: string; logo: any; colors: any; }) => {
    if (bank.logo === 'diamond') {
      return (
        <View style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: 20,
            height: 20,
            transform: [{ rotate: '45deg' }],
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {bank.colors.map((color: any, index: React.Key | null | undefined) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: color,
                }}
              />
            ))}
          </View>
        </View>
      );
    } else if (bank.logo === 'mastercard') {
      return (
        <View style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#FF5722',
            marginRight: -5,
          }} />
          <View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#4CAF50',
          }} />
        </View>
      );
    } else if (bank.logo === 'visa') {
      return (
        <View style={{
          width: 40,
          height: 40,
          backgroundColor: '#1565C0',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
          }}>
            VISAS
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
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
      >
        {/* Title Section */}
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 30,
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 16,
            textAlign:'center'
          }}>
            Link new bank account
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#666',
            lineHeight: 24,
            textAlign: 'center',
          }}>
            Please search your bank account or institution in order to proceed
          </Text>
        </View>

        {/* Search Bar */}
        <View style={{
          paddingHorizontal: 20,
          marginBottom: 30,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}>
            <Ionicons 
              name="search" 
              size={20} 
              color="#999" 
              style={{ marginRight: 15 }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: '#333',
              }}
              placeholder="Search bank or institution"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Bank List */}
        <View style={{
          paddingHorizontal: 20,
        }}>
          {filteredBanks.map((bank, index) => (
            <TouchableOpacity
              key={bank.id}
              onPress={() => handleBankSelect(bank)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginBottom: 12,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              {/* Bank Logo */}
              <View style={{ marginRight: 15 }}>
                {renderBankLogo(bank)}
              </View>

              {/* Bank Info */}
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: 4,
                }}>
                  {bank.name}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666',
                }}>
                  {bank.email}
                </Text>
              </View>

              {/* Arrow Icon */}
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Ionicons name="refresh" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Skip Button */}
      <View style={{
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: '#F8F9FA',
      }}>
        <TouchableOpacity
          onPress={handleSkip}
          style={{
            paddingVertical: 18,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 1,
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
    </SafeAreaView>
  );
};

export default Account;
import { View, Text, TouchableOpacity, ScrollView,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const Menu = () => {
  return (
   <View style={{flex:1, backgroundColor:'#fff'}}>
    <StatusBar hidden/>
    <View style={{ 
        backgroundColor: '#E9C46A', 
        paddingTop: 40,
        paddingBottom: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
        {/* Profile Picture */}
        <View style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 40, 
          backgroundColor: '#fff',
          marginBottom: 10,
          marginTop:15
        }} />
        
        {/* Name */}
        <Text style={{ 
          color: '#fff', 
          fontSize: 20, 
          fontWeight: '600',
          marginBottom: 15,
          fontFamily:'ReadexBold'
        }}>
          Deji Morgan
        </Text>
        
        {/* Edit Profile Button */}
        <TouchableOpacity style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingVertical: 8,
          paddingHorizontal: 20,
          borderRadius: 20
        }}>
          <Image source={require('@/assets/images/editprofile.png')} style={{ marginRight: 8 }}/>
          <Text style={{ color: '#333', fontWeight: '500' }}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Account Settings Section */}
        <View style={{ paddingTop: 20 }}>
          <Text style={{ 
            paddingHorizontal: 20,
            fontSize: 12,
            fontWeight: '600',
            color: '#666',
            marginBottom: 10,
            letterSpacing: 1,
            fontFamily:'ReadexBold'
          }}>
            ACCOUNT SETTINGS
          </Text>

          {/* Payment Options */}
          <TouchableOpacity style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{width:40, height:40, borderRadius:8,borderColor:'#ECEDF2',alignItems:'center',marginRight: 15,justifyContent:'center',borderWidth:1}}>
              <Feather name="credit-card" size={22} color="#333" style={{ }} />
              </View>
              <Text style={{ fontSize: 16, color: '#333', fontFamily:'ReadexSemiBold' }}>Payment options</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#22242F" />
          </TouchableOpacity>

          {/* Face ID & Fingerprint */}
          <TouchableOpacity style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{width:40, height:40, borderRadius:8,borderColor:'#ECEDF2',alignItems:'center',marginRight: 15,justifyContent:'center',borderWidth:1}}>
              <Ionicons name="finger-print-outline" size={22} color="#333" style={{ }} />
              </View>
              <Text style={{ fontSize: 16, color: '#333', fontFamily:'ReadexSemiBold'}}>Face ID & Fingerprint</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#22242F" />
          </TouchableOpacity>

          {/* Personal Information */}
          <TouchableOpacity 
          onPress={()=> router.push('/(kyc)/Flow')}
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{width:40, height:40, borderRadius:8,borderColor:'#ECEDF2',alignItems:'center',marginRight: 15,justifyContent:'center',borderWidth:1}}>
              <Feather name="shield" size={22} color="#333" style={{  }} />
              </View>
              <Text style={{ fontSize: 16, color: '#333',fontFamily:'ReadexSemiBold' }}>Personal information</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#22242F" />
          </TouchableOpacity>
        </View>

        {/* Earning Dashboard Section */}
        <View style={{ paddingTop: 20 }}>
          <Text style={{ 
            paddingHorizontal: 20,
            fontSize: 12,
            fontWeight: '600',
            color: '#666',
            marginBottom: 10,
            letterSpacing: 1,
             fontFamily:'ReadexBold'
          }}>
            EARNING DASHBOARD
          </Text>

          {/* My Investments */}
          <TouchableOpacity style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{width:40, height:40, borderRadius:8,borderColor:'#ECEDF2',alignItems:'center',marginRight: 15,justifyContent:'center',borderWidth:1}}>
              <Feather name="mail" size={22} color="#333" style={{  }} />
              </View>
              <Text style={{ fontSize: 16, color: '#333',fontFamily:'ReadexSemiBold' }}>My Investments</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#22242F" />
          </TouchableOpacity>

          {/* Privacy & Policy */}
          <TouchableOpacity style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{width:40, height:40, borderRadius:8,borderColor:'#ECEDF2',alignItems:'center',marginRight: 15,justifyContent:'center',borderWidth:1}}>
              <Feather name="shield" size={22} color="#333" style={{}} />
              </View>
              <Text style={{ fontSize: 16, color: '#333',fontFamily:'ReadexSemiBold' }}>Privacy & policy</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#22242F" />
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{width:40, height:40, borderRadius:8,borderColor:'#ECEDF2',alignItems:'center',marginRight: 15,justifyContent:'center',borderWidth:1}}>
              <Feather name="log-out" size={22} color="#FF3B30" style={{}} />
              </View>
              <Text style={{ fontSize: 16, color: '#FF3B30',fontFamily:'ReadexSemiBold' }}>Log Out</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#22242F" />
          </TouchableOpacity>
        </View>
      </ScrollView>
   </View>
  )
}

export default Menu
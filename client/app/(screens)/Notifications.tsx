import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const Notifications = () => {
     const notifications = [
    {
      type: 'Referral',
      title: 'Referral Bonus for you',
      date: 'June 11, 2024',
      time: '10:00 AM',
      amount: '₦2000'
    },
    {
      type: 'Transfer',
      title: 'Cash Received',
      date: 'June 12, 2024',
      time: '05:45 AM',
      amount: '₦15000'
    },
    {
      type: 'Refund',
      title: 'Payment cancelled',
      date: 'June 11, 2024',
      time: '04:00 AM',
      amount: '₦5000'
    },
    {
      type: 'Refund',
      title: 'Payment cancelled',
      date: 'June 11, 2024',
      time: '04:00 AM',
      amount: '₦5000'
    }
  ];
  return (
   <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
     <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={{ 
          fontSize: 20, 
          fontWeight: '600', 
          color: '#333',
          textAlign: 'center'
        }}>
          Notifications
        </Text>
        
        <TouchableOpacity>
          <Feather name="more-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>
       <ScrollView style={{}}>
        {/* This Week Section */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#666',
            marginBottom: 20
          }}>
            This Week
          </Text>

          {/* Notifications List */}
          {notifications.map((notification, index) => (
            <View key={index}>
              <View style={{ 
                flexDirection: 'row', 
                paddingVertical: 15,
                alignItems: 'center'
              }}>
                {/* Icon Placeholder */}
                <View style={{ 
                  width: 50, 
                  height: 50, 
                  backgroundColor: '#F0F0F0', 
                  borderRadius: 10,
                  marginRight: 15
                }} />
                
                {/* Notification Content */}
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#666',
                    marginBottom: 4
                  }}>
                    {notification.type}
                  </Text>
                  
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: 4
                  }}>
                    {notification.title}
                  </Text>
                  
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#666'
                  }}>
                    {notification.date} • {notification.time}
                  </Text>
                </View>
                
                {/* Amount */}
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {notification.amount}
                </Text>
              </View>
              
              {/* Divider (except for last item) */}
              {index < notifications.length - 1 && (
                <View style={{ 
                  height: 1, 
                  backgroundColor: '#EEEEEE'
                }} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      
   </SafeAreaView>
  )
}

export default Notifications
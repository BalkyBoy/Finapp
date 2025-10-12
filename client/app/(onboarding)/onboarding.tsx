import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper';
import React from 'react'
import Onboarding1 from './onboarding1';
import Onboarding2 from './onboarding2';
import Onboarding3 from './onboarding3';

const onboarding = () => {
  return (
    
    <View
    
    style={{
        flex:1,
        backgroundColor:'white',
        height:'100%'
      }}
    >
   <StatusBar hidden/>
    <Swiper
    loop={false}
    paginationStyle={{ bottom:170 }}
    activeDotColor='green'
    >
     <Onboarding1/>
     <Onboarding2/>
     <Onboarding3/>  
 
  </Swiper>
  </View>
  )
}

export default onboarding
import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Onboarding3 = () => {
  return (
    <View
         style={{
            flex:1,
            height:'100%',
            backgroundColor:'#fff'
         }}
         >
           <View
           style={{
               width:'100%'
           }}
           >
               <Image source={require('@/assets/images/onboarding3.png')}
               style={{
                   width:'100%'
               }}
               />
               
           </View>
           <View 
           style={{
               justifyContent:'center',
               alignItems:'center',
               padding:16,
               flex:1,
               alignSelf:'center',
           }}
           >
               <Text
               style={{
                fontFamily:'ReadexBold',
                fontSize:20,
               }}
               >Gift Investment </Text>
               <Text
               style={{
                fontFamily:"ReadexLight",
                fontSize:15,
                textAlign:'center',
                color:'#707070',
                marginTop:20,
               }}
               >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
           </View>
           <View
        style={{
            flexDirection:'row',
            padding:16,
            width:'100%',
            alignItems:'center',
            justifyContent:'space-between',
            marginBottom:20,
        }}
        >
            <TouchableOpacity 
            style={{
                width:160,
                height:56,
                borderWidth:1,
                borderColor:'green',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:5,
            }}
            onPress={()=> router.push('/(auth)/login')}
            >
                <Text
                style={{
                    fontFamily:'ReadexSemiBold',
                    color:'#5C8943',
                    fontSize:14,
                }}
                >Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
                width:160,
                height:56,
                borderRadius:5,
                borderColor:'5C8943',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#CAA362',
                flexDirection:'row',
                gap:4,
            }}
            onPress={()=> router.push('/(auth)/sign-up')}
            >
                <Text
                style={{
                    fontFamily:'ReadexSemiBold',
                    color:'white',
                    fontSize:14,
                }}
                >Sign Up</Text>
                <Image source={require('@/assets/images/arrow-right.png')}/>
            </TouchableOpacity>
        </View>
         </View>
  )
}

export default Onboarding3
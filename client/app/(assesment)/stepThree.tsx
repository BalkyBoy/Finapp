import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from '@/components/ProgressBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import QuestionHeader from '@/components/QuestionHeader'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const stepThree = () => {
  const [description, setDescription] = useState('')
  return (
    <SafeAreaView style={{
      backgroundColor:'#fff',
      flex:1,
      padding:16,
    }}>
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:16,
        marginTop:16,
      }}>
        <TouchableOpacity
        style={{
          backgroundColor:'#EDEDED',
          borderRadius:12,
          padding:8
        }}
        ><Ionicons name='chevron-back' size={20} color={'#000'}/></TouchableOpacity>
        <View style={{flex:1}}>q
          <ProgressBar step={3} total={15}/>
        </View>
        
        <TouchableOpacity>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <QuestionHeader step={3} total={15} question={'What do you do for a living?'} subtitle={'Please give some true answers for following question'}/>
      <TextInput
      style={{
        marginTop:30,
        borderColor:'#9A9A9A',
        borderWidth:1,
        borderRadius:12,
        fontSize:16,
        padding:16,
        minHeight:120,
        textAlignVertical:'top',
        backgroundColor:'#fff'
      }}
      placeholder='Enter your description here...'
      placeholderTextColor={'#9A9A9A'}
      multiline
      maxLength={500}
      value={description}
      onChangeText={setDescription}
      />
      <Text style={{
        textAlign:'right',
        marginTop:4,
        color:'#9A9A9A',
        fontSize:12,
        fontFamily:'ReadexSemiBold'
      }}>{description.length}</Text>
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
                    onPress={()=> router.push('/stepFour')}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                      Next
                    </Text>
                  </TouchableOpacity>


    </SafeAreaView>
  )
}

export default stepThree
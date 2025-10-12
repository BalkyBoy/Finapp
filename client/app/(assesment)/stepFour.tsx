import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import ProgressBar from '@/components/ProgressBar'
import QuestionHeader from '@/components/QuestionHeader'
import AmountInput from '@/components/AmountInput'
import { router } from 'expo-router'

const stepFour = () => {
  return (
    <SafeAreaView
    style={{
        backgroundColor:'#fff',
        flex:1,
        padding:16,
    }}
    >
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
        <View style={{flex:1}}>
          <ProgressBar step={4} total={15}/>
        </View>
        
        <TouchableOpacity>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <QuestionHeader step={4} total={15} question={'What is the average amount you make monthly'} subtitle={'Please give some true answers for following question'}/>
      <AmountInput value={0} setValue={function (val: number): void {
        throw new Error('Function not implemented.')
      } }/>
       <TouchableOpacity 
                          style={{
                            backgroundColor: '#D4AF37',
                            height: 56,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 24,
                            marginTop:50,
                            
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

export default stepFour
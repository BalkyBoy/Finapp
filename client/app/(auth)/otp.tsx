import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity,Image, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router } from 'expo-router';

const otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(1800);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(()=> {
    const countdown = setInterval(()=> {
      setTimer(prev =>{
        if (prev <= 1){
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  },[]);

  const submitOtp = () => {
    const enteredCode = otp.join('');
    if (enteredCode.length === 4){
      console.log('Submitting OTP:',enteredCode);
      router.push('/(profile)/profilePhoto');
    }
  }

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)){
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 3){inputs.current[index + 1]?.focus();

      } 
      if (newOtp.every((digit)=> digit !== '')){
        submitOtp();
      }
    } else if(text === ''){
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === '' && index > 0){
      inputs.current[index - 1]?.focus();
    } 
  };

  const formatTime = () => {
    const minutes = String(Math.floor(timer/ 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  return (
   <KeyboardAvoidingView
   style={{
    flex:1,
    paddingTop:80,
    paddingHorizontal:24,
    backgroundColor:'#fff',
   }}
   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   >
    <TouchableOpacity
            style={{
                width:40,
                height:40,
                backgroundColor:'#EDEDED',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:10,
                marginBottom:20,
            }}
            >
                <Image source={require('@/assets/images/Left.png')}/>
            </TouchableOpacity>
             <Text style={{
                          fontSize: 20,
                          fontFamily:'ReadexBold',
                          marginBottom: 8,
                          color: '#333',
                        }}>
                          Enter Verification Code
                        </Text>
                        
                        <Text style={{
                          fontSize: 14,
                          color: '#707070',
                          marginBottom: 30,
                          fontFamily:'ReadexRegular'
                        }}>
                        Enter 4-digit code the we just send to your phone number <Text style={{color:'#5C8943', fontFamily:'ReadexBold'}}>+234 80 1234 5678</Text>
                        </Text>
                        <View style={{
                          flexDirection:'row',
                          justifyContent:'space-between',
                          marginBottom:24,
                        }}>
                          {otp.map((digit, index)=>(
                            <TextInput
                            key={index}
                            ref={el => (inputs.current[index]= el)}
                            keyboardType='numeric'
                            maxLength={1}
                            value={digit}
                            onChangeText={(text)=> handleChange(text, index)}
                            onKeyPress={({nativeEvent})=>
                            nativeEvent.key === 'Backspace' && handleBackspace(index)}
                            style={{
                              borderWidth:1,
                              borderColor: digit ? '#2E7D32' : '#ddd',
                              borderRadius:10,
                              width:56,
                              height:56,
                              textAlign:'center',
                              fontSize:22,
                              fontFamily:'ReadexBold',
                              color:'#222222'
                            }}
                            />
                          ))}
                        </View>
                        <Text 
                        style={{
                          textAlign:'center', marginBottom:40, color:'#222222'
                        }}
                        >Resend code in <Text style={{color:'#5C8943', fontFamily:'ReadexBold', fontSize:16,}}>{formatTime()}</Text></Text>
                         <TouchableOpacity 
                                      style={{
                                        backgroundColor: '#D4AF37',
                                        height: 56,
                                        borderRadius: 8,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        top:350,

                                      }}
                                      onPress={()=> router.push('/(profile)/profilePhoto')}
                                    >
                                      <Text style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontFamily:'ReadexBold',
                                       
                                      }}>
                                        Continue
                                      </Text>
                                    </TouchableOpacity>
   </KeyboardAvoidingView>
  )
}

export default otp
import { View, Text, TouchableOpacity,Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[showPassword, setShowPassword] = useState(false);
  return (
     <SafeAreaView
       style={{
        flex:1,
        backgroundColor:'white'
       }}
       >
        <View
        style={{
            padding:16,
        }}
        >
            <View 
            style={{
                alignItems:'center',
                marginBottom:20,
                padding:16
            }}
            >
            <TouchableOpacity
            style={{
                padding:10,
                backgroundColor:'#EDEDED',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:10,
            }}
            onPress={() => router.back()}
            >
                <Image source={require('@/assets/images/Left.png')}/>
            </TouchableOpacity> 
            </View>
            <View>
                <Text
                style={{
                    fontFamily:'ReadexBold',
                    fontSize:20,
                    marginBottom:8,
                }}
                >Login In</Text>
            </View>
            <View
            style={{marginBottom:30}}
            >
                <Text
                style={{
                fontFamily:'ReadexRegular',
                fontSize:14,
                color:'#707070'

            }}
                >Welcome back</Text>
            </View>
            <View style={{
                        marginBottom:16,
                        position:'relative'
                    }}>
                        <TextInput
                        style={{
                            height:56,
                            borderWidth:1,
                            borderColor:'#EDEDED',
                            borderRadius:8,
                            paddingHorizontal:16,
                            fontSize:14,
                            fontFamily:'ReadexRegular',
                            color:'#222222',
                             backgroundColor:'#fff'
                        }}
                        placeholder='Email Address'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholderTextColor={'#222222'}
                        />
                    </View>
                     <View style={{
            marginBottom:16,
            position:'relative'
        }}>
            <TextInput
            style={{
                height:56,
                borderWidth:1,
                borderColor:'#EDEDED',
                borderRadius:8,
                paddingHorizontal:16,
                fontSize:14,
                fontFamily:'ReadexRegular',
                color:'#222222',
                backgroundColor:'#fff',
                
            }}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor={'#222222'}
            />
            <TouchableOpacity
            style={{
                position:'absolute',
                right:16,
                top:16,
            }}
            onPress={()=> setShowPassword(!showPassword)}
            >
                <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color={'#5C8943'}
                />
            </TouchableOpacity>
        </View>
        <TouchableOpacity
        style={{marginBottom:12}}
        >
            <Text
            style={{
                fontFamily:'ReadexSemiBold',
                fontSize:14,
                color:'#5C8943'
            }}
            >Forgot Password?</Text>
        </TouchableOpacity>
        <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginBottom:12,
                }}
                >
                    <View
                    style={{
                        flex:1,
                        height:1,
                        backgroundColor:'#fff'
                    }}
                    />
                    <Text
                    style={{
                        fontFamily:'ReadexLight',
                        paddingHorizontal:16,
                        color:'#fff'
                    }}
                    >OR</Text>
                    <View
                    style={{
                        flex:1,
                        height:1,
                        backgroundColor:'#fff'
                    }}
                    />
                </View>
                <TouchableOpacity
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    marginBottom:12,
                }}
                >
                    <Text
                    style={{
                        fontFamily:'ReadexMedium',
                        fontSize:14,
                        color:'#00000'
                    }}
                    >Login With FaceId</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={{
                    flexDirection: 'row',
                    height: 56,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 24,
                    backgroundColor:'#fff'
                        }}
                        >
                            <Image source={require('@/assets/images/google.png')}
                            style={{
                                width:24,
                                height:24,
                                marginRight:8,
                            }}
                            />
                            <Text
                            style={{
                                fontFamily:'ReadexSemiBold',
                                color:'#222222',
                                fontSize:14,
                            }}
                            >Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                                style={{
                            flexDirection: 'row',
                            height: 56,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 24,
                            backgroundColor:'#fff'
                                }}
                                >
                                    <Image source={require('@/assets/images/google.png')}
                                    style={{
                                        width:24,
                                        height:24,
                                        marginRight:8,
                                    }}
                                    />
                                    <Text
                                    style={{
                                        fontFamily:'ReadexSemiBold',
                                        color:'#222222',
                                        fontSize:14,
                                    }}
                                    >Continue with Apple</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        style={{
                                    flexDirection: 'row',
                                    height: 56,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 24,
                                    backgroundColor:'#fff'
                                        }}
                                        >
                                            <Image source={require('@/assets/images/google.png')}
                                            style={{
                                                width:24,
                                                height:24,
                                                marginRight:8,
                                            }}
                                            />
                                            <Text
                                            style={{
                                                fontFamily:'ReadexSemiBold',
                                                color:'#222222',
                                                fontSize:14,
                                            }}
                                            >Continue with Facebook</Text>
                                        </TouchableOpacity>
                                         <View style={{
                                                     flexDirection: 'row',
                                                     justifyContent: 'center',
                                                     marginTop: 16,
                                                }}>
                                                    <Text
                                                    style={{
                                                        fontFamily:'ReadexBold',
                                                        fontSize:14,
                                                        color:'#707070'
                                                    }}
                                                    >Don’t have an Account?</Text>
                                                    <TouchableOpacity
                                                    onPress={()=> router.push('/(auth)/sign-up')}
                                                    >
                                                    <Text
                                                      style={{
                                                        fontFamily:'ReadexBold',
                                                        fontSize:14,
                                                        color:'#5C8943'
                                                    }}
                                                    > Sign Up</Text>
                                                    </TouchableOpacity>
                                                    
                                                </View>
        </View>
       </SafeAreaView>
  )
}

export default login
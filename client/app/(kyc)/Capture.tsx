// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import {Camera} from 'expo-camera'

// const { width, height } = Dimensions.get('window');

// const Capture = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const cameraRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef.current && isCameraReady) {
//       try {
//         const photo = await cameraRef.current.takePictureAsync();
//         console.log('Photo captured:', photo.uri);
//         // You can save photo.uri or navigate with it
//         router.push('/(kyc)/Success');
//       } catch (error) {
//         Alert.alert('Error', 'Failed to take picture: ' + error.message);
//       }
//     }
//   };

//   if (hasPermission === null) {
//     return <View><Text>Requesting camera permission...</Text></View>;
//   }

//   if (hasPermission === false) {
//     return <View><Text>No access to camera</Text></View>;
//   }

//   const steps = [
//     { number: 1, label: 'Photo ID card', active: true },
//     { number: 2, label: 'Confirmation', active: false },
//     { number: 3, label: '', active: false },
//   ];

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
//       <StatusBar barStyle="light-content" backgroundColor="#F4D03F" />
      
//       {/* Header */}
//       <View style={{
//         backgroundColor: '#F4D03F',
//         paddingHorizontal: 20,
//         paddingVertical: 15,
//         flexDirection: 'row',
//         alignItems: 'center',
//       }}>
//         <TouchableOpacity style={{ marginRight: 15 }}>
//           <Ionicons name="chevron-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={{
//           fontSize: 20,
//           fontWeight: '600',
//           color: 'white',
//         }}>
//           Verify personal data
//         </Text>
//       </View>

//       {/* Progress Steps */}
//       <View style={{
//         backgroundColor: '#F4D03F',
//         paddingHorizontal: 40,
//         paddingBottom: 30,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}>
//         {steps.map((step, index) => (
//           <View key={step.number} style={{
//             alignItems: 'center',
//             flex: 1,
//             position: 'relative',
//           }}>
//             <View style={{
//               width: 32,
//               height: 32,
//               borderRadius: 16,
//               backgroundColor: step.active ? 'white' : 'rgba(255, 255, 255, 0.3)',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginBottom: 8,
//             }}>
//               <Text style={{
//                 fontSize: 16,
//                 fontWeight: '600',
//                 color: step.active ? '#F4D03F' : 'white',
//               }}>
//                 {step.number}
//               </Text>
//             </View>
//             {step.label && (
//               <Text style={{
//                 fontSize: 12,
//                 color: step.active ? 'white' : 'rgba(255, 255, 255, 0.8)',
//                 textAlign: 'center',
//                 fontWeight: step.active ? '500' : 'normal',
//               }}>
//                 {step.label}
//               </Text>
//             )}
//             {index < steps.length - 1 && (
//               <View style={{
//                 position: 'absolute',
//                 top: 16,
//                 left: '50%',
//                 width: width / 3 - 80,
//                 height: 2,
//                 backgroundColor: 'rgba(255, 255, 255, 0.3)',
//                 zIndex: -1,
//               }} />
//             )}
//           </View>
//         ))}
//       </View>

//       {/* Camera View */}
//       <View style={{
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 40,
//       }}>
//         <View style={{
//           flex: 1,
//           backgroundColor: '#C4C4C4',
//           borderRadius: 20,
//           position: 'relative',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//           <Camera
//           style={{flex:1}}
//           type={Camera.Constants.Type.back}
//           ref={cameraRef}
//           onCameraReady={() => setIsCameraReady(true)}
//           />
//           {/* Flash Icon */}
//           <TouchableOpacity style={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             width: 40,
//             height: 40,
//             borderRadius: 20,
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//             <Ionicons name="flash" size={24} color="white" />
//           </TouchableOpacity>

//           {/* ID Card Frame */}
//           <View style={{
//             width: width * 0.6,
//             height: width * 0.38,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 40,
//           }}>
//             <View style={{
//               width: '100%',
//               height: '100%',
//               borderWidth: 3,
//               borderColor: 'white',
//               borderRadius: 12,
//               backgroundColor: 'transparent',
//             }} />
//           </View>

//           {/* Instruction Text */}
//           <Text style={{
//             fontSize: 16,
//             color: 'white',
//             textAlign: 'center',
//             lineHeight: 22,
//           }}>
//             position the cards according to{'\n'}the frame
//           </Text>
//         </View>
//       </View>

//       {/* Use Photo Button */}
//       <TouchableOpacity style={{
//         marginHorizontal: 20,
//         marginTop: 20,
//         paddingVertical: 15,
//         backgroundColor: 'transparent',
//         alignItems: 'center',
//       }}>
//         <Text style={{
//           fontSize: 18,
//           color: '#007AFF',
//           fontWeight: '600',
//         }}>
//           Use this photo
//         </Text>
//       </TouchableOpacity>

//       {/* Save Button */}
//       <TouchableOpacity style={{
//         marginHorizontal: 20,
//         marginTop: 10,
//         marginBottom: 20,
//         paddingVertical: 18,
//         backgroundColor: '#F4D03F',
//         borderRadius: 12,
//         alignItems: 'center',
//       }}>
//         <Text style={{
//           fontSize: 18,
//           color: 'white',
//           fontWeight: '600',
//         }}>
//           Save
//         </Text>
//       </TouchableOpacity>

//       {/* Home Indicator */}
//       <View style={{
//         width: 134,
//         height: 5,
//         backgroundColor: '#000',
//         borderRadius: 3,
//         alignSelf: 'center',
//         marginBottom: 8,
//       }} />
//     </SafeAreaView>
//   );
// };

// export default Capture;
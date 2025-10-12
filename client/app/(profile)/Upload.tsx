import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const UploadingPhotoScreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Setup</Text>

      <View style={styles.circleWrapper}>
        <Animated.View style={[styles.progressRing, { transform: [{ rotate: spin }] }]} />
        <View style={styles.avatar}>
          <Image
            source={require('@/assets/images/uploadprofile.png')}
            style={styles.userIcon}
            resizeMode='contain'
            resizeMethod='auto'
          />
        </View>
      </View>

      <Text style={styles.uploadingText}>Uploading Photo...</Text>
      <Text style={styles.filename}>photo_123411_0948.jpg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    fontSize: 14,
    marginBottom: 40,
    fontFamily:"ReadexBold"
  },
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    top:180,
  },
  progressRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderTopWidth: 12,
    borderRightWidth: 12,
    borderColor: 'rgba(198,156,93,0.4)',
    borderTopColor: '#C69C5D',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
    tintColor: '#808080',
  },
  uploadingText: {
    fontSize: 20,
    fontFamily:'ReadexBold',
    color: '#000',
    marginBottom: 6,
    top:180,
  },
  filename: {
    color: '#888',
    fontSize: 14,
    top:180,
    fontFamily:'ReadexBold',
  },
});

export default UploadingPhotoScreen;

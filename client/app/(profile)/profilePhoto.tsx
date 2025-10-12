import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfilePhotoSetup = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Setup</Text>
      <Text style={styles.title}>Let’s setup your{'\n'}profile photo</Text>

      <View style={styles.profileWrapper}>
        <View style={styles.profileCircle}>
          <Image
            source={require('@/assets/images/Photo Profile.png')}
            style={styles.profileIcon}
            resizeMode='contain'
          />
        </View>
        <View style={styles.uploadButton}>
          <Image source={require('@/assets/images/upload.png')}/>
        </View>
      </View>

      <TouchableOpacity style={styles.photoBtn}>
        <Text style={styles.photoBtnText}>Take a Photo</Text>
        <Image source={require('@/assets/images/camera.png')}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.galleryBtn} onPress={()=> router.push('/(profile)/Upload')}>
        <Text style={styles.galleryBtnText}>Upload From Gallery</Text>
        <Image source={require('@/assets/images/upload.png')}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipBtn} onPress={()=> router.push('/(tabs)/Dashboard')}>
        <Text style={styles.skipText}>Skip this step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  profileWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFEFE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 44,
    height: 44,
    tintColor: '#C69C5D',
  },
  uploadButton: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  photoBtn: {
    backgroundColor: '#C69C5D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
    position:'absolute',
    bottom:125,
    gap:3
  },
  photoBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'ReadexBold'
  },
  galleryBtn: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 25,
    position:'absolute',
    bottom:50,
  },
  galleryBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  skipBtn: {
    paddingVertical: 10,
    position:'absolute',
    bottom:30,
  },
  skipText: {
    color: '#FF6A00',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default ProfilePhotoSetup;

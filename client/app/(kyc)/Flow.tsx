import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const Flow = () => {
  const handleVerify = () => {
    // Handle verification logic here
    console.log('Starting verification process...');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F2C94C"/>
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Personal Verification</Text>
        <Text style={styles.subtitle}>
          For security purposes, we need to verify your personal details. This helps protect your account and ensures compliance with financial regulations.
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Document Preview Card */}
        <View style={styles.documentCard}>
          <View style={styles.documentPreview}>
            {/* Placeholder for document image */}
            <View style={styles.documentImagePlaceholder}>
              {/* Simulated blurred document content */}
              <View style={styles.blurredLine1} />
              <View style={styles.blurredLine2} />
              <View style={styles.blurredLine3} />
              <View style={styles.blurredLine4} />
            </View>
            
            {/* Document details section */}
            <View style={styles.documentDetails}>
              <View style={styles.detailLine} />
              <View style={styles.detailLine} />
              <View style={styles.detailLine} />
              <View style={styles.detailLine} />
            </View>
          </View>
        </View>

        {/* Verification Text */}
        <Text style={styles.verificationText}>
          Please verify your personal data
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressDot} />
          <View style={styles.progressLine} />
          <View style={[styles.progressDot, styles.inactiveDot]} />
          <View style={styles.progressLine} />
          <View style={[styles.progressDot, styles.inactiveDot]} />
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={()=> router.push('/(kyc)/Verify')}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#F2C94C',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    marginTop:10,
    fontFamily:'ReadexSemiBold',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  documentCard: {
    backgroundColor: '#E8F4FD',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  documentPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentImagePlaceholder: {
    width: 100,
    height: 140,
    backgroundColor: '#B8D4F0',
    borderRadius: 8,
    marginRight: 16,
    padding: 12,
    justifyContent: 'space-between',
  },
  blurredLine1: {
    height: 8,
    backgroundColor: '#9BC5E8',
    borderRadius: 4,
    width: '80%',
  },
  blurredLine2: {
    height: 8,
    backgroundColor: '#9BC5E8',
    borderRadius: 4,
    width: '60%',
  },
  blurredLine3: {
    height: 8,
    backgroundColor: '#9BC5E8',
    borderRadius: 4,
    width: '90%',
  },
  blurredLine4: {
    height: 8,
    backgroundColor: '#9BC5E8',
    borderRadius: 4,
    width: '70%',
  },
  documentDetails: {
    flex: 1,
    justifyContent: 'space-between',
    height: 140,
    paddingVertical: 8,
  },
  detailLine: {
    height: 12,
    backgroundColor: '#B8D4F0',
    borderRadius: 6,
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 18,
    color: '#2563EB',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F2C94C',
  },
  inactiveDot: {
    backgroundColor: '#E5E7EB',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  verifyButton: {
    backgroundColor: '#D4A760',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Flow;
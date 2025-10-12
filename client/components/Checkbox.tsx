import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type CheckboxProps = {
    checked: boolean;
    onPress: () => void; // Optional if you're using the size idea
  };
export default function Checkbox({ checked, onPress }: CheckboxProps) {
  return (
    <TouchableOpacity 
      style={[styles.checkbox, checked ? styles.checked : styles.unchecked]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {checked && (
        <Ionicons name="checkmark" size={16} color="#fff" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  unchecked: {
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
});
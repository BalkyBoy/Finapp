import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

export default function AmountInput({
  value,
  setValue,
}: {
  value: number;
  setValue: (val: number) => void;
}) {
  return (
    <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 8,
        }}
      >
        Monthly Amount
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#888',
          marginBottom: 16,
        }}
      >
        Please enter your net income amount
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#DDD',
          borderRadius: 16,
          paddingVertical: 16,
        }}
      >
        <Pressable onPress={() => setValue(Math.max(0, value - 1000))}>
          <Text style={{ fontSize: 24, paddingHorizontal: 16 }}>−</Text>
        </Pressable>

        <TextInput
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            paddingHorizontal: 16,
          }} 
          value='₦{value.toLocaleString()'       
        />

        <Pressable onPress={() => setValue(value + 1000)}>
          <Text style={{ fontSize: 24, paddingHorizontal: 16 }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

export default function Assets() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFCF8', paddingTop: 50 }}>
      <StatusBar barStyle="dark-content" />

      {/* Header Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#C28C47' }} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{
            width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#eee',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Text>🔔</Text>
          </View>
          <View style={{
            width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#eee',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Text>⚙️</Text>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={{
        fontSize: 22, fontWeight: '700', marginVertical: 20,
        paddingHorizontal: 20, color: '#222'
      }}>
        Assets Overview
      </Text>

      {/* Card Section */}
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 30
      }}>
        {/* First Card */}
        <View style={{
          backgroundColor: '#C8F1B6',
          flex: 1,
          borderRadius: 20,
          padding: 15
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', marginRight: 10 }} />
            <Text style={{ fontWeight: '700', fontSize: 16 }}>Nike Farms</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>$152.88</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Text style={{ color: '#888', fontSize: 14 }}>$1321.11</Text>
            <Text style={{
              backgroundColor: '#D6F5DB',
              color: '#3AB14A',
              marginLeft: 8,
              paddingHorizontal: 6,
              borderRadius: 10,
              fontSize: 12
            }}>↑0.3%</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={{
              flex: 1, paddingVertical: 10, borderRadius: 10,
              borderWidth: 1, borderColor: '#000', alignItems: 'center'
            }}>
              <Text style={{ fontWeight: '600' }}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 1, paddingVertical: 10, borderRadius: 10,
              backgroundColor: '#000', alignItems: 'center'
            }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Sell</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second Card */}
        <View style={{
          backgroundColor: '#D9C9F7',
          flex: 1,
          borderRadius: 20,
          padding: 15
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', marginRight: 10 }} />
            <Text style={{ fontWeight: '700', fontSize: 16 }}>Ro Farms</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>$152.88</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Text style={{ color: '#888', fontSize: 14 }}>$1321.11</Text>
            <Text style={{
              backgroundColor: '#D6F5DB',
              color: '#3AB14A',
              marginLeft: 8,
              paddingHorizontal: 6,
              borderRadius: 10,
              fontSize: 12
            }}>↑0.3%</Text>
          </View>
          <TouchableOpacity style={{
            flex: 1, paddingVertical: 10, borderRadius: 10,
            borderWidth: 1, borderColor: '#000', alignItems: 'center'
          }}>
            <Text style={{ fontWeight: '600' }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

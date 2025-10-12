import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, FlatList, Animated } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // Card width with padding
const CARD_SPACING = 20; // Space between cards

// Card data
const cardData = [
  {
    id: '1',
    type: 'Mastercard',
    balance: '₦5030.49',
    cardNumber: '1092 8020 4342 3431',
    expiry: '05/24',
    color: '#D4A760',
  },
  {
    id: '2',
    type: 'Visa',
    balance: '₦12,450.00',
    cardNumber: '4539 7852 3641 0987',
    expiry: '08/25',
    color: '#5E72E4',
  },
  {
    id: '3',
    type: 'Verve',
    balance: '₦3,200.75',
    cardNumber: '5060 9901 2345 6789',
    expiry: '11/23',
    color: '#11CDEF',
  },
  {
    id: '4',
    type: 'Amex',
    balance: '₦8,750.25',
    cardNumber: '3782 8224 6310 005',
    expiry: '03/26',
    color: '#FB6340',
  },
];

// Virtual Card Component
const VirtualCard = ({ card }) => {
  return (
    <View style={{
      backgroundColor: card.color,
      borderRadius: 16,
      padding: 24,
      height: 200,
      width: CARD_WIDTH,
      marginHorizontal: CARD_SPACING / 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Balance</Text>
        <View style={{ width: 40, height: 25 }}>
          {/* Card logo based on type */}
          {card.type === 'Mastercard' && (
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <View style={{ 
                width: 20, 
                height: 20, 
                borderRadius: 10, 
                backgroundColor: '#fff',
                marginRight: -5
              }} />
              <View style={{ 
                width: 20, 
                height: 20, 
                borderRadius: 10, 
                backgroundColor: '#fff',
                opacity: 0.7
              }} />
            </View>
          )}
          {card.type === 'Visa' && (
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>VISA</Text>
          )}
          {card.type === 'Verve' && (
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>VERVE</Text>
          )}
          {card.type === 'Amex' && (
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>AMEX</Text>
          )}
        </View>
      </View>

      <Text style={{ 
        color: '#fff', 
        fontSize: 28, 
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30
      }}>
        {card.balance}
      </Text>

      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>
          {card.cardNumber}
        </Text>
        <Text style={{ color: '#fff', fontSize: 14 }}>
          {card.expiry}
        </Text>
      </View>
    </View>
  );
};

// Pagination Dots Component
const PaginationDots = ({ data, activeIndex }) => {
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'center',
      marginVertical: 10
    }}>
      {data.map((_, index) => (
        <View 
          key={index}
          style={{ 
            width: index === activeIndex ? 20 : 6, 
            height: 6, 
            borderRadius: 3, 
            backgroundColor: '#D4A760',
            opacity: index === activeIndex ? 1 : 0.5,
            marginHorizontal: 3
          }} 
        />
      ))}
    </View>
  );
};

// Donut Chart Component
const DonutChart = () => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <View style={{ 
        width: 180, 
        height: 180, 
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Chart background - full circle */}
        <View style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: '#F5F5F5'
        }} />
        
        {/* Profits segment - 60% */}
        <View style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: '#FFE9B1',
          right: 0,
          bottom: 0,
          transform: [{ rotate: '0deg' }],
          overflow: 'hidden'
        }} />
        
        {/* Capital segment - 40% */}
        <View style={{
          position: 'absolute',
          width: 90,
          height: 180,
          right: 0,
          backgroundColor: '#D4A760',
          borderTopRightRadius: 90,
          borderBottomRightRadius: 90
        }} />
        
        {/* Center white circle */}
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#fff',
          zIndex: 1
        }} />
        
        {/* Labels */}
        <View style={{ 
          position: 'absolute', 
          top: 50, 
          left: 20 
        }}>
          <Text style={{ fontSize: 12, color: '#333' }}>Profits</Text>
          <Text style={{ fontSize: 12, color: '#333' }}>60%</Text>
        </View>
        
        <View style={{ 
          position: 'absolute', 
          top: 50, 
          right: 20 
        }}>
          <Text style={{ fontSize: 12, color: '#333' }}>Capital</Text>
          <Text style={{ fontSize: 12, color: '#333' }}>40%</Text>
        </View>
      </View>
    </View>
  );
};

// Transaction Item Component
const TransactionItem = ({ 
  title, 
  amount 
}) => {
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0'
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ 
          width: 40, 
          height: 40, 
          borderRadius: 8, 
          backgroundColor: '#F5F5F5',
          marginRight: 15
        }} />
        <Text style={{ fontSize: 16, color: '#333' }}>{title}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>{amount}</Text>
    </View>
  );
};

export default function Wallets() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveCardIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFE9B1' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ 
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <View>
            <Text style={{ color: '#666', fontSize: 16 }}>Total Balance</Text>
            <Text style={{ 
              color: '#000', 
              fontSize: 32, 
              fontWeight: 'bold',
              marginTop: 5
            }}>
              {cardData[activeCardIndex].balance}
            </Text>
          </View>
          
          <TouchableOpacity>
            <View style={{ position: 'relative' }}>
              <Feather name="bell" size={24} color="#333" />
              <View style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: 8, 
                height: 8, 
                borderRadius: 4, 
                backgroundColor: '#FF3B30' 
              }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Card Carousel Section */}
        <View style={{ paddingVertical: 20 }}>
          <FlatList
            ref={flatListRef}
            data={cardData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item }) => <VirtualCard card={item} />}
          />
          
          {/* Pagination Dots */}
          <PaginationDots data={cardData} activeIndex={activeCardIndex} />
        </View>

        {/* Main Content */}
        <View style={{ 
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 100
        }}>
          {/* Chart Section Header */}
          <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10
          }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333' }}>
              October 2025
            </Text>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Chart */}
          <DonutChart />

          {/* Legend */}
          <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 30
          }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: 6, 
                  backgroundColor: '#D4A760',
                  marginRight: 8
                }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>₦50.00</Text>
              </View>
              <Text style={{ color: '#999' }}>Capital</Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: 6, 
                  backgroundColor: '#FFE9B1',
                  marginRight: 8
                }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>₦45.85</Text>
              </View>
              <Text style={{ color: '#999' }}>Profits</Text>
            </View>
          </View>

          {/* Transactions */}
          <TransactionItem title="Top Up From Bank" amount="₦5000" />
          <TransactionItem title="Withdrawal Initiated" amount="₦2000" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0'
      }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Feather name="mail" size={22} color="#6B7280" />
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Feather name="credit-card" size={22} color="#D4A760" />
          <Text style={{ fontSize: 12, color: '#D4A760', marginTop: 3 }}>Wallets</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Feather name="search" size={22} color="#6B7280" />
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>Investments</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Feather name="user" size={22} color="#6B7280" />
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
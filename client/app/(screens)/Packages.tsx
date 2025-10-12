import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const packages = [
  {
    name: "Shap Shap",
    price: "₦5000",
    duration: "4 Weeks",
    bgColor: "#111726",
    roi: "5%",
  },
  {
    name: "Se Jeje",
    price: "₦5000",
    duration: "12 Weeks",
    bgColor: "#00A46E",
    roi: "5%",
  },
  {
    name: "Sure Boy",
    price: "₦10,000",
    duration: "12 Weeks",
    bgColor: "#4F46E5",
    roi: "5%",
  },
  {
    name: "Owonikoko",
    price: "₦50,000",
    duration: "12 Weeks",
    bgColor: "#9CC453",
    roi: "5%",
  },
  {
    name: "Odogwu",
    price: "₦100,000",
    duration: "12 Weeks",
    bgColor: "#9A0E0E",
    roi: "5%",
  },
  {
    name: "Investor",
    price: "Above ₦100,000",
    duration: "12 Weeks",
    bgColor: "#2400A4",
    roi: "5%",
  },
];

export default function Packages() {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const togglePackage = (packageName: string) => {
    setExpandedPackage(expandedPackage === packageName ? null : packageName);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <ScrollView>
        {/* Top Section */}
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <View
            style={{
              backgroundColor: "#FFE59D",
              paddingHorizontal: 20,
              paddingVertical: 6,
              borderRadius: 30,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#000" }}>
              Choose Your Package
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              textAlign: "center",
              color: "#1C1C1C",
            }}
          >
            We’ve got a package for every pocket
          </Text>
          <Text style={{ fontSize: 14, color: "#5A5D72", marginTop: 5 }}>
            No Fear , Pick Your Size
          </Text>
        </View>

        {/* Package Cards */}
        {packages.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: item.bgColor,
              padding: 20,
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                borderColor: "#fff",
                borderWidth: 1,
                alignSelf: "flex-start",
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 4,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "ReadexBold",
                }}
              >
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontFamily: "ReadexBold",
                }}
              >
                {item.price}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#D7FF6B",
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  alignSelf: "flex-end",
                  borderRadius: 8,
                  marginTop: 10,
                }}
                onPress={() => togglePackage(item.name)}
              >
                <Text style={{ fontSize: 12, fontFamily: "ReadexSemiBold" }}>
                  View Plan
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: "#fff",
                marginTop: 6,
                fontSize: 16,
                fontFamily: "ReadexRegular",
              }}
            >
              Duration - {item.duration}
            </Text>
            {expandedPackage === item.name && (
              <>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                    marginVertical: 15,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      ✓
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "ReadexRegular",
                    }}
                  >
                    {item.roi}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 25,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>✓</Text>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "ReadexRegular",
                    }}
                  >
                    Reinbursment Of Capital
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFDB8B",
                    paddingVertical: 15,
                    borderRadius: 30,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "ReadexSemiBold",
                      color: "#111726",
                    }}
                  >
                    Invest Now
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

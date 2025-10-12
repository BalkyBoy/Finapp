import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Line from "@/components/Line";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Withdrawals");

  const renderContent = () => {
    switch (activeTab) {
      case "Withdrawals":
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
            }}
          >
            <LinearGradient
              colors={["#FADB8A", "#CAA362"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 20,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <Image
                    source={require("@/assets/images/wallet.png")}
                    style={{ tintColor: "#fff" }}
                  />
                  <Text
                    style={{
                      fontFamily: "ReadexMedium",
                      fontSize: 14,
                      color: "#fff",
                      marginLeft: 5,
                    }}
                  >
                    Your Credit
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "ReadexMedium",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    See all cards
                  </Text>
                  <Feather name="chevron-down" size={16} color={"#fff"} />
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 16,
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: "ReadexRegular",
                    fontSize: 14,
                    color: "#515978",
                  }}
                >
                  Wallet Balance
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ fontFamily: "ReadexBold", fontSize: 28 }}>
                    ₦5030.49
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#CAA362",
                      borderRadius: 25,
                      flexDirection: "row",
                      gap: 5,
                      padding: 16,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/topup.png")}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: "ReadexRegular",
                        fontSize: 14,
                        color: "#fff",
                      }}
                    >
                      Top Up
                    </Text>
                  </TouchableOpacity>
                </View>
                <Line />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        borderWidth: 2,
                        marginRight: 15,
                        borderColor: "#ECEDF2",
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#515978",
                          fontFamily: "ReadexRegular",
                        }}
                      >
                        Oct 23
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#22242F",
                          fontFamily: "ReadexBold",
                        }}
                      >
                        Top Up From Bank
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "ReadexBold",
                        marginRight: 10,
                      }}
                    >
                      ₦5000
                    </Text>
                    <TouchableOpacity>
                      <Feather
                        name="more-vertical"
                        size={20}
                        color={"#22242F"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        borderWidth: 2,
                        marginRight: 15,
                        borderColor: "#ECEDF2",
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#515978",
                          fontFamily: "ReadexRegular",
                        }}
                      >
                        Oct 23
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#22242F",
                          fontFamily: "ReadexBold",
                        }}
                      >
                        Top Up From Bank
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "ReadexBold",
                        marginRight: 10,
                      }}
                    >
                      ₦5000
                    </Text>
                    <TouchableOpacity>
                      <Feather
                        name="more-vertical"
                        size={20}
                        color={"#22242F"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#EFF5FF",
                    borderRadius: 15,
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "ReadexMedium",
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      Keep Sapa Far Away
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "ReadexMedium",
                          color: "#156CD7",
                          fontSize: 12,
                          marginRight: 5,
                        }}
                      >
                        Let's set goals
                      </Text>
                      <Feather name="arrow-right" size={16} color={"#156CD7"} />
                    </TouchableOpacity>
                  </View>
                  <Image source={require("@/assets/images/illustration.png")} />
                </View>
              </View>
            </LinearGradient>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                borderRadius: 15,
                padding: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "ReadexSemiBold",
                  fontSize: 14,
                  color: "#282A37",
                  flex: 1,
                }}
              >
                We’ve got a package for every pocket
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FADB8A",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  marginBottom: 12,
                }}
                onPress={() => router.push("/(screens)/Packages")}
              >
                <Text
                  style={{
                    color: "#282A37",
                    fontFamily: "ReadexRegular",
                    fontSize: 12,
                  }}
                >
                  Choose Your Package
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Investment":
        return <View></View>;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            padding: 16,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/(screens)/Menu")}>
            <Image source={require("@/assets/images/menu.png")} />
          </TouchableOpacity>
          <Text style={{ fontFamily: "ReadexBold", fontSize: 18 }}>
            Good Morning, Deji 👋
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(screens)/Notifications")}
          >
            <Image source={require("@/assets/images/bell.png")} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            borderRadius: 50,
            padding: 4,
            marginBottom: 16,
            alignItems: "center",
            zIndex: 1,
            transform: [{ translateY: -1 }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab("Withdrawals")}
            style={{
              flex: 1,
              backgroundColor: activeTab === "Withdrawals" ? "#fff" : "",
              borderRadius: activeTab === "Withdrawals" ? 50 : 0,
              paddingVertical: 13,
              alignItems: "center",
              zIndex: activeTab === "Withdrawals" ? 2 : 0,
              // transform: activeTab === 'Withdrawals' ? [{translateY:2}] : [],
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: activeTab === "Withdrawals" ? 4 : 0,
            }}
          >
            <Text
              style={{
                color: activeTab === "Withdrawals" ? "#2257EE" : "#515978",
                fontFamily: "ReadexSemiBold",
                fontSize: 14,
              }}
            >
              Withdrawals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Investment")}
            style={{
              flex: 1,
              backgroundColor: activeTab === "Investment" ? "#fff" : "",
              borderRadius: activeTab === "Investment" ? 50 : 0,
              paddingVertical: 13,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              zIndex: activeTab === "Investment" ? 2 : 0,
              elevation: activeTab === "Investment" ? 4 : 0,
            }}
          >
            <Text
              style={{
                color: activeTab === "Investment" ? "#2257EE" : "#515978",
                fontFamily: "ReadexSemiBold",
                fontSize: 14,
              }}
            >
              Investment
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 16 }}>{renderContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

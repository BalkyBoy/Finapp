import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { router, Tabs } from "expo-router";

const icons = {
  Dashboard: require("@/assets/images/dashboard.png"),
  Wallet: require("@/assets/images/wallet.png"),
  Asset: require("@/assets/images/asset.png"),
  Profile: require("@/assets/images/profile.png"),
};
type TabIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

const TabIcon = ({ focused, icon, title }: TabIconProps) => (
  <View style={{ alignItems: "center", flex: 1, marginTop: 2 }}>
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: "center",
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? "#CAA362" : undefined,
        }}
      />
    </View>
    <Text
      style={{
        marginTop: 4,
        fontSize: 12,
        color: focused ? "#CAA362" : "#9ca3af",
        fontFamily: focused ? "ReadexSemiBold" : "ReadexRegular",
        width: "100%",
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            borderTopColor: "#0061FF1A",
            borderTopWidth: 1,
            minHeight: 70,
          },
        }}
      >
        <Tabs.Screen
          name="Dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.Dashboard}
                title="Dashboard"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Wallets"
          options={{
            title: "Wallets",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.Wallet} title="Wallets" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Assets"
          options={{
            title: "Assets",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.Asset} title="Asset" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.Profile} title="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;

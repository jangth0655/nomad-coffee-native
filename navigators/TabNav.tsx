import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./StackNavFactory";
import React from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import useUser from "../libs/useUser";
import { Image } from "react-native";

const Tabs = createBottomTabNavigator();
const TabNav: React.FC = () => {
  const { user } = useUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Tabs.Navigator
      initialRouteName={isLoggedIn ? "TabProfile" : "Home"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,255,255,0.5)",
        },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="TabHome"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color="white" focused={focused} iconName="home" />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color="white" focused={focused} iconName="search" />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="TabProfile"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            user?.avatarURL ? (
              <Image
                source={{ uri: user.avatarURL }}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  ...(focused && { borderColor: "white", borderWidth: 2 }),
                }}
              />
            ) : (
              <TabIcon color="white" focused={focused} iconName="person" />
            ),
        }}
      >
        {() => <StackNavFactory screenName="Profile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default TabNav;

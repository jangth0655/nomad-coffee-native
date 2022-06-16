import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./StackNavFactory";
import React from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const Tabs = createBottomTabNavigator();
const TabNav: React.FC = () => {
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
          tabBarIcon: ({ focused, color, size }) => (
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

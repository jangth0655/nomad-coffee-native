import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screens/Detail";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

interface StackNavFactoryProp {
  screenName?: string;
}

const StackNavFactory: React.FC<StackNavFactoryProp> = ({ screenName }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "black",
        },
        headerShadowVisible: true,
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <FontAwesome name="coffee" size={24} color="white" />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default StackNavFactory;

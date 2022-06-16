import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import Welcome from "../screens/Welcome";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import LogIn from "../screens/Login";
import { RootStackParamList } from "../shared.types";
import TabNav from "./TabNav";

const Stack = createNativeStackNavigator<RootStackParamList>();
export type StackScreenProps = NativeStackScreenProps<RootStackParamList, any>;

const LoggedOutNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="TabNav" component={TabNav} />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default LoggedOutNav;

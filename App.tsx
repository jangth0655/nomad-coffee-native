import { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, TOKEN, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedOutNav from "./navigators/LoggedOutNav";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [loading, setLoading] = useState(true);

  const preloadAssets = () => {
    const fontToLoad = [Ionicons.font, FontAwesome.font];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
    const imageToLoad = [require("./assets/favicon.png")];
    const imagePromises = imageToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      tokenVar(token);
      isLoggedInVar(true);
    }
    return preloadAssets;
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await preload();
        setLoading(false);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NavigationContainer onReady={onLayoutRootView}>
          <LoggedOutNav />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

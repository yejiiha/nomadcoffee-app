import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { useColorScheme, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import LoggedOutNav from "./navigators/LoggedOutNav";
import client, { isLoggedInVar, TOKEN, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import { darkTheme, lightTheme } from "./styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const mode = useColorScheme();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [loading, setLoading] = useState(true);

  const onFinish = () => setLoading(false);

  const preloadAssets = async () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font: any) => Font.loadAsync(font));
    const imageToLoad = [require("./assets/coffee-icon.png")];
    const imagePromises = imageToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all<any>([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await preloadAssets;
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
          <NavigationContainer>
            <StatusBar
              barStyle={mode === "light" ? "dark-content" : "light-content"}
            />
            {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}

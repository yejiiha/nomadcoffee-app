import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import CoffeeShop from "../screens/CoffeeShop";
import LoggedOutProfile from "../screens/LoggedOutProfile";
import MyProfile from "../screens/MyProfile";
import { useTheme } from "../styles/styles";
import useUser from "../hooks/useUser";
import SearchNav from "./SearchNav";

interface IStackNavFactory {
  screenName: string;
}

export type StackNavFactoryParamList = {
  Home: undefined;
  SearchNav: undefined;
  LoggedOutProfile: undefined;
  MyProfile: undefined;
  CoffeeShop: undefined;
  Profile: {
    username: string;
  };
};

function StackNavFactory({ screenName }: IStackNavFactory) {
  const Stack = createStackNavigator<StackNavFactoryParamList>();
  const theme = useTheme();
  const { data } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        headerTintColor: theme.theme.textColor,
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Home" && (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: "NomadCoffee" }}
        />
      )}
      {screenName === "Search" && (
        <Stack.Screen
          name="SearchNav"
          component={SearchNav}
          options={{
            headerStyle: {
              backgroundColor: theme.theme.bgColor,
              shadowOpacity: 0,
            },
          }}
        />
      )}
      {screenName === "LoggedOutProfile" && (
        <Stack.Screen
          name="LoggedOutProfile"
          component={LoggedOutProfile}
          options={{ headerTitle: "Profile" }}
        />
      )}
      {screenName === "MyProfile" && (
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            headerTitle: `${data?.me?.username}`,
          }}
        />
      )}
      <Stack.Screen name="CoffeeShop" component={CoffeeShop} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default StackNavFactory;

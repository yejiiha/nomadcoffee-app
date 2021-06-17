import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import CoffeeShop from "../screens/CoffeeShop";
import LoggedOutProfile from "../screens/LoggedOutProfile";
import MyProfile from "../screens/MyProfile";
import { useTheme } from "../styles/styles";
import useUser from "../hooks/useUser";

interface IStackNavFactory {
  screenName: string;
}

export type StackNavFactoryParamList = {
  Home: undefined;
  Search: undefined;
  LoggedOutProfile: undefined;
  MyProfile: undefined;
  CoffeeShop: undefined;
  Profile: undefined;
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
        <Stack.Screen name="Search" component={Search} />
      )}
      {screenName === "LoggedOutProfile" && (
        <Stack.Screen name="LoggedOutProfile" component={LoggedOutProfile} />
      )}
      {screenName === "MyProfile" && (
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerTitle: `${data?.me?.username}` }}
        />
      )}
      <Stack.Screen name="CoffeeShop" component={CoffeeShop} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default StackNavFactory;

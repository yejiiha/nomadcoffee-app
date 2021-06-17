import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoggedOutTabNav from "./LoggedOutTabNav";
import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import Welcome from "../screens/Welcome";
import { useTheme } from "../styles/styles";

export type LoggedOutStackNavParamList = {
  Welcome: undefined;
  Home: undefined;
  LoggedOutTabNav: undefined;
  SignUp: undefined;
  LogIn?: {
    username?: string;
    password?: string;
  };
};

function LoggedOutNav() {
  const LoggedOutStack = createStackNavigator<LoggedOutStackNavParamList>();
  const theme = useTheme();
  return (
    <LoggedOutStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        headerTintColor: theme.theme.textColor,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitle: "",
      }}
    >
      <LoggedOutStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <LoggedOutStack.Screen
        name="LoggedOutTabNav"
        component={LoggedOutTabNav}
        options={{
          headerShown: false,
        }}
      />
      <LoggedOutStack.Screen name="SignUp" component={SignUp} />
      <LoggedOutStack.Screen name="LogIn" component={LogIn} />
    </LoggedOutStack.Navigator>
  );
}

export default LoggedOutNav;

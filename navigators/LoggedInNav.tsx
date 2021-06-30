import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import UploadForm from "../screens/Upload/UploadForm";
import { useTheme } from "../styles/styles";
import LoggedInTabNav from "./LoggedInTabNav";
import UploadNav from "./UploadNav";

export type LoggedInNavParamList = {
  LoggedInTabNav: undefined;
  UploadNav: undefined;
  UploadForm: {
    file: string;
  };
};

function LoggedInNav() {
  const LoggedInStack = createStackNavigator();
  const theme = useTheme();
  return (
    <LoggedInStack.Navigator mode="modal">
      <LoggedInStack.Screen
        name="LoggedInTabNav"
        component={LoggedInTabNav}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="UploadNav"
        component={UploadNav}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          headerStyle: {
            backgroundColor: theme.theme.bgColor,
          },
          headerTintColor: theme.theme.textColor,
          headerBackTitleVisible: false,
          headerTitle: "New CoffeeShop",
        }}
      />
    </LoggedInStack.Navigator>
  );
}

export default LoggedInNav;

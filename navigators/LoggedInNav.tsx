import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoggedInTabNav from "./LoggedInTabNav";

function LoggedInNav() {
  const LoggedInStack = createStackNavigator();
  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen
        name="LoggedInTabNav"
        component={LoggedInTabNav}
        options={{ headerShown: false }}
      />
    </LoggedInStack.Navigator>
  );
}

export default LoggedInNav;

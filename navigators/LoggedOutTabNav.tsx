import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/TabIcon";
import StackNavFactory from "./StackNavFactory";
import { useTheme } from "../styles/styles";

function LoggedOutTabNav() {
  const Tabs = createBottomTabNavigator();
  const theme = useTheme();
  return (
    <Tabs.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        activeTintColor: theme.theme.orangeColor,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="home" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="search" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="LoggedOutProfile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="person" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="LoggedOutProfile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default LoggedOutTabNav;

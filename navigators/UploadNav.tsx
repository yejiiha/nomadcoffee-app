import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import SelectPhoto from "../screens/Upload/SelectPhoto";
import { useTheme } from "../styles/styles";
import TakePhoto from "../screens/Upload/TakePhoto";

type TUploadNav = {
  SelectPhoto: undefined;
  TakePhoto: undefined;
};

function UploadNav() {
  const Tab = createMaterialTopTabNavigator<TUploadNav>();
  const Stack = createStackNavigator();
  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: { backgroundColor: theme.theme.bgColor },
        activeTintColor: theme.theme.textColor,
        indicatorStyle: {
          backgroundColor: theme.theme.orangeColor,
          top: 0,
        },
      }}
    >
      <Tab.Screen name="SelectPhoto">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: theme.theme.textColor,
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: theme.theme.bgColor,
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="SelectPhoto"
              options={{
                title: "New CoffeeShop",
              }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="TakePhoto" component={TakePhoto} />
    </Tab.Navigator>
  );
}

export default UploadNav;

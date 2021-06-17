import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedOutStackNavParamList } from "../navigators/LoggedOutNav";
import { Container, Text } from "../styles/styles";
import AuthButton from "../components/auth/AuthButton";

type LoggedOutProfileNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "LoggedOutTabNav"
>;
type Props = {
  navigation: LoggedOutProfileNavigationProp;
};

function LoggedOutProfile({ navigation }: Props) {
  return (
    <Container>
      <Text>You cannot see Profile</Text>
      <AuthButton
        text="Go Log In"
        onPress={() => navigation.navigate("LogIn")}
      />
    </Container>
  );
}

export default LoggedOutProfile;

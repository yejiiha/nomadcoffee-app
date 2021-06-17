import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { LoggedOutStackNavParamList } from "../navigators/LoggedOutNav";
import { Container, Text } from "../styles/styles";
import AuthButton from "../components/auth/AuthButton";

type WelcomeNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "Welcome"
>;

type Props = {
  navigation: WelcomeNavigationProp;
};

export const Title = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.theme.textColor};
  font-size: 35px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.View`
  margin-top: 90px;
`;

function Welcome({ navigation }: Props) {
  return (
    <Container>
      <Title>NomadCoffee</Title>
      <Text>Go and find the best caffes to work 💻</Text>
      <ButtonContainer>
        <AuthButton
          text="Go Home"
          onPress={() => navigation.navigate("LoggedOutTabNav")}
          isBorder
        />
        <AuthButton
          text="Go Log In"
          onPress={() => navigation.navigate("LogIn")}
        />
        <AuthButton
          text="Go Sign Up"
          onPress={() => navigation.navigate("SignUp")}
          isBorder
        />
      </ButtonContainer>
    </Container>
  );
}

export default Welcome;

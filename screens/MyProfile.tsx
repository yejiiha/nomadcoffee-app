import React from "react";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import { Container, Text } from "../styles/styles";

function MyProfile() {
  return (
    <Container>
      <Text>MyProfile Screen</Text>
      <AuthButton text="Log out" onPress={() => logUserOut()} />
    </Container>
  );
}

export default MyProfile;

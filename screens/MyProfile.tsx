import React from "react";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import useUser from "../hooks/useUser";
import { Container, Text } from "../styles/styles";

function MyProfile() {
  const { data } = useUser();
  const username = data?.me?.username;

  return (
    <Container>
      <Text>{username} Screen</Text>
      <AuthButton text="Log out" onPress={() => logUserOut()} />
    </Container>
  );
}

export default MyProfile;

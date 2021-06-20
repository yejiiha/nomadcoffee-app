import { useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useEffect } from "react";
import { SEE_PROFILE } from "../components/Queries";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";
import {
  seeProfile,
  seeProfileVariables,
} from "../src/__generated__/seeProfile";
import { Container, Text } from "../styles/styles";

type ProfileProp = StackNavigationProp<StackNavFactoryParamList, "Profile">;
interface Props {
  navigation: ProfileProp;
  route: RouteProp<StackNavFactoryParamList, "Profile">;
}

function Profile({ navigation, route }: Props) {
  const username = route?.params?.username;
  const { data } = useQuery<seeProfile, seeProfileVariables>(SEE_PROFILE, {
    variables: {
      username,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: username,
    });
  }, []);
  console.log(data);

  return (
    <Container>
      <Text>Profile Screen</Text>
    </Container>
  );
}

export default Profile;

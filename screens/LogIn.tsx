import React, { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useForm } from "react-hook-form";
import { TextInput as Input } from "react-native";
import styled from "styled-components/native";
import { logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthInput";
import ErrorMessage from "../components/auth/ErrorMessage";
import { DismissKeyboard } from "../components/DismissKeyboard";
import { LOGIN_MUTATION } from "../components/Queries";
import { LoggedOutStackNavParamList } from "../navigators/LoggedOutNav";
import { Container } from "../styles/styles";
import { Title } from "./Welcome";
import { login, loginVariables } from "../src/__generated__/login";

type LogInNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "LogIn"
>;
type LogInRouteProp = RouteProp<LoggedOutStackNavParamList, "LogIn">;
type Props = {
  navigation: LogInNavigationProp;
  route: LogInRouteProp;
};

export const FormContainer = styled.View`
  margin-top: 30px;
`;

function LogIn({ navigation, route }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      username: route?.params?.username,
      password: route?.params?.password,
    },
  });

  const usernameRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };

  const onCompleted = async (data: any) => {
    const {
      login: { ok, token },
    } = data;

    if (ok) {
      await logUserIn(token);
    }
  };

  const [loginMutation, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data: any) => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("username", {
      required: "Username is required.",
      minLength: {
        value: 3,
        message: "Username should be longer than 3 chars.",
      },
    });
    register("password", { required: "Password is required." });
  }, [register]);

  return (
    <DismissKeyboard>
      <Container>
        <Title>NomadCoffee</Title>
        <FormContainer>
          <TextInput
            placeholder="Username"
            ref={usernameRef}
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => setValue("username", text)}
            value={watch("username")}
          />
          <ErrorMessage message={errors?.username?.message} />

          <TextInput
            placeholder="Password"
            ref={passwordRef}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("password", text)}
            value={watch("password")}
          />
          <ErrorMessage message={errors?.password?.message} />

          <AuthButton
            text="Log In"
            loading={loading}
            onPress={handleSubmit(onValid)}
            disabled={!watch("username") || !watch("password")}
          />
          <AuthButton
            text="Go Sign Up"
            onPress={() => navigation.navigate("SignUp")}
            isBorder
          />
        </FormContainer>
      </Container>
    </DismissKeyboard>
  );
}

export default LogIn;

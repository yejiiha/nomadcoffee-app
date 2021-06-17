import { useMutation } from "@apollo/client";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Alert, TextInput as Input } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthInput";
import ErrorMessage from "../components/auth/ErrorMessage";
import { DismissKeyboard } from "../components/DismissKeyboard";
import { CREATE_ACCOUNT_MUTATION } from "../components/Queries";
import { LoggedOutStackNavParamList } from "../navigators/LoggedOutNav";
import {
  createAccount,
  createAccountVariables,
} from "../src/__generated__/createAccount";
import { Container } from "../styles/styles";
import { FormContainer } from "./LogIn";
import { Title } from "./Welcome";

type SignUpNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "SignUp"
>;
type Props = {
  navigation: SignUpNavigationProp;
};

function SignUp({ navigation }: Props) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const usernameRef = useRef<Input>(null);
  const emailRef = useRef<Input>(null);
  const nameRef = useRef<Input>(null);
  const locationRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);
  const avatarUrlRef = useRef<Input>(null);
  const githubUsernameRef = useRef<Input>(null);

  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };

  const onCompleted = (data: any) => {
    const {
      createAccount: { ok, error },
    } = data;
    const { username, password } = getValues();

    if (ok) {
      navigation.navigate("LogIn", {
        username,
        password,
      });
    }
    if (!ok) {
      Alert.alert(error);
    }
  };

  const [createAccountMutation, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onValid = (data: any) => {
    if (!loading) {
      createAccountMutation({
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
    register("email", { required: "Email is required." });
    register("name", { required: "Name is required." });
    register("location", { required: "Location is required." });
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
            onSubmitEditing={() => onNext(emailRef)}
            onChangeText={(text) => setValue("username", text)}
            value={watch("username")}
          />
          <ErrorMessage message={errors?.username?.message} />

          <TextInput
            placeholder="Email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => onNext(nameRef)}
            onChangeText={(text) => setValue("email", text)}
            value={watch("email")}
          />
          <ErrorMessage message={errors?.email?.message} />

          <TextInput
            placeholder="Name"
            ref={nameRef}
            returnKeyType="next"
            onSubmitEditing={() => onNext(locationRef)}
            onChangeText={(text) => setValue("name", text)}
            value={watch("name")}
          />
          <ErrorMessage message={errors?.name?.message} />

          <TextInput
            placeholder="Location"
            ref={locationRef}
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => setValue("location", text)}
            value={watch("location")}
          />
          <ErrorMessage message={errors?.location?.message} />

          <TextInput
            placeholder="Password"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => onNext(avatarUrlRef)}
            secureTextEntry
            onChangeText={(text) => setValue("password", text)}
            value={watch("password")}
          />
          <ErrorMessage message={errors?.password?.message} />

          <TextInput
            placeholder="AvatarUrl"
            ref={avatarUrlRef}
            returnKeyType="next"
            onSubmitEditing={() => onNext(githubUsernameRef)}
            onChangeText={(text) => setValue("avatarUrl", text)}
            value={watch("avatarUrl")}
          />
          <TextInput
            placeholder="GithubUsername"
            ref={githubUsernameRef}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("githubUsername", text)}
            value={watch("githubUsername")}
          />

          <AuthButton
            text="Sign Up"
            loading={loading}
            onPress={handleSubmit(onValid)}
            disabled={!watch("username") || !watch("password")}
          />
          <AuthButton
            text="Go Log In"
            onPress={() => navigation.navigate("LogIn")}
            isBorder
          />
        </FormContainer>
      </Container>
    </DismissKeyboard>
  );
}

export default SignUp;

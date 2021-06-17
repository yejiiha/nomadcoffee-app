import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Container, Text } from "../styles/styles";

type InputProps = {
  width: number;
};

const Input = styled.TextInput<InputProps>`
  color: ${(props) => props.theme.theme.textColor};
  background-color: ${(props) => props.theme.theme.formColor};
  width: ${(props) => props.width / 1.2}px;
  padding: 7px 10px;
  border-radius: 5px;
`;

function Search() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { register, setValue, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholder="Search"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true, minLength: 2 });
  }, []);
  return (
    <Container>
      <Text>Search Screen</Text>
    </Container>
  );
}

export default Search;

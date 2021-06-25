import React from "react";
import { ActivityIndicator } from "react-native";
import { Container, Text } from "../../styles/styles";

export const SearchLoading = () => {
  return (
    <Container>
      <ActivityIndicator size="large" />
      <Text>Searching...</Text>
    </Container>
  );
};

export const SearchNotCalled = () => {
  return (
    <Container>
      <Text>Search by keyword 😋</Text>
    </Container>
  );
};

export const SearchNotFound = () => {
  return (
    <Container>
      <Text>Could not find anything 😢</Text>
    </Container>
  );
};

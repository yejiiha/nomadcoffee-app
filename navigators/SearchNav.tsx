import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useLazyQuery } from "@apollo/client";
import { Text, useTheme } from "../styles/styles";
import SearchUsers from "../screens/Search/SearchUsers";
import SearchCoffeeShops from "../screens/Search/SearchCoffeeShops";
import SearchCategories from "../screens/Search/SearchCategories";
import { searchUsers } from "../src/__generated__/searchUsers";
import {
  SEARCH_CATEGORIES,
  SEARCH_COFFEE_SHOPTS,
  SEARCH_USERS,
} from "../components/Queries";
import { searchCoffeeShops } from "../src/__generated__/searchCoffeeShops";
import { searchCategories } from "../src/__generated__/searchCategories";
import { useLayoutEffect } from "react";

export type SearchNavList = {
  SearchCoffeeShops: {
    keyword: string;
  };
  SearchCategories: {
    keyword: string;
  };
  SearchUsers: {
    keyword: string;
  };
};

type InputProps = {
  width: number;
  isPress: boolean;
};

const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const SearchContainer = styled.View<InputProps>`
  flex-direction: row;
  width: ${(props) =>
    props.isPress ? props.width / 1.3 : props.width / 1.1}px;
  background-color: ${(props) => props.theme.theme.formColor};
  padding: 6px 10px;
  border-radius: 10px;
`;

const SearchInput = styled.TextInput`
  color: ${(props) => props.theme.theme.textColor};
  width: 100%;
  margin-left: 10px;
`;

const CancelContainer = styled.TouchableOpacity`
  margin-left: 10px;
`;

function SearchNav() {
  const theme = useTheme();
  const SearchTab = createMaterialTopTabNavigator<SearchNavList>();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { register, setValue, handleSubmit, reset, watch } = useForm();
  const [isPress, setIsPress] = useState(false);
  console.log(isPress);

  const [
    startUserQueryFn,
    { data: userData, loading: userLoading, called: userCalled },
  ] = useLazyQuery<searchUsers>(SEARCH_USERS);

  const [
    startCoffeeShopQueryFn,
    {
      data: coffeeShopData,
      loading: coffeeShopLoading,
      called: coffeeShopCalled,
    },
  ] = useLazyQuery<searchCoffeeShops>(SEARCH_COFFEE_SHOPTS);

  const [
    startCategoryQueryFn,
    { data: categoryData, loading: categoryLoading, called: categoryCalled },
  ] = useLazyQuery<searchCategories>(SEARCH_CATEGORIES);

  const userProps = {
    userData,
    userLoading,
    userCalled,
  };

  const coffeeShopProps = {
    coffeeShopData,
    coffeeShopLoading,
    coffeeShopCalled,
  };

  const categoryProps = {
    categoryData,
    categoryLoading,
    categoryCalled,
  };

  const onValid = (data: any) => {
    const { keyword } = data;
    console.log("keyword: ", keyword);

    startUserQueryFn({
      variables: { keyword },
    });

    startCoffeeShopQueryFn({
      variables: { keyword },
    });

    startCategoryQueryFn({
      variables: { keyword },
    });
  };

  const SearchBox = () => (
    <SearchWrapper>
      <SearchContainer width={width} isPress={isPress}>
        <Ionicons name="search" size={24} color={theme.theme.darkGray} />
        <SearchInput
          placeholder="Search"
          autoCapitalize="none"
          returnKeyLabel="Search"
          returnKeyType="search"
          autoCorrect={false}
          onChangeText={(text) => setValue("keyword", text)}
          onSubmitEditing={handleSubmit(onValid)}
          onFocus={() => setIsPress(true)}
        />
      </SearchContainer>

      {isPress ? (
        <CancelContainer
          onPress={() => {
            reset({ keyword: "" });
            setIsPress(false);
          }}
        >
          <Text>Cancel</Text>
        </CancelContainer>
      ) : null}
    </SearchWrapper>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, [isPress, watch("keyword")]);

  useEffect(() => {
    register("keyword", {
      required: true,
    });
  }, [register]);

  return (
    <SearchTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: theme.theme.bgColor,
        },
        activeTintColor: theme.theme.textColor,
        indicatorStyle: {
          backgroundColor: theme.theme.orangeColor,
        },
      }}
    >
      <SearchTab.Screen
        name="SearchCoffeeShops"
        options={{
          title: "COFFEESHOP",
        }}
      >
        {() => <SearchCoffeeShops {...coffeeShopProps} />}
      </SearchTab.Screen>
      <SearchTab.Screen
        name="SearchCategories"
        options={{
          title: "CATEGORY",
        }}
      >
        {() => <SearchCategories {...categoryProps} />}
      </SearchTab.Screen>
      <SearchTab.Screen
        name="SearchUsers"
        options={{
          title: "USER",
        }}
      >
        {() => <SearchUsers {...userProps} />}
      </SearchTab.Screen>
    </SearchTab.Navigator>
  );
}

export default SearchNav;

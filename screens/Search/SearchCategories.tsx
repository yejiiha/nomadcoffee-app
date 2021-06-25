import React from "react";
import { FlatList } from "react-native";
import { searchCategories } from "../../src/__generated__/searchCategories";
import { Container, Text, useTheme, View } from "../../styles/styles";
import {
  SearchLoading,
  SearchNotCalled,
  SearchNotFound,
} from "../../components/search/SearchText";
import { List, ListText } from "./SearchCoffeeShops";

interface ISearchCategories {
  categoryData?: searchCategories;
  categoryLoading: boolean;
  categoryCalled: boolean;
}

function SearchCategories({
  categoryData,
  categoryLoading,
  categoryCalled,
}: ISearchCategories) {
  const theme = useTheme();
  const renderItem = ({ item: c }: any) => (
    <List>
      <ListText>{c.name}</ListText>
    </List>
  );

  return (
    <View>
      {categoryLoading && <SearchLoading />}
      {!categoryCalled ? <SearchNotCalled /> : null}
      {categoryData?.searchCategories !== undefined ? (
        categoryData?.searchCategories?.length === 0 ? (
          <SearchNotFound />
        ) : (
          <FlatList
            data={categoryData?.searchCategories}
            keyExtractor={(c) => "" + c?.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: "100%",
                  height: 0.5,
                  backgroundColor: theme.theme.borderColor,
                }}
              ></View>
            )}
          />
        )
      ) : null}
    </View>
  );
}

export default SearchCategories;

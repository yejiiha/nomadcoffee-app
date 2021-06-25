import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import {
  SearchLoading,
  SearchNotCalled,
  SearchNotFound,
} from "../../components/search/SearchText";
import { searchCoffeeShops } from "../../src/__generated__/searchCoffeeShops";
import { Text, useTheme, View } from "../../styles/styles";

interface ISearchCoffeeShops {
  coffeeShopData?: searchCoffeeShops;
  coffeeShopLoading: boolean;
  coffeeShopCalled: boolean;
}

export const List = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 10px;
  flex-direction: row;
`;

export const ListText = styled(Text)`
  font-size: 16px;
`;

function SearchCoffeeShops({
  coffeeShopData,
  coffeeShopLoading,
  coffeeShopCalled,
}: ISearchCoffeeShops) {
  const theme = useTheme();
  const renderItem = ({ item: shop }: any) => (
    <List>
      <ListText>{shop.name}</ListText>
    </List>
  );

  return (
    <View>
      {coffeeShopLoading && <SearchLoading />}
      {!coffeeShopCalled ? <SearchNotCalled /> : null}
      {coffeeShopData?.searchCoffeeShops !== undefined ? (
        coffeeShopData?.searchCoffeeShops?.length === 0 ? (
          <SearchNotFound />
        ) : (
          <FlatList
            data={coffeeShopData?.searchCoffeeShops}
            keyExtractor={(shop) => "" + shop?.id}
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

export default SearchCoffeeShops;

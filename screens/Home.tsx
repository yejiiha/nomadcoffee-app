import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { SEE_COFFEE_SHOPS } from "../components/Queries";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../src/__generated__/seeCoffeeShops";
import ScreenLayout from "../components/ScreenLayout";
import CoffeeShops from "../components/home/CoffeeShops";

function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery<
    seeCoffeeShops,
    seeCoffeeShopsVariables
  >(SEE_COFFEE_SHOPS, {
    variables: {
      offset: 0,
    },
  });

  const renderShops = ({ item: shops }: any) => {
    return <CoffeeShops {...shops} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.3}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        data={data?.seeCoffeeShops}
        keyExtractor={(shops) => "" + shops?.id}
        renderItem={renderShops}
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
}

export default Home;

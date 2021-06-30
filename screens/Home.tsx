import React, { useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SEE_COFFEE_SHOPS } from "../components/Queries";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../src/__generated__/seeCoffeeShops";
import ScreenLayout from "../components/ScreenLayout";
import CoffeeShops from "../components/home/CoffeeShops";
import { useEffect } from "react";
import { isLoggedInVar } from "../apollo";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../styles/styles";

function Home() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
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

  const addButton = () => (
    <TouchableOpacity
      style={{ marginRight: 12 }}
      onPress={() => navigation.navigate("UploadNav")}
    >
      <Ionicons name="add-circle-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigation.setOptions({
        headerRight: addButton,
      });
    }
  }, []);

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

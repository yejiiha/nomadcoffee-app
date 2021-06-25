import React from "react";
import { FlatList } from "react-native";
import {
  SearchLoading,
  SearchNotCalled,
  SearchNotFound,
} from "../../components/search/SearchText";
import UserRow from "../../components/search/UserRow";
import { searchUsers } from "../../src/__generated__/searchUsers";
import { useTheme, View } from "../../styles/styles";

interface ISearchUsers {
  userData?: searchUsers;
  userLoading: boolean;
  userCalled: boolean;
}

function SearchUsers({ userData, userLoading, userCalled }: ISearchUsers) {
  const theme = useTheme();
  const renderItem = ({ item: user }: any) => <UserRow {...user} />;

  return (
    <View>
      {userLoading && <SearchLoading />}
      {!userCalled ? <SearchNotCalled /> : null}
      {userData?.searchUsers !== undefined ? (
        userData?.searchUsers?.length === 0 ? (
          <SearchNotFound />
        ) : (
          <FlatList
            data={userData?.searchUsers}
            keyExtractor={(user) => "" + user?.id}
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

export default SearchUsers;

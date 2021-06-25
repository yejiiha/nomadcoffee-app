import React from "react";
import styled from "styled-components/native";
import { ListText } from "../../screens/Search/SearchCoffeeShops";

interface IUserRow {
  username: string;
  avatarUrl: string;
}

const UserList = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
  border: 1px solid ${(props) => props.theme.theme.borderColor};
`;

const Username = styled(ListText)`
  font-weight: 600;
`;

function UserRow({ username, avatarUrl }: IUserRow) {
  return (
    <UserList>
      <Avatar
        source={
          avatarUrl?.length > 0
            ? avatarUrl
            : require("../../assets/user-icon.png")
        }
      />
      <Username>{username}</Username>
    </UserList>
  );
}

export default UserRow;

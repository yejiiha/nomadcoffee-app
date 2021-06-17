import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity<IButton>`
  margin-top: 15px;
  padding: 15px 10px;
  border-radius: 10px;
  border: ${(props) =>
    props.isBorder ? `1px solid ${props.theme.theme.orangeColor}` : "0px"};
  background-color: ${(props) =>
    props.isBorder ? props.theme.theme.bgColor : props.theme.theme.orangeColor};
  width: 300px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text<IButton>`
  font-weight: 600;
  color: ${(props) =>
    props.isBorder ? props.theme.theme.orangeColor : "white"};
  text-align: center;
`;

interface IAuthButton {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;
  isBorder?: boolean;
}

interface IButton {
  disabled?: boolean;
  isBorder?: boolean;
}

export default function AuthButton({
  onPress,
  text,
  disabled,
  loading,
  isBorder,
}: IAuthButton) {
  return (
    <Button disabled={disabled} onPress={onPress} isBorder={isBorder}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText isBorder={isBorder}>{text}</ButtonText>
      )}
    </Button>
  );
}

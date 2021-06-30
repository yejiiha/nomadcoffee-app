import { useColorScheme } from "react-native-appearance";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

export const lightTheme: DefaultTheme = {
  theme: {
    textColor: "rgb(38, 38, 38)",
    bgColor: "#fafafa",
    orangeColor: "#FF9500",
    formColor: "white",
    borderColor: "rgb(219, 219, 219)",
    darkGray: "#8e8e8e",
    lightGray: "#EFEFEF",
    closeBtnColor: "rgba(38,38,38,0.6)",
  },
};

export const darkTheme: DefaultTheme = {
  theme: {
    textColor: "white",
    bgColor: "#0C0513",
    orangeColor: "#FF9500",
    formColor: "#2c2c2c",
    borderColor: "#525252",
    darkGray: "#8e8e8e",
    lightGray: "#EFEFEF",
    closeBtnColor: "rgba(255,255,255,0.6)",
  },
};

export const useTheme = () => {
  const isDarkMode = useColorScheme() === "dark";
  return isDarkMode ? darkTheme : lightTheme;
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.theme.bgColor};
  color: ${(props) => props.theme.theme.textColor};
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.theme.textColor};
`;

export const View = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.theme.bgColor};
`;

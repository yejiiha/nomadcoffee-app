import React, { PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../styles/styles";

type ScreenLayoutProps = React.PropsWithChildren<{
  loading?: boolean;
}>;

export default function ScreenLayout({ loading, children }: ScreenLayoutProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.theme.bgColor,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color={theme.theme.textColor} /> : children}
    </View>
  );
}

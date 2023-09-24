import "react-native-gesture-handler";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#002124",
        },
      }}
    />
  );
}

import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack initialRouteName="transactions">
      <Stack.Screen
        name="list"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[uuid]"
        options={{
          title: "Details",
        }}
      />
    </Stack>
  );
}

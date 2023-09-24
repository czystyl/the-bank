import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "~/lib/authProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#002124",
            },
          }}
        >
          <Stack.Screen name="(home)" />
          <Stack.Screen
            name="(auth)/onboarding"
            options={{
              animation: "none",
            }}
          />
          <Stack.Screen
            name="(auth)/sign-in"
            options={{
              animation: "none",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";

import { AuthProvider } from "~/lib/authProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""}
    >
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
    </ClerkProvider>
  );
}

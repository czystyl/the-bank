import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import { AuthProvider } from "~/utils/authProvider";

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
        <TRPCProvider>
          <SafeAreaProvider>
            <StatusBar />

            <Stack initialRouteName="index">
              <Stack.Screen
                name="index"
                options={{
                  title: "",
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="home"
                options={{
                  title: "Home",
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="(auth)/onboarding"
                options={{
                  title: "Onboarding 🎉",
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="(auth)/sign-in"
                options={{
                  title: "Sign In",
                  animation: "none",
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </TRPCProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

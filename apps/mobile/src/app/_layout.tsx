import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import { AuthProvider } from "~/utils/authProvider";

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
  const [loaded, error] = useFonts({
    "RobotoMono-Bold": require("../../assets/fonts/RobotoMono-Bold.ttf"),
    "RobotoMono-BoldItalic": require("../../assets/fonts/RobotoMono-BoldItalic.ttf"),
    "RobotoMono-Italic": require("../../assets/fonts/RobotoMono-Italic.ttf"),
    "RobotoMono-ExtraLight": require("../../assets/fonts/RobotoMono-ExtraLight.ttf"),
    "RobotoMono-ExtraLightItalic": require("../../assets/fonts/RobotoMono-ExtraLightItalic.ttf"),
    "RobotoMono-Light": require("../../assets/fonts/RobotoMono-Light.ttf"),
    "RobotoMono-LightItalic": require("../../assets/fonts/RobotoMono-LightItalic.ttf"),
    "RobotoMono-Medium": require("../../assets/fonts/RobotoMono-Medium.ttf"),
    "RobotoMono-MediumItalic": require("../../assets/fonts/RobotoMono-MediumItalic.ttf"),
    "RobotoMono-Regular": require("../../assets/fonts/RobotoMono-Regular.ttf"),
    "RobotoMono-SemiBold": require("../../assets/fonts/RobotoMono-SemiBold.ttf"),
    "RobotoMono-SemiBoldItalic": require("../../assets/fonts/RobotoMono-SemiBoldItalic.ttf"),
    "RobotoMono-Thin": require("../../assets/fonts/RobotoMono-Thin.ttf"),
    "RobotoMono-ThinItalic": require("../../assets/fonts/RobotoMono-ThinItalic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""}
    >
      <AuthProvider>
        <TRPCProvider>
          <SafeAreaProvider>
            <StatusBar />

            <Stack
              initialRouteName="index"
              screenOptions={{
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                gestureEnabled: true,
              }}
            >
              <Stack.Screen
                name="transaction/[id]"
                options={{
                  title: "Transaction",
                  headerShown: true,
                  presentation: "containedModal",
                  gestureDirection: "vertical",
                  gestureEnabled: true,
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </TRPCProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

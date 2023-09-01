import { useCallback } from "react";
import * as React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";

export default function SignIn() {
  const { startOAuthFlow: startGoogleAuthFlow } = useOAuth({
    strategy: "oauth_google",
    redirectUrl: "exp://",
  });

  const { startOAuthFlow: startAppleAuthFlow } = useOAuth({
    strategy: "oauth_apple",
    redirectUrl: "exp://",
  });

  const { startOAuthFlow: startGithubAuthFlow } = useOAuth({
    strategy: "oauth_github",
    redirectUrl: "exp://",
  });

  const onGoogleLoginPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleAuthFlow();

      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    }
  }, [startGoogleAuthFlow]);

  const onAppleLoginPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startAppleAuthFlow();

      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    }
  }, [startAppleAuthFlow]);

  const onGithubLoginPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGithubAuthFlow();

      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    }
  }, [startGithubAuthFlow]);

  return (
    <SafeAreaView className="flex flex-1 justify-center bg-green-300 px-4">
      <View className="flex flex-1 items-center justify-center gap-3">
        <Pressable
          onPress={onGithubLoginPress}
          className="flex w-full flex-row items-center justify-center gap-x-2 rounded-md border bg-white p-3"
        >
          <AntDesign name="github" size={32} color="black" />
          <Text className="text-xl font-bold">Continue with Github</Text>
        </Pressable>

        <Pressable
          onPress={onAppleLoginPress}
          className="flex w-full flex-row items-center justify-center gap-x-2 rounded-md border bg-white p-3"
        >
          <AntDesign name="apple1" size={32} color="black" />
          <Text className="text-xl font-bold">Continue with Apple</Text>
        </Pressable>

        <Pressable
          onPress={onGoogleLoginPress}
          className="flex w-full flex-row items-center justify-center gap-x-2 rounded-md border bg-white p-3"
        >
          <AntDesign name="google" size={32} color="black" />
          <Text className="text-xl font-bold">Continue with Google</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

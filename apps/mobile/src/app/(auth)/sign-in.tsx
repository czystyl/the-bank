import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

import { useAuth } from "~/lib/authProvider";
import MainBackground from "../../images/welcome.png";

export default function SignIn() {
  const { resetOnboarding, signIn } = useAuth();

  const handleLoginPress = useCallback(() => {
    signIn();
  }, [signIn]);

  return (
    <>
      <Image source={MainBackground} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView className="flex flex-1 justify-center px-4">
        <Text className="mb-4 text-4xl text-slate-200">Continue with</Text>
        <View className=" flex items-center justify-center gap-3">
          <Pressable
            onPress={handleLoginPress}
            className="flex w-full flex-row items-center justify-center gap-x-2 rounded-md border bg-white p-3"
          >
            <AntDesign name="github" size={32} color="black" />
            <Text className="text-xl font-bold">Continue with Github</Text>
          </Pressable>

          <Pressable
            onPress={handleLoginPress}
            className="flex w-full flex-row items-center justify-center gap-x-2 rounded-md border bg-white p-3"
          >
            <AntDesign name="apple1" size={32} color="black" />
            <Text className="text-xl font-bold">Continue with Apple</Text>
          </Pressable>

          <Pressable
            onPress={handleLoginPress}
            className="mb-10 flex w-full flex-row items-center justify-center gap-x-2 rounded-md border bg-white p-3"
          >
            <AntDesign name="google" size={32} color="black" />
            <Text className="text-xl font-bold">Continue with Google</Text>
          </Pressable>

          <Pressable
            onPress={resetOnboarding}
            className="flex w-full flex-row items-center justify-center gap-x-2 rounded-md border bg-neutral-500 p-3"
          >
            <AntDesign name="banckward" size={10} color="black" />
            <Text className="font-bold">Back to Onboarding</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

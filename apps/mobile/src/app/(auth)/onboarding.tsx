import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "~/lib/authProvider";

export default function Onboarding() {
  const { completeOnboarding } = useAuth();

  return (
    <>
      <SafeAreaView className="flex-1">
        <Pressable onPress={completeOnboarding}>
          <Text className="text-xl uppercase text-neutral-300">
            SKIP ONBOARDING{" "}
          </Text>
        </Pressable>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View className="h-screen w-screen flex-1 bg-red-500"></View>
          <View className="h-screen w-screen flex-1 bg-green-500 "></View>
          <View className="h-screen w-screen flex-1 bg-yellow-500 "></View>
          <View className="h-screen w-screen flex-1 bg-blue-500 "></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

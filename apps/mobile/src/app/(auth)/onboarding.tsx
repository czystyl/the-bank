import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "~/utils/authProvider";

export default function Onboarding() {
  const { completeOnboarding } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-green-300">
      <Pressable
        className="absolute right-6 top-20 z-10"
        onPress={completeOnboarding}
      >
        {({ pressed }) => (
          <View
            className={`rounded-full ${
              pressed ? "bg-slate-700" : "bg-slate-500"
            } p-3 ${pressed ? "shadow-sm" : "shadow-md"} shadow-gray-700`}
          >
            <Text className={`font-bold ${pressed ? "text-white" : ""}`}>
              SKIP
            </Text>
          </View>
        )}
      </Pressable>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View className="w-screen flex-1 items-center justify-center bg-blue-500">
          <Text className="text-5xl">ONE</Text>
        </View>
        <View className="w-screen flex-1 items-center justify-center bg-yellow-500">
          <Text className="text-5xl">TWO</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

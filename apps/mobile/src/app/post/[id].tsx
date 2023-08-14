import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

function Post() {
  const { id } = useSearchParams();

  if (!id || typeof id !== "string") {
    throw new Error("unreachable");
  }

  const { data } = api.transaction.byId.useQuery({ id: parseInt(id, 10) });

  if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="bg-[#9d9d13]">
      <Stack.Screen options={{ title: data.name ?? "en" }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-white">{data.name}</Text>
        <Text className="py-4 text-white">{data.email}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Post;

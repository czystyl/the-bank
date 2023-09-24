import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "~/lib/authProvider";

export default function HomeScreen() {
  const { setUser } = useAuth();

  return (
    <SafeAreaView className="flex flex-1 items-center justify-center px-4">
      <Text className="text-6xl text-gray-300">Home 🏡!</Text>
      <Pressable
        className="m-4 rounded-md bg-blue-500 p-4"
        onPress={() => setUser(false)}
      >
        <Text className="text-xl text-white">Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

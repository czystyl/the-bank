import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex flex-1 items-center justify-center px-4"
      edges={["top"]}
    >
      <Text className="text-6xl text-gray-300">👋 Hello</Text>
    </SafeAreaView>
  );
}

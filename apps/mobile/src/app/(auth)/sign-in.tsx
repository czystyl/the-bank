import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "~/lib/authProvider";

export default function SignIn() {
  const { resetOnboarding, setUser } = useAuth();
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center px-4">
      <Text className="text-6xl text-gray-300">🔛 Sign in!</Text>
      <Pressable onPress={resetOnboarding}>
        <Text className="mt-10 text-xl text-gray-500">Back to onboarding!</Text>
      </Pressable>
      <Pressable onPress={() => setUser(true)}>
        <Text className="mt-10 text-xl text-gray-500">Go to Home Screen!</Text>
      </Pressable>
    </SafeAreaView>
  );
}

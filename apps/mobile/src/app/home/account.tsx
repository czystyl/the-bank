import React from "react";
import { Text, View } from "react-native";

import { useAuth } from "~/utils/authProvider";

export default function Account() {
  const { signOut, user, resetOnboarding, completeOnboarding } = useAuth();

  return (
    <View className="flex flex-1 items-center justify-center gap-5">
      <Text>id: {user?.id}!</Text>
      <Text>
        name: {user?.firstName} {user?.lastName}!
      </Text>
      <Text onPress={() => signOut()}>Sign Out</Text>
      <View className="flex gap-4">
        <Text className="text-xl" onPress={resetOnboarding}>
          RESET Onboarding
        </Text>
        <Text className="text-xl" onPress={completeOnboarding}>
          SET Onboarding
        </Text>
      </View>
    </View>
  );
}

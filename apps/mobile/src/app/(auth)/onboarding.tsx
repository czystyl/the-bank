import { Text, View } from "react-native";

import { useAuth } from "~/utils/authProvider";

export default function Onboarding() {
  const { completeOnboarding } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={completeOnboarding}>ONBOARDING</Text>
    </View>
  );
}

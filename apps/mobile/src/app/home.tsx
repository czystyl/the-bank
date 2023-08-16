import { ScrollView, Text, View } from "react-native";

import { api } from "~/utils/api";
import { useAuth } from "../utils/authProvider";

export default function Index() {
  const { signOut, user, resetOnboarding, completeOnboarding } = useAuth();

  const { data } = api.transaction.allNot.useQuery();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>id: {user?.id}!</Text>
      <Text>
        name: {user?.firstName} {user?.lastName}!
      </Text>
      <Text onPress={() => signOut()}>Sign Out</Text>
      <Text className="mt-10 text-xl" onPress={resetOnboarding}>
        RESET
      </Text>
      <Text className="mt-10 text-xl" onPress={completeOnboarding}>
        SET
      </Text>
      <ScrollView>
        {data?.map((transaction) => (
          <Text key={transaction.id}>{transaction.id}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

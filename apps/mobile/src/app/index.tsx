import { Text, View } from "react-native";

import { useAuth } from "../utils/authProvider";

export default function Index() {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>id: {user?.id}!</Text>
      <Text>
        name: {user?.firstName} {user?.lastName}!
      </Text>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </View>
  );
}

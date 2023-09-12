import { Dimensions, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";

import { useAuth } from "~/utils/authProvider";
import Typography from "~/components/Typography";

export default function TransactionScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user } = useAuth();

  return (
    <View>
      <Animated.Image
        sharedTransitionTag={id}
        source={{ uri: user?.imageUrl }}
        style={{
          height: Dimensions.get("screen").width,
          width: Dimensions.get("screen").width,
          borderRadius: Dimensions.get("screen").width,
        }}
      />
      <Text>Blog post: {id}</Text>
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Typography>Go Back</Typography>
      </Pressable>
    </View>
  );
}

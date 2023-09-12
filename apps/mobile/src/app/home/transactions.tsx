import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";

import { api } from "~/utils/api";
import { useAuth } from "~/utils/authProvider";
import Typography from "~/components/Typography";

export default function Transactions() {
  const { user } = useAuth();

  const transactionsResult = api.transaction.all.useQuery();

  return (
    <View>
      <ScrollView className="mx-4 flex gap-y-1">
        {transactionsResult.isLoading || transactionsResult.isFetching ? (
          <ActivityIndicator size={"large"} />
        ) : null}
        {transactionsResult.data?.map((transaction) => (
          <Pressable
            className="flex flex-row gap-3"
            key={transaction.id}
            onPress={() => {
              router.push(`/transaction/${transaction.uuid}`);
            }}
          >
            <Animated.Image
              source={{ uri: user?.imageUrl }}
              sharedTransitionTag={transaction.uuid ?? undefined}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
              }}
            />

            <View className="flex flex-1 justify-center">
              <Typography font="bold">John Doe</Typography>
              <Typography numberOfLines={1}>{transaction.title}</Typography>
              <Typography font="italic">{new Date().toDateString()}</Typography>
            </View>

            <View className="flex  items-end justify-center">
              <Typography classNames="text-xl" font="bold">
                ${transaction.value.toFixed(2)}
              </Typography>
              <Typography classNames="text-" font="italic">
                ${transaction.balance.toFixed(2)}
              </Typography>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

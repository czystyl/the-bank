import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";

import { api } from "~/utils/api";
import { formatTransactionValue } from "~/utils/formatTransactionValue";
import Typography from "~/components/Typography";

export default function TransactionScreen() {
  const params = useLocalSearchParams<{ uuid: string }>();

  const { data } = api.transaction.all.useQuery();

  const transactionResult = data?.find(
    (t) => t.transaction.uuid === params.uuid,
  );

  if (!transactionResult) {
    return null;
  }

  const { transaction, sender, recipient } = transactionResult;

  if (!sender || !recipient) {
    return null;
  }

  const senderTransitionTag =
    transaction.uuid + sender.clerkId + transaction.type;

  const recipientTransitionTag =
    transaction.uuid + recipient.clerkId + transaction.type;

  return (
    <View className="flex  p-4">
      <View className="flex flex-row justify-between">
        <View className="flex items-center">
          <Animated.Image
            source={{ uri: sender?.imageUrl }}
            style={styles.avatar}
            sharedTransitionTag={senderTransitionTag}
          />
          <Typography classNames="text-lg">{sender.firstName}</Typography>
        </View>

        <View className="flex items-center justify-center">
          <AntDesign name="arrowright" size={40} color="black" />
          <Typography classNames="text-2xl" font="bold">
            {formatTransactionValue(transaction.value, transaction.type)}
          </Typography>
        </View>

        <View className="flex items-center">
          <Animated.Image
            source={{ uri: recipient?.imageUrl }}
            sharedTransitionTag={recipientTransitionTag}
            style={styles.avatar}
          />
          <Typography classNames="text-lg">{recipient.firstName}</Typography>
        </View>
      </View>

      <View className="flex gap-2 pt-4">
        <View className="rounded-md bg-zinc-300">
          <View className="flex flex-row justify-between p-2">
            <Typography classNames="">UUID</Typography>
            <Typography classNames="">{transaction.uuid}</Typography>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Typography classNames="">Title</Typography>
            <Typography classNames="">{transaction.title}</Typography>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Typography classNames="">Date</Typography>
            <Typography classNames="">
              {dayjs(transaction.createdAt).format("DD/MM/YYYY ")}
            </Typography>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Typography classNames="">Time</Typography>
            <Typography classNames="">
              {dayjs(transaction.createdAt).format("HH:mm:ss ")}
            </Typography>
          </View>
        </View>

        <View className="rounded-md bg-zinc-300">
          <View className="flex flex-row justify-between p-2">
            <Typography classNames="">Value</Typography>
            <Typography classNames="">
              {transaction.value.toFixed(2)} $
            </Typography>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Typography classNames="">Type</Typography>
            <Typography classNames="">{transaction.type}</Typography>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Typography classNames="">Balance</Typography>
            <Typography classNames="">
              {transaction.balance.toFixed(2)} $
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

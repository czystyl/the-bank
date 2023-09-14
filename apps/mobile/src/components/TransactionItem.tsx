import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import dayjs from "dayjs";

import type { RouterOutputs } from "~/utils/api";
import { formatTransactionValue } from "~/utils/formatTransactionValue";
import Typography from "./Typography";

type TransactionResult = RouterOutputs["transaction"]["all"][number];

export default function TransactionItem({
  transaction,
  sender,
  recipient,
}: TransactionResult) {
  if (!sender || !recipient) {
    return;
  }

  const senderTransitionTag =
    transaction.uuid + sender.clerkId + transaction.type;
  const recipientTransitionTag =
    transaction.uuid + recipient.clerkId + transaction.type;

  return (
    <Pressable
      className="px-4 py-2"
      key={transaction.id}
      onPress={() => {
        router.push({
          pathname: `/home/transactions/${transaction.uuid}`,
          params: { senderTransitionTag, recipientTransitionTag },
        });
      }}
    >
      <View className="flex flex-row rounded-md bg-white p-2 shadow-md shadow-gray-500">
        <View style={styles.avatarContainer}>
          {sender.clerkId === recipient.clerkId ? (
            <Animated.Image
              source={{ uri: sender?.imageUrl }}
              style={styles.fullAvatar}
              sharedTransitionTag={senderTransitionTag}
            />
          ) : (
            <>
              <Animated.Image
                source={{ uri: sender?.imageUrl }}
                style={styles.avatar}
                sharedTransitionTag={senderTransitionTag}
              />

              <Animated.Image
                source={{ uri: recipient?.imageUrl }}
                sharedTransitionTag={recipientTransitionTag}
                style={[styles.avatar, styles.movedAvatar]}
              />
            </>
          )}
        </View>

        <View className="ml-2 flex flex-1 justify-center">
          <Typography classNames="text-lg" font="bold" numberOfLines={1}>
            {transaction.type === "INCOME"
              ? `${sender?.firstName} ${sender?.lastName}`
              : `${recipient?.firstName} ${recipient?.lastName}`}
          </Typography>

          <Typography numberOfLines={2} classNames="text-md" font="medium">
            {transaction.title}
          </Typography>

          <Typography classNames="pt-1 text-xs" font="italic">
            {dayjs(transaction.createdAt).format("DD/MM/YYYY ")}
          </Typography>
        </View>

        <View className="flex items-end justify-center pl-1">
          <Typography classNames="text-lg" font="bold">
            {formatTransactionValue(transaction.value, transaction.type)}
          </Typography>

          <Typography classNames="text-sm text-gray-600" font="italic">
            {transaction.balance.toFixed(2)} $
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    height: 80,
    width: 80,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  fullAvatar: {
    height: 60,
    width: 60,
    borderRadius: 10,
    margin: 10,
  },
  movedAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

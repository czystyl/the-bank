import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { formatCurrencyValue } from "@the-bank/core";
import dayjs from "dayjs";

import type { RouterOutputs } from "~/lib/api";

type TransactionResult = RouterOutputs["transaction"]["all"][number];

export default function TransactionItem({
  transaction,
  sender,
  recipient,
}: TransactionResult) {
  if (!sender || !recipient) {
    return;
  }

  return (
    <Pressable
      className="px-4 py-2"
      onPress={() => {
        router.push({
          pathname: `/(home)/transactions/${transaction.uuid}`,
        });
      }}
    >
      <View className="flex flex-row rounded-md bg-white p-2 shadow-md shadow-gray-500">
        <View style={styles.avatarContainer}>
          {sender.clerkId === recipient.clerkId ? (
            <Animated.Image
              source={{ uri: sender?.imageUrl }}
              style={styles.fullAvatar}
            />
          ) : (
            <>
              <Animated.Image
                source={{ uri: sender?.imageUrl }}
                style={styles.avatar}
              />

              <Animated.Image
                source={{ uri: recipient?.imageUrl }}
                style={[styles.avatar, styles.movedAvatar]}
              />
            </>
          )}
        </View>

        <View className="ml-2 flex flex-1 justify-center">
          <Text className="text-lg font-bold" numberOfLines={1}>
            {transaction.type === "INCOME"
              ? `${sender?.firstName} ${sender?.lastName}`
              : `${recipient?.firstName} ${recipient?.lastName}`}
          </Text>

          <Text numberOfLines={2} className="text-md">
            {transaction.title}
          </Text>

          <Text className="pt-1 text-xs italic">
            {dayjs(transaction.createdAt).format("DD/MM/YYYY ")}
          </Text>
        </View>

        <View className="flex items-end justify-center pl-1">
          <Text className="text-lg font-bold">
            {formatCurrencyValue(transaction.value)}
          </Text>

          <Text className="text-sm italic text-gray-600">
            {transaction.balance.toFixed(2)} $
          </Text>
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

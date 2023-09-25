import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { formatCurrencyValue } from "@the-bank/core";
import dayjs from "dayjs";

export default function TransactionScreen() {
  const params = useLocalSearchParams<{ uuid: string }>();

  const sender = {
    clerkId: "1",
    firstName: "John",
    lastName: "Doe",
    imageUrl: undefined,
  };

  const recipient = {
    clerkId: "2",
    firstName: "Jane",
    lastName: "Doe",
    imageUrl: undefined,
  };

  const transaction = {
    uuid: "1",
    type: "transfer",
    title: "Transfer",
    value: 100,
    balance: 100,
    createdAt: "2021-06-01T00:00:00.000Z",
  };

  return (
    <View className="flex  p-4">
      <View className="flex flex-row justify-between">
        <Text>{params.uuid}</Text>
        <View className="flex items-center">
          <Animated.Image
            source={{ uri: sender?.imageUrl }}
            style={styles.avatar}
          />
          <Text className="text-lg">{sender.firstName}</Text>
        </View>

        <View className="flex items-center justify-center">
          <AntDesign name="arrowright" size={40} color="black" />
          <Text className="text-2xl font-bold">
            {formatCurrencyValue(transaction.value)}
          </Text>
        </View>

        <View className="flex items-center">
          <Animated.Image
            source={{ uri: recipient?.imageUrl }}
            style={styles.avatar}
          />
          <Text className="text-lg">{recipient.firstName}</Text>
        </View>
      </View>

      <View className="flex gap-2 pt-4">
        <View className="rounded-md bg-zinc-300">
          <View className="flex flex-row justify-between p-2">
            <Text className="font-bold">UUID</Text>
            <Text>{transaction.uuid}</Text>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Text className="font-bold">Title</Text>
            <Text>{transaction.title}</Text>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Text className="font-bold">Date</Text>
            <Text>{dayjs(transaction.createdAt).format("DD/MM/YYYY ")}</Text>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Text className="font-bold">Time</Text>
            <Text>{dayjs(transaction.createdAt).format("HH:mm:ss ")}</Text>
          </View>
        </View>

        <View className="rounded-md bg-zinc-300">
          <View className="flex flex-row justify-between p-2">
            <Text className="font-bold">Value</Text>
            <Text>{transaction.value.toFixed(2)} $</Text>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Text className="font-bold">Type</Text>
            <Text>{transaction.type}</Text>
          </View>

          <View className="flex flex-row justify-between p-2">
            <Text className="font-bold">Balance</Text>
            <Text>{transaction.balance.toFixed(2)} $</Text>
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

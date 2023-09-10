import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { api } from "~/utils/api";
import { useAuth } from "~/utils/authProvider";

export default function Transactions() {
  const { user } = useAuth();

  const transactionsResult = api.transaction.all.useQuery();

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 10,
        }}
      >
        {transactionsResult.isLoading || transactionsResult.isFetching ? (
          <ActivityIndicator size={"large"} />
        ) : null}
        {transactionsResult.data?.map((transaction) => (
          <Pressable
            key={transaction.id}
            className="flex flex-row items-center justify-between"
          >
            <Text className="text-lg">{transaction.id}</Text>
            <Text className="text-lg">{transaction.title}</Text>
            <Text className="text-lg">{transaction.value}</Text>
            <Text className="text-lg">{transaction.balance}</Text>
            <Text>
              {transaction.recipientUserId === user?.id ? "RECEIVED" : "SENT"}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

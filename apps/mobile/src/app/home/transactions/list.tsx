import { ActivityIndicator, FlatList, View } from "react-native";

import { api } from "~/utils/api";
import TransactionItem from "~/components/TransactionItem";

export default function Transactions() {
  const { data, isLoading, isFetching, refetch } =
    api.transaction.all.useQuery();

  if (isLoading) {
    return (
      <View className="h-full w-full flex-1 justify-center">
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        className="pt-20"
        data={data}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(item) => item.transaction.uuid}
        renderItem={({ item }) => {
          return (
            <TransactionItem
              transaction={item.transaction}
              sender={item.sender}
              recipient={item.recipient}
            />
          );
        }}
      />
    </>
  );
}

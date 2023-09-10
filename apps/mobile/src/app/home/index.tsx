import { Button, Text, View } from "react-native";
import { router } from "expo-router";

import { api } from "~/utils/api";

export default function test() {
  const apiUtils = api.useContext();

  const { data: userBalance, refetch: refetchBalance } =
    api.user.balance.useQuery();

  const { mutate: addFoundsMutation } = api.transaction.addFounds.useMutation({
    onSettled: () => {
      void refetchBalance();
      void apiUtils.transaction.all.refetch();
    },
  });

  return (
    <View>
      <Text className="text-2xl italic underline">Balance: ${userBalance}</Text>
      <Button
        title="Add founds"
        onPress={() => {
          addFoundsMutation({
            value: Math.random() * 100,
          });
        }}
      />
      <Button
        title="Transfer"
        onPress={() => {
          router.push("/transfer");
        }}
      />
    </View>
  );
}

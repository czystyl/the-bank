import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { api } from "~/utils/api";
import { useAuth } from "../utils/authProvider";

export default function Index() {
  const [title, setTitle] = useState("Hello world");
  const [value, setValue] = useState(1);
  const [selectedUser, setSelectedUser] = useState<string>(
    "user_2UkeUAyFzqA8tDeuWIxRBliktEU",
  );

  const { data: userBalance, refetch: refetchBalance } =
    api.user.balance.useQuery();

  const { signOut, user, resetOnboarding, completeOnboarding } = useAuth();
  const userResult = api.user.all.useQuery({
    limit: 10,
    offset: 0,
  });

  const transactionsResult = api.transaction.all.useQuery();

  const {
    mutate: mutateTransaction,
    isLoading,
    error,
  } = api.transaction.create.useMutation({
    onSettled: () => {
      void refetchBalance();
      void transactionsResult.refetch();
    },
  });

  const { mutate: addFoundsMutation } = api.transaction.addFounds.useMutation({
    onSettled: () => {
      void refetchBalance();
      void transactionsResult.refetch();
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>id: {user?.id}!</Text>
      <Text>
        name: {user?.firstName} {user?.lastName}!
      </Text>
      <Text onPress={() => signOut()}>Sign Out</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text className="mt-10 text-xl" onPress={resetOnboarding}>
          RESET
        </Text>
        <Text className="mt-10 text-xl" onPress={completeOnboarding}>
          SET
        </Text>
      </View>
      <Button
        title="Add founds"
        onPress={() => {
          addFoundsMutation({
            value: Math.random() * 100,
          });
        }}
      />

      <Text className="text-2xl italic underline">Balance: ${userBalance}</Text>

      <Pressable
        onPress={() => {
          void transactionsResult.refetch();
        }}
      >
        <Text className="text-lg text-green-700">Reload transactions</Text>
      </Pressable>

      <ScrollView>
        {transactionsResult.isLoading || transactionsResult.isFetching ? (
          <ActivityIndicator size={"large"} />
        ) : null}
        {transactionsResult.data?.map((transaction) => (
          <Pressable
            key={transaction.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Text>
              {transaction.id} : {transaction.title} - {transaction.value} ={" "}
              {transaction.balance}
            </Text>
            <Text>
              {transaction.recipientUserId === user?.id ? "RECEIVED" : "SENT"}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View
        style={{
          padding: 20,
          width: "100%",
          alignItems: "center",
          backgroundColor: "lightgreen",
        }}
      >
        <Text style={{ fontSize: 30 }}>TRANSACTION</Text>
        <TextInput
          style={{ borderWidth: 1, width: "80%" }}
          value={value.toString()}
          placeholder="Value"
          placeholderTextColor={"black"}
          keyboardType="numeric"
          onChangeText={(text) => setValue(parseInt(text, 10))}
        />
        <TextInput
          style={{ borderWidth: 1, width: "80%" }}
          value={title}
          onChangeText={setTitle}
        />
        <Text>SELECTED USER: {selectedUser ?? "NO SELECTED"}</Text>
        {isLoading ? <ActivityIndicator size={"large"} /> : null}
        {error ? <Text className="text-xl">{error.message}</Text> : null}
        <Button
          title="Create transaction"
          onPress={() => {
            if (!selectedUser) {
              Alert.alert("Select a user");
              return;
            }

            mutateTransaction({
              title,
              value,
              recipientUserId: selectedUser,
            });
          }}
        />
      </View>

      <ScrollView>
        {userResult.isLoading ? <ActivityIndicator size={"large"} /> : null}
        {userResult.data?.map((user) => (
          <Pressable
            key={user.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            onPress={() => setSelectedUser(user.id)}
          >
            <Image source={{ uri: user.imageUrl, height: 25, width: 25 }} />
            <Text>
              {user.firstName} {user.lastName} -
              {user.emailAddresses[0]?.emailAddress}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

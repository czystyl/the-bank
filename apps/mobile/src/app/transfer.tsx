import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

import { api } from "~/utils/api";
import Slider from "~/components/Slider";

export default function Transactions() {
  const [title, setTitle] = useState("Hello world");
  const [value, setValue] = useState(1);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const apiUtils = api.useContext();

  const userResult = api.user.all.useQuery({ limit: 10, offset: 0 });

  const { mutate, isLoading, error } = api.transaction.create.useMutation({
    onSuccess: () => {
      void apiUtils.user.balance.refetch();
      void apiUtils.transaction.all.refetch();
      router.back();
    },
  });

  return (
    <View className="flex flex-1 justify-center">
      <ScrollView horizontal>
        {userResult.isLoading ? <ActivityIndicator size={"large"} /> : null}
        {userResult.data?.map((user) => (
          <Pressable
            key={user.id}
            className="m-4 flex items-center"
            onPress={() => setSelectedUser("user.id")}
          >
            <Image
              source={{ uri: user.imageUrl, height: 50, width: 50 }}
              className="rounded-full"
            />
            <Text>{user.firstName}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Slider />

      <View className="flex items-center gap-3 px-4">
        <Text className="text-xl">TRANSACTION</Text>
        <TextInput
          className="w-full border-2 p-4"
          value={value.toString()}
          placeholder="Value"
          placeholderTextColor={"black"}
          keyboardType="numeric"
          onChangeText={(text) => setValue(parseInt(text, 10))}
        />
        <TextInput
          className="w-full border-2 p-4"
          value={title}
          onChangeText={setTitle}
        />
        <Text>SELECTED USER: {selectedUser ?? "NO SELECTED"}</Text>

        {isLoading ? <ActivityIndicator size={"large"} /> : null}

        {error ? <Text className="text-xl">{error.message}</Text> : null}

        <Pressable
          className="rounded-md border bg-green-500 px-4 py-2"
          onPress={() => {
            if (!selectedUser) {
              return Alert.alert("Select a user");
            }

            mutate({ title, value, recipientUserId: selectedUser });
          }}
        >
          <Text className="text-lg font-bold">SEND 💰§</Text>
        </Pressable>
      </View>
    </View>
  );
}

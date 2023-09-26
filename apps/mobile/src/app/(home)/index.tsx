import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { formatCurrencyValue } from "@the-bank/core";

import { api } from "~/lib/api";
import { useAuth } from "~/lib/authProvider";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const apiUtils = api.useContext();

  const { data: userBalance, isLoading } = api.user.balance.useQuery();
  const { mutate: addFoundsMutation } = api.transaction.addFounds.useMutation({
    onSettled: () => {
      void apiUtils.user.balance.invalidate();
      void apiUtils.transaction.all.refetch();
    },
  });

  return (
    <SafeAreaView className="flex flex-1 justify-between px-4" edges={["top"]}>
      <View className="mt-4 flex flex-row items-center justify-between">
        <Image
          source={{ uri: user?.imageUrl }}
          className="h-10 w-10 rounded-full"
        />
        <Text className="ml-4 text-3xl font-light">
          Hello{" "}
          <Text className="text-3xl font-bold italic">
            {user?.firstName} 👋
          </Text>
        </Text>
        <Pressable
          onPress={() => {
            void signOut();
          }}
        >
          <MaterialIcons name="logout" size={32} color="black" />
        </Pressable>
      </View>

      <View className="flex flex-1 items-center justify-center">
        <Text className="text-3xl text-slate-500">Balance:</Text>
        <Text className="mt-4 text-5xl font-bold text-slate-700">
          {isLoading ? <ActivityIndicator size="large" color="green" /> : null}
          {formatCurrencyValue(userBalance)}
        </Text>

        <View className="mt-10 flex flex-row items-center justify-center gap-x-10">
          <Pressable
            className="w-1/3 rounded-full bg-gray-300 px-6 py-4"
            onPress={() => {
              Alert.prompt("Boost Your Treasure Chest!", "", [
                { text: "Skip Turn!", style: "cancel" },
                {
                  text: "Let's cheat 💸",
                  style: "destructive",
                  onPress: (value) => {
                    const parsedValue = Number(value);
                    const isValidNumber = !Number.isNaN(parsedValue);

                    if (isValidNumber && parsedValue > 0) {
                      addFoundsMutation({ value: parsedValue });
                    }
                  },
                },
              ]);
            }}
          >
            <Text className="text-center text-lg font-bold text-slate-800">
              Add Money
            </Text>
          </Pressable>

          <Pressable
            className="w-1/3 rounded-full bg-gray-300 px-6 py-4"
            onPress={() => {
              router.push("/transfer");
            }}
          >
            <Text className="text-center text-lg font-bold text-slate-800">
              Transfer
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { Easing, Notifier } from "react-native-notifier";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import type { PusherEvent } from "@pusher/pusher-websocket-react-native";
import { Pusher } from "@pusher/pusher-websocket-react-native";
import {
  AddFoundEventSchema,
  channels,
  formatCurrencyValue,
  NewTransactionEventSchema,
} from "@the-bank/core";

import { api } from "~/utils/api";
import { useAuth } from "~/utils/authProvider";
import { formatValue } from "~/utils/formatTransactionValue";

const pusher = Pusher.getInstance();

pusher.init({
  apiKey: "ed7ec9fd7aff78d89c28",
  cluster: "eu",
});

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const apiUtils = api.useContext();

  useEffect(() => {
    async function events() {
      try {
        await pusher.connect();

        await pusher.subscribe({
          channelName: channels.mainChannel.name,
          onEvent: (event: PusherEvent) => {
            console.log(event.eventName);

            if (event.eventName === channels.mainChannel.events.addFounds) {
              try {
                const data = JSON.parse(event.data as string);
                const parsedData = AddFoundEventSchema.parse(data);

                Notifier.showNotification({
                  title: "Cheat mode detected! 🤥",
                  description: `${
                    parsedData.clerkUserId === user?.id ? "You" : "Someone"
                  } added ${formatCurrencyValue(
                    parsedData.value,
                  )} to your account!`,
                  showAnimationDuration: 800,
                  showEasing: Easing.bounce,
                  onPress: () => console.log("Press"),
                });
                return;

                console.log(user?.id);
              } catch (error) {
                console.log(error);
              }
            }

            if (
              event.eventName === channels.mainChannel.events.newTransaction
            ) {
              try {
                const data = JSON.parse(event.data as string);

                const parsedData = NewTransactionEventSchema.parse(data);

                if (parsedData.recipient.clerkUserId === user?.id) {
                  Notifier.showNotification({
                    title: "You get money!",
                    description: `${
                      parsedData.sender.name
                    } send you ${formatCurrencyValue(
                      parsedData.value,
                    )} to your account!`,
                    showAnimationDuration: 800,
                    showEasing: Easing.bounce,
                    onPress: () => console.log("Press"),
                  });

                  return;
                }
              } catch (error) {
                console.log(error);
              }
            }
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    events().catch(console.log);

    return () => {
      console.log("bye");
      pusher
        .unsubscribe({ channelName: channels.mainChannel.name })
        .catch(console.log);

      pusher.disconnect().catch(console.log);
    };
  }, [user?.id]);

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
          {formatValue(userBalance)}
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

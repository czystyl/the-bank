import { useEffect } from "react";
import { Easing, Notifier } from "react-native-notifier";
import type { PusherEvent } from "@pusher/pusher-websocket-react-native";
import { Pusher } from "@pusher/pusher-websocket-react-native";
import {
  AddFoundEventSchema,
  channels,
  formatCurrencyValue,
  NewTransactionEventSchema,
} from "@the-bank/core";

import { api } from "./api";
import { useAuth } from "./authProvider";

export const PusherMobile = Pusher.getInstance();

if (!process.env.EXPO_PUBLIC_PUSHER_KEY) {
  throw new Error("Missing PUSKER_KEY env variable");
}

PusherMobile.init({
  apiKey: process.env.EXPO_PUBLIC_PUSHER_KEY,
  cluster: "eu",
});

export function usePusherUpdates() {
  const { user } = useAuth();
  const apiUtils = api.useContext();

  useEffect(() => {
    async function events() {
      try {
        await PusherMobile.connect();

        await PusherMobile.subscribe({
          channelName: channels.mainChannel.name,
          onEvent: (event: PusherEvent) => {
            if (event.eventName === channels.mainChannel.events.addFounds) {
              const data = JSON.parse(event.data as string);
              const parsedData = AddFoundEventSchema.parse(data);

              apiUtils.user.balance
                .refetch()
                .then(console.log)
                .catch(console.log);

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
            }

            if (
              event.eventName === channels.mainChannel.events.newTransaction
            ) {
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
              }
            }
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    void events();

    return () => {
      void PusherMobile.unsubscribe({ channelName: channels.mainChannel.name });
      void PusherMobile.disconnect();
    };
  }, [apiUtils.user.balance, user?.id]);
}

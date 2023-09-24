import { useEffect } from "react";
import type { AddFoundEvent, NewTransactionEvent } from "@the-bank/core";
import { channels, formatCurrencyValue } from "@the-bank/core";
import { env } from "@the-bank/env";
import Pusher from "pusher-js";

import { useToast } from "~/components/ui/use-toast";
import { api } from "./api";

export const PusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: "eu",
});

export function usePusherUpdates() {
  const apiUtils = api.useContext();

  const { toast } = useToast();

  useEffect(() => {
    async function handler(data: AddFoundEvent) {
      toast({
        title: "A new transaction has been made",
        description: `Someone add ${formatCurrencyValue(
          data.value,
        )} to their account`,
      });

      await apiUtils.admin.invalidate();
    }

    const updateChannel = PusherClient.subscribe(channels.mainChannel.name);
    updateChannel.bind(channels.mainChannel.events.addFounds, handler);

    return () => {
      PusherClient.unsubscribe(channels.mainChannel.name);
      updateChannel.unbind(channels.mainChannel.events.addFounds, handler);
    };
  }, [toast, apiUtils.admin]);

  useEffect(() => {
    async function handler(data: NewTransactionEvent) {
      toast({
        title: "A new transaction has been made",
        description: `${data.sender.name} send ${formatCurrencyValue(
          data.value,
        )} to ${data.recipient.name}`,
      });

      await apiUtils.admin.invalidate();
    }

    const updateChannel = PusherClient.subscribe(channels.mainChannel.name);
    updateChannel.bind(channels.mainChannel.events.newTransaction, handler);

    return () => {
      PusherClient.unsubscribe(channels.mainChannel.name);
      updateChannel.unbind(channels.mainChannel.events.newTransaction, handler);
    };
  }, [toast, apiUtils.admin]);
}

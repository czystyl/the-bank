"use client";

import { useEffect } from "react";
import type { AddFoundEvent, NewFoundEvent } from "@the-bank/core";
import { channels, formatCurrencyValue } from "@the-bank/core";
import dayjs from "dayjs";

import { api } from "~/lib/api";
import { PusherClient } from "~/lib/pusher";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "./ui/use-toast";

export function RecentTransactions() {
  const { data } = api.admin.recentTransactions.useQuery({ limit: 5 });
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
    async function handler(data: NewFoundEvent) {
      toast({
        title: "A new transaction has been made",
        description: `${data.sender} send ${formatCurrencyValue(
          data.value,
        )} to ${data.recipient}`,
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

  return (
    <div className="space-y-8">
      {data?.map(({ transaction, sender, recipient }) => (
        <div className="h relative flex h-9 items-center " key={transaction.id}>
          <div className="h-12 w-12">
            <Avatar className="h-8 w-8">
              <AvatarImage src={sender?.imageUrl} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <Avatar className="absolute left-4 top-3 h-8 w-8">
              <AvatarImage src={recipient?.imageUrl} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.title}
            </p>
            <p className="text-muted-foreground text-sm">
              {dayjs(transaction.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {formatCurrencyValue(transaction.value)}
          </div>
        </div>
      ))}
    </div>
  );
}

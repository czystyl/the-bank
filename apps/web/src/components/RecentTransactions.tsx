"use client";

import { formatCurrencyValue } from "@the-bank/core";
import dayjs from "dayjs";

import { api } from "~/lib/api";
import { usePusherUpdates } from "~/lib/pusher";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export function RecentTransactions() {
  const { data, isLoading } = api.admin.recentTransactions.useQuery({
    limit: 5,
  });

  usePusherUpdates();

  if (isLoading) {
    return (
      <div className="space-y-8">
        {new Array(5).fill(null).map((_, index) => (
          <div key={index} className="flex flex-row gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-1 flex-col gap-2 ">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

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

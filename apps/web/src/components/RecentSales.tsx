import dayjs from "dayjs";

import { serverAPIClient } from "~/utils/serverAPIClient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function RecentSales() {
  const data = await serverAPIClient().admin.recentTransactions({ limit: 5 });

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
          <div className="ml-auto font-medium">{transaction.value}$</div>
        </div>
      ))}
    </div>
  );
}

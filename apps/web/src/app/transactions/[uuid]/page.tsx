import type { Metadata } from "next";
import { UserButton } from "@clerk/nextjs";
import dayjs from "dayjs";

import { ModeToggle } from "~/components/ModeToggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { serverAPIClient } from "~/utils/serverAPIClient";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Example transactions app built using the components.",
};

export default async function TransactionsPage({
  params,
}: {
  params: { uuid: string };
}) {
  const transaction = (
    await serverAPIClient().admin.recentTransactions({ limit: 100 })
  ).find((transaction) => transaction.transaction.uuid === params.uuid);

  if (!transaction) {
    return;
  }

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent">
            The Bank
          </h1>

          <div className="ml-auto flex items-center space-x-4">
            <UserButton />
            <ModeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2>Transaction uuid: {params.uuid}</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">UUID</TableHead>

              <TableHead>Title</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={transaction.transaction.uuid}>
              <TableCell className="font-medium">
                {transaction.transaction.uuid}
              </TableCell>
              <TableCell>{transaction.transaction.title}</TableCell>
              <TableCell>
                {transaction.sender?.firstName} {transaction.sender?.lastName}
              </TableCell>
              <TableCell>
                {transaction.recipient?.firstName}{" "}
                {transaction.recipient?.lastName}
              </TableCell>
              <TableCell>
                {dayjs(transaction.transaction.createdAt).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell className="text-right">
                {transaction.transaction.value}$
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

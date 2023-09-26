import Link from "next/link";
import { formatCurrencyValue } from "@the-bank/core";
import dayjs from "dayjs";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function TransactionsTab() {
  const dummyTransactions = [
    {
      transaction: {
        id: 1,
        uuid: "kgi3g9lafj3",
        title: "Transaction 1",
        value: 100,
        createdAt: "2021-01-01",
      },
      sender: {
        id: 1,
        clerkId: "clerk-1",
        firstName: "John",
        lastName: "Doe",
        createdAt: "2021-01-01",
      },
      recipient: {
        id: 2,
        clerkId: "clerk-2",
        firstName: "Jane",
        lastName: "Doe",
        createdAt: "2021-01-01",
      },
    },
    {
      transaction: {
        id: 2,
        uuid: "lapfj3kgi39",
        title: "Transaction 2",
        value: 200,
        createdAt: "2021-01-01",
      },
      sender: {
        id: 3,
        clerkId: "clerk-3",
        firstName: "John",
        lastName: "Smith",
        createdAt: "2021-01-01",
      },
      recipient: {
        id: 4,
        clerkId: "clerk-4",
        firstName: "Jane",
        lastName: "Smith",
        createdAt: "2021-01-01",
      },
    },
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>

      <CardContent className="pl-2">
        <Table>
          <TableCaption>A list of transactions.</TableCaption>
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
            {dummyTransactions.map(({ transaction, sender, recipient }) => (
              <Link
                key={transaction.uuid}
                href={`/dashboard/transactions/${transaction.uuid}`}
                legacyBehavior
              >
                <TableRow key={transaction.uuid}>
                  <TableCell className="font-medium">
                    {transaction.uuid}
                  </TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>
                    {sender?.firstName} {sender?.lastName}
                  </TableCell>
                  <TableCell>
                    {recipient?.firstName} {recipient?.lastName}
                  </TableCell>
                  <TableCell>
                    {dayjs(transaction.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyValue(transaction.value)}$
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

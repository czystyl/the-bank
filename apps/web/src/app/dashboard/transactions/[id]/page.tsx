import type { Metadata } from "next";
import Link from "next/link";
import { formatTransactionValue, formatValue } from "@the-bank/core";
import dayjs from "dayjs";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { serverAPIClient } from "~/utils/serverAPIClient";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Example transactions app built using the components.",
};

type TransactionsPageProps = {
  params: {
    id: string;
  };
};

export default async function TransactionsPage({
  params,
}: TransactionsPageProps) {
  const transaction = await serverAPIClient().admin.getTransaction({
    id: Number(params.id),
  });

  if (!transaction) {
    return (
      <div className="mx-auto mt-10 w-1/4">
        <p>Transaction not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-1/4">
      <Link href="/dashboard">
        <div className="flex items-center">
          <ArrowLeft className="my-4 h-10 w-10" />
          Back
        </div>
      </Link>

      <Card className="text-center">
        <CardHeader>
          <CardTitle>{transaction.transaction.title}</CardTitle>
          <CardDescription>{transaction.transaction.uuid}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-4 flex items-center justify-between">
            <div>
              <Avatar className="mx-auto h-[150px] w-[150px]">
                <AvatarImage src={transaction.sender?.imageUrl} alt="Avatar" />
                <AvatarFallback>
                  {transaction.sender?.firstName?.at(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <ArrowRight />
            <div>
              <Avatar className="mx-auto h-[150px] w-[150px]">
                <AvatarImage src={transaction.sender?.imageUrl} alt="Avatar" />
                <AvatarFallback>
                  {transaction.sender?.firstName?.at(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p>TYPE: {transaction.transaction.type}</p>
          <p>
            BALANCE: {formatValue({ value: transaction.transaction.balance })}
          </p>
          <p>
            Value:{" "}
            {formatTransactionValue(
              transaction.transaction.value,
              transaction.transaction.type,
            )}
          </p>
          <p>TITLE: {transaction.transaction.title}</p>
        </CardContent>
        <CardFooter>
          <p>
            Created at{" "}
            {dayjs(transaction.transaction?.createdAt).format("DD-MM-YYYY")}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { formatCurrencyValue } from "@the-bank/core";
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

export const metadata: Metadata = {
  title: "Transactions",
  description: "Example transactions app built using the components.",
};

interface TransactionsPageProps {
  params: {
    id: string;
  };
}

export default function TransactionsPage({ params }: TransactionsPageProps) {
  const transaction = {
    transaction: {
      id: 1,
      uuid: params.id,
      title: "Transaction 1",
      value: 100,
      createdAt: "2021-01-01",
      type: "DEPOSIT",
      balance: 1000,
    },
    sender: {
      id: 1,
      clerkId: "clerk-1",
      firstName: "John",
      lastName: "Doe",
      createdAt: "2021-01-01",
      imageUrl: "https://placehold.co/600x400?text=Hello+World",
    },
  };

  return (
    <div className="mx-auto w-1/3">
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
          <p>BALANCE: {formatCurrencyValue(transaction.transaction.balance)}</p>
          <p>Value: {formatCurrencyValue(transaction.transaction.value)}</p>
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

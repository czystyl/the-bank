import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import TransactionItem from "~/components/TransactionItem";

export default function Transactions() {
  const dummyTransactions = [
    {
      transaction: {
        uuid: "uuid-1",
        type: "transfer",
        title: "Transfer",
        value: 100,
        balance: 100,
        createdAt: "2021-06-01T00:00:00.000Z",
      },
      sender: {
        clerkId: "1",
        firstName: "John",
        lastName: "Doe",
      },
      recipient: {
        clerkId: "2",
        firstName: "Jane",
        lastName: "Doe",
      },
    },
    {
      transaction: {
        uuid: "uuid-2",
        type: "transfer",
        title: "Transfer",
        value: 100,
        balance: 100,
        createdAt: "2021-06-01T00:00:00.000Z",
      },
      sender: {
        clerkId: "1",
        firstName: "John",
        lastName: "Doe",
      },
      recipient: {
        clerkId: "2",
        firstName: "Jane",
        lastName: "Doe",
      },
    },
  ];

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView className="pt-20">
        {dummyTransactions.map(({ transaction, sender, recipient }) => {
          return (
            <TransactionItem
              key={transaction.uuid}
              transaction={transaction}
              sender={sender}
              recipient={recipient}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

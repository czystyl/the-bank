import dayjs from "dayjs";

import { serverAPIClient } from "~/utils/serverAPIClient";
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

export default async function TransactionsTab() {
  const transactions = await serverAPIClient().admin.recentTransactions({
    limit: 100,
  });

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
            {transactions.map(({ transaction, sender, recipient }) => (
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
                  {transaction.value}$
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

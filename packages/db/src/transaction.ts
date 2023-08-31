import { and, desc, eq, InferInsertModel, or, sql } from "drizzle-orm";

import { db } from "./db";
import { transactions } from "./schema";

export function getTransaction(uuid: string) {
  return db.select().from(transactions).where(eq(transactions.uuid, uuid));
}

type TransactionInput = InferInsertModel<typeof transactions>;

type CreateTransactionInput = Pick<
  TransactionInput,
  "title" | "value" | "recipientUserId" | "senderUserId"
>;

export async function createTransaction(data: CreateTransactionInput) {
  const senderAccountBalance = await getAccountBalance(data.senderUserId);
  const recipientAccountBalance = await getAccountBalance(data.recipientUserId);

  if (senderAccountBalance < data.value) {
    throw new Error("Not enough funds!");
  }

  await db.insert(transactions).values([
    {
      ...data,
      value: data.value * -1,
      type: "OUTGOING",
      balance: senderAccountBalance - data.value,
    },
    {
      ...data,
      type: "INCOME",
      balance: recipientAccountBalance + data.value,
    },
  ]);
}

export async function addFounds(userId: string, value: number) {
  const accountBalance = await getAccountBalance(userId);

  await db.insert(transactions).values({
    title: "Add founds",
    value,
    type: "INCOME",
    recipientUserId: userId,
    senderUserId: userId,
    balance: accountBalance + value,
  });
}

export async function getAccountBalance(clerkUserID: string) {
  const lastTransactionDetails = await db
    .select({ balance: transactions.balance })
    .from(transactions)
    .where(
      or(
        and(
          eq(transactions.senderUserId, clerkUserID),
          eq(transactions.type, "OUTGOING"),
        ),

        and(
          eq(transactions.recipientUserId, clerkUserID),
          eq(transactions.type, "INCOME"),
        ),
      ),
    )
    .orderBy(desc(transactions.id))
    .limit(1);

  return lastTransactionDetails[0]?.balance ?? 0;
}

export function getTransactions(clerkUserID: string) {
  return db
    .select()
    .from(transactions)
    .where(
      or(
        and(
          eq(transactions.senderUserId, clerkUserID),
          eq(transactions.type, "OUTGOING"),
        ),

        and(
          eq(transactions.recipientUserId, clerkUserID),
          eq(transactions.type, "INCOME"),
        ),
      ),
    )
    .orderBy(desc(transactions.id));
}

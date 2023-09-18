import { and, desc, eq, InferInsertModel, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";

import { db } from "./db";
import { transactions, users } from "./schema";

export function getTransaction(uuid: string) {
  return db.select().from(transactions).where(eq(transactions.uuid, uuid));
}

type TransactionInput = InferInsertModel<typeof transactions>;

type CreateTransactionInput = Pick<
  TransactionInput,
  "title" | "value" | "recipientUserId" | "senderUserId"
>;

export async function createTransaction(
  data: CreateTransactionInput,
  skipValidation = false,
) {
  const senderAccountBalance = await getAccountBalance(data.senderUserId);
  const recipientAccountBalance = await getAccountBalance(data.recipientUserId);

  if (senderAccountBalance < data.value && !skipValidation) {
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

export function getTransactions(userId: string) {
  const senderAlias = alias(users, "sender");
  const recipientAlias = alias(users, "recipient");
  const transactionAlias = alias(transactions, "transaction");

  return db
    .select()
    .from(transactionAlias)
    .leftJoin(
      senderAlias,
      eq(transactionAlias.senderUserId, senderAlias.clerkId),
    )
    .leftJoin(
      recipientAlias,
      eq(transactionAlias.recipientUserId, recipientAlias.clerkId),
    )

    .where(
      or(
        and(
          eq(transactionAlias.senderUserId, userId),
          eq(transactionAlias.type, "OUTGOING"),
        ),

        and(
          eq(transactionAlias.recipientUserId, userId),
          eq(transactionAlias.type, "INCOME"),
        ),
      ),
    )
    .orderBy(desc(transactionAlias.id))
    .limit(0);
}

import type { InferInsertModel } from "drizzle-orm";
import { and, desc, eq, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { nanoid } from "nanoid";

import { db } from "./db";
import { transactions, users } from "./schema";

type TransactionInput = InferInsertModel<typeof transactions>;

type CreateTransactionInput = Pick<
  TransactionInput,
  "title" | "value" | "recipientUserId" | "senderUserId" | "createdAt"
>;

interface CreateTransactionParams {
  data: CreateTransactionInput;
  skipValidation?: boolean;
}

export async function createTransaction({
  data,
  skipValidation,
}: CreateTransactionParams) {
  const senderAccountBalance = await getAccountBalance(data.senderUserId);
  const recipientAccountBalance = await getAccountBalance(data.recipientUserId);

  if (senderAccountBalance < data.value && !skipValidation) {
    throw new Error("Not enough funds!");
  }

  const transactionID = nanoid();

  await db.insert(transactions).values([
    {
      ...data,
      uuid: transactionID,
      value: data.value * -1,
      type: "OUTGOING",
      balance: senderAccountBalance - data.value,
    },
    {
      ...data,
      uuid: transactionID,
      type: "INCOME",
      balance: recipientAccountBalance + data.value,
    },
  ]);
}

export async function addFounds(userId: string, value: number) {
  const accountBalance = await getAccountBalance(userId);

  const transactionID = nanoid();

  await db.insert(transactions).values({
    uuid: transactionID,
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
    .orderBy(desc(transactionAlias.id));
}

export async function getTransaction(id: number) {
  const senderAlias = alias(users, "sender");
  const recipientAlias = alias(users, "recipient");
  const transactionAlias = alias(transactions, "transaction");

  const result = await db
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
    .where(eq(transactionAlias.id, id))
    .limit(1);

  return result[0];
}

export function getRecentTransactions(limit: number) {
  const transactionAlias = alias(transactions, "transaction");
  const senderAlias = alias(users, "sender");
  const recipientAlias = alias(users, "recipient");

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
    .orderBy(desc(transactionAlias.id))
    .where(eq(transactionAlias.type, "INCOME"))
    .limit(limit);
}

export async function getTotalVolume() {
  const result = await db
    .select({
      totalVolume: sql<number>`SUM(${transactions.value})`,
    })
    .from(transactions)
    .where(eq(transactions.type, "INCOME"));

  return result[0]?.totalVolume ?? 0;
}

export async function getTransactionCount() {
  const result = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(transactions)
    .where(and(eq(transactions.type, "INCOME")));

  return result[0]?.count ?? 0;
}

export async function getTransactionAvg() {
  const result = await db
    .select({
      avg: sql<number>`AVG(${transactions.value})`,
    })
    .from(transactions)
    .where(and(eq(transactions.type, "INCOME")));

  return result[0]?.avg ?? 0;
}

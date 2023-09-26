import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { and, desc, eq, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { nanoid } from "nanoid";

import { db } from "./db";
import { transactions, users } from "./schema";

type TransactionInput = InferInsertModel<typeof transactions>;

type TransactionSelect = InferSelectModel<typeof transactions>;
type UserSelect = InferSelectModel<typeof users>;

interface Transaction {
  transaction: TransactionSelect;
  sender: UserSelect | null;
  recipient: UserSelect | null;
}

type CreateTransactionInput = Pick<
  TransactionInput,
  "title" | "value" | "recipientUserId" | "senderUserId" | "createdAt"
>;

interface CreateTransactionParams {
  data: CreateTransactionInput;
  skipValidation?: boolean;
}

export async function getAccountBalance(clerkUserID: string): Promise<number> {
  // Get latest transaction and extract balance
}

export async function addFounds(userId: string, value: number) {
  const accountBalance = await getAccountBalance(userId);

  const transactionID = nanoid();

  // TODO Insert to DB
}

export function getRecentTransactions(limit: number): Promise<Transaction[]> {
  const transactionAlias = alias(transactions, "transaction");
  const senderAlias = alias(users, "sender");
  const recipientAlias = alias(users, "recipient");

  // Get recent transactions and join with users table using aliases
}

/**
 * Return total transaction volume
 */
export async function getTotalVolume(): Promise<number> {}

/**
 * Return total transaction count
 */
export async function getTransactionCount() {}

/**
 * Return average transaction value
 */
export async function getTransactionAvg(): Promise<number> {}

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

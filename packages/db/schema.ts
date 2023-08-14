import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const transactions = mysqlTable("transactions", {
  id: serial("id").primaryKey(),
  transactionID: varchar("cuid", { length: 256 }),
  title: varchar("title", { length: 256 }),
  amount: int("amount"),
  recipientClerkUserId: varchar("recipient_clerk_user_id", { length: 256 }),
  senderClerkUserId: varchar("sender_clerk_user_id", { length: 256 }),
});

import { relations, sql } from "drizzle-orm";
import {
  float,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const transactions = mysqlTable("transactions", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid", { length: 36 })
    .default(sql`(UUID())`)
    .unique(),
  title: varchar("title", { length: 256 }).notNull(),
  value: float("amount").notNull(),
  balance: float("balance").notNull(),
  type: mysqlEnum("type", ["INCOME", "OUTGOING"]).notNull(),
  senderUserId: varchar("sender_user_id", { length: 100 }).notNull(),
  recipientUserId: varchar("recipient_user_id", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

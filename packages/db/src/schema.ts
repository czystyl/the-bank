import { relations, sql } from "drizzle-orm";
import {
  float,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

export const transactions = mysqlTable("transactions", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid", { length: 36 })
    .default(sql`(UUID())`)
    .notNull()
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

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    clerkId: varchar("clerk_id", { length: 256 }).notNull().unique(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    imageUrl: varchar("image_url", { length: 256 }).notNull().unique(),
  },
  (t) => ({
    fullName: unique().on(t.firstName, t.lastName),
  }),
);

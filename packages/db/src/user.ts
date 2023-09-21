import { DatabaseError } from "@planetscale/database";
import {
  and,
  desc,
  eq,
  InferInsertModel,
  InferSelectModel,
  or,
  sql,
} from "drizzle-orm";

import { db } from "./db";
import { users } from "./schema";

type UserInput = InferInsertModel<typeof users>;
type UserSelect = InferSelectModel<typeof users>;

/**
 * This function should only be used in script package,
 * and we want to ignore duplicate errors
 */
export async function insertUser(data: UserInput) {
  try {
    return await db.insert(users).values(data);
  } catch (error) {
    if (
      error instanceof DatabaseError &&
      error.message.includes("Duplicate entry")
    ) {
      console.log("Users already exist, skipping insert");
      return null;
    }

    console.log(error);

    return null;
  }
}

export async function getUsers(limit = 10, offset = 0) {
  return await db
    .select()
    .from(users)
    .orderBy(desc(users.clerkId))
    .limit(limit)
    .offset(offset);
}

export async function getAllUsers() {
  return await db.select().from(users).orderBy(desc(users.clerkId));
}

export async function getUser(clerkId: UserSelect["clerkId"]) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (!user) {
    return null;
  }

  return user;
}

export async function getUsersCount() {
  const results = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(users);

  return results[0]?.count ?? 0;
}

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
export async function insertUsers(data: UserInput[]) {
  try {
    return await db.insert(users).values(data);
  } catch (error) {
    // We do not care about duplicate errors
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

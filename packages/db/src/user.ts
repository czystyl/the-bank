import { DatabaseError } from "@planetscale/database";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { desc, eq, sql } from "drizzle-orm";

import { db } from "./db";
import type { users } from "./schema";
import { transactions } from "./schema";

type UserInput = InferInsertModel<typeof users>;
type UserSelect = InferSelectModel<typeof users>;

/**
 * This function should only be used in script package,
 * and we want to ignore duplicate errors
 */
export async function insertUser(data: UserInput) {
  try {
    //
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

/**
 * Return paginated user list
 */
export async function getUsers(limit = 10, offset = 0): Promise<UserSelect[]> {}

/**
 * Return all users
 */
export async function getAllUsers(): Promise<UserSelect[]> {}

export async function getUser(
  clerkId: UserSelect["clerkId"],
): Promise<UserSelect> {}

/**
 * Return total user count
 */
export async function getUsersCount() {}

// Create DB Instance (Docker or PlanetScale)
// Add DATABASE _URL to envs
// Configure Drizzle Kit (drizzle.config.ts)
// Configure Database Connection
// Create DB Schema using Drizzle ORM (schema.ts)
// Check schema in the Drizzle Studio
// Seed DB

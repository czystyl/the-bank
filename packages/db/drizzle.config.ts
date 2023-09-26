import { env } from "@the-bank/env";
import type { Config } from "drizzle-kit";

export default {
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
} satisfies Config;

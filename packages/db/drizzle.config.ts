import type { Config } from "drizzle-kit";

import { env } from "@bank-brew/env";

export default {
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
} satisfies Config;

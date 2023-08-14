import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { z } from "zod";

// Load environment variables from global .env file
config({ path: "../../.env" });

export const env = createEnv({
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z
      .union([
        z.literal("development"),
        z.literal("test"),
        z.literal("production"),
      ])
      .default("development"),
    DATABASE_URL: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});

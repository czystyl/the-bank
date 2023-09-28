import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
  /*
   * Server side Environment variables, not available on the client.
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
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});

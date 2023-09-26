import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  balance: protectedProcedure.query(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
  all: protectedProcedure.query(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
});

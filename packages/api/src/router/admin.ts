import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  recentTransactions: adminProcedure
    .input(z.object({ limit: z.number() }))
    .query(() => {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" });
    }),

  allUsers: adminProcedure.query(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),

  getTransaction: adminProcedure.query(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),

  getUser: adminProcedure.query(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),

  overviews: adminProcedure.query(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });

    return {
      totalVolume: 0,
      transactionCount: 0,
      userCount: 0,
      avgTransaction: 0,
    };
  }),
});

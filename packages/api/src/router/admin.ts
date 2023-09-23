import {
  getAllUsers,
  getRecentTransactions,
  getTotalVolume,
  getTransaction,
  getTransactionAvg,
  getTransactionCount,
  getUser,
  getUsersCount,
} from "@the-bank/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  recentTransactions: adminProcedure
    .input(
      z.object({
        limit: z.number(),
      }),
    )
    .query(async ({ input }) => {
      return getRecentTransactions(input.limit);
    }),

  allUsers: adminProcedure.query(async () => {
    return getAllUsers();
  }),

  getTransaction: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const transaction = await getTransaction(input.id);

      if (!transaction) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return transaction;
    }),

  getUser: adminProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input }) => {
      const user = await getUser(input.clerkId);

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return user;
    }),

  overviews: adminProcedure.query(async () => {
    const [totalVolume, transactionCount, userCount, avgTransaction] =
      await Promise.all([
        getTotalVolume(),
        getTransactionCount(),
        getUsersCount(),
        getTransactionAvg(),
      ]);

    return {
      totalVolume,
      transactionCount,
      userCount,
      avgTransaction,
    };
  }),
});

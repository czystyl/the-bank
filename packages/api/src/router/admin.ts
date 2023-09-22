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
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  recentTransactions: adminProcedure
    .input(
      z.object({
        limit: z.number(),
      }),
    )
    .query(({ input }) => {
      return getRecentTransactions(input.limit);
    }),

  allUsers: adminProcedure.query(() => {
    return getAllUsers();
  }),

  getTransaction: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return getTransaction(input.id);
    }),

  getUser: adminProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(({ input }) => {
      return getUser(input.clerkId);
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

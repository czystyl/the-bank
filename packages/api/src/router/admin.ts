import {
  getAllUsers,
  getRecentTransactions,
  getTotalVolume,
  getTransactionAvg,
  getTransactionCount,
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

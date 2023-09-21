import { getAccountBalance, getUsers } from "@the-bank/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  balance: protectedProcedure.query(async ({ ctx }) => {
    return getAccountBalance(ctx.auth.userId);
  }),
  all: protectedProcedure.query(async ({ ctx }) => {
    try {
      const users = await getUsers();

      const filteredList = users.filter(
        (user) => user.clerkId !== ctx.auth.userId,
      );

      return filteredList;
    } catch (error) {
      return [];
    }
  }),
});

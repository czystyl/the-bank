import { z } from "zod";

import { getAccountBalance, getUsers } from "@bank-brew/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  balance: protectedProcedure.query(async ({ ctx }) => {
    return getAccountBalance(ctx.auth.userId);
  }),
  all: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(100),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const users = await getUsers();

        const filteredList = users.filter(
          (user) => user.clerkId !== ctx.auth.userId,
        );

        return filteredList;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),
});

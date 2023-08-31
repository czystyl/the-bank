import { z } from "zod";

import { getAccountBalance } from "@bank-brew/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getPaginatedClerkUsers } from "../userService";

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
        const users = await getPaginatedClerkUsers(input.limit, input.offset);

        const filteredList = users.filter(
          (user) => user.id !== ctx.auth.userId,
        );

        return filteredList;
      } catch (error) {
        return null;
      }
    }),
});

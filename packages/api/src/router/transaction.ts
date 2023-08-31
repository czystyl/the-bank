import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { addFounds, createTransaction, getTransactions } from "@bank-brew/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getClerkUser } from "../userService";

export const transactionRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return getTransactions(ctx.auth.userId);
  }),

  addFounds: protectedProcedure
    .input(z.object({ value: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        await addFounds(ctx.auth.userId, input.value);
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            error instanceof Error
              ? error.message
              : "Error creating transaction!",
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3),
        value: z.number().min(1),
        recipientUserId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await getClerkUser(input.recipientUserId);

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found!",
        });
      }

      try {
        await createTransaction({
          title: input.title,
          value: input.value,
          senderUserId: ctx.auth.userId,
          recipientUserId: user.id,
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            error instanceof Error
              ? error.message
              : "Error creating transaction!",
        });
      }
    }),
});

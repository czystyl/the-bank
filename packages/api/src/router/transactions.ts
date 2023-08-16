import { and, eq, or } from "drizzle-orm";
import { z } from "zod";

import { db, transactions } from "@bank-brew/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const transactionsRouter = createTRPCRouter({
  allNot: publicProcedure.query(async () => {
    const res = await db.select().from(transactions);

    return res;
  }),

  all: protectedProcedure.query(async ({ ctx }) => {
    const res = await db
      .select()
      .from(transactions)
      .where(
        or(
          eq(transactions.recipientClerkUserId, ctx.auth.userId),
          eq(transactions.senderClerkUserId, ctx.auth.userId),
        ),
      );

    console.log(res);

    return res;
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return db
        .select()
        .from(transactions)
        .where(
          and(
            eq(transactions.transactionID, input.id),
            or(
              eq(transactions.recipientClerkUserId, ctx.auth.userId),
              eq(transactions.senderClerkUserId, ctx.auth.userId),
            ),
          ),
        );
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        amount: z.number(),
        recipientClerkUserId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return db.insert(transactions).values({
        title: input.title,
        amount: input.amount,
        recipientClerkUserId: input.recipientClerkUserId,
        senderClerkUserId: ctx.auth.userId,
      });
    }),
});

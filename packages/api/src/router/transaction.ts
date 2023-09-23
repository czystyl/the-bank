import { channels } from "@the-bank/core";
import {
  addFounds,
  createTransaction,
  getTransactions,
  getUser,
} from "@the-bank/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { PusherServer } from "../pusher";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return getTransactions(ctx.auth.userId);
  }),

  addFounds: protectedProcedure
    .input(z.object({ value: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        await addFounds(ctx.auth.userId, input.value);

        await PusherServer.trigger(
          channels.mainChannel.name,
          channels.mainChannel.events.addFounds,
          {
            value: input.value,
            clerkUserId: ctx.auth.userId,
          },
        );
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
      const recipient = await getUser(input.recipientUserId);
      const sender = await getUser(ctx.auth.userId);

      if (!recipient) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found!",
        });
      }

      try {
        await createTransaction({
          data: {
            title: input.title,
            value: input.value,
            senderUserId: ctx.auth.userId,
            recipientUserId: recipient.clerkId,
          },
        });

        await PusherServer.trigger(
          channels.mainChannel.name,
          channels.mainChannel.events.newTransaction,
          {
            sender: {
              clerkUserId: sender?.clerkId,
              name: sender?.firstName,
            },
            recipient: {
              clerkUserId: recipient.clerkId,
              name: recipient.firstName,
            },
            value: input.value,
          },
        );
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

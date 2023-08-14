import { clerkClient } from "@clerk/nextjs";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  users: publicProcedure.query(() => {
    return clerkClient.users.getUserList();
  }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @bank-brew/auth package
    return "you can see this secret message!";
  }),
});

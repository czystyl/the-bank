import { transactionsRouter } from "./router/transactions";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  transaction: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

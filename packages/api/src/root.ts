import { adminRouter } from "./router/admin";
import { transactionRouter } from "./router/transaction";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  transaction: transactionRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

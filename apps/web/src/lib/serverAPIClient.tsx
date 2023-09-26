import { auth } from "@clerk/nextjs";
import { appRouter } from "@the-bank/api";

export function serverAPIClient() {
  const authSession = auth();

  return appRouter.createCaller({
    auth: authSession,
  });
}

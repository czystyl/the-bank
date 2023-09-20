import { auth } from "@clerk/nextjs";

import { appRouter } from "@bank-brew/api";

export function serverAPIClient() {
  const authSession = auth();

  return appRouter.createCaller({
    auth: authSession,
  });
}

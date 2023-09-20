import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@bank-brew/api";

export const runtime = "nodejs";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, { status: 204 });
  setCorsHeaders(response);

  return response;
}

async function handler(req: Request, res: NextApiResponse) {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => {
      /**
       * TRCP Types are not ready to use New NextApiRequest and NextApiResponse types from Next.js
       */
      return createTRPCContext({ req: req as unknown as NextApiRequest, res });
    },
  });

  setCorsHeaders(response);

  return response;
}

export { handler as GET, handler as POST };

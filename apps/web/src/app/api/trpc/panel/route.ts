import { renderTrpcPanel } from "trpc-panel";

import { appRouter } from "@bank-brew/api";

function handler() {
  return new Response(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc",
      transformer: "superjson",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}

export { handler as GET, handler as POST };

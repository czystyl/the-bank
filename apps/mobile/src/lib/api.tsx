import type { ReactNode } from "react";
import React, { useState } from "react";
import Constants from "expo-constants";
import { useAuth } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "@the-bank/api";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

/**
 * A set of type-safe hooks for consuming your API.
 */
export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@the-bank/api";

/**
 * A wrapper for your app that provides the TRPC context.
 */
export function TRPCProvider(props: { children: ReactNode }) {
  const { getToken } = useAuth();

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            const authToken = await getToken();

            return {
              Authorization: authToken ?? undefined,
            };
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
function getBaseUrl() {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */

  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    // return "https://your-production-url.com";
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }
  return `http://${localhost}:3000`;
}

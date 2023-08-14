import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@bank-brew/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@bank-brew/api";

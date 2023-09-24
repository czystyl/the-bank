import { z } from "zod";

export function formatCurrencyValue(value?: number) {
  if (!value) {
    return "";
  }

  const isPositiveValue = value > 0;
  const formattedValue = value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return `${isPositiveValue ? "+" : ""}${formattedValue}$`;
}

export const channels = {
  mainChannel: {
    name: "main-channel",
    events: {
      addFounds: "add-founds",
      newTransaction: "new-transaction",
    },
  },
};

export const AddFoundEventSchema = z.object({
  value: z.number().min(1),
  clerkUserId: z.string(),
});

export type AddFoundEvent = z.infer<typeof AddFoundEventSchema>;

export const NewTransactionEventSchema = z.object({
  sender: z.object({
    clerkUserId: z.string(),
    name: z.string(),
  }),
  recipient: z.object({
    clerkUserId: z.string(),
    name: z.string(),
  }),
  value: z.number().min(1),
});

export type NewTransactionEvent = z.infer<typeof NewTransactionEventSchema>;

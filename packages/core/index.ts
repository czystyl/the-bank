import { z } from "zod";

export function formatCurrencyValue(value: number) {
  const isAboveZero = value > 0;

  const formattedValue = Math.abs(value).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return `${isAboveZero ? "+" : ""}${formattedValue}$`;
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
});

export type AddFoundEvent = z.infer<typeof AddFoundEventSchema>;

export const NewFoundEventSchema = z.object({
  sender: z.string(),
  recipient: z.string(),
  value: z.number().min(1),
});

export type NewFoundEvent = z.infer<typeof NewFoundEventSchema>;

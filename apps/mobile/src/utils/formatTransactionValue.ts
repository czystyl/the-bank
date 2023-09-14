import type { RouterOutputs } from "./api";

export function formatTransactionValue(
  value: number,
  type: RouterOutputs["transaction"]["all"][number]["transaction"]["type"],
) {
  const displayValue = Math.abs(value).toFixed(2);

  if (type === "INCOME") {
    return `+${displayValue} $`;
  }

  return `-${displayValue} $`;
}

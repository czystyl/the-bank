import type { RouterOutputs } from "@the-bank/api";

export function formatTransactionValue(
  value: number,
  type: RouterOutputs["transaction"]["all"][number]["transaction"]["type"],
) {
  const displayValue = Math.abs(value).toFixed(2);

  if (type === "INCOME") {
    return `+${displayValue}$`;
  }

  return `-${displayValue}$`;
}

export function formatValue({ value = 0, withSuffix = false }) {
  return `${withSuffix && value > 0 ? "+" : ""}${value.toFixed(2)}$`;
}

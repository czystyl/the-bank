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

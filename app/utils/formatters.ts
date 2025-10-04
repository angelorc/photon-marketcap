export const formatNumber = (num: string = "0") => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  }).format(Number(num))
}

export const formatUSD = (num: string = "0", maximumFractionDigits: number = 2) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(Number(num))
}
/**
 * Formats a wallet address to show only the first and last few characters
 * @param address - The full wallet address to format
 * @returns The formatted wallet address (e.g., "3KJh...7Ygp")
 */
export const formatWalletAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
};

/**
 * Formats a number as SOL with a specified number of decimal places
 * @param amount - The amount in SOL
 * @param decimals - The number of decimal places to show (default: 4)
 * @returns The formatted SOL amount
 */
export const formatSolAmount = (
  amount: number,
  decimals: number = 4
): string => {
  return `${amount.toFixed(decimals)} SOL`;
};

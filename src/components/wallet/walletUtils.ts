/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Standard utility to clean up full wallet address with ellipsis at center.
 * Perfect for responsive tags and prevents container overflow.
 */
export function formatWalletAddress(address: string | null | undefined): string {
  if (!address) return "";
  if (address.length <= 12) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Clean up decimal balance with dynamic safety precision.
 */
export function formatSuiBalance(balance: number | string | null | undefined): string {
  if (balance === null || balance === undefined) return "0.00";
  const num = typeof balance === "string" ? parseFloat(balance) : balance;
  if (isNaN(num)) return "0.00";
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

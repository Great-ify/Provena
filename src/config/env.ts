/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const ENV = {
  TATUM_API_KEY: (import.meta as any).env?.VITE_TATUM_API_KEY || "",
  SUI_NETWORK: (import.meta as any).env?.VITE_SUI_NETWORK || "mainnet",
  WALRUS_ENDPOINT: (import.meta as any).env?.VITE_WALRUS_ENDPOINT || "https://publisher.walrus-testnet.walrus.space",
  IS_DEV: !!(import.meta as any).env?.DEV,
};

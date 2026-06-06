/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SuiNetworkConfig {
  id: string;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
}

export const SUI_NETWORKS: Record<string, SuiNetworkConfig> = {
  mainnet: {
    id: "mainnet",
    name: "Sui Mainnet",
    rpcUrl: "https://fullnode.mainnet.sui.io:443",
    explorerUrl: "https://suivision.xyz",
  },
  testnet: {
    id: "testnet",
    name: "Sui Testnet",
    rpcUrl: "https://fullnode.testnet.sui.io:443",
    explorerUrl: "https://testnet.suivision.xyz",
  },
  localnet: {
    id: "localnet",
    name: "Sui Localnet",
    rpcUrl: "http://127.0.0.1:9000",
    explorerUrl: "http://localhost:3000", // Visualizer emulator
  },
};

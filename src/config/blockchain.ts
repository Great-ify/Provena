/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ENV } from './env';

export interface BlockchainConfig {
  suiPackageId: string;
  provenanceRegistryId: string;
  walrusPublisherUrl: string;
  walrusAggregatorUrl: string;
  gasBudget: number;
}

export const BLOCKCHAIN_CONFIG: BlockchainConfig = {
  // Configured Package IDs - placeholders left ready for Sprint 3 contract deployment
  suiPackageId: (import.meta as any).env?.VITE_SUI_PACKAGE_ID || "0x0000000000000000000000000000000000000000000000000000000000000000",
  provenanceRegistryId: (import.meta as any).env?.VITE_PROVENANCE_REGISTRY_ID || "0x0000000000000000000000000000000000000000000000000000000000000000",
  
  // Storage cluster endpoints for decentralized Walrus interaction
  walrusPublisherUrl: ENV.WALRUS_ENDPOINT,
  walrusAggregatorUrl: (import.meta as any).env?.VITE_WALRUS_AGGREGATOR_ENDPOINT || "https://aggregator.walrus-testnet.walrus.space",
  
  // Standard execution boundaries
  gasBudget: 25000000, // 0.025 SUI default budget threshold
};

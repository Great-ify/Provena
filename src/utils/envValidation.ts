/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ENV } from '../config/env';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';

export interface EnvValidationIssue {
  type: 'error' | 'warning';
  variableName: string;
  value: string;
  message: string;
  remedy: string;
}

export function validateEnvironment(): EnvValidationIssue[] {
  const issues: EnvValidationIssue[] = [];

  // 1. Walrus Publisher Endpoint Validation
  const publisherUrl = ENV.WALRUS_ENDPOINT;
  if (!publisherUrl) {
    issues.push({
      type: 'error',
      variableName: 'VITE_WALRUS_ENDPOINT',
      value: '',
      message: 'Walrus Publisher endpoint is undefined.',
      remedy: 'Define VITE_WALRUS_ENDPOINT in your .env or platform settings (e.g., https://publisher.walrus-testnet.walrus.space).',
    });
  } else {
    try {
      const url = new URL(publisherUrl);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Protocol must be http: or https:');
      }
    } catch {
      issues.push({
        type: 'error',
        variableName: 'VITE_WALRUS_ENDPOINT',
        value: publisherUrl,
        message: 'Walrus Publisher endpoint is not a valid URL URL format.',
        remedy: 'Ensure VITE_WALRUS_ENDPOINT complies with http:// or https:// formatting.',
      });
    }
  }

  // 2. Walrus Aggregator Endpoint Validation
  const aggregatorUrl = BLOCKCHAIN_CONFIG.walrusAggregatorUrl;
  if (!aggregatorUrl) {
    issues.push({
      type: 'error',
      variableName: 'VITE_WALRUS_AGGREGATOR_ENDPOINT',
      value: '',
      message: 'Walrus Aggregator endpoint is undefined.',
      remedy: 'Define VITE_WALRUS_AGGREGATOR_ENDPOINT (e.g., https://aggregator.walrus-testnet.walrus.space).',
    });
  } else {
    try {
      const url = new URL(aggregatorUrl);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Protocol must be http: or https:');
      }
    } catch {
      issues.push({
        type: 'error',
        variableName: 'VITE_WALRUS_AGGREGATOR_ENDPOINT',
        value: aggregatorUrl,
        message: 'Walrus Aggregator endpoint is not a valid URL format.',
        remedy: 'Ensure VITE_WALRUS_AGGREGATOR_ENDPOINT complies with http:// or https:// formatting.',
      });
    }
  }

  // 3. Sui Network Mismatch / Valid Value Check
  const network = ENV.SUI_NETWORK;
  const validNetworks = ['mainnet', 'testnet', 'devnet', 'localnet'];
  if (!network) {
    issues.push({
      type: 'warning',
      variableName: 'VITE_SUI_NETWORK',
      value: '',
      message: 'Sui Network is undefined. Defaulting to mainnet.',
      remedy: 'Explicitly define VITE_SUI_NETWORK (mainnet / testnet / devnet / localnet) as best practice.',
    });
  } else if (!validNetworks.includes(network.toLowerCase())) {
    issues.push({
      type: 'error',
      variableName: 'VITE_SUI_NETWORK',
      value: network,
      message: `Invalid Sui Network: "${network}". Network mismatch.`,
      remedy: `VITE_SUI_NETWORK must be one of: ${validNetworks.join(', ')}.`,
    });
  }

  // 4. Sui Package ID Verification
  const packageId = BLOCKCHAIN_CONFIG.suiPackageId;
  const isPlaceholderPackage = !packageId || packageId === '0x0000000000000000000000000000000000000000000000000000000000000000';
  const hexPattern = /^0x[0-9a-fA-F]{64}$/;

  if (isPlaceholderPackage) {
    issues.push({
      type: 'warning',
      variableName: 'VITE_SUI_PACKAGE_ID',
      value: packageId,
      message: 'Using placeholder Sui Package ID.',
      remedy: 'Contract interactions will fall back to simulated executions. Provide a live on-chain deployed Package ID to transact on-chain.',
    });
  } else if (!hexPattern.test(packageId)) {
    issues.push({
      type: 'warning',
      variableName: 'VITE_SUI_PACKAGE_ID',
      value: packageId,
      message: 'Invalid Sui Package ID format.',
      remedy: 'Sui Package ID must be a 66-character hex string starting with "0x" (e.g., 0x followed by exactly 64 hex characters). Falls back to simulated executions.',
    });
  }

  // 5. Provenance Registry ID Verification
  const registryId = BLOCKCHAIN_CONFIG.provenanceRegistryId;
  const isPlaceholderRegistry = !registryId || registryId === '0x0000000000000000000000000000000000000000000000000000000000000000';

  if (isPlaceholderRegistry) {
    issues.push({
      type: 'warning',
      variableName: 'VITE_PROVENANCE_REGISTRY_ID',
      value: registryId,
      message: 'Using placeholder Provenance Registry ID.',
      remedy: 'Ledger registrations will fall back to simulated execution. Set a valid deployed registry ID to transact on-chain.',
    });
  } else if (!hexPattern.test(registryId)) {
    issues.push({
      type: 'warning',
      variableName: 'VITE_PROVENANCE_REGISTRY_ID',
      value: registryId,
      message: 'Invalid Provenance Registry ID format.',
      remedy: 'Sui Object Registry ID must be a 66-character hex string starting with "0x" (e.g., 0x followed by exactly 64 hex characters). Falls back to simulated executions.',
    });
  }

  // 6. Tatum API Key Key Verification (Optional but good to advise)
  const tatumApiKey = ENV.TATUM_API_KEY;
  if (!tatumApiKey) {
    issues.push({
      type: 'warning',
      variableName: 'VITE_TATUM_API_KEY',
      value: '',
      message: 'Tatum API Key is not set.',
      remedy: 'The application will gracefully bypass Tatum and communicate directly with public Sui fullnodes. Set VITE_TATUM_API_KEY to enable highly redundant Tatum RPC proxies.',
    });
  }

  return issues;
}

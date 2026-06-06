/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BLOCKCHAIN_CONFIG } from '../../config/blockchain';
import { Transaction } from '@mysten/sui/transactions';

export interface RegistrationPayload {
  title: string;
  description: string;
  sha256Hash: string;
  walrusBlobId: string;
  creatorAddress: string;
  licensePriceSui: number;
  licenseType: string;
}

/**
 * Sui Ledger Service Layer
 * Helper services to construct TransactionBlocks (or Transaction commands)
 * for safe serialised signing within Provena workflows.
 */
export class SuiService {
  private packageId: string;
  private registryId: string;

  constructor() {
    this.packageId = BLOCKCHAIN_CONFIG.suiPackageId;
    this.registryId = BLOCKCHAIN_CONFIG.provenanceRegistryId;
  }

  /**
   * Prepares and serialised a transaction block to register an original digital asset.
   * This transaction maps the Walrus storage ID and SHA256 file signature onto the SUI ledger.
   */
  public async prepareRegisterAssetTransaction(
    payload: RegistrationPayload
  ): Promise<Transaction> {
    console.info(`[Sui Service] Structuring register-asset transaction payload mapping block for hash: ${payload.sha256Hash}`);

    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::provenance::register_asset`,
      arguments: [
        tx.object(this.registryId),
        tx.pure.string(payload.title),
        tx.pure.string(payload.sha256Hash),
        tx.pure.string(payload.walrusBlobId),
        tx.pure.u64(Math.floor(payload.licensePriceSui * 1000000000)) // convert to MIST
      ],
    });

    tx.setGasBudget(BLOCKCHAIN_CONFIG.gasBudget);
    return tx;
  }

  /**
   * Prepares payload to buy a license mint for a specific digital asset.
   */
  public async prepareBuyLicenseTransaction(
    assetRegistryId: string,
    assetOnChainId: string,
    priceSui: number,
    buyerAddress: string
  ): Promise<Transaction> {
    console.info(`[Sui Service] Structuring buy-license transaction for asset object ID: ${assetOnChainId}`);

    const tx = new Transaction();
    const valueMist = Math.floor(priceSui * 1000000000);
    const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(valueMist)]);

    tx.moveCall({
      target: `${this.packageId}::provenance::buy_license`,
      arguments: [
        tx.object(assetRegistryId),
        tx.pure.address(assetOnChainId),
        coin
      ],
    });

    tx.setGasBudget(BLOCKCHAIN_CONFIG.gasBudget);
    return tx;
  }
}

export const suiService = new SuiService();
export default suiService;

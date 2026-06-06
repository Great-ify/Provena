/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProvenanceAsset, ActivityLog, LicensePurchase } from '../types';
import { INITIAL_ASSETS, INITIAL_LOGS } from '../data';

type Listener = () => void;

class AssetStore {
  private assets: ProvenanceAsset[] = [];
  private logs: ActivityLog[] = [];
  private purchases: LicensePurchase[] = [];
  private listeners: Set<Listener> = new Set();
  private activeNetwork: 'Mainnet' | 'Testnet' | 'Sandbox' = 'Mainnet';

  constructor() {
    this.loadFromStorage();
  }

  public setActiveNetwork(network: 'Mainnet' | 'Testnet' | 'Sandbox') {
    this.activeNetwork = network;
    this.loadFromStorage();
    this.notify();
  }

  public getActiveNetwork(): 'Mainnet' | 'Testnet' | 'Sandbox' {
    return this.activeNetwork;
  }

  private loadFromStorage() {
    try {
      const netKey = this.activeNetwork.toLowerCase();
      const storedAssets = localStorage.getItem(`provena_assets_${netKey}`);
      const storedLogs = localStorage.getItem(`provena_logs_${netKey}`);
      const storedPurchases = localStorage.getItem(`provena_purchases_${netKey}`);

      // High fidelity: Production and sandbox have absolutely zero pre-seeded mock actions!
      this.assets = storedAssets ? JSON.parse(storedAssets) : [];
      this.logs = storedLogs ? JSON.parse(storedLogs) : [];
      this.purchases = storedPurchases ? JSON.parse(storedPurchases) : [];
    } catch (err) {
      console.error('Failed to load asset store from localStorage:', err);
      this.assets = [];
      this.logs = [];
      this.purchases = [];
    }
  }

  private saveToStorage() {
    try {
      const netKey = this.activeNetwork.toLowerCase();
      localStorage.setItem(`provena_assets_${netKey}`, JSON.stringify(this.assets));
      localStorage.setItem(`provena_logs_${netKey}`, JSON.stringify(this.logs));
      localStorage.setItem(`provena_purchases_${netKey}`, JSON.stringify(this.purchases));
    } catch (err) {
      console.error('Failed to persist asset store changes.', err);
    }
    this.notify();
  }


  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in asset store subscriber callback:', err);
      }
    });
  }

  // --- Actions ---

  public getAssets(): ProvenanceAsset[] {
    return this.assets;
  }

  public getLogs(): ActivityLog[] {
    return this.logs;
  }

  public getPurchases(): LicensePurchase[] {
    return this.purchases;
  }

  /**
   * Encodes a new provenance mapping into active local cache state.
   */
  public registerAsset(asset: ProvenanceAsset): void {
    // Audit for existing hash signatures
    const alreadySealed = this.assets.some((a) => a.sha256Hash === asset.sha256Hash);
    if (alreadySealed) {
      throw new Error(`The file digital signature (${asset.sha256Hash}) is already sealed on-chain.`);
    }

    this.assets = [asset, ...this.assets];
    
    // Auto-generate activity logs for transparency
    const registerLog: ActivityLog = {
      id: `log-${Date.now()}-reg`,
      type: 'UPLOAD',
      assetId: asset.id,
      assetTitle: asset.title,
      actor: asset.creator,
      txHash: asset.suiTxHash || 'pending',
      timestamp: asset.mintedTimestamp,
      status: 'SUCCESS'
    };

    const anchorLog: ActivityLog = {
      id: `log-${Date.now()}-anchor`,
      type: 'SUI_ANCHOR',
      assetId: asset.id,
      assetTitle: asset.title,
      actor: asset.creator,
      txHash: asset.suiTxHash || 'pending',
      timestamp: asset.mintedTimestamp,
      status: 'SUCCESS',
      meta: {
        blobId: asset.walrusBlobId,
        score: asset.originalityScore
      }
    };

    this.logs = [registerLog, anchorLog, ...this.logs];
    this.saveToStorage();
  }

  /**
   * Finalizes a cryptographic on-chain licensing transaction.
   */
  public purchaseLicense(purchase: LicensePurchase, assetTitle: string): void {
    this.purchases = [purchase, ...this.purchases];

    const purchaseLog: ActivityLog = {
      id: `log-${Date.now()}-buy`,
      type: 'LICENSE_BUY',
      assetId: purchase.assetId,
      assetTitle: assetTitle,
      actor: purchase.buyer,
      txHash: purchase.txHash,
      timestamp: purchase.timestamp,
      status: 'SUCCESS',
      meta: {
        priceSui: purchase.priceSui,
        licenseType: purchase.licenseType,
        buyerAddress: purchase.buyerAddress
      }
    };

    this.logs = [purchaseLog, ...this.logs];
    this.saveToStorage();
  }

  /**
   * Updates state of an asset dynamically (e.g. status transition)
   */
  public updateAssetStatus(assetId: string, status: ProvenanceAsset['status']): void {
    this.assets = this.assets.map((asset) => 
      asset.id === assetId ? { ...asset, status } : asset
    );
    this.saveToStorage();
  }

  /**
   * Toggles licensing availability or updates pricing bounds.
   */
  public configureLicensing(
    assetId: string, 
    active: boolean, 
    priceSui: number, 
    licenseType: ProvenanceAsset['licenseType']
  ): void {
    this.assets = this.assets.map((asset) => 
      asset.id === assetId 
        ? { 
            ...asset, 
            licensingActive: active, 
            licensePriceSui: priceSui, 
            licenseType 
          } 
        : asset
    );
    this.saveToStorage();
  }
}

export const assetStore = new AssetStore();
export default assetStore;

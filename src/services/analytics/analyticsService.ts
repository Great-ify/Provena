/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { assetStore } from '../../store/assetStore';

export interface BlockchainMetrics {
  assetsSealedCount: number;
  licensesSoldCount: number;
  totalVolumeSui: number;
  verificationAuditCount: number;
  blockchainTxCount: number;
}

export interface VerificationLog {
  id: string;
  sha256Hash: string;
  filename: string;
  timestamp: string;
  originalityScore: number;
  certified: boolean;
}

/**
 * Analytics service tracking key operation indicators.
 * Pre-engineered for future Tatum API integration to index Move contract events in real-time.
 */
export class AnalyticsService {
  private verificationHistory: VerificationLog[] = [];

  constructor() {
    this.verificationHistory = this.loadVerificationHistory();
  }

  private loadVerificationHistory(): VerificationLog[] {
    try {
      const value = localStorage.getItem('provena_verification_history');
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  }

  private saveVerificationHistory() {
    try {
      localStorage.setItem('provena_verification_history', JSON.stringify(this.verificationHistory));
    } catch (err) {
      console.error('Failed to log verification history.', err);
    }
  }

  /**
   * Tracks dynamic blockchain and asset sales metrics by reading from local registry store.
   */
  public getLiveMetrics(): BlockchainMetrics {
    const assets = assetStore.getAssets();
    const purchases = assetStore.getPurchases();
    const logs = assetStore.getLogs();

    const assetsSealed = assets.length;
    const licensesSold = purchases.length;
    const totalVolume = purchases.reduce((sum, p) => sum + p.priceSui, 0);
    const verificationAudits = this.verificationHistory.length;
    const txCount = logs.filter(l => l.status === 'SUCCESS').length;

    // TODO: Connect official Tatum /v3/sui/events or indexers here in Sprint 3
    
    return {
      assetsSealedCount: assetsSealed,
      licensesSoldCount: licensesSold,
      totalVolumeSui: Number(totalVolume.toFixed(2)),
      verificationAuditCount: verificationAudits,
      blockchainTxCount: txCount
    };
  }

  /**
   * Logs a certification audit event.
   */
  public recordVerification(verifyLog: Omit<VerificationLog, 'id' | 'timestamp'>): void {
    const freshLog: VerificationLog = {
      ...verifyLog,
      id: `vlog-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    this.verificationHistory = [freshLog, ...this.verificationHistory];
    this.saveVerificationHistory();
  }

  public getVerificationHistory(): VerificationLog[] {
    return this.verificationHistory;
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;

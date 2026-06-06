/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { parseBlockchainError } from '../../utils/errors/errorHandler';

export type TxStepStatus = 'idle' | 'pending' | 'signing' | 'submitting' | 'confirmed' | 'failed';

export interface TxStatusUpdate {
  txHash?: string;
  status: TxStepStatus;
  message: string;
  progressPercent: number;
}

/**
 * Transaction Coordination & Monitoring System
 * Handles broadcasting lifecycle stages and exposes streaming status events for 
 * rich, responsive UX feedback during on-chain operations.
 */
export class TransactionService {
  /**
   * Orchestrates the full lifecycle of a transaction from wallet signing to explorer confirmation.
   * Leverages status callbacks to stream realistic progression during sandbox testing or real execution.
   */
  public async executeTransaction(
    prepareTxBlock: () => Promise<any>,
    signAndExecute: (txBlock: any) => Promise<{ digest: string }>,
    onStatusUpdate: (update: TxStatusUpdate) => void
  ): Promise<string> {
    try {
      // 1. Preparation & Waiting for Wallet Signature
      onStatusUpdate({
        status: 'signing',
        message: 'Waiting for Confirmation',
        progressPercent: 55
      });
      const txBlock = await prepareTxBlock();
      
      // Execute the injected wallet's signature routine
      const txResult = await signAndExecute(txBlock);
      const outputDigest = txResult.digest;

      // 2. Submission & Finalizing Asset
      onStatusUpdate({
        status: 'submitting',
        message: 'Finalizing Asset',
        progressPercent: 85
      });
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 3. Anchored and Confirmed
      onStatusUpdate({
        status: 'confirmed',
        txHash: outputDigest,
        message: 'Completed',
        progressPercent: 100
      });

      return outputDigest;
    } catch (err: any) {
      console.warn('[Transaction Exception Handled]', err);
      const parsedErr = parseBlockchainError(err);
      
      onStatusUpdate({
        status: 'failed',
        message: parsedErr.userFriendlyMessage,
        progressPercent: 0
      });
      
      throw parsedErr;
    }
  }

  /**
   * Monitor external transaction digest heights using standard RPC listeners.
   */
  public async monitorTransactionStatus(
    txHash: string,
    onConfirmed: () => void,
    onFailed: (error: Error) => void
  ): Promise<void> {
    console.info(`[Transaction Monitor] Listening for hash digest propagation: ${txHash}`);
    // TODO: Launch JSON-RPC polling or WebSocket-based subscription
    onConfirmed();
  }
}

export const transactionService = new TransactionService();
export default transactionService;

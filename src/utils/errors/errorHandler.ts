/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlockchainError, BlockchainErrorCode } from './errorTypes';

export function parseBlockchainError(error: any): BlockchainError {
  if (error instanceof BlockchainError) {
    return error;
  }

  const rawMsg = error?.message || String(error);
  
  // Wallet rejection checks
  if (
    rawMsg.includes('Rejected') ||
    rawMsg.includes('User rejected') ||
    rawMsg.includes('declined') ||
    rawMsg.includes('Signature rejected')
  ) {
    return new BlockchainError(
      BlockchainErrorCode.SIGNATURE_REJECTED,
      rawMsg,
      "Transaction signature request was declined. Please try again when ready.",
      error
    );
  }

  // Gas and funds errors
  if (
    rawMsg.includes('Insufficient balance') ||
    rawMsg.includes('Cannot find gas object') ||
    rawMsg.includes('no gas available') ||
    rawMsg.includes('insufficient funds')
  ) {
    return new BlockchainError(
      BlockchainErrorCode.INSUFFICIENT_GAS,
      rawMsg,
      "Your Sui wallet does not have enough SUI to pay for gas to seal this asset.",
      error
    );
  }

  // Walrus-specific failure indicators
  if (rawMsg.includes('walrus') || rawMsg.includes('publisher') || rawMsg.includes('blob')) {
    return new BlockchainError(
      BlockchainErrorCode.WALRUS_UPLOAD_FAILED,
      rawMsg,
      "The decentralised Walrus storage system was unable to accept the file blob. Please verify service node status.",
      error
    );
  }

  // Tatum RPC or network connection
  if (rawMsg.includes('tatum') || rawMsg.includes('fetch') || rawMsg.includes('NetworkError') || rawMsg.includes('RPC')) {
    return new BlockchainError(
      BlockchainErrorCode.RPC_CONNECTION_FAILURE,
      rawMsg,
      "Failed to communicate with Tatum Sui RPC infrastructure. Please check your internet connection.",
      error
    );
  }

  return new BlockchainError(
    BlockchainErrorCode.UNKNOWN_ERROR,
    rawMsg,
    "An unexpected blockchain exception occurred while sealing/registering. Please try again.",
    error
  );
}

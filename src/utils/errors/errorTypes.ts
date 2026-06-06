/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum BlockchainErrorCode {
  WALLET_UNAVAILABLE = 'WALLET_UNAVAILABLE',
  SIGNATURE_REJECTED = 'SIGNATURE_REJECTED',
  INSUFFICIENT_GAS = 'INSUFFICIENT_GAS',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  NETWORK_MISMATCH = 'NETWORK_MISMATCH',
  RPC_CONNECTION_FAILURE = 'RPC_CONNECTION_FAILURE',
  WALRUS_UPLOAD_FAILED = 'WALRUS_UPLOAD_FAILED',
  WALRUS_STORAGE_EXPIRED = 'WALRUS_STORAGE_EXPIRED',
  HASH_GENERATION_FAILED = 'HASH_GENERATION_FAILED',
  REGISTRY_LOOKUP_FAILED = 'REGISTRY_LOOKUP_FAILED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class BlockchainError extends Error {
  public code: BlockchainErrorCode;
  public details?: any;
  public userFriendlyMessage: string;

  constructor(
    code: BlockchainErrorCode,
    message: string,
    userFriendlyMessage: string,
    details?: any
  ) {
    super(message);
    this.name = 'BlockchainError';
    this.code = code;
    this.userFriendlyMessage = userFriendlyMessage;
    this.details = details;
    Object.setPrototypeOf(this, BlockchainError.prototype);
  }
}

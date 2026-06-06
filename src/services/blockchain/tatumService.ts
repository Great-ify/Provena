/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SUI_NETWORKS, SuiNetworkConfig } from '../../config/networks';
import { ENV } from '../../config/env';

import { tatumClient } from './tatumClient';

/**
 * Tatum RPC API Service Layer
 * Wraps Tatum JSON-RPC calls and proxy networks configs to handle robust, scalable 
 * indexing pipelines on the Sui Chain.
 */
export class TatumService {
  /**
   * Return active execution endpoint, proxying through Tatum routing when credentials are set.
   * If a Tatum API Key is present, it will append it as a header or route through tatum.io
   */
  public getRpcUrl(): string {
    return tatumClient.getRpcUrl();
  }

  /**
   * Fetches latest epoch or reference check from block heights.
   */
  public async getLatestReferenceClock(): Promise<{ systemStateVersion: string; epoch: string }> {
    console.info(`[Tatum RPC] Querying system clock via tatumClient`);
    return tatumClient.getLatestReferenceClock();
  }

  /**
   * Fetch transaction block status via Tatum gateway.
   */
  public async queryTransactionBlock(txDigest: string): Promise<any> {
    console.info(`[Tatum RPC] Fetching Transaction ${txDigest} details via tatumClient`);
    return tatumClient.queryTransactionBlock(txDigest);
  }
}

export const tatumService = new TatumService();
export default tatumService;

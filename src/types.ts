/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProvenanceAsset {
  id: string; // unique identifier
  title: string;
  description: string;
  creator: string;
  creatorAddress: string;
  ownerWallet?: string; // real address representation
  fileName: string;
  fileSize: number;
  mimeType: string;
  sha256Hash: string;
  walrusBlobId: string;
  suiTxHash: string;
  mintedTimestamp: string;
  licensingActive: boolean;
  licensePriceSui: number;
  licenseType: 'Standard' | 'Commercial' | 'AI_Exclusion' | 'Remix_Allowed';
  originalityScore: number;
  aiScanned: boolean;
  status: 'Draft' | 'Hashing' | 'Encrypting' | 'WalrusUploaded' | 'SuiAnchored' | 'Sealed';
  imageUrl?: string;
}

export interface SimilarityResult {
  sourceName: string;
  matchPercentage: number;
  type: 'Web' | 'AI_Model' | 'Public_Dataset' | 'Social_Media';
  status: 'Flagged' | 'Warning' | 'Clear';
  matchDetail: string;
}

export interface PlagiarismReport {
  assetId: string;
  originalityScore: number;
  confidenceLevel: number;
  scanTimestamp: string;
  similarSources: SimilarityResult[];
  lineage: {
    parents: string[];
    children: string[];
    derivedRank: 'Original' | 'Minor Derivative' | 'Major Derivative' | 'Plagiarized';
  };
  analysisMarkdown: string;
  simulation: boolean;
}

export interface ActivityLog {
  id: string;
  type: 'UPLOAD' | 'ENCRYPT' | 'WALRUS_STORE' | 'SUI_ANCHOR' | 'LICENSE_MINT' | 'LICENSE_BUY';
  assetId: string;
  assetTitle: string;
  actor: string;
  txHash: string;
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  meta?: Record<string, string | number>;
}

export interface LicensePurchase {
  id: string;
  assetId: string;
  buyer: string;
  buyerAddress: string;
  priceSui: number;
  licenseType: string;
  txHash: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}


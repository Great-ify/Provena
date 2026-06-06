/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProvenanceAsset, ActivityLog } from './types';

export const SYSTEM_ADDRESSES = {
  ProvenaContract: '0x8d5c490ef4979eef68f6ff9638bd1d8564f2a1b94ea8e70a1cae18ef412e86bf',
  WalrusAggregator: 'https://publisher.walrus-testnet.walrus.space',
  SuiRpcEndpoint: 'https://sui-mainnet.tatum.io/v1',
};

export const INITIAL_ASSETS: ProvenanceAsset[] = [
  {
    id: 'asset-1',
    title: 'Aetheris: Volumetric Light Engine v3.4',
    description: 'A mathematical model for real-time light scattering in complex participatory media, developed for GPU-accelerated neural networks.',
    creator: 'Evelyn Vora',
    creatorAddress: '0x4f2b98...474b7e',
    fileName: 'aetheris_light_scattering.py',
    fileSize: 184520, // 184 KB
    mimeType: 'text/x-python',
    sha256Hash: '1970b4a4cb2f574d6df11172a6bca2ffd1e7bce82ec09c52fe805da82c3c6f09',
    walrusBlobId: 'wal_b_8172cde932df84acae0392bc879a9e3fe082bc87e9092bfda98efcc23bbcb8f21',
    suiTxHash: '0x8f4d929be65839281a8bc47382d9bcbe817dc9f02931bc11a9fbc6293cb805ff',
    mintedTimestamp: '2026-05-18T14:32:00Z',
    licensingActive: true,
    licensePriceSui: 45,
    licenseType: 'Commercial',
    originalityScore: 98,
    aiScanned: true,
    status: 'Sealed',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'asset-2',
    title: 'Holographic Fluid Dynamics Model',
    description: 'A compiled WebAssembly simulation of three-dimensional Navier-Stokes equations with embedded micro-vortices for high-performance visualizers.',
    creator: 'Dr. Akira Sora',
    creatorAddress: '0xbcde29...8122fa',
    fileName: 'holographic_fluid_sim.wasm',
    fileSize: 4210400, // 4.2 MB
    mimeType: 'application/wasm',
    sha256Hash: 'ef9b51fa12e584a2cae01a91aefc392bc879a9e3fe812fbda98fcc24abcd8e076',
    walrusBlobId: 'wal_b_3012faecbcde28392749cb819acc88de3fbc82937be9d02cbfa632bf827419e76',
    suiTxHash: '0xfa849dcbec05a8d9bfbc81cbe90fa38efcc05912c9be93fdab87ec827fbe29471',
    mintedTimestamp: '2026-05-22T09:15:00Z',
    licensingActive: true,
    licensePriceSui: 120,
    licenseType: 'AI_Exclusion',
    originalityScore: 94,
    aiScanned: true,
    status: 'Sealed',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'asset-3',
    title: 'Synthesized Ambient Resonance Track',
    description: 'A modular synthesizer soundscape recorded at 96kHz, capturing mechanical hums and crystalline tones with embedded cryptographically sealed watermarks.',
    creator: 'Marcen Vex',
    creatorAddress: '0x8f192b...de99c3',
    fileName: 'ambient_resonance_c_sharp.flac',
    fileSize: 48930100, // 48.9 MB
    mimeType: 'audio/flac',
    sha256Hash: 'bcda98efcc382fbda817ec23f059bc1a37c9fdeea8e3792cdd74fbc11bcdaef0',
    walrusBlobId: 'wal_b_90bfda8cc932bfdecb8120fa8ec34bce9bbcfefac29012fa89decc1a21cf8b7b',
    suiTxHash: '0xbc938ffd1a9382e74cbe90bcfeefba812fdac59381eaeeef0f9bbcca22ffcd87',
    mintedTimestamp: '2026-05-24T18:41:22Z',
    licensingActive: true,
    licensePriceSui: 15,
    licenseType: 'Remix_Allowed',
    originalityScore: 89,
    aiScanned: true,
    status: 'Sealed',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'asset-4',
    title: 'Sui Network Cryptographic Seals (Move Edition)',
    description: 'An architectural breakdown and developer manual detailing on-chain cryptographic anchoring for decentralized archives and verification networks.',
    creator: 'Provena Core',
    creatorAddress: '0x8d5c49...2e86bf',
    fileName: 'sui_move_provenance_spec.md',
    fileSize: 45600, // 45 KB
    mimeType: 'text/markdown',
    sha256Hash: 'da93ffca07fa21bca892ee39cfda93bbca92ff07fa12bfcb9c68ea82cfda19bb',
    walrusBlobId: 'wal_b_117faedcf39281aedbcde9e2908cfadeb31fa2eecbc021da8cbfde7e8bcfe1b94',
    suiTxHash: '0xca77bef89cdcbe871fa281cbe907fa0cbe8fcc02df5981caeeecfde31fbdebc0',
    mintedTimestamp: '2026-05-25T23:59:12Z',
    licensingActive: false,
    licensePriceSui: 0,
    licenseType: 'Standard',
    originalityScore: 100,
    aiScanned: true,
    status: 'Sealed',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop'
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    type: 'LICENSE_MINT',
    assetId: 'asset-1',
    assetTitle: 'Aetheris: Volumetric Light Engine v3.4',
    actor: 'Evelyn Vora',
    txHash: '0x8f4d929be65839281a8bc47382d9bcbe817dc9f02931bc11a9fbc6293cb805ff',
    timestamp: '2026-05-18T14:32:00Z',
    status: 'SUCCESS',
    meta: { price: 45, type: 'Commercial' },
  },
  {
    id: 'log-2',
    type: 'LICENSE_BUY',
    assetId: 'asset-1',
    assetTitle: 'Aetheris: Volumetric Light Engine v3.4',
    actor: 'CreativeLab _0x3b',
    txHash: '0x2bf99ffcae1276aeeecbfd92aa9bcffef91cc8823f99aa21ffea829ee1cdefa1',
    timestamp: '2026-05-20T11:04:12Z',
    status: 'SUCCESS',
    meta: { buyer: '0x94ff...ec72fa', pricePayed: 45 },
  },
  {
    id: 'log-3',
    type: 'WALRUS_STORE',
    assetId: 'asset-2',
    assetTitle: 'Holographic Fluid Dynamics Model',
    actor: 'Dr. Akira Sora',
    txHash: '0xfa849dcbec05a8d9bfbc81cbe90fa38efcc05912c9be93fdab87ec827fbe29471',
    timestamp: '2026-05-22T09:12:00Z',
    status: 'SUCCESS',
    meta: { blobSize: 4210400 },
  },
  {
    id: 'log-4',
    type: 'SUI_ANCHOR',
    assetId: 'asset-2',
    assetTitle: 'Holographic Fluid Dynamics Model',
    actor: 'Dr. Akira Sora',
    txHash: '0xfa849dcbec05a8d9bfbc81cbe90fa38efcc05912c9be93fdab87ec827fbe29471',
    timestamp: '2026-05-22T09:15:00Z',
    status: 'SUCCESS',
    meta: { suiGasUsed: 0.00315 },
  },
  {
    id: 'log-5',
    type: 'UPLOAD',
    assetId: 'asset-3',
    assetTitle: 'Synthesized Ambient Resonance Track',
    actor: 'Marcen Vex',
    txHash: '0xbc938ffd1a9382e74cbe90bcfeefba812fdac59381eaeeef0f9bbcca22ffcd87',
    timestamp: '2026-05-24T18:35:00Z',
    status: 'SUCCESS',
  }
];

export const MOVE_CONTRACT_CODE = `/// Provena Move Protocol — Sui Mainnet Anchor Interface 
/// Cryptographic Anchoring & Creator Ownership Seals

module provena::provenance {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use std::string::{String};

    /// Represents a high-fidelity cryptographic seal of ownership
    struct ProvenanceSeal has key, store {
        id: UID,
        asset_hash: vector<u8>,       // SHA256 file fingerprint
        walrus_blob_id: String,       // Encrypted Decentralized archive ID
        title: String,               // Sealed asset title
        creator: address,            // On-chain owner signature
        timestamp: u64,              // Anchoring block-time
        originality_coeff: u8,       // AI original certificate percentage
        license_model: u8,           // Encrypted licensing rule code
    }

    /// Emitted when a new file has its proof secured
    struct SealAnchored has copy, drop {
        seal_id: ID,
        asset_hash: vector<u8>,
        walrus_blob_id: String,
        ownerAddress: address,
    }

    /// Anchor a new asset ownership on Sui Mainnet
    public entry fun anchor_provenance(
        asset_hash: vector<u8>,
        walrus_blob_id: String,
        title: String,
        originality_coeff: u8,
        license_model: u8,
        ctx: &mut TxContext
    ) {
        let _creatorAddress = tx_context::sender(ctx);
        let id_raw = object::new(ctx);
        let seal_id = object::uid_to_inner(&id_raw);

        let seal = ProvenanceSeal {
            id: id_raw,
            asset_hash,
            walrus_blob_id,
            title,
            creator: _creatorAddress,
            timestamp: tx_context::epoch(ctx),
            originality_coeff,
            license_model,
        };

        // Emit authentic audit log to Sui Event Stream
        event::emit(SealAnchored {
            seal_id,
            asset_hash,
            walrus_blob_id,
            ownerAddress: _creatorAddress,
        });

        // Transfer the prestigious collectible certificate to the owner
        sui::transfer::public_transfer(seal, _creatorAddress);
    }
}`;

export const SAMPLE_SIMILARITY_REPORT = {
  text: `**PROVENA DEEP COGNITIVE AI PLAGIARISM METADATA REPORT**
  
This is a standard simulated cognitive scan of our resource. It uses a high-density stylistic analysis and spatial alignment checking logic to cross-reference multiple corpora.

### Stylistic & Vector Resonance
- **Stylistic Authenticity Score**: **96%** (Extremely strong signal matching human creation characteristics)
- **Entropy Coefficient**: **1.45 h** (Well balanced mechanical and natural language properties)

### Segment Breakdown
1. **Section 1: Volumetric Light Scattering Principles (Lines 1-12)**
   - Status: **SECURE / CLEAR**
   - Details: Formulations represent novel structural implementations. No matches found in GitHub, HuggingFace, or ArXiv directories.
   2. **Section 2: Integral Matrix Density Estimates (Lines 14-25)**
   - Status: **WARNING MATCH**
   - Match Trace: **8% matching patterns** referencing *Anisotropic Scattering Optimization in Participating Media* (Vora et al., SIGGRAPH 2024).
   - Relationship: Direct lineage confirmed as a legitimate self-citation upgrade.

### Core Recommendation
Secure the proof-of-origin immediately by anchoring it to **Sui Object Registry** and depositing the encrypted bundle to **Walrus Storage Group**. Activates copyright tamper protection against AI scrapers.`,
  score: 96,
  sources: [
    { sourceName: 'SIGGRAPH Anisotropic Proceedings', matchPercentage: 8, type: 'Public_Dataset', status: 'Warning', matchDetail: 'Self-references on volumetric matrix indices.' },
    { sourceName: 'GitHub - Neural-Radiance-Scattering', matchPercentage: 2, type: 'Web', status: 'Clear', matchDetail: 'Standard utility imports for quaternion handling.' },
  ],
};

# System Architecture Manual 📘
### Technical Engineering Guide — Provena Cryptographic Ledger Protocol

Provena implements a high-integrity, full-stack decentralized file indexing and ownership proving network. This document walks developers and judges through our core software design, Tatum API layer, Walrus decentralized chunk structure, and Sui Move contract behaviors.

---

## 🗺️ System Overview

```
                      +---------------------------------------+
                      |          Provena Frontend             |
                      |  (React/TypeScript/Tailwind/Vite)     |
                      +---+-------------------------------+---+
                          |                               |
        [1] SHA-256 Hash  |                               | [2] File Stream
        [4] Sui Signature |                               |
                          v                               v
        +-----------------+---------------+     +---------+-----------+
        |         Tatum RPC Layer         |     | Walrus Proxy Server |
        |   (suix_getBalance, Broadcast)  |     |     (Publisher)     |
        +-----------------+---------------+     +---------+-----------+
                          |                               |
        [5] Mint Record   |                               | [3] Store Blob
        [6] Tx Event Sync |                               |
                          v                               v
            ==============+===============*===============+==============
                                   Blockchains & Clusters
            =============================================================
                     { SUI Layer-1 Blockchain }      { Walrus Dec. Storage }
                     - Pack: 0x3af5d8cb9...          - Aggregator Cluster
                     - Registry: 0x83e292b...        - Erasure Coded Nodes
            =============================================================
```

---

## ⚡ 1. Tatum Blockchain Integration Layer

Provena integrates **Tatum's Enterprise Gateway API** as its centralized RPC relay layer. Tatum provides high-throughput API endpoints to handle high-concurrency requests safely, bypassing standard public rate configurations.

### RPC Functions Used
1. **`suix_getBalance`**: Fetches direct mist balances for connected creators to ensure gas budget feasibility before broad execution.
2. **`sui_executeTransactionBlock`**: Signs, broadcasts, and indexes gas-estimated transactions directly onto SUI mainnet or testnet.
3. **`sui_getTransactionBlock`**: Used at runtime inside the **Verification Portal** to trace transaction hash matching directly from Sui blockchain state.

### Implementation Reference
Located in `/src/services/blockchain/tatum.ts`:
- Enforces an automated retry configuration for network latency.
- Seamlessly falls back to a multi-node RPC array to keep the platform online model during node outages.

---

## 🦭 2. Decentralized Walrus Storage Network

Walrus is a decentralized storage network designed by Mysten Labs. Unlike traditional file hosting, Walrus processes file inputs by splitting bytes into **erasure-coded chunks** across storage nodes, ensuring retrieval speed and extreme data redundancy.

### Upload Sequence File Pipeline
1. Local creator selects an asset files in the Upload Portal.
2. The browser generates a localized high-performance **SHA-256 hash** of the raw file content buffer.
3. The raw file buffer is streamed to the **SUI-hosted Walrus Publisher Cluster** endpoint.
4. The Walrus node stores the fragmented chunks, creating an immutable cryptographic handle: **The Blob ID**.
5. Once complete, the publisher returns the JSON response containing the unique `blobId` and system metadata.

---

## 📜 3. Sui Move Smart Contract Module

Our on-chain registration module is written in **Sui Move** (optimized for Sui object-centric ledger designs). 

### Key Structs Deployed
```rust
/// Stores the overall collection registry index of verified works
struct AssetRegistry has key, store {
    id: UID,
    assets: Table<String, ProvenanceRecord>, // Maps SHA-256 Content Hash -> Provenance Record
    total_sealed: u64
}

/// Stores specific metadata for an anchored masterpiece
struct ProvenanceRecord has store, copy {
    title: String,
    sha256_hash: String,
    walrus_blob_id: String,
    creator: address,
    timestamp: u64
}
```

### Deployed Module Functions
- **`register_asset(registry, title, sha256_hash, walrus_blob_id)`**: Binds the SHA-256 original file signature directly to the creator's wallet address. If the file SHA-256 hash already exists in the `AssetRegistry` table, the execution fails with an on-chain abort code, mitigating copyright fraud attempt instantly.
- **`verify_asset(registry, sha256_hash)`**: Checks index table registry for record presence, returning complete ownership structures, blob IDs, and anchor timestamps.

---

## 🔮 4. End-to-End Execution Sequence Loop

The diagram below details the end-to-end cryptographic sequence when a creator seals an original artwork:

```
Creator Hub               Local Browser                Walrus Node               Sui & Tatum RPC
    |                           |                           |                           |
    |---- 1. Selects File ----->|                           |                           |
    |                           |-- 2. Calculates SHA256 -->|                           |
    |                           |                           |                           |
    |                           |------- 3. Upload File --->|                           |
    |                           |<------ 4. Returns BlobID -|                           |
    |                           |                                                       |
    |                           |----------------- 5. Prepare Move Register ----------->|
    |                           |<---------------- 6. Returns Tx Byte Block ------------|
    |                           |                                                       |
    |                           |-- 7. Signs Payload & Submits Transaction ------------>|
    |                           |<---------------- 8. returns Sui digest ---------------|
    |                           |                                                       |
    |                           |-- 9. Displays Certified Certificate (QR, Print PDF) -->|
```
This sequential design separates heavy asset payloads (which remain safely distributed in the **Walrus blobstore**) from security proofs (which are immutable and signed on the **Sui Blockchain**).

# Provena 
#Decentralized Content Provenance, Ownership, and Plagiarism Defense Platform


---

Provena is an enterprise-class decentralized digital provenance registry, copyright vault, and piracy mitigation engine built natively on the high-throughput **Sui Layer-1 Blockchain** using **Sui Move**, powered by the **Walrus Erasure-Coded Decentralized Storage Network**, with reliable RPC orchestration mediated by the **Tatum Enterprise Blockchain Relay**.

Provena enables creators, photographers, software developers, and research nodes to establish airtight digital lineages for their physical assets, digital images, and creative documents. By sealing files, generating instant SHA-256 fingerprints, uploading media chunks to decentralized nodes, and anchoring state proof on-chain, Provena defeats digital plagiarism at the point-of-upload.

---

## 🏆 Key Architecture Pillars

-  Tatum Enterprise RPC Relay: Direct SUI mainnet & testnet ledger syncing without bottlenecking or rate constraints. Employs Tatum’s premium JSON-RPC wrapper to secure state sync, inspect historical transactions, and query direct address balances in real-time.
-  Walrus Blobstore Integration**: Direct sequential proxying and client uploads. Standard files are transformed into Walrus Decentralized Blobs. Redundant chunk hashes are linked securely within Sui's object storage.
- Sui Move Smart Contract Ledger: Custom deployed Move modules mapping cryptographic SHA-256 content hashes, Walrus Storage Blob IDs, creator signatures, and timestamps to the immutable Sui ledger.
- Visual Collectible Certificates: Production-ready visual cryptographic deed generators displaying on-chain QR codes, certified metadata arrays with copy-triggers, printable PDF vector formats, and direct Suivision/Suiscan deep links.
- Interactive Multi-Model Verification Portal: Search by SUI Transaction hashes, Walrus Blob IDs, digital Certificate UUIDs, or raw SHA-256 fingerprints. Features a client-side **drag-and-drop original file hashing engine** to perform automated on-chain verification instantly.
- Protocol Status Sentinel & Guided Onboarding: Real-time Node RPC validators monitor, validator checkpoint blocks sync, Tatum health sentinel tracker, and an interactive 6-step demo flow that lights up as judges trigger real actions.

---

## 📁 Repository Map

For comprehensive technical insights, see our dedicated system manual:
1. 📘 [TECHNICAL ARCHITECTURE](./ARCHITECTURE.md) - Deep-dive on cryptographic flows, schema designs, and Tatum × Walrus pipeline sequence diagrams.


---

## Core Features

-Upload & Seal

Securely upload digital assets and create immutable ownership records.

-Walrus Storage Integration

Store original file data on Walrus decentralized storage.

-Blockchain Registration

Anchor asset metadata on the Sui blockchain through Move smart contracts.

-Certificate Generation

Generate ownership certificates containing:

Certificate ID
SHA-256 Hash
Walrus Blob ID
Owner Address
Network
Timestamp
Transaction Digest
Verification Portal

Verify ownership using:

Transaction Digest
Certificate ID
Walrus Blob ID
Original File Hash

---

## Technology Stack

Frontend
React
TypeScript
Vite
Tailwind CSS
Blockchain
Sui
Move Smart Contracts
@mysten/dapp-kit
@mysten/sui
Infrastructure
Tatum Sui RPC Gateway
Storage
Walrus Decentralized Storage
Tatum Integration

Official Tatum Sui Gateway Endpoints:

Testnet

https://sui-testnet.gateway.tatum.io

Mainnet

https://sui-mainnet.gateway.tatum.io

Devnet

https://sui-devnet.gateway.tatum.io

The application uses Tatum RPC infrastructure for:

Balance retrieval
Transaction lookups
Blockchain verification
Network communication
Walrus Integration

Provena uses Walrus for decentralized file storage.

Workflow:

File → Walrus Storage → Blob ID → Sui Blockchain Record

Stored file references are permanently linked to blockchain ownership records, allowing future verification.
---

## Evaluate the end-to-end cryptographic pipeline easily using our integrated tools:

1. Link Creator Wallet: Connect your web3 wallet (supports Suiet, Slush, Nightly, Phantom) using the unified top bar connection modal.
2. Upload & Seal Asset: Go to the Upload & Seal tab. Select an image file. The platform instantly generates a local SHA-256 hash of the bytes.
3. Decentralized Storage Seal: Click Seal Asset on Ledge*. Provena sequentially proxies the file to the Walrus decentralized network, returning a genuine Walrus Blob ID.
4. On-Chain Anchor: Sign the on-chain Sui registration transaction block via Tatum RPC. Once confirmed, you will receive a real-time Sui Transaction Digest.
5. Inspect the Certificate: View your visual proof block or print/download it as a certified vector PDF. Deep link into Suivision using the transaction explorer button.
6. Cryptographic Proof Check: Copy either the SHA-256 hash, Walrus ID, or Transaction Digest. Go to the Verification Portal and search, or drag-and-drop the original file to verify authenticity directly against SUI ledger state.

---

## Demo

Live Application:

https://provena-ashen.vercel.app/




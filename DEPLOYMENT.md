# Contract Deployment & Setup Manual 📕
### Engineering Playbook — Deploying Sui Move Modules and Running Frontend Client

Provena’s digital ledger consists of a frontend client proxy and a custom smart contract written in **Sui Move**. This handbook explains how to build, test, publish, and configure the smart contract on the SUI Testnet/Mainnet.

---

## 🏗️ 1. Build & Deploy SUI Move Contract

### Prerequisites
- Install **Sui CLI Binary**: Ensure `sui` tool is available in your shell. If not, install via:
  ```bash
  cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
  ```
- Configure Active CLI Network:
  ```bash
  sui client new-env --rpc https://fullnode.testnet.sui.io:443 --alias testnet
  sui client switch --env testnet
  ```

### Step 1: Package Compilation
Navigate to the directory housing the contract (located at `/contracts/provena/`):
```bash
cd contracts/provena

# Compile the Move module code
sui move build
```

### Step 2: Run Module Tests
Verify contract logic boundaries are healthy:
```bash
sui move test
```

### Step 3: Deploy to Sui Blockchain
Deploy the verified package onto SUI Testnet:
```bash
sui client publish --gas-budget 50000000
```

### Step 4: Extract Critical Environment IDs
The transaction response will output publishing metadata. Take note of the following:
1. **Package ID**: Look under the `Publish` command list (e.g. `0x3af5d8cb9bcbc927c3bcbb9872be9871790ae09f19fc11d73507d72cb805ff2a`).
2. **Registry Object Object ID**: Look under `Created` objects for an object type matching `::provenance::AssetRegistry` (e.g. `0x83e292bcbea6ba8cf7a7382d9bcbe817dc9f02931bc11a9fbc6293cb805ff2a`).

---

## 📡 2. Client Side Integration & Production Runs

Once you have published the Move contract, map the generated Package ID and Registry Object ID to connect your frontend with the live on-chain ledger database.

### Step 1: Configure Environment Variables
Create a `.env` file inside the root dir and declare the extracted variables:
```env
# Tatum RPC Enterprise authentication keys
VITE_TATUM_API_KEY=your_key

# Decentralized Walrus Storage Network endpoints
VITE_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
VITE_WALRUS_AGGREGATOR_ENDPOINT=https://aggregator.walrus-testnet.walrus.space

# Custom Deployed sui move variables
VITE_SUI_PACKAGE_ID=your_extracted_package_id_here
VITE_PROVENANCE_REGISTRY_ID=your_extracted_registry_object_id_here
```

### Step 2: Build frontend client assets
Assemble the production bundle into targeted static files:
```bash
npm run build
```

### Step 3: Boot Server
Launch the production runtime environment locally:
```bash
npm run start
```
The client package will now process live transactions directly with Tatum RPC relays and Walrus decentralized node storage endpoints!

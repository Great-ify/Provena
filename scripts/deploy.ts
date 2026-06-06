// @ts-nocheck
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Script to deploy Provena Smart Contract directly onto Sui Testnet or Mainnet.
 */
async function deployContract() {
  const network = process.env.VITE_SUI_NETWORK || 'testnet';
  const privateKey = process.env.SUI_PRIVATE_KEY;
  
  console.log(`[Provenance Deployer] Starting deployment workflow on Sui ${network}...`);
  
  if (!privateKey) {
    console.warn(`[Provenance Deployer] No SUI_PRIVATE_KEY provided. Displaying local build commands instead:`);
    console.log(`To compile and publish manually:`);
    console.log(`  1. cd contracts/provena`);
    console.log(`  2. sui client publish --gas-budget 50000000`);
    return;
  }

  try {
    // 1. Initialize client & signer Keypair
    const rpcUrl = getFullnodeUrl(network as 'testnet' | 'mainnet');
    const client = new SuiClient({ url: rpcUrl });
    const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(privateKey, 'hex'));
    const deployerAddress = keypair.toSuiAddress();
    
    console.log(`[Provenance Deployer] Client ready. Deployer Address: ${deployerAddress}`);

    // 2. Compile Move contract and obtain compiled bytes
    const buildPath = path.join(process.cwd(), 'contracts', 'provena');
    console.log(`[Provenance Deployer] Compiling move package at: ${buildPath}`);
    
    const compilationOutput = execSync(`sui move build --dump-bytecode-as-base64 --path "${buildPath}"`, { encoding: 'utf8' });
    const compiledBytes = JSON.parse(compilationOutput);
    
    // 3. Construct publication Transaction
    const tx = new Transaction();
    const [upgradeCap] = tx.publish({
      modules: compiledBytes.modules,
      dependencies: compiledBytes.dependencies,
    });
    
    tx.transferObjects([upgradeCap], tx.pure.address(deployerAddress));
    tx.setGasBudget(100000000); // 0.1 SUI gas budget

    // 4. Sign and execute deployment
    console.log(`[Provenance Deployer] Signing and executing publication on-chain...`);
    const response = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
        showObjectChanges: true,
      }
    });

    console.log(`[Provenance Deployer] Publication confirmed! Transaction: ${response.digest}`);
    
    // 5. Extract Package ID and Registry Object ID from Object Changes
    let packageId = '';
    let registryId = '';
    
    if (response.objectChanges) {
      for (const change of response.objectChanges) {
        if (change.type === 'published') {
          packageId = change.packageId;
        } else if (change.type === 'created' && change.objectType.includes('ProvenanceRegistry')) {
          registryId = change.objectId;
        }
      }
    }

    console.log(`-----------------------------------------------`);
    console.log(`DEPLOYMENT COMPLETE SUCCESS`);
    console.log(`Sui Package ID: ${packageId || 'Not found'}`);
    console.log(`Provenance Registry object ID: ${registryId || 'Not found'}`);
    console.log(`-----------------------------------------------`);
    
    // Auto write to .env if possible
    const envPath = path.join(process.cwd(), '.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    envContent += `\nVITE_SUI_PACKAGE_ID=${packageId}\nVITE_PROVENANCE_REGISTRY_ID=${registryId}\n`;
    fs.writeFileSync(envPath, envContent);
    console.log(`[Provenance Deployer] Saved new environment variables to .env configured registry.`);
  } catch (error: any) {
    console.error(`[Provenance Deployer] Deployment failed:`, error.message || error);
  }
}

deployContract();

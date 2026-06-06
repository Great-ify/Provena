/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NetworkContextProvider, useNetwork } from './context/NetworkContext';
import { WalletContextProvider } from './context/WalletContext';
import { BlockchainContextProvider } from './context/BlockchainContext';
import { NotificationContextProvider } from './context/NotificationContext';
import App from './App.tsx';

import './index.css';

// Configure standard RPC node endpoints directly with the required network property
const { networkConfig } = createNetworkConfig({
  mainnet: { url: 'https://fullnode.mainnet.sui.io:443', network: 'mainnet' },
  testnet: { url: 'https://fullnode.testnet.sui.io:443', network: 'testnet' },
  localnet: { url: 'http://127.0.0.1:9000', network: 'localnet' },
});

// React Query client instance
const queryClient = new QueryClient();

function SuiClientProviderWrapper({ children }: { children: React.ReactNode }) {
  const { network } = useNetwork();
  const activeSuiNetwork = network === 'Sandbox' ? 'testnet' : network.toLowerCase();
  return (
    <SuiClientProvider networks={networkConfig} network={activeSuiNetwork}>
      {children}
    </SuiClientProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NetworkContextProvider>
        <SuiClientProviderWrapper>
          <WalletProvider autoConnect>
            <WalletContextProvider>
              <BlockchainContextProvider>
                <NotificationContextProvider>
                  <App />
                </NotificationContextProvider>
              </BlockchainContextProvider>
            </WalletContextProvider>
          </WalletProvider>
        </SuiClientProviderWrapper>
      </NetworkContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);

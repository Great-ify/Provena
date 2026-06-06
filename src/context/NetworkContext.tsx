/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tatumClient } from '../services/blockchain/tatumClient';
import { walrusService } from '../services/blockchain/walrusService';
import { assetStore } from '../store/assetStore';

export type NetworkType = 'Mainnet' | 'Testnet' | 'Sandbox';

interface NetworkContextType {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkContextProvider({ children }: { children: ReactNode }) {
  const [network, setNetworkState] = useState<NetworkType>(() => {
    const saved = localStorage.getItem('provena_selected_network');
    if (saved === 'Mainnet' || saved === 'Testnet' || saved === 'Sandbox') {
      return saved as NetworkType;
    }
    return 'Mainnet';
  });

  const setNetwork = (newNetwork: NetworkType) => {
    setNetworkState(newNetwork);
    localStorage.setItem('provena_selected_network', newNetwork);
  };

  // Sync services when active network changes
  useEffect(() => {
    console.info(`[NetworkContext] Network changed to: ${network}`);
    
    // Sync active assets database partition
    assetStore.setActiveNetwork(network);

    // Update Tatum Client SUI Network configuration
    if (network === 'Sandbox') {
      tatumClient.setSuiNetwork('testnet');
    } else {
      tatumClient.setSuiNetwork(network);
    }

    // Update Walrus Service endpoints
    if (network === 'Mainnet') {
      walrusService.setEndpoints(
        'https://publisher.walrus.space', 
        'https://aggregator.walrus.space'
      );
    } else {
      walrusService.setEndpoints(
        'https://publisher.walrus-testnet.walrus.space',
        'https://aggregator.walrus-testnet.walrus.space'
      );
    }
  }, [network]);


  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkContextProvider');
  }
  return context;
}

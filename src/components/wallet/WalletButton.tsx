/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wallet, ChevronDown } from 'lucide-react';
import { formatWalletAddress, formatSuiBalance } from './walletUtils';
import WalletDropdown from './WalletDropdown';

interface WalletButtonProps {
  walletConnected: boolean;
  userAddress: string | null;
  suiBalance: number;
  currentNetwork: string;
  walletName?: string;
  onConnectTrigger: () => void;
  onDisconnectTrigger: () => void;
  onSwitchNetwork?: () => void;
  className?: string;
}

export default function WalletButton({
  walletConnected,
  userAddress,
  suiBalance,
  currentNetwork,
  walletName = 'Sui Wallet',
  onConnectTrigger,
  onDisconnectTrigger,
  onSwitchNetwork,
  className = '',
}: WalletButtonProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!walletConnected || !userAddress) {
    return (
      <button
        onClick={onConnectTrigger}
        className={`h-9 px-4 bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-sans font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#C7FF4D]/5 hover:shadow-[#C7FF4D]/15 active:scale-95 cursor-pointer leading-none ${className}`}
        id="universal-wallet-connect-btn"
      >
        <Wallet className="w-3.5 h-3.5" />
        <span>Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className="relative inline-block" id="wallet-interactive-badge-container">
      {/* Wallet Chip trigger */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`h-9 max-w-[140px] sm:max-w-none bg-[#161A22]/60 hover:bg-[#161A22] border border-[#262B36] hover:border-[#C7FF4D]/35 transition-all py-1.5 px-2.5 sm:px-3.5 rounded-xl flex items-center gap-2 cursor-pointer select-none ${className}`}
        id="active-wallet-chip-btn"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        {/* Active connection indicator */}
        <div className="relative flex items-center justify-center shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4D] animate-ping absolute" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4D]" />
        </div>

        {/* Truncated target user address */}
        <span className="font-mono text-[#F5F7FA] text-xs font-bold truncate">
          {formatWalletAddress(userAddress)}
        </span>

        {/* Balance shown on screens above mobile width (sm: inline-flex) */}
        <span className="hidden sm:inline-flex text-[10.5px] text-[#C7FF4D] font-mono font-extrabold bg-[#C7FF4D]/10 px-2 py-0.5 rounded-lg border border-[#C7FF4D]/20 leading-none shrink-0 whitespace-nowrap">
          {formatSuiBalance(suiBalance)} SUI
        </span>

        <ChevronDown 
          className={`w-3.5 h-3.5 text-[#98A2B3] transition-transform duration-200 shrink-0 ${
            dropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Floating Action Menu dropdown */}
      <WalletDropdown
        isOpen={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
        address={userAddress}
        balance={suiBalance}
        walletName={walletName}
        currentNetwork={currentNetwork}
        onDisconnect={onDisconnectTrigger}
        onSwitchNetwork={onSwitchNetwork}
      />
    </div>
  );
}

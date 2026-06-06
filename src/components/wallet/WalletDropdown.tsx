/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  LogOut, 
  Layers, 
  Wallet, 
  Coins 
} from 'lucide-react';
import { formatWalletAddress, formatSuiBalance } from './walletUtils';

interface WalletDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  balance: number;
  walletName?: string;
  currentNetwork: string;
  onDisconnect: () => void;
  onSwitchNetwork?: () => void;
}

export default function WalletDropdown({
  isOpen,
  onClose,
  address,
  balance,
  walletName = 'Sui Wallet',
  currentNetwork,
  onDisconnect,
  onSwitchNetwork,
}: WalletDropdownProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const getExplorerUrl = (addr: string, net: string) => {
    const netLower = net.toLowerCase();
    const networkParam = netLower === 'mainnet' ? '' : `?network=${netLower}`;
    return `https://suivision.xyz/account/${addr}${networkParam}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent clickaway surface covering full screen to close dropdown safely */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose} 
            id="wallet-dropdown-clickaway" 
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-full max-w-[280px] bg-[#10131A] border border-[#262B36] rounded-2xl shadow-2xl p-4 z-50 text-left overflow-hidden sm:right-0 sm:w-3xl"
            id="wallet-menu-dropdown-box"
          >
            {/* Net connection & Wallet Title header */}
            <div className="flex items-center justify-between border-b border-[#262B36]/50 pb-2.5 mb-3.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C7FF4D] animate-pulse" />
                <span className="text-[10px] font-mono font-extrabold text-[#98A2B3] uppercase tracking-wider">
                  Sovereign Lock
                </span>
              </div>
              <div className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#C7FF4D]/10 text-[#C7FF4D] font-extrabold border border-[#C7FF4D]/25 uppercase">
                {currentNetwork}
              </div>
            </div>

            {/* Wallet metadata detailing Provider & Truncated Address */}
            <div className="bg-[#161A22]/50 border border-[#262B36]/50 rounded-xl p-3 mb-3.5 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-3.5 h-3.5 text-[#14F1D9]" />
                  <span className="text-xs font-bold text-[#F5F7FA]">{walletName}</span>
                </div>
                <span className="text-[10px] text-[#555E6B] font-mono">Index #0</span>
              </div>
              
              <div className="flex items-center justify-between bg-[#07090D]/50 px-2 py-1.5 rounded-lg border border-[#262B36]/30">
                <span className="font-mono text-xs text-[#98A2B3]">
                  {formatWalletAddress(address)}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1 text-[#98A2B3] hover:text-[#C7FF4D] hover:bg-[#161A22] rounded transition-all cursor-pointer"
                  title="Copy address"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#C7FF4D]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Balance panel */}
            <div className="px-1 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#98A2B3]">
                <Coins className="w-3.5 h-3.5 text-[#C7FF4D]" />
                <span>Balances</span>
              </div>
              <span className="font-mono text-xs font-black text-[#F5F7FA]">
                {formatSuiBalance(balance)} SUI
              </span>
            </div>

            {/* Structured action items */}
            <div className="border-t border-[#262B36]/50 pt-2.5 space-y-1">
              {onSwitchNetwork && (
                <button
                  onClick={() => {
                    onSwitchNetwork();
                    onClose();
                  }}
                  className="w-full text-left font-sans text-xs px-2.5 py-2 hover:bg-[#161A22] text-[#98A2B3] hover:text-[#F5F7FA] rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#14F1D9]" />
                    <span>Switch Network</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#555E6B]">ALT + S</span>
                </button>
              )}

              <a
                href={getExplorerUrl(address, currentNetwork)}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="w-full text-left font-sans text-xs px-2.5 py-2 hover:bg-[#161A22] text-[#98A2B3] hover:text-[#F5F7FA] rounded-lg flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>View on Explorer</span>
                </div>
                <span className="text-[9px] text-[#555E6B] font-sans">↗</span>
              </a>

              <button
                onClick={() => {
                  onDisconnect();
                  onClose();
                }}
                className="w-full text-left font-sans text-xs px-2.5 py-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg flex items-center gap-2 cursor-pointer transition-colors mt-1.5"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

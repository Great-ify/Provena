/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Copy, Check, RefreshCw, LogOut, CheckCircle2, Shield, Network } from 'lucide-react';

interface WalletIdentityProps {
  userAddress: string;
  suiBalance: number;
}

export default function WalletIdentity({ userAddress, suiBalance }: WalletIdentityProps) {
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [disconnectError, setDisconnectError] = useState<string | null>(null);

  const displayAddress = userAddress || "0xef3b7...d2c4";
  const displayBalance = suiBalance !== undefined ? suiBalance : 250.75;

  const handleCopy = () => {
    navigator.clipboard.writeText(userAddress || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="space-y-6 text-left" id="settings-wallet">
      <div>
        <h3 className="text-base font-bold text-[#F5F7FA] font-display border-b border-[#262B36]/60 pb-3">
          Wallet & Identity
        </h3>
        <p className="text-xs text-[#98A2B3] mt-1.5 leading-relaxed font-sans">
          Manage your connected Sui ledger, primary address coordinates, and algorithmic transaction credentials.
        </p>
      </div>

      {disconnectError && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 bg-rose-500/10 border border-rose-500/25 rounded-xl flex items-start gap-2.5 text-xs text-rose-300 font-manrope text-left select-text"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5 animate-pulse" />
          <div className="flex-1">
            <span className="font-extrabold block">Ledger Extension Warning</span>
            <span className="text-[11px] mt-0.5 block text-[#98A2B3]">{disconnectError}</span>
          </div>
          <button 
            onClick={() => setDisconnectError(null)}
            className="text-[#98A2B3] hover:text-rose-400 text-[10px] font-bold font-mono pl-3 shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Premium Glassmorphic Card */}
      <div className="relative group overflow-hidden rounded-2xl border border-[#262B36] bg-gradient-to-tr from-[#10131A] via-[#161a22]/90 to-[#1D212C] p-6 shadow-2xl select-none">
        
        {/* Card shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#C7FF4D]/0 via-[#C7FF4D]/2 to-[#14F1D9]/3 pointer-events-none" />
        
        {/* Top bar with custom icons */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C7FF4D]/10 rounded-xl border border-[#C7FF4D]/25 text-[#C7FF4D]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#C7FF4D]/80 uppercase tracking-widest font-bold">SOVEREIGN LEDGER</span>
              <h4 className="text-sm font-bold text-[#F5F7FA] font-display mt-0.5">Sui Wallet Active</h4>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-black/40 border border-[#262B36] py-1 px-2.5 rounded-full text-[9px] font-mono font-bold text-[#C7FF4D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14F1D9] animate-pulse" />
            <span>SUI MAINNET</span>
          </div>
        </div>

        {/* Middle Address details */}
        <div className="mt-8 space-y-1">
          <span className="text-[9px] font-mono text-[#555E6B] uppercase font-black tracking-wider">PRIMARY WALLET ADDRESS</span>
          <p className="text-md md:text-lg font-mono font-bold tracking-tight text-white select-all break-all pr-4">
            {displayAddress}
          </p>
        </div>

        {/* Bottom stats details */}
        <div className="mt-8 flex justify-between items-end pt-4 border-t border-[#262B36]/50">
          <div className="font-mono">
            <span className="text-[8px] text-[#555E6B] uppercase font-black tracking-wider block">AVAILABLE BALANCE</span>
            <span className="text-lg font-black text-white">{displayBalance.toFixed(3)} SUI</span>
          </div>

          <div className="flex items-center gap-1 text-[9px] font-mono text-[#14F1D9] bg-[#14F1D9]/5 border border-[#14F1D9]/20 px-2 py-0.5 rounded uppercase font-bold">
            <Shield className="w-3 h-3" />
            <span>Verified Core</span>
          </div>
        </div>
      </div>

      {/* Compact detail parameters row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-[#262B36]/60 bg-[#0D0F14] text-xs font-mono space-y-2.5">
          <span className="text-[9px] text-[#555E6B] uppercase font-extrabold tracking-wider block">IDENTITY METADATA</span>
          <div className="flex justify-between">
            <span className="text-[#98A2B3]">Connection Status</span>
            <span className="text-[#C7FF4D] font-extrabold">CONNECTED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#98A2B3]">Primary Network</span>
            <span className="text-white">Sui Mainnet Node</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#262B36]/60 bg-[#0D0F14] text-xs font-mono space-y-2.5">
          <span className="text-[9px] text-[#555E6B] uppercase font-extrabold tracking-wider block">CONSENSUS STATISTICS</span>
          <div className="flex justify-between">
            <span className="text-[#98A2B3]">Move Smart Contracts</span>
            <span className="text-[#14F1D9] font-extrabold">TRUSTED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#98A2B3]">Sponsorship Account</span>
            <span className="text-[#98A2B3]">Inactive (Demo)</span>
          </div>
        </div>
      </div>

      {/* Quick Action buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-[#161A22] hover:bg-[#1B212C] text-white border border-[#262B36] rounded-xl text-xs font-bold leading-none cursor-pointer flex items-center gap-2 transition-all active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#C7FF4D]" /> : <Copy className="w-3.5 h-3.5 text-[#98A2B3]" />}
          <span>{copied ? "Copied" : "Copy Address"}</span>
        </button>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-[#161A22] hover:bg-[#1B212C] text-white border border-[#262B36] rounded-xl text-xs font-bold leading-none cursor-pointer flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#98A2B3] ${refreshing ? 'animate-spin text-[#C7FF4D]' : ''}`} />
          <span>{refreshing ? "Refreshing..." : "Refresh Connection"}</span>
        </button>

        <button
          onClick={() => {
            setDisconnectError("To completely disconnect your Sui ledger session, please initiate the disconnect process directly from your browser's wallet extension.");
          }}
          className="px-4 py-2 bg-[#ef4444]/5 hover:bg-[#ef4444]/15 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs font-bold leading-none cursor-pointer flex items-center gap-2 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Disconnect Wallet</span>
        </button>
      </div>
    </div>
  );
}

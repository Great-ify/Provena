/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCw, ChevronDown, User } from 'lucide-react';

interface CertificateHeaderProps {
  onBack: () => void;
  onPrint?: () => void;
  userAddress?: string;
  walletConnected?: boolean;
}

export default function CertificateHeader({
  onBack,
  onPrint,
  userAddress = "0x892a...e911",
  walletConnected = true
}: CertificateHeaderProps) {
  const displayAddress = userAddress.length > 12 
    ? `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`
    : userAddress;

  return (
    <div className="w-full flex flex-col space-y-4 text-left mb-6 select-none" id="cert-header-widget">
      
      {/* 1. Upper Quick Actions Back row for friendly navigation */}
      <div className="flex justify-between items-center pb-2">
        <button
          onClick={onBack}
          className="text-xs font-mono text-[#98A2B3] hover:text-[#C7FF4D] flex items-center gap-2 cursor-pointer transition-colors font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-[#98A2B3]" />
          <span>Go to Desk</span>
        </button>

        {onPrint && (
          <button
            onClick={onPrint}
            className="text-xs font-mono text-[#98A2B3] hover:text-[#C7FF4D] flex items-center gap-1.5 cursor-pointer transition-colors font-bold uppercase tracking-wider"
          >
            <span>[ Print Copy ]</span>
          </button>
        )}
      </div>

      {/* 2. Main Double-Sided Header row (Matches image layout perfectly) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        
        {/* Left Side: Title and Subtitle stacked */}
        <div className="space-y-0.5 text-left">
          <h1 className="text-3xl font-sans font-bold text-white tracking-tight">
            Seal Certificate
          </h1>
          <p className="text-xs text-[#98A2B3] font-sans font-medium">
            Proof of Origin & Ownership.
          </p>
        </div>

        {/* Right Side: Reload + Wallet avatar pill container */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 pb-1">
          
          {/* Reload Action node */}
          <button 
            type="button"
            onClick={() => window.location.reload()}
            className="w-10 h-10 rounded-xl bg-[#161A22] hover:bg-[#1D222F] border border-[#262B36] flex items-center justify-center text-[#98A2B3] hover:text-[#C7FF4D] transition-all cursor-pointer active:scale-95"
            title="Reload State"
          >
            <RotateCw className="w-4 h-4 transition-transform hover:rotate-45" />
          </button>

          {/* SUI Ledger Wallet session pill matching reference visual */}
          <div className="flex items-center gap-2 bg-[#161A22] border border-[#262B36] pl-2.5 pr-3.5 py-1.5 rounded-xl select-none text-xs text-white">
            {/* Round avatar wrapper */}
            <div className="w-5 h-5 rounded-full overflow-hidden bg-gradient-to-tr from-[#C7FF4D]/30 to-[#7CEEFF]/30 flex items-center justify-center border border-white/10 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover scale-110 brightness-95" 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Address descriptor */}
            <span className="font-mono font-bold tracking-tight text-[#E4E7EC]">
              {displayAddress}
            </span>

            {/* Down chevron layout */}
            <ChevronDown className="w-3.5 h-3.5 text-[#555E6B] shrink-0 ml-1.5" />
          </div>

        </div>

      </div>

    </div>
  );
}


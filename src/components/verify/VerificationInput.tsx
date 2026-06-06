/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { VerificationTabId } from './VerificationTabs';

interface VerificationInputProps {
  activeTab: VerificationTabId;
  value: string;
  onChange: (val: string) => void;
  onVerify: () => void;
  isVerifying: boolean;
}

export default function VerificationInput({
  activeTab,
  value,
  onChange,
  onVerify,
  isVerifying
}: VerificationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'tx':
        return 'Enter transaction hash (e.g. 0x8f4d929be6583928...)';
      case 'walrus':
        return 'Enter Walrus Blob ID (e.g. bafkre778a...)';
      case 'cert':
        return 'Enter Certificate UUID...';
      case 'content':
        return 'Enter file sha-256 hash...';
      default:
        return 'Enter transaction hash or Walrus Blob ID...';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isVerifying && value.trim()) {
      onVerify();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3.5 w-full select-none" id="verification-input-wrapper">
      
      {/* Search Input Box (Glassy premium textfield) */}
      <div className="relative flex-1 group">
        <span className="absolute left-4 top-[17px] text-[#555E6B] transition-colors group-focus-within:text-[#C7FF4D]">
          {isVerifying ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#C7FF4D]" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </span>
        
        <input
          ref={inputRef}
          type="text"
          placeholder={getPlaceholder()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isVerifying}
          className="w-full h-12 bg-[#0C1016]/65 border border-[#262B36] rounded-xl pl-12 pr-4 text-xs md:text-sm text-white font-mono placeholder-[#555E6B] focus:outline-none focus:border-[#C7FF4D]/60 focus:bg-[#0C1016]/95 focus:ring-1 focus:ring-[#C7FF4D]/35 transition-all text-left"
          id="verify-cryptographic-input"
        />
        
        {/* Subtle decorative glow line on focus */}
        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C7FF4D]/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 pointer-events-none" />
      </div>

      {/* acid-lime premium verification button */}
      <button
        type="button"
        onClick={onVerify}
        disabled={isVerifying || !value.trim()}
        className="h-12 px-8 bg-[#C7FF4D] hover:bg-[#D9FF6B] disabled:bg-[#161922] disabled:text-[#555E6B] disabled:border-[#262B36]/60 text-[#07090D] border border-transparent font-manrope font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 select-none cursor-pointer shrink-0"
        style={{
          boxShadow: isVerifying ? 'none' : '0 0 15px rgba(199,255,77,0.15)'
        }}
        id="verify-primary-trigger"
      >
        {isVerifying ? 'Verifying...' : 'Verify'}
      </button>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Download, Check } from 'lucide-react';

interface WalletCardProps {
  name: string;
  icon?: string;
  description: string;
  isInstalled: boolean;
  installUrl?: string;
  isSelected?: boolean;
  onSelect: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  name,
  icon,
  description,
  isInstalled,
  installUrl,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={isInstalled ? onSelect : undefined}
      className={`group relative p-3.5 border rounded-xl flex items-center justify-between transition-all duration-300 select-none ${
        isInstalled 
          ? 'bg-[#10131A] hover:bg-[#161A22] cursor-pointer' 
          : 'bg-[#10131A]/40 border-[#262B36]/40 opacity-70'
      } ${
        isSelected 
          ? 'border-[#C7FF4D] shadow-[0_0_15px_rgba(199,255,77,0.1)]' 
          : 'border-[#262B36] hover:border-[#C7FF4D]/45'
      }`}
    >
      <div className="flex items-center gap-3.5 text-left min-w-0">
        {/* Wallet Logo */}
        <div className="w-10 h-10 rounded-lg bg-[#262B36]/30 group-hover:bg-[#262B36]/60 flex items-center justify-center transition-all overflow-hidden p-1.5 shrink-0">
          {icon ? (
            <img 
              src={icon} 
              alt={name} 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C7FF4D]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12V7H3v10h18v-5z" />
              <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4" />
            </svg>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F5F7FA] group-hover:text-[#C7FF4D] transition-colors truncate">
              {name}
            </span>
            {isInstalled ? (
              <span className="text-[8px] font-mono px-1 py-[1px] rounded bg-[#14F1D9]/10 text-[#14F1D9] border border-[#14F1D9]/20 font-bold uppercase leading-none">
                Installed
              </span>
            ) : (
              <span className="text-[8px] font-mono px-1 py-[1px] rounded bg-amber-500/10 text-amber-500 border border-amber-500/25 font-bold uppercase leading-none">
                Not Found
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#98A2B3] font-sans mt-0.5 block truncate">
            {description}
          </span>
        </div>
      </div>

      {/* State Badge Action Button */}
      <div className="shrink-0 pl-2">
        {isSelected ? (
          <div className="w-5 h-5 rounded-full bg-[#C7FF4D] flex items-center justify-center text-[#07090D]">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
        ) : isInstalled ? (
          <ArrowRight className="w-4 h-4 text-[#555E6B] group-hover:text-[#C7FF4D] transition-colors group-hover:translate-x-0.5" />
        ) : (
          installUrl && (
            <a
              href={installUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-lg border border-[#262B36] hover:border-amber-500 hover:bg-amber-500/10 text-[#98A2B3] hover:text-amber-500 flex items-center justify-center transition-all"
              title="Download extension"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default WalletCard;

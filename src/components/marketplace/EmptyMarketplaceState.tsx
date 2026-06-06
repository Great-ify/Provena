/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Sliders } from 'lucide-react';

interface EmptyMarketplaceStateProps {
  onReset: () => void;
}

export default function EmptyMarketplaceState({ onReset }: EmptyMarketplaceStateProps) {
  return (
    <div className="border border-dashed border-[#262B36] bg-[#10131A]/35 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[220px]" id="marketplace-empty-indicator">
      <div className="p-3 bg-[#e5ff4d]/10 rounded-full border border-[#C7FF4D]/25 text-[#C7FF4D]">
        <Sliders className="w-5 h-5" />
      </div>
      <div className="space-y-1.5 text-center">
        <h4 className="text-xs text-[#F5F7FA] font-mono uppercase tracking-widest font-extrabold">No Matches Found</h4>
        <p className="text-xs text-[#98A2B3] leading-relaxed max-w-sm mx-auto font-manrope">
          No registered intellectual seals match your query. Adjust your category filters or simplify search tokens.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="px-3.5 py-1.5 bg-[#161A22] hover:bg-[#C7FF4D] text-[#C7FF4D] hover:text-[#07090D] border border-[#C7FF4D]/30 hover:border-[#C7FF4D] rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200"
      >
        Reset Filter Query
      </button>
    </div>
  );
}

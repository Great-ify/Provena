/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CategoryPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  key?: string;
}

export default function CategoryPill({ label, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-manrope text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none border whitespace-nowrap ${
        isActive
          ? 'bg-[#C7FF4D]/10 border-[#C7FF4D] text-[#D9FF6B] shadow-[0_0_12px_rgba(199,255,77,0.12)]'
          : 'bg-[#10131A] border-[#262B36] text-[#98A2B3] hover:text-[#F5F7FA] hover:border-[#98A2B3]/30'
      }`}
    >
      {label}
    </button>
  );
}

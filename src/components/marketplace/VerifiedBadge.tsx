/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function VerifiedBadge() {
  return (
    <div 
      className="inline-flex items-center gap-1 bg-[#C7FF4D]/10 border border-[#C7FF4D]/35 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-[#D9FF6B] shadow-[0_0_8px_rgba(199,255,77,0.1)] select-none shrink-0"
      id="card-integrity-badge"
    >
      <div className="w-1 h-1 rounded-full bg-[#C7FF4D] animate-pulse" />
      <span>Verified</span>
    </div>
  );
}

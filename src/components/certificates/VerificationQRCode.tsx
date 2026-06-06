/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface VerificationQRCodeProps {
  label?: string;
  subLabel?: string;
}

export default function VerificationQRCode({
  label = "Verify Authenticity",
  subLabel = "Scan to verify"
}: VerificationQRCodeProps) {
  return (
    <div className="flex items-center gap-3.5 p-3 rounded-2xl select-none font-manrope bg-[rgba(255,255,255,0.03)] border border-white/10" id="cert-qr-container">
      {/* 2D Cryptographic Matrix Grid */}
      <div className="w-11 h-11 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#07090D]" fill="currentColor">
          {/* Top-Left Finder Pattern */}
          <rect x="0" y="0" width="30" height="30" />
          <rect x="5" y="5" width="20" height="20" fill="white" />
          <rect x="10" y="10" width="10" height="10" />

          {/* Top-Right Finder Pattern */}
          <rect x="70" y="0" width="30" height="30" />
          <rect x="75" y="5" width="20" height="15" fill="white" />
          <rect x="80" y="10" width="10" height="10" />

          {/* Bottom-Left Finder Pattern */}
          <rect x="0" y="70" width="30" height="30" />
          <rect x="5" y="75" width="20" height="20" fill="white" />
          <rect x="10" y="80" width="10" height="10" />

          {/* Bottom-Right alignment/timing patterns & noise simulation */}
          <rect x="40" y="40" width="10" height="10" />
          <rect x="55" y="40" width="10" height="10" />
          <rect x="40" y="55" width="10" height="10" />
          <rect x="80" y="80" width="10" height="10" />
          
          <rect x="45" y="10" width="5" height="5" />
          <rect x="55" y="15" width="5" height="5" />
          <rect x="15" y="45" width="5" height="5" />
          <rect x="25" y="55" width="5" height="5" />
          <rect x="45" y="75" width="5" height="5" />
          <rect x="55" y="85" width="5" height="5" />
          <rect x="85" y="45" width="5" height="5" />
          <rect x="75" y="55" width="5" height="5" />
        </svg>
      </div>

      <div className="text-left flex flex-col justify-center">
        <span className="text-xs font-semibold text-white/95 leading-tight block">
          {label}
        </span>
        <span className="text-[10px] font-mono text-[#98A2B3] uppercase mt-0.5 tracking-[0.08em] block">
          {subLabel}
        </span>
      </div>
    </div>
  );
}

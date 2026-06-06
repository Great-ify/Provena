/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ScannerHero from './ScannerHero';
import FeaturePreviewGrid from './FeaturePreviewGrid';
import WaitlistCard from './WaitlistCard';

export default function ScannerLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-12 text-left select-none" id="scanner-premium-preview">
      
      {/* 1. FUTURISTIC HERO SECTION */}
      <ScannerHero />

      {/* 2. DUAL SPLIT ROW: CAPABILITIES PREVIEW & WAITLIST INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-2 items-start">
        
        {/* Left Side: Modular capabilities (6 cols on lg) */}
        <div className="lg:col-span-7">
          <FeaturePreviewGrid />
        </div>

        {/* Right Side: Priority Waitlist form integration (5 cols on lg) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <WaitlistCard />
        </div>

      </div>

    </div>
  );
}

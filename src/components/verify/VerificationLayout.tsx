/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';

interface VerificationLayoutProps {
  header: ReactNode;
  searchContainer: ReactNode;
  resultContainer: ReactNode;
}

export default function VerificationLayout({
  header,
  searchContainer,
  resultContainer
}: VerificationLayoutProps) {
  return (
    <div 
      className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8 text-left select-none" 
      id="verifiability-portal-layout"
    >
      {/* SECTION 1: HEADER SECTION */}
      <div id="verify-section-header">
        {header}
      </div>

      {/* SECTION 2: SEARCH TABBED SEARCHBAR BOX */}
      <div className="bg-[#10131A]/90 border border-[#262B36] rounded-2xl p-5 md:p-7 space-y-5 shadow-xl relative overflow-hidden" id="verify-section-search">
        {/* Subtle decorative glow accent inside Search Panel */}
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-[rgba(199,255,77,0.015)] rounded-full blur-[60px] pointer-events-none select-none" />
        
        {searchContainer}
      </div>

      {/* SECTION 3: RESULT PRESENTATION PANEL */}
      <div id="verify-section-result">
        {resultContainer}
      </div>
    </div>
  );
}

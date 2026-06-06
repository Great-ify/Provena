/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MarketplaceLayoutProps {
  header: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
}

export default function MarketplaceLayout({
  header,
  filters,
  children
}: MarketplaceLayoutProps) {
  return (
    <div className="w-full space-y-8 text-left" id="marketplace-core-layout">
      {/* 1. Header Banner */}
      <div className="w-full">
        {header}
      </div>

      {/* 2. Filters & Searches */}
      {filters && (
        <div className="w-full pb-1 border-b border-[#262B36]/35">
          {filters}
        </div>
      )}

      {/* 3. Main Body Canvas */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

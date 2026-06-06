/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Award, ShieldAlert, BarChart3 } from 'lucide-react';

interface MarketplaceHeaderProps {
  currentSubTab: 'discover' | 'my-assets' | 'licensing' | 'analytics';
  onSubTabChange: (tab: 'discover' | 'my-assets' | 'licensing' | 'analytics') => void;
}

export default function MarketplaceHeader({
  currentSubTab,
  onSubTabChange
}: MarketplaceHeaderProps) {
  const subTabs = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'my-assets', label: 'My Assets', icon: Award },
    { id: 'licensing', label: 'Licensing', icon: ShieldAlert },
    { id: 'analytics', label: 'Creator Hub', icon: BarChart3 }
  ] as const;

  return (
    <div className="text-left space-y-6 select-none" id="marketplace-header-section">
      
      {/* Editorial Title banner */}
      <div className="space-y-1.5">
        <span className="text-xs font-mono text-[#C7FF4D] uppercase tracking-[0.15em] block font-extrabold">
          Sovereign Monetization Layer
        </span>
        <h1 className="text-2xl md:text-3xl font-manrope font-black text-[#F5F7FA] tracking-tight">
          Marketplace
        </h1>
        <p className="text-xs md:text-sm text-[#98A2B3] font-manrope max-w-xl font-medium">
          Discover, license, and collect verified digital works with high-integrity cryptographic proofs settled on Sui.
        </p>
      </div>

      {/* Switchable internal sub-routing layout as required */}
      <div className="flex border-b border-[#262B36]/65 overflow-x-auto scrollbar-none gap-6 md:gap-8 pt-1 pb-1">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSubTabChange(tab.id)}
              className={`relative pb-3 flex items-center gap-2 text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'text-[#C7FF4D]' 
                  : 'text-[#98A2B3] hover:text-[#F5F7FA]'
              }`}
              id={`marketplace-subtab-${tab.id}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeMarketplaceSubTabIndicator"
                  className="absolute bottom-[-1.5px] left-0 right-0 h-[2.5px] bg-[#C7FF4D]"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}

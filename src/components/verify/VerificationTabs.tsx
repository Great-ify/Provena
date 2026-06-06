/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export type VerificationTabId = 'tx' | 'walrus' | 'cert' | 'content';

interface TabItem {
  id: VerificationTabId;
  label: string;
  disabled?: boolean;
}

interface VerificationTabsProps {
  activeTab: VerificationTabId;
  onChangeTab: (tabId: VerificationTabId) => void;
}

export default function VerificationTabs({ activeTab, onChangeTab }: VerificationTabsProps) {
  const tabs: TabItem[] = [
    { id: 'tx', label: 'Transaction Hash' },
    { id: 'walrus', label: 'Walrus Blob ID' },
    { id: 'cert', label: 'Certificate ID' },
    { id: 'content', label: 'Content Hash / Upload File' }
  ];

  return (
    <div className="flex items-center gap-6 md:gap-8 border-b border-[#262B36]/50 pb-3 select-none overflow-x-auto scrollbar-none w-full" id="verification-tabs-strip">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => !tab.disabled && onChangeTab(tab.id)}
            disabled={tab.disabled}
            className={`relative py-1.5 font-manrope text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
              isActive 
                ? 'text-[#C7FF4D]' 
                : tab.disabled 
                  ? 'text-[#262B36] cursor-not-allowed text-[11px] font-medium' 
                  : 'text-[#98A2B3] hover:text-[#F5F7FA]'
            }`}
          >
            <span>{tab.label}</span>
            {isActive && (
              <motion.div 
                layoutId="activeVerificationTabIndicator"
                className="absolute bottom-[-13px] left-0 right-0 h-[2.5px] bg-[#C7FF4D]"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

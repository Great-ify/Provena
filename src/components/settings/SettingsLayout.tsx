/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Sparkles, Shield, Bell, HardDrive, ChevronDown, ChevronRight } from 'lucide-react';

import SettingsHeader from './SettingsHeader';
import SettingsSidebar, { SettingsTab } from './SettingsSidebar';
import WalletIdentity from './WalletIdentity';
import ProvenancePreferences from './ProvenancePreferences';
import PrivacySecurity from './PrivacySecurity';
import NotificationSettings from './NotificationSettings';
import StorageData from './StorageData';

interface SettingsLayoutProps {
  userAddress: string;
  suiBalance: number;
  assetsCount: number;
}

export default function SettingsLayout({ userAddress, suiBalance, assetsCount }: SettingsLayoutProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('wallet');
  
  // Responsive accordion mobile state (holds which accordions are currently expanded on mobile)
  const [expandedAccordions, setExpandedAccordions] = useState<Record<SettingsTab, boolean>>({
    wallet: true,
    provenance: false,
    privacy: false,
    notifications: false,
    storage: false,
  });

  const toggleAccordion = (tab: SettingsTab) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  // Helper rendering corresponding category panels
  const renderTabContent = (tab: SettingsTab) => {
    switch (tab) {
      case 'wallet':
        return <WalletIdentity userAddress={userAddress} suiBalance={suiBalance} />;
      case 'provenance':
        return <ProvenancePreferences />;
      case 'privacy':
        return <PrivacySecurity />;
      case 'notifications':
        return <NotificationSettings />;
      case 'storage':
        return <StorageData assetsCount={assetsCount} />;
      default:
        return null;
    }
  };

  const categoriesList = [
    { id: 'wallet' as SettingsTab, label: 'Wallet & Identity', icon: Wallet, desc: 'Sovereign ID & Connected Ledger' },
    { id: 'provenance' as SettingsTab, label: 'Provenance Preferences', icon: Sparkles, desc: 'Automation & Mint standards' },
    { id: 'privacy' as SettingsTab, label: 'Privacy & Security', icon: Shield, desc: 'Decentralized Visibility Blocks' },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell, desc: 'Granular Event Alert Channels' },
    { id: 'storage' as SettingsTab, label: 'Storage & Data', icon: HardDrive, desc: 'Walrus blob storage statistics' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 text-left select-none" id="settings-unified-deck">
      
      {/* SettingsHeader */}
      <SettingsHeader />

      {/* Responsive Workspace Grid */}
      <div className="w-full">
        
        {/* DESKTOP WORKSPACE VIEW (Hidden on mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Left Selector */}
          <div className="col-span-4 lg:col-span-3">
            <SettingsSidebar 
              activeTab={activeTab} 
              onChangeTab={setActiveTab} 
            />
          </div>

          {/* Core Interactive Panel Right */}
          <div className="col-span-8 lg:col-span-9 bg-[#10131A] border border-[#262B36] rounded-2xl p-8 shadow-2xl relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {renderTabContent(activeTab)}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* MOBILE ACCORDION VIEW (Hidden on desktop) */}
        <div className="md:hidden space-y-4">
          {categoriesList.map((item) => {
            const Icon = item.icon;
            const isOpen = expandedAccordions[item.id];

            return (
              <div 
                key={item.id} 
                className="bg-[#10131A] border border-[#262B36] rounded-xl overflow-hidden transition-all duration-300"
              >
                {/* Accordion header bar */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#161a22]/30 select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${
                      isOpen 
                        ? 'bg-[#C7FF4D]/10 border-[#C7FF4D]/25 text-[#C7FF4D]' 
                        : 'bg-[#161a22] border-[#262B36]/50 text-[#98A2B3]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold font-sans ${isOpen ? 'text-[#C7FF4D]' : 'text-[#F5F7FA]'}`}>
                        {item.label}
                      </h4>
                      <p className="text-[10px] text-[#555E6B] font-mono leading-none mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-[#C7FF4D] shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#555E6B] shrink-0" />
                  )}
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-[#262B36]/40"
                    >
                      <div className="p-5 bg-[#0D0F14]/40 select-text overflow-x-hidden">
                        {renderTabContent(item.id)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}

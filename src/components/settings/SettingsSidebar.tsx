/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Wallet, Sparkles, Shield, Bell, HardDrive, ChevronRight } from 'lucide-react';

export type SettingsTab = 'wallet' | 'provenance' | 'privacy' | 'notifications' | 'storage';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onChangeTab: (tab: SettingsTab) => void;
}

export default function SettingsSidebar({ activeTab, onChangeTab }: SettingsSidebarProps) {
  const menuItems = [
    { id: 'wallet' as SettingsTab, label: 'Wallet & Identity', icon: Wallet, desc: 'Sovereign ID & Ledger' },
    { id: 'provenance' as SettingsTab, label: 'Provenance Preferences', icon: Sparkles, desc: 'Certificate Automation' },
    { id: 'privacy' as SettingsTab, label: 'Privacy & Security', icon: Shield, desc: 'Visibility & Visibility' },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell, desc: 'Real-time Event Alerts' },
    { id: 'storage' as SettingsTab, label: 'Storage & Data', icon: HardDrive, desc: 'Blob Archival Metrics' },
  ];

  return (
    <div className="flex flex-col gap-2 bg-[#10131A]/40 border border-[#262B36]/50 p-2 text-left rounded-2xl w-full" id="settings-sidebar">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className={`w-full py-3.5 px-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer ${
              isActive
                ? 'bg-[#161A22] border-[#262B36] text-[#C7FF4D] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                : 'border-transparent text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#161A22]/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border transition-colors ${
                isActive 
                  ? 'bg-[#C7FF4D]/10 border-[#C7FF4D]/25 text-[#C7FF4D]' 
                  : 'bg-[#10131A]/40 border-[#262B36]/30 text-[#98A2B3] group-hover:text-[#F5F7FA] group-hover:border-[#262B36]'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col select-none">
                <span className="text-xs font-bold font-sans tracking-wide leading-none">{item.label}</span>
                <span className={`text-[10px] font-mono mt-1 ${isActive ? 'text-[#C7FF4D]/80' : 'text-[#555E6B]'}`}>
                  {item.desc}
                </span>
              </div>
            </div>
            
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
              isActive ? 'text-[#C7FF4D] translate-x-0.5' : 'text-[#262B36] group-hover:text-[#98A2B3]'
            }`} />
          </button>
        );
      })}
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Check, BellRing } from 'lucide-react';

export default function NotificationSettings() {
  const [certGenerated, setCertGenerated] = useState(true);
  const [ownershipVerified, setOwnershipVerified] = useState(true);
  const [marketActivity, setMarketActivity] = useState(false);
  const [licensePurchased, setLicensePurchased] = useState(true);
  const [assetViewed, setAssetViewed] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 text-left" id="settings-notifications">
      <div>
        <h3 className="text-base font-bold text-[#F5F7FA] font-display border-b border-[#262B36]/60 pb-3">
          Notification Settings
        </h3>
        <p className="text-xs text-[#98A2B3] mt-1.5 leading-relaxed font-sans">
          Toggle granular browser, email, and on-chain protocol alerts for events triggered within your digital portfolio.
        </p>
      </div>

      <div className="space-y-5 bg-[#10131A] border border-[#262B36] rounded-2xl p-6">
        
        {/* Toggle 1: Certificate Generated */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Certificate Mint Completed</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Notify me instantly inside the console header whenever on-chain metadata structures successfully compile.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setCertGenerated(!certGenerated)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              certGenerated ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                certGenerated ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Ownership Verified */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Sovereign Validation Verified</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Receive live alerts when consensus indices confirm a newly generated signature.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setOwnershipVerified(!ownershipVerified)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              ownershipVerified ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                ownershipVerified ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Marketplace Activity */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Marketplace Floor Pricing Updates</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Alert of relevant licensing pricing shifts, floor actions, and creator index rankings.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setMarketActivity(!marketActivity)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              marketActivity ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                marketActivity ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 4: License Purchased */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">License Bought & Syndicated</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Notify immediately when other web3 systems purchase commercial leases or trigger royalty smart contracts.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setLicensePurchased(!licensePurchased)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              licensePurchased ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                licensePurchased ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 5: Asset Viewed */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Certificate Metadata Checked</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Notify me whenever custom scanners resolve public links or scan QR packets printed on issued certificates.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setAssetViewed(!assetViewed)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              assetViewed ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                assetViewed ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 6: Security Alerts */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans flex items-center gap-1.5">
              <span>Security & Intrusion Alarms</span>
              <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/25 px-1.5 py-0.5 rounded font-mono font-bold">MUTABLE</span>
            </span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Trigger high-priority system alerts and send email triggers when suspect similarity indicators hit critical ranges.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setSecurityAlerts(!securityAlerts)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              securityAlerts ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                securityAlerts ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

      </div>

      {/* Save Button Row */}
      <div className="flex justify-end select-none">
        <button
          onClick={handleSave}
          className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-sans font-bold text-xs py-2.5 px-5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
          id="save-notifications-btn"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Alerts Programmed' : 'Save Notification Matrix'}</span>
        </button>
      </div>
    </div>
  );
}

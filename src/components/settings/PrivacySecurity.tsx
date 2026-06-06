/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Check, Lock, Shield, ShieldAlert, Cpu } from 'lucide-react';

export default function PrivacySecurity() {
  const [displayAddress, setDisplayAddress] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [allowLookups, setAllowLookups] = useState(true);
  const [showMarketplay, setShowMarketplay] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 text-left" id="settings-privacy">
      <div>
        <h3 className="text-base font-bold text-[#F5F7FA] font-display border-b border-[#262B36]/60 pb-3">
          Privacy & Security
        </h3>
        <p className="text-xs text-[#98A2B3] mt-1.5 leading-relaxed font-sans">
          Audit global lookup permissions, metadata visibility bounds, and biometric or smart contract account guards.
        </p>
      </div>

      <div className="space-y-5 bg-[#10131A] border border-[#262B36] rounded-2xl p-6">
        
        {/* Toggle 1: Display Wallet Address */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Display Wallet Address Publicly</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Expose a masked version of your connected Sui wallet address (e.g. 0x82...3fcd) on ownership certificates.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setDisplayAddress(!displayAddress)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              displayAddress ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                displayAddress ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Show Ownership History */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Public Ownership History Logs</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Permit public crawlers to fetch ancestral and provenance transactions linked to your minted seals.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              showHistory ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                showHistory ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Public Profile Visibility */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Public Creator Profile Page</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Generate a publicly shareable vanity page listing your verified certificates and marketplace offerings.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setPublicProfile(!publicProfile)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              publicProfile ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                publicProfile ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 4: Allow Verification Lookups */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Universal Verification Lookups</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Allow third-party audit channels to query certificate hashes via the unified Provena Verification Portal.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setAllowLookups(!allowLookups)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              allowLookups ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                allowLookups ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 5: Show Marketplace Activity */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Display Licensing Activity on Dashboard</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Expose license sales and acquired commercial lease metrics on the public analytics feed.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setShowMarketplay(!showMarketplay)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              showMarketplay ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                showMarketplay ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* --- FUTURE-PROOF PLACEHOLDERS ("Coming soon") --- */}
        <div className="pt-4 space-y-4">
          <h4 className="text-[10px] font-mono text-[#555E6B] uppercase tracking-wider font-extrabold select-none">Advanced Smart Security Controls</h4>

          {/* Card 1: Hardware Wallet Protection */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-[#262B36]/40 opacity-60">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white/90">Multisig Hardware Ledger Binding</span>
                <span className="text-[8px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/25 px-1.5 py-0.5 rounded font-bold">SOON</span>
              </div>
              <p className="text-[10px] text-[#98A2B3]">
                Require offline hardware keystore validations (Ledger/Trezor) to approve metadata modifications or royalty address updates.
              </p>
            </div>
            <Lock className="w-4 h-4 text-[#555E6B] shrink-0" />
          </div>

          {/* Card 2: 2FA Authentication */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-[#262B36]/40 opacity-60">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white/90">Biometric / Two-Factor Authentication</span>
                <span className="text-[8px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/25 px-1.5 py-0.5 rounded font-bold">SOON</span>
              </div>
              <p className="text-[10px] text-[#98A2B3]">
                Add double-factor authenticator safeguards (Google Authenticator, YubiKey) to high-risk transactions.
              </p>
            </div>
            <Cpu className="w-4 h-4 text-[#555E6B] shrink-0" />
          </div>

          {/* Card 3: Security Alerts */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-[#262B36]/40 opacity-60">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white/90">Infringement & Rogue Seal Scanners</span>
                <span className="text-[8px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/25 px-1.5 py-0.5 rounded font-bold">SOON</span>
              </div>
              <p className="text-[10px] text-[#98A2B3]">
                Receive instant emails and text notifications if duplicate visual assets or imitation licenses are registered across foreign Sui nodes.
              </p>
            </div>
            <ShieldAlert className="w-4 h-4 text-[#555E6B] shrink-0" />
          </div>

        </div>

      </div>

      {/* Save Button Row */}
      <div className="flex justify-end select-none">
        <button
          onClick={handleSave}
          className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-sans font-bold text-xs py-2.5 px-5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
          id="save-privacy-btn"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Security Settings Saved' : 'Save Security Options'}</span>
        </button>
      </div>
    </div>
  );
}

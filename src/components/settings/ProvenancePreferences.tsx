/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Check, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export default function ProvenancePreferences() {
  const [autoGen, setAutoGen] = useState(true);
  const [autoVerify, setAutoVerify] = useState(true);
  const [defaultVisibility, setDefaultVisibility] = useState('PUBLIC');
  const [defaultLicense, setDefaultLicense] = useState('COMMERCIAL_USE');
  const [defaultNetwork, setDefaultNetwork] = useState('sui_mainnet');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 text-left" id="settings-preferences">
      <div>
        <h3 className="text-base font-bold text-[#F5F7FA] font-display border-b border-[#262B36]/60 pb-3">
          Provenance Preferences
        </h3>
        <p className="text-xs text-[#98A2B3] mt-1.5 leading-relaxed font-sans">
          Configure default cryptographic properties, automation triggers, and commercial syndication standards applied to newly minted seals.
        </p>
      </div>

      <div className="space-y-5 bg-[#10131A] border border-[#262B36] rounded-2xl p-6">
        
        {/* Toggle 1: Auto Generate Certificate */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans flex items-center gap-1.5">
              <span>Auto-Generate Certificates</span>
              <span className="text-[9px] bg-[#C7FF4D]/10 text-[#C7FF4D] px-1.5 py-0.5 rounded font-mono font-bold">RECOMENDED</span>
            </span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Instantly compile, seal, and issue local cryptographic certificates as downloadable PDF metadata packets immediately during the on-chain mint process.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setAutoGen(!autoGen)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              autoGen ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                autoGen ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Auto Verify After Seal */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262B36]/40">
          <div className="space-y-0.5 max-w-md select-none">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Auto-Verify Immediately After Seal</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Validate integrity score, verify cryptographic file parity parameters, and index with the global Provena consensus immediately upon blockchain anchoring.
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setAutoVerify(!autoVerify)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              autoVerify ? 'bg-[#C7FF4D]' : 'bg-[#262B36]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#07090D] shadow ring-0 transition duration-200 ease-in-out ${
                autoVerify ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Dropdown 1: Default Ownership Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 items-center">
          <div className="space-y-0.5 select-none text-left">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Default Ownership Visibility</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Control which nodes are authorized to trace historical ownership chains.
            </p>
          </div>
          <select
            value={defaultVisibility}
            onChange={(e) => setDefaultVisibility(e.target.value)}
            className="w-full bg-[#161A22] border border-[#262B36] focus:border-[#C7FF4D]/45 rounded-xl px-4 py-2.5 text-xs text-[#F5F7FA] font-mono cursor-pointer transition-colors"
          >
            <option value="PUBLIC">PUBLIC — Traceable by all network nodes</option>
            <option value="ENCRYPTED">ENCRYPTED — Authenticated lookup only</option>
            <option value="ZK_BOUNDED">ZK_BOUNDED — Zero Knowledge obfuscated</option>
          </select>
        </div>

        {/* Dropdown 2: Default License Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 items-center">
          <div className="space-y-0.5 select-none text-left">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans flex items-center gap-1">
              <span>Default License Standard</span>
              <HelpCircle className="w-3.5 h-3.5 text-[#555E6B]" title="Select default creative licensing format" />
            </span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Standardized Move smart contracts applied to commercial acquisitions.
            </p>
          </div>
          <select
            value={defaultLicense}
            onChange={(e) => setDefaultLicense(e.target.value)}
            className="w-full bg-[#161A22] border border-[#262B36] focus:border-[#C7FF4D]/45 rounded-xl px-4 py-2.5 text-xs text-[#F5F7FA] font-mono cursor-pointer transition-colors"
          >
            <option value="COMMERCIAL_USE">COMMERCIAL_USE — Multi-channel usage rights</option>
            <option value="PERSONAL_ONLY">PERSONAL_ONLY — Non-commercial licensing</option>
            <option value="SHARING_REVOCABLE">SHARING_REVOCABLE — Peer-to-peer distribution</option>
          </select>
        </div>

        {/* Dropdown 3: Default Network */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 items-center">
          <div className="space-y-0.5 select-none text-left">
            <span className="text-xs font-bold text-[#F5F7FA] font-sans">Sovereign Relaying Network</span>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Target Sui API endpoint clusters to index freshly stamped hashes.
            </p>
          </div>
          <select
            value={defaultNetwork}
            onChange={(e) => setDefaultNetwork(e.target.value)}
            className="w-full bg-[#161A22] border border-[#262B36] focus:border-[#C7FF4D]/45 rounded-xl px-4 py-2.5 text-xs text-[#F5F7FA] font-mono cursor-pointer transition-colors"
          >
            <option value="sui_mainnet">SUI Mainnet — Tatum Secure Cluster</option>
            <option value="sui_devnet">SUI Devnet — Local Testnet Sandbox</option>
            <option value="walrus_testnet">WALRUS Testnet — Decentralized Blob Nodes</option>
          </select>
        </div>

      </div>

      {/* Save Trigger Row */}
      <div className="flex justify-end select-none">
        <button
          onClick={handleSave}
          className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-sans font-bold text-xs py-2.5 px-5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
          id="save-preferences-btn"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Preferences Saved' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );
}

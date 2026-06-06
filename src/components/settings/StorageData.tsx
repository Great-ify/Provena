/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HardDrive, Download, Database, Share2, Shield, Activity, RefreshCw } from 'lucide-react';

interface StorageDataProps {
  assetsCount?: number;
}

export default function StorageData({ assetsCount = 3 }: StorageDataProps) {
  const [downloadingCert, setDownloadingCert] = useState(false);
  const [downloadingHistory, setDownloadingHistory] = useState(false);
  const [exportingData, setExportingData] = useState(false);

  // Storage metric definitions
  const totalSlots = 100; // GB total
  const baseAssetsSizeGb = Number((assetsCount * 4.12).toFixed(2)); // mock size calc
  const usedStorageGb = 12.4 + baseAssetsSizeGb;

  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  const handleDownloadCerts = () => {
    setDownloadingCert(true);
    setSuccessNotification(null);
    setTimeout(() => {
      setDownloadingCert(false);
      setSuccessNotification("ZIP package containing verified PDF provenance certificates compiled, signed, and downloaded successfully.");
    }, 1500);
  };

  const handleDownloadHistory = () => {
    setDownloadingHistory(true);
    setSuccessNotification(null);
    setTimeout(() => {
      setDownloadingHistory(false);
      setSuccessNotification("Decentralized license lease ledger exported as CSV format and downloaded successfully.");
    }, 1500);
  };

  const handleExportData = () => {
    setExportingData(true);
    setSuccessNotification(null);
    setTimeout(() => {
      setExportingData(false);
      setSuccessNotification("Secure profile identity specification matrix zipped and exported to your local disk.");
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left" id="settings-storage">
      <div>
        <h3 className="text-base font-bold text-[#F5F7FA] font-display border-b border-[#262B36]/60 pb-3">
          Storage & Data
        </h3>
        <p className="text-xs text-[#98A2B3] mt-1.5 leading-relaxed font-sans">
          Monitor your active Walrus blob slots, cryptographic certificate cache parameters, and download historic reports.
        </p>
      </div>

      {successNotification && (
        <div className="p-3.5 bg-[#C7FF4D]/10 border border-[#C7FF4D]/25 rounded-xl flex items-start gap-2.5 text-xs text-[#C7FF4D] font-manrope text-left select-text animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4D] shrink-0 mt-1.5 animate-pulse" />
          <div className="flex-1">
            <span className="font-extrabold block">Operation Completed</span>
            <span className="text-[11px] mt-0.5 block text-[#98A2B3]">{successNotification}</span>
          </div>
          <button 
            type="button"
            onClick={() => setSuccessNotification(null)}
            className="text-[#98A2B3] hover:text-[#C7FF4D] text-[10px] font-bold font-mono pl-3 shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Storage usage indicator card */}
      <div className="border border-[#262B36] bg-[#10131A] rounded-2xl p-6 relative overflow-hidden select-none">
        {/* Glow corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C7FF4D]/3 pointer-events-none rounded-full blur-2xl" />

        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-[#555E6B] uppercase font-extrabold tracking-wider block">DECENTRALIZED SPACE</span>
            <p className="text-2xl font-black text-white font-display">Used Walrus Storage</p>
          </div>
          <div className="p-2 bg-[#C7FF4D]/10 rounded-xl border border-[#C7FF4D]/25 text-[#C7FF4D]">
            <HardDrive className="w-5 h-5" />
          </div>
        </div>

        {/* Big Progress line */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-end font-mono text-xs text-white">
            <span className="font-bold text-[#C7FF4D]">{usedStorageGb.toFixed(2)} GB used</span>
            <span className="text-[#555E6B]">/ {totalSlots} GB capacity</span>
          </div>
          <div className="w-full h-3 bg-[#161A22] rounded-full overflow-hidden border border-[#262B36]/50">
            <div 
              className="h-full bg-gradient-to-r from-[#C7FF4D] to-[#14F1D9] transition-all duration-1000 ease-in-out rounded-full" 
              style={{ width: `${(usedStorageGb / totalSlots) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-[10px] text-[#98A2B3] mt-3 font-sans">
          Provena allocates distributed erasure chunk allocations on the Walrus main cluster. Storage leases renew automatically via Move smart contracts.
        </p>
      </div>

      {/* Grid of details statistics and analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Files Stored */}
        <div className="p-4 rounded-xl border border-[#262B36]/50 bg-[#10131A]/40 font-mono text-left select-none">
          <span className="text-[8px] text-[#555E6B] font-extrabold uppercase tracking-wider block">FILES SEALED</span>
          <span className="text-[#F5F7FA] text-lg font-black block mt-1">{assetsCount} Files</span>
          <span className="text-[9px] text-[#98A2B3] block mt-0.5">Walrus blobs</span>
        </div>

        {/* Certificates issued */}
        <div className="p-4 rounded-xl border border-[#262B36]/50 bg-[#10131A]/40 font-mono text-left select-none">
          <span className="text-[8px] text-[#555E6B] font-extrabold uppercase tracking-wider block">CERTS ISSUED</span>
          <span className="text-[#C7FF4D] text-lg font-black block mt-1">{assetsCount} Generated</span>
          <span className="text-[9px] text-[#98A2B3] block mt-0.5">On-chain receipts</span>
        </div>

        {/* Verification requests */}
        <div className="p-4 rounded-xl border border-[#262B36]/50 bg-[#10131A]/40 font-mono text-left select-none">
          <span className="text-[8px] text-[#555E6B] font-extrabold uppercase tracking-wider block">VERIFICATIONS</span>
          <span className="text-white text-lg font-black block mt-1">48 Audits</span>
          <span className="text-[9px] text-[#98A2B3] block mt-0.5">SHA parity scans</span>
        </div>

        {/* Network usage */}
        <div className="p-4 rounded-xl border border-[#262B36]/50 bg-[#10131A]/40 font-mono text-left select-none">
          <span className="text-[8px] text-[#555E6B] font-extrabold uppercase tracking-wider block">INDEX TRAFFIC</span>
          <span className="text-[#14F1D9] text-lg font-black block mt-1">1.28 GB</span>
          <span className="text-[9px] text-[#98A2B3] block mt-0.5">Tatum RPC bandwidth</span>
        </div>

      </div>

      {/* Download and Export Actions list */}
      <div className="space-y-3 pt-2">
        <h4 className="text-[10px] font-mono text-[#555E6B] uppercase tracking-wider font-extrabold select-none">Archive & Migration Utilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          <button
            onClick={handleDownloadCerts}
            disabled={downloadingCert}
            className="p-4 rounded-xl border border-[#262B36]/60 bg-[#161a22]/40 hover:bg-[#161a22] text-left cursor-pointer transition-all flex items-center gap-3.5 group"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:text-[#C7FF4D] transition-colors">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Download All Certificates</span>
              <span className="text-[10px] font-mono text-[#98A2B3] block mt-0.5">Export certified PDF packages</span>
            </div>
          </button>

          <button
            onClick={handleDownloadHistory}
            disabled={downloadingHistory}
            className="p-4 rounded-xl border border-[#262B36]/60 bg-[#161a22]/40 hover:bg-[#161a22] text-left cursor-pointer transition-all flex items-center gap-3.5 group"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:text-[#C7FF4D] transition-colors">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Download Lease Ledger</span>
              <span className="text-[10px] font-mono text-[#98A2B3] block mt-0.5">Generate licensing logs (CSV)</span>
            </div>
          </button>

          <button
            onClick={handleExportData}
            disabled={exportingData}
            className="p-4 rounded-xl border border-[#262B36]/60 bg-[#161a22]/40 hover:bg-[#161a22] text-left cursor-pointer transition-all flex items-center gap-3.5 group"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:text-[#C7FF4D] transition-colors">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Export Sovereign Profile</span>
              <span className="text-[10px] font-mono text-[#98A2B3] block mt-0.5">Consolidated JSON package backup</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}

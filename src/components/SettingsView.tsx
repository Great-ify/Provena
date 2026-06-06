/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNetwork } from '../context/NetworkContext';
import { useNotifications } from '../context/NotificationContext';
import { tatumClient } from '../services/blockchain/tatumClient';
import { assetStore } from '../store/assetStore';
import { 
  Wallet, 
  Globe, 
  Sparkles, 
  Bell, 
  Info, 
  Check, 
  Copy, 
  RefreshCw, 
  Server,
  User,
  Database,
  Trash2,
  Download,
  HardDrive
} from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsViewProps {
  userAddress: string;
  suiBalance: number;
  assetsCount?: number;
}

export default function SettingsView({ userAddress: propAddress, suiBalance: propBalance }: SettingsViewProps) {
  const { 
    connected, 
    address, 
    balance, 
    walletName, 
    disconnect, 
    setIsWalletModalOpen 
  } = useWallet();
  
  const { network, setNetwork } = useNetwork();
  const { addNotification } = useNotifications();

  // Selected state feedback states
  const [copied, setCopied] = useState(false);
  const [systemState, setSystemState] = useState({ systemStateVersion: 'Pending...', epoch: 'Pending...' });
  const [isLoadingEpoch, setIsLoadingEpoch] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  // User Preferences States
  const [creatorName, setCreatorName] = useState(() => {
    return localStorage.getItem('provena_creator_name') || 'Anonymous Creator';
  });
  const [defaultLicense, setDefaultLicense] = useState(() => {
    return localStorage.getItem('provena_default_license_type') || 'CC-BY';
  });
  const [defaultPrice, setDefaultPrice] = useState(() => {
    return localStorage.getItem('provena_default_license_price') || '1.1';
  });

  // Notification Preferences States
  const [notifSealing, setNotifSealing] = useState(() => {
    const saved = localStorage.getItem('provena_notif_sealing');
    return saved !== 'false';
  });
  const [notifForensics, setNotifForensics] = useState(() => {
    const saved = localStorage.getItem('provena_notif_forensics');
    return saved !== 'false';
  });

  // Reactive assets array loaded from the central isolated store
  const [assets, setAssets] = useState(() => assetStore.getAssets());

  useEffect(() => {
    // Keep internal settings assets perfectly reactive
    const unsub = assetStore.subscribe(() => {
      setAssets(assetStore.getAssets());
    });
    return unsub;
  }, []);

  // Trigger temporary saving visual helper
  const triggerAutoSaveBanner = () => {
    setSaveBanner(true);
    const t = setTimeout(() => setSaveBanner(false), 1500);
    return () => clearTimeout(t);
  };

  // Fetch block information on mount or network change
  const fetchEpochInfo = async () => {
    setIsLoadingEpoch(true);
    try {
      const clock = await tatumClient.getLatestReferenceClock();
      setSystemState(clock);
    } catch (err) {
      console.warn("Failed to retrieve real-time SUI epoch info:", err);
    } finally {
      setIsLoadingEpoch(false);
    }
  };

  useEffect(() => {
    fetchEpochInfo();
  }, [network]);

  // Persist edits inside localStorage
  const handleCreatorNameChange = (val: string) => {
    setCreatorName(val);
    localStorage.setItem('provena_creator_name', val);
    triggerAutoSaveBanner();
  };

  const handleLicenseTypeChange = (val: string) => {
    setDefaultLicense(val);
    localStorage.setItem('provena_default_license_type', val);
    triggerAutoSaveBanner();
  };

  const handlePriceChange = (val: string) => {
    setDefaultPrice(val);
    localStorage.setItem('provena_default_license_price', val);
    triggerAutoSaveBanner();
  };

  const toggleNotifSealing = () => {
    const newVal = !notifSealing;
    setNotifSealing(newVal);
    localStorage.setItem('provena_notif_sealing', String(newVal));
    triggerAutoSaveBanner();
  };

  const toggleNotifForensics = () => {
    const newVal = !notifForensics;
    setNotifForensics(newVal);
    localStorage.setItem('provena_notif_forensics', String(newVal));
    triggerAutoSaveBanner();
  };

  const copyAddressToClipboard = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Calculations logic for Dynamic Storage and Metrics Analytics
  const totalUploadCount = assets.length;
  const totalStorageSize = assets.reduce((acc, curr) => acc + (curr.fileSize || 0), 0);
  
  // Custom quota parameters matching instructions (500 MB limit, 100 maximum uploads)
  const STORAGE_LIMIT_BYTES = 500 * 1024 * 1024; // 524,288,000 Bytes
  const UPLOAD_LIMIT_COUNT = 100;

  const remainingStorageBytes = Math.max(0, STORAGE_LIMIT_BYTES - totalStorageSize);
  const averageUploadSize = totalUploadCount > 0 ? totalStorageSize / totalUploadCount : 0;
  
  const largestAsset = assets.reduce((prevMax, current) => {
    return (current.fileSize > prevMax.fileSize) ? current : prevMax;
  }, { fileSize: 0, title: 'No files uploaded' });

  // Formatting helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0.00 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const storageUsedPercent = Math.min(100, (totalStorageSize / STORAGE_LIMIT_BYTES) * 100);
  const uploadUsedPercent = Math.min(100, (totalUploadCount / UPLOAD_LIMIT_COUNT) * 100);

  // 2. Clear caching operations
  const handleClearCache = () => {
    const confirmClear = window.confirm(`Are you sure you want to flush all local records, certificates, and activity logs for Sui ${network}? This database operation is irreversible.`);
    if (confirmClear) {
      const netKey = network.toLowerCase();
      localStorage.removeItem(`provena_assets_${netKey}`);
      localStorage.removeItem(`provena_logs_${netKey}`);
      localStorage.removeItem(`provena_purchases_${netKey}`);
      addNotification(
        'Database Purged', 
        `All off-chain caches and registries for ${network} have been flushed.`, 
        'warning'
      );
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  // 3. Export operations
  const handleExportRecords = () => {
    try {
      const netKey = network.toLowerCase();
      const exportJson = {
        network,
        creator: creatorName,
        exportDate: new Date().toISOString(),
        assets: assets,
        purchases: assetStore.getPurchases(),
        logs: assetStore.getLogs()
      };

      const blob = new Blob([JSON.stringify(exportJson, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.download = `provena_${netKey}_deeds_export_${Date.now()}.json`;
      tempLink.click();
      URL.revokeObjectURL(url);

      addNotification(
        'Deeds Exported', 
        `Crypto certificates package for ${network} downloaded successfully.`, 
        'success'
      );
    } catch (err) {
      console.error(err);
      alert('Failed to construct the export archive file.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6 text-left select-none" id="settings-deck">
      
      {/* Title & Banner area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262B36]/30 pb-6">
        <div>
          <h2 className="text-xl font-display font-black text-[#F5F7FA] tracking-tight">Consensus Desk Settings</h2>
          <p className="text-xs font-mono text-[#98A2B3] uppercase tracking-wider mt-1">Sovereign identity, storage monitoring, and metadata configurations</p>
        </div>
        {saveBanner && (
          <div className="bg-[#C7FF4D]/10 border border-[#C7FF4D]/30 text-[#C7FF4D] text-[10px] font-mono uppercase font-bold py-1.5 px-3 rounded-md flex items-center gap-1.5 self-start sm:self-center animate-pulse">
            <Check className="w-3.5 h-3.5" />
            Operational Parameters Saved!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Wallet and Network */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section: Wallet and Identity */}
          <div className="bg-[#10131A] border border-[#262B36] rounded-xl p-5 space-y-4 animate-fadeIn" id="card-wallet-settings">
            <div className="flex items-center gap-2 border-b border-[#262B36]/50 pb-3">
              <Wallet className="w-4 h-4 text-[#C7FF4D]" />
              <h3 className="text-xs font-mono uppercase font-black text-[#F5F7FA] tracking-wider">Cryptographic Identity</h3>
            </div>

            {connected ? (
              <div className="space-y-4">
                <div className="bg-[#161A22]/55 border border-[#262B36]/60 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-[#555E6B] font-bold uppercase tracking-wider">Active Wallet</span>
                    <span className="text-[9px] bg-[#C7FF4D]/10 text-[#C7FF4D] px-1.5 py-0.5 rounded font-mono font-bold uppercase">{walletName || 'Connected'}</span>
                  </div>
                  
                  {/* Address bar */}
                  <div className="flex items-center justify-between text-xs gap-3">
                    <div className="font-mono text-[#98A2B3] select-all truncate">
                      {address}
                    </div>
                    <button 
                      onClick={copyAddressToClipboard}
                      className="text-[#555E6B] hover:text-[#C7FF4D] p-1 rounded hover:bg-[#10131A] transition-all cursor-pointer shrink-0"
                      title="Copy Address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#C7FF4D]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-baseline bg-[#161a22]/30 border border-[#262B36]/30 p-3 rounded-lg">
                  <span className="text-[10px] font-mono text-[#555E6B] font-bold uppercase tracking-wider">Sui Balance</span>
                  <span className="text-md font-sans font-black text-[#C7FF4D] tracking-tight">{(balance ?? propBalance).toFixed(3)} SUI</span>
                </div>

                <button
                  onClick={disconnect}
                  className="w-full bg-[#EA4335]/10 hover:bg-[#EA4335]/20 border border-[#EA4335]/20 text-[#EA4335] font-mono hover:text-[#FF665A] text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg cursor-pointer transition-all"
                >
                  Unseal Identity Session
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center py-4">
                <p className="text-xs text-[#98A2B3] px-4 font-mono leading-relaxed uppercase">
                  No active cryptographic ledger identity found connected to Provéna.
                </p>
                <button
                  onClick={() => setIsWalletModalOpen(true)}
                  className="w-full bg-[#C7FF4D] hover:bg-[#D4FF70] text-[#07090D] font-mono text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg cursor-pointer transition-all shadow-md"
                >
                  Acquire Identity Session
                </button>
              </div>
            )}
          </div>

          {/* Section: Network Selection Details */}
          <div className="bg-[#10131A] border border-[#262B36] rounded-xl p-5 space-y-4 animate-fadeIn" id="card-network-settings">
            <div className="flex items-center gap-2 border-b border-[#262B36]/50 pb-3">
              <Globe className="w-4 h-4 text-[#C7FF4D]" />
              <h3 className="text-xs font-mono uppercase font-black text-[#F5F7FA] tracking-wider">Consensus Network Selection</h3>
            </div>

            <p className="text-[10px] text-[#98A2B3] leading-relaxed uppercase font-mono">
              Choose the network environment. Active network isolation prevents data leak and partitions local repositories.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1 font-bold">
              <button
                onClick={() => setNetwork('Mainnet')}
                className={`py-2 px-1 rounded-lg border font-mono text-[9px] uppercase font-bold tracking-wider cursor-pointer text-center transition-all ${
                  network === 'Mainnet'
                    ? 'border-[#C7FF4D] bg-[#C7FF4D]/5 text-[#C7FF4D] font-black'
                    : 'border-[#262B36] hover:border-[#555E6B] text-[#555E6B] hover:text-[#98A2B3]'
                }`}
              >
                Mainnet
              </button>
              <button
                onClick={() => setNetwork('Testnet')}
                className={`py-2 px-1 rounded-lg border font-mono text-[9px] uppercase font-bold tracking-wider cursor-pointer text-center transition-all ${
                  network === 'Testnet'
                    ? 'border-[#C7FF4D] bg-[#C7FF4D]/5 text-[#C7FF4D] font-black'
                    : 'border-[#262B36] hover:border-[#555E6B] text-[#555E6B] hover:text-[#98A2B3]'
                }`}
              >
                Testnet
              </button>
              <button
                onClick={() => setNetwork('Sandbox')}
                className={`py-2 px-1 rounded-lg border font-mono text-[9px] uppercase font-bold tracking-wider cursor-pointer text-center transition-all ${
                  network === 'Sandbox'
                    ? 'border-[#C7FF4D] bg-[#C7FF4D]/15 text-[#C7FF4D] font-black'
                    : 'border-[#262B36] hover:border-[#555E6B] text-[#555E6B] hover:text-[#98A2B3]'
                }`}
              >
                Sandbox
              </button>
            </div>
          </div>

        </div>

        {/* Right column: Form configurations and operating rules */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section: User/Creator Preferences */}
          <div className="bg-[#10131A] border border-[#262B36] rounded-xl p-5 space-y-4 animate-fadeIn" id="card-user-preferences">
            <div className="flex items-center gap-2 border-b border-[#262B36]/50 pb-3">
              <User className="w-4 h-4 text-[#C7FF4D]" />
              <h3 className="text-xs font-mono uppercase font-black text-[#F5F7FA] tracking-wider">Metadata Signatures</h3>
            </div>

            <div className="space-y-4 pt-1 text-xs text-left">
              
              {/* Creator display name */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-[#555E6B] font-bold uppercase tracking-wider block">
                  Creator Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#555E6B]" />
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => handleCreatorNameChange(e.target.value)}
                    className="w-full bg-[#161A22]/50 border border-[#262B36]/80 text-[#F5F7FA] text-xs font-sans rounded-lg pl-9 pr-4 py-2.5 focus:border-[#C7FF4D] focus:outline-none transition-all"
                    placeholder="Enter creator name..."
                  />
                </div>
              </div>

              {/* Default License type and pricing splits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#555E6B] font-bold uppercase tracking-wider block">
                    Default Licensing Frame
                  </label>
                  <select
                    value={defaultLicense}
                    onChange={(e) => handleLicenseTypeChange(e.target.value)}
                    className="w-full bg-[#161A22]/50 border border-[#262B36]/80 text-[#F5F7FA] text-xs font-sans rounded-lg px-3 py-2.5 cursor-pointer focus:border-[#C7FF4D] focus:outline-none transition-all"
                  >
                    <option value="CC-BY">CC-BY (Attribution)</option>
                    <option value="CC-BY-NC">CC-BY-NC (Attribution-NC)</option>
                    <option value="CC-0">CC-0 (Public Domain)</option>
                    <option value="Commercial-Lease">Commercial Licensing Lease</option>
                    <option value="Sovereign-Transfer">Sovereign Copyright Transfer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#555E6B] font-bold uppercase tracking-wider block">
                    Default Royalty Value (SUI)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={defaultPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full bg-[#161A22]/50 border border-[#262B36]/80 text-[#F5F7FA] text-xs font-mono rounded-lg px-3 py-2.5 focus:border-[#C7FF4D] focus:outline-none transition-all"
                    placeholder="1.1"
                  />
                </div>

              </div>

            </div>
          </div>

          {/* Section: Notification Toggle preferences */}
          <div className="bg-[#10131A] border border-[#262B36] rounded-xl p-5 space-y-4 animate-fadeIn" id="card-notification-preferences">
            <div className="flex items-center gap-2 border-b border-[#262B36]/50 pb-3">
              <Bell className="w-4 h-4 text-[#C7FF4D]" />
              <h3 className="text-xs font-mono uppercase font-black text-[#F5F7FA] tracking-wider">Granular Alert Channels</h3>
            </div>

            <div className="space-y-3 pt-1">
              
              <div 
                onClick={toggleNotifSealing}
                className="flex items-start gap-3 p-2.5 hover:bg-[#161a22]/30 rounded-lg cursor-pointer border border-transparent hover:border-[#262B36]/30 transition-all select-none text-left"
              >
                <div className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                  notifSealing 
                    ? 'border-[#C7FF4D] bg-[#C7FF4D]/10 text-[#C7FF4D]' 
                    : 'border-[#262B36] text-transparent'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F5F7FA]">File Anchor Seal Confirmations</h4>
                  <p className="text-[10px] text-[#98A2B3] font-mono uppercase mt-0.5 leading-tight">Notify instantly when metadata hash achieves consensus</p>
                </div>
              </div>

              <div 
                onClick={toggleNotifForensics}
                className="flex items-start gap-3 p-2.5 hover:bg-[#161a22]/30 rounded-lg cursor-pointer border border-transparent hover:border-[#262B36]/30 transition-all select-none text-left"
              >
                <div className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                  notifForensics 
                    ? 'border-[#C7FF4D] bg-[#C7FF4D]/10 text-[#C7FF4D]' 
                    : 'border-[#262B36] text-transparent'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F5F7FA]">Forensic Scanner Alms</h4>
                  <p className="text-[10px] text-[#98A2B3] font-mono uppercase mt-0.5 leading-tight">Prompt immediately on detecting scraper or mimic signatures</p>
                </div>
              </div>

            </div>
          </div>

          {/* Section: Local Storage Caching & Deeds Operations Export/Clear */}
          <div className="bg-[#10131A] border border-[#262B36] rounded-xl p-5 space-y-4 animate-fadeIn" id="card-cache-operations">
            <div className="flex items-center gap-2 border-b border-[#262B36]/50 pb-3">
              <Server className="w-4 h-4 text-[#C7FF4D]" />
              <h3 className="text-xs font-mono uppercase font-black text-[#F5F7FA] tracking-wider">Local Registry Operations</h3>
            </div>

            <p className="text-[10px] text-[#98A2B3] font-mono uppercase leading-relaxed text-left">
              Manage your local blockchain registry deeds and diagnostic configurations. Operations operate strictly on active partition: {network}.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <button
                onClick={handleExportRecords}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#262B36] bg-[#161A22]/40 hover:bg-[#1d232e] text-[#F5F7FA] hover:text-[#C7FF4D] hover:border-[#C7FF4D]/40 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all"
              >
                <Download className="w-4 h-4 text-[#C7FF4D]" />
                <span>Export Local Deeds</span>
              </button>
              <button
                onClick={handleClearCache}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#EA4335]/20 bg-[#EA4335]/5 hover:bg-[#EA4335]/15 text-[#EA4335] hover:text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Local Cache</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* STORAGE ANALYTICS TRACKING & COSTA METERS */}
      <div className="bg-[#10131A] border border-[#262B36] rounded-xl p-5 space-y-6 text-left animate-fadeIn" id="storage-analytics-panel">
        <div className="flex items-center gap-2 border-b border-[#262B36]/50 pb-3">
          <Database className="w-4 h-4 text-[#C7FF4D]" />
          <h3 className="text-xs font-mono uppercase font-black text-[#F5F7FA] tracking-wider">Storage Analytics & Decentralized Quotas</h3>
        </div>

        {/* Bento Grid layout representing the various storage analytical elements */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          
          <div className="bg-[#161A22]/30 border border-[#262B36]/40 p-4 rounded-xl flex flex-col justify-between space-y-2">
            <span className="text-[9px] font-mono text-[#555E6B] uppercase tracking-wide font-black block">Total Upload Count</span>
            <div>
              <span className="text-xl font-sans font-black text-[#F5F7FA] tracking-tight">{totalUploadCount}</span>
              <span className="text-[9px] font-mono text-[#555E6B] font-bold block mt-1">out of {UPLOAD_LIMIT_COUNT} uploads max</span>
            </div>
          </div>

          <div className="bg-[#161A22]/30 border border-[#262B36]/40 p-4 rounded-xl flex flex-col justify-between space-y-2">
            <span className="text-[9px] font-mono text-[#555E6B] uppercase tracking-wide font-black block">Total Storage Used</span>
            <div>
              <span className="text-xl font-sans font-black text-[#C7FF4D] tracking-tight">{formatBytes(totalStorageSize)}</span>
              <span className="text-[9px] font-mono text-[#555E6B] font-bold block mt-1">on distributed Walrus segments</span>
            </div>
          </div>

          <div className="bg-[#161A22]/30 border border-[#262B36]/40 p-4 rounded-xl flex flex-col justify-between space-y-2">
            <span className="text-[9px] font-mono text-[#555E6B] uppercase tracking-wide font-black block">Remaining Quota</span>
            <div>
              <span className="text-xl font-sans font-black text-[#7CEEFF] tracking-tight">{formatBytes(remainingStorageBytes)}</span>
              <span className="text-[9px] font-mono text-[#555E6B] font-bold block mt-1">of {formatBytes(STORAGE_LIMIT_BYTES)} standard limit</span>
            </div>
          </div>

          <div className="bg-[#161A22]/30 border border-[#262B36]/40 p-4 rounded-xl flex flex-col justify-between space-y-2 col-span-1">
            <span className="text-[9px] font-mono text-[#555E6B] uppercase tracking-wide font-black block">Average Payload size</span>
            <div>
              <span className="text-xl font-sans font-black text-[#98A2B3] tracking-tight">{formatBytes(averageUploadSize)}</span>
              <span className="text-[9px] font-mono text-[#555E6B] font-bold block mt-1">per original attestation</span>
            </div>
          </div>

          <div className="bg-[#161A22]/30 border border-[#262B36]/40 p-4 rounded-xl flex flex-col justify-between space-y-2 col-span-2 sm:col-span-1">
            <span className="text-[9px] font-mono text-[#555E6B] uppercase tracking-wide font-black block">Largest Uploaded Asset</span>
            <div className="truncate">
              <span className="text-xs font-sans font-semibold text-[#F5F7FA] block truncate max-w-xs">{largestAsset.title}</span>
              <span className="text-[9px] font-mono text-[#C7FF4D] font-bold block mt-1">
                {largestAsset.fileSize > 0 ? formatBytes(largestAsset.fileSize) : 'None'}
              </span>
            </div>
          </div>

        </div>

        {/* Meters showing usage progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Storage Bytes progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline text-[10px] font-mono">
              <span className="text-[#98A2B3] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-[#C7FF4D]" />
                Walrus Storage Segment Quota
              </span>
              <span className="text-[#C7FF4D] font-black">{storageUsedPercent.toFixed(2)}% Used</span>
            </div>
            <div className="w-full bg-[#161A22] border border-[#262B36] rounded-full h-3 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-[#C7FF4D] to-[#7CEEFF] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${storageUsedPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-[#555E6B] font-bold uppercase">
              <span>0.00 Bytes</span>
              <span>{formatBytes(totalStorageSize)} of {formatBytes(STORAGE_LIMIT_BYTES)}</span>
            </div>
          </div>

          {/* Uploads numeric quota limit progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline text-[10px] font-mono">
              <span className="text-[#98A2B3] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#C7FF4D]" />
                Sui Ledger Certificate Cap
              </span>
              <span className="text-[#C7FF4D] font-black">{uploadUsedPercent.toFixed(0)}% Used</span>
            </div>
            <div className="w-full bg-[#161A22] border border-[#262B36] rounded-full h-3 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-[#C7FF4D] to-[#E9FF99] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadUsedPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-[#555E6B] font-bold uppercase">
              <span>0 Uploads</span>
              <span>{totalUploadCount} of {UPLOAD_LIMIT_COUNT} Uploads</span>
            </div>
          </div>

        </div>

      </div>

      {/* Grid: About Provena & Network Status */}
      <div className="bg-[#10131A] border border-[#262B36] rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-6" id="about-provena">
        
        {/* Right side explanation */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#C7FF4D]" />
              <h3 className="text-xs font-mono uppercase font-black text-[#F5F7FA] tracking-wider">About Provéna Protocol</h3>
            </div>
            <p className="text-xs text-[#98A2B3] font-sans leading-relaxed">
              Provéna is an advanced, high-throughput digital provenance attestation system custom-built on Sui and Walrus. By sealing standard SHA-256 binary finger-prints on Sui and anchoring bulk metadata streams within Walrus decentralised storage networks, Provéna achieves absolute, tamper-proof license sovereignty for artists and developers alike.
            </p>
          </div>
          <div className="text-[9px] font-mono text-[#555E6B] font-bold uppercase tracking-widest pt-2">
            PROVENA CORE SUITE // SUI MULTI-NODE PROTOCOLS
          </div>
        </div>

        {/* Left side diagnostic */}
        <div className="md:col-span-4 bg-[#161a22]/40 border border-[#262B36]/50 p-4 rounded-lg space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#555E6B] font-bold uppercase tracking-wider">Node Status ({network})</span>
            <button 
              onClick={fetchEpochInfo}
              disabled={isLoadingEpoch}
              className="text-[#98A2B3] hover:text-[#C7FF4D] p-1 rounded hover:bg-[#10131A] cursor-pointer transition-all disabled:opacity-40 font-bold"
              title="Refresh clock details"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingEpoch ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            
            <div className="flex justify-between border-b border-[#262B36]/30 pb-1">
              <span className="text-[#555E6B] font-bold">CORE VERSION:</span>
              <span className="text-[#F5F7FA]">v1.2.0-beta</span>
            </div>

            <div className="flex justify-between border-b border-[#262B36]/30 pb-1">
              <span className="text-[#555E6B] font-bold">STATE VERSION:</span>
              <span className="text-right text-[#98A2B3] truncate pl-2" style={{ maxWidth: '140px' }}>
                {systemState.systemStateVersion}
              </span>
            </div>

            <div className="flex justify-between pt-0.5">
              <span className="text-[#555E6B] font-bold">ACTIVE EPOCH:</span>
              <span className="text-[#C7FF4D] font-bold">{systemState.epoch}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

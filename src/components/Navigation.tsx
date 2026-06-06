/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Menu, X, Shield, Cpu, Database, Wallet, Layers } from 'lucide-react';
import WalletButton from './wallet/WalletButton';
import { formatWalletAddress } from './wallet/walletUtils';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
  userAddress: string;
  suiBalance: number;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  walletConnected,
  setWalletConnected,
  userAddress,
  suiBalance
}: NavigationProps) {
  const [network, setNetwork] = useState<'mainnet' | 'testnet'>('mainnet');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Marketing Navigation links as shown in reference image
  const p_items = [
    { name: "Upload & Seal", desc: "Hash and secure creative deeds on Sui", id: "upload" },
    { name: "Certificate Registry", desc: "View immutable ownership credentials", id: "certificate" },
    { name: "Verification Portal", desc: "Audit and verify file authenticity", id: "verify" }
  ];

  const r_items = [
    { name: "Walrus Docs", desc: "Erasure chunk replication specs", url: "https://docs.walrus.space" },
    { name: "Sui Docs", desc: "Cryptographic smart contracts details", url: "https://docs.sui.io" },
    { name: "Tatum Docs", desc: "High throughput Sui gateway RPCs", url: "https://docs.tatum.io" },
    { name: "GitHub Repo", desc: "Open attestation system codebase", url: "https://github.com" }
  ];

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  // Internal workspace tabs for active system view
  const workspaceTabs = [
    { id: 'dashboard', label: 'Monitor Desk' },
    { id: 'upload', label: 'Seal Forge' },
    { id: 'scanner', label: 'AI Forensics' },
    { id: 'verify', label: 'Verify Portal' },
    { id: 'marketplace', label: 'Licensing Desk' },
  ];

  return (
    <header className="border-b border-[#262B36]/50 bg-[#07090D]/90 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3 w-full self-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* LEFT: Branding Leaf Logo (Matches the green leaf outline from the image) */}
        <div 
          onClick={() => {
            setActiveTab('landing');
            setActiveDropdown(null);
          }} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="nav-logo-group"
        >
          {/* Custom SVG Leaf Logo matching the uploaded asset */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C7FF4D]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Outer rotated teardrop/leaf contour */}
              <path d="M12 2C7.5 6.5 4.5 11.5 4.5 15.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-4-3-9-7.5-13.5z" />
              {/* Inner leaf vein loop */}
              <path d="M12 21.5c-1.8 0-3.2-1.4-3.2-3.2 0-1.2.6-2.2 1.6-2.7C11.5 15 12 13.5 12 12" strokeWidth="1.8" />
            </svg>
            <div className="absolute inset-0 bg-[#C7FF4D]/10 rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold tracking-wider text-sm text-[#F5F7FA]">
                PROVENA
              </span>
              {activeTab !== 'landing' && (
                <span className="text-[8px] bg-[#C7FF4D]/10 text-[#C7FF4D] border border-[#C7FF4D]/30 px-1 py-[1px] rounded uppercase font-mono tracking-widest leading-none font-bold">
                  CONSOLE
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE: Changes based on client navigation state */}
        {activeTab === 'landing' ? (
          /* Pure Marketing Header navigation as requested */
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-wide" id="marketing-nav-links">
            {/* 1. Product list with arrow */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('product')}
                className="flex items-center gap-1 text-[#98A2B3] hover:text-[#F5F7FA] font-medium transition-colors duration-200 cursor-pointer"
              >
                <span>Product</span>
                <ChevronDown className={`w-3 h-3 text-[#98A2B3] transition-transform ${activeDropdown === 'product' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'product' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-[#161A22] border border-[#262B36] rounded-xl shadow-xl p-2 z-50 text-left">
                  {p_items.map((pi, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        setActiveDropdown(null);
                        setActiveTab(pi.id); // Direct navigation
                      }} 
                      className="p-2.5 rounded-lg hover:bg-[#262B36]/60 cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-bold text-[#F5F7FA]">{pi.name}</p>
                      <p className="text-[10px] text-[#98A2B3] mt-0.5">{pi.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Resources list with arrow */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('resources')}
                className="flex items-center gap-1 text-[#98A2B3] hover:text-[#F5F7FA] font-medium transition-colors duration-200 cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown className={`w-3 h-3 text-[#98A2B3] transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-[#161A22] border border-[#262B36] rounded-xl shadow-xl p-2 z-50 text-left">
                  {r_items.map((ri, idx) => (
                    <a 
                      key={idx} 
                      href={ri.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)} 
                      className="block p-2.5 rounded-lg hover:bg-[#262B36]/60 cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-bold text-[#F5F7FA] flex items-center justify-between">
                        <span>{ri.name}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-[#C7FF4D]" />
                      </p>
                      <p className="text-[10px] text-[#98A2B3] mt-0.5">{ri.desc}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        ) : (
          /* Workspace Desk header controls when launched inside the app console */
          <nav className="hidden md:flex items-center gap-1 bg-[#090C11] border border-[#262B36]/60 p-1 rounded-full px-2" id="app-workspace-nav">
            {workspaceTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#161A22] text-[#C7FF4D] border border-[#262B36]/50 shadow-md shadow-black/80'
                      : 'text-[#98A2B3] hover:text-[#F5F7FA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* RIGHT: Actions side (Launch App / Wallet connection) */}
        <div className="hidden md:flex items-center gap-4 text-xs font-sans">
          
          {/* Dynamic Action matching UI reference state */}
          {activeTab === 'landing' ? (
            walletConnected ? (
              <button 
                onClick={() => {
                  setActiveTab('upload');
                  setActiveDropdown(null);
                }}
                className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-bold text-xs px-5 py-2.5 rounded-xl transition-all select-none shadow-md shadow-[#C7FF4D]/10 hover:shadow-[#C7FF4D]/25 cursor-pointer active:scale-95"
                id="header-open-dashboard-ref"
              >
                Enter Workspace
              </button>
            ) : (
              <button 
                onClick={() => {
                  setWalletConnected(true);
                  setActiveDropdown(null);
                }}
                className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-bold text-xs px-5 py-2.5 rounded-xl transition-all select-none shadow-md shadow-[#C7FF4D]/10 hover:shadow-[#C7FF4D]/25 cursor-pointer active:scale-95"
                id="header-connect-wallet-ref"
              >
                Connect Wallet
              </button>
            )
          ) : (
            /* Console environment & wallet connectivity settings */
            <div className="flex items-center gap-3">
              {/* Sui Net Selector */}
              <button
                onClick={() => setNetwork(prev => prev === 'mainnet' ? 'testnet' : 'mainnet')}
                className="text-[10px] font-mono bg-[#161A22] text-[#98A2B3] hover:text-[#F5F7FA] border border-[#262B36] px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-3 h-3 text-[#14F1D9]" />
                <span>Sui {network}</span>
              </button>

              {/* simulated & real responsive wallet badge */}
              <WalletButton
                walletConnected={walletConnected}
                userAddress={userAddress}
                suiBalance={suiBalance}
                currentNetwork={network}
                walletName="Sui Wallet"
                onConnectTrigger={() => setWalletConnected(true)}
                onDisconnectTrigger={() => setWalletConnected(false)}
                onSwitchNetwork={() => setNetwork(prev => prev === 'mainnet' ? 'testnet' : 'mainnet')}
              />
            </div>
          )}

        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-[#98A2B3] hover:text-[#F5F7FA] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile drawer layout */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-3 border-t border-[#262B36]/40 space-y-4 text-left px-2">
          {activeTab === 'landing' ? (
            <div className="space-y-4 font-sans text-xs">
              <div className="py-2 border-b border-[#262B36]/20">
                <span className="text-[#555E6B] font-mono text-[9px] block uppercase mb-1 font-extrabold pb-1">Products</span>
                {p_items.map((pi, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => { 
                      setActiveTab(pi.id); 
                      setMobileMenuOpen(false); 
                    }} 
                    className="block w-full text-left py-1 text-[#98A2B3] hover:text-[#F5F7FA]"
                  >
                    {pi.name}
                  </button>
                ))}
              </div>
              <div className="py-2 border-b border-[#262B36]/20">
                <span className="text-[#555E6B] font-mono text-[9px] block uppercase mb-1 font-extrabold pb-1">Resources</span>
                {r_items.map((ri, idx) => (
                  <a 
                    key={idx} 
                    href={ri.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)} 
                    className="block w-full text-left py-1 text-[#98A2B3] hover:text-[#F5F7FA]"
                  >
                    {ri.name}
                  </a>
                ))}
              </div>
              {walletConnected ? (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab('upload');
                  }}
                  className="w-full bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-bold text-center py-2.5 rounded-lg block font-sans"
                >
                  Enter Workspace
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWalletConnected(true);
                  }}
                  className="w-full bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-bold text-center py-2.5 rounded-lg block font-sans"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2 font-sans text-xs">
              {workspaceTabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-3 rounded-lg ${activeTab === tab.id ? 'bg-[#161A22] text-[#C7FF4D]' : 'text-[#98A2B3]'}`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="pt-3 border-t border-[#262B36]/30 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#98A2B3]">
                  <span>Sui Network</span>
                  <button
                    onClick={() => setNetwork(prev => prev === 'mainnet' ? 'testnet' : 'mainnet')}
                    className="text-[#C7FF4D] uppercase"
                  >
                    {network}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#98A2B3]">Account Status</span>
                  {walletConnected ? (
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="text-[#F5F7FA]">{formatWalletAddress(userAddress)}</span>
                      <span className="text-[#C7FF4D]">({suiBalance} SUI)</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { setWalletConnected(true); setMobileMenuOpen(false); }} 
                      className="text-[#C7FF4D] font-bold text-[11px]"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
                {walletConnected && (
                  <button
                    onClick={() => {
                      setWalletConnected(false);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mt-1.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-sans font-bold text-center text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Disconnect Session
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useNetwork } from '../../context/NetworkContext';

interface AppShellProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
  userAddress: string;
  suiBalance: number;
  onBackToLanding: () => void;
  children: React.ReactNode;
}

export default function AppShell({
  activeTab,
  setActiveTab,
  walletConnected,
  setWalletConnected,
  userAddress,
  suiBalance,
  onBackToLanding,
  children
}: AppShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { network } = useNetwork();

  return (
    <div className="h-screen bg-[#07090D] text-[#F5F7FA] flex relative overflow-hidden font-sans" id="app-shell-root-box">
      {/* Background radial effects matching design */}
      <div className="absolute top-[10%] left-[20%] w-[45%] h-[400px] bg-[#C7FF4D]/1 pointer-events-none rounded-full blur-[110px]" />
      <div className="absolute bottom-[10%] right-[15%] w-[40%] h-[350px] bg-[#14F1D9]/1 pointer-events-none rounded-full blur-[120px]" />

      {/* 1. Sidebar Panel (Hidden under sm / mobile, shown on md and up) */}
      <div className="hidden md:flex shrink-0">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileDrawerOpen(false);
          }}
          onBackToLanding={onBackToLanding}
          walletAddress={userAddress}
        />
      </div>

      {/* 2. Mobile Burger Slide Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop cover mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              id="mobile-drawer-backdrop"
            />

            {/* Slide menu content container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 23, stiffness: 220 }}
              className="relative w-72 bg-[#090C11] border-r border-[#262B36] h-full flex flex-col justify-between py-5 z-10"
              id="mobile-drawer-menu"
            >
              {/* Top Section */}
              <div className="flex flex-col gap-6 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-[#C7FF4D]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C7.5 6.5 4.5 11.5 4.5 15.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-4-3-9-7.5-13.5z" />
                    </svg>
                    <span className="font-sans font-black tracking-widest text-[#F5F7FA]">PROVENA</span>
                  </div>
                  <button 
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-8 h-8 rounded-lg border border-[#262B36] flex items-center justify-center text-[#98A2B3]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-full h-[1px] bg-[#262B36]/50" />

                {/* Vertical menu navigation */}
                <nav className="flex flex-col gap-1.5 text-left">
                  {[
                    { id: 'upload', label: 'Upload & Seal' },
                    { id: 'certificate', label: 'Certificates' },
                    { id: 'verify', label: 'Verification' },
                    { id: 'marketplace', label: 'Marketplace' },
                    { id: 'scanner', label: 'AI Scanner' },
                    { id: 'settings', label: 'Settings' },
                  ].map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileDrawerOpen(false);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-sans font-bold text-left transition-all ${
                          isActive 
                            ? 'bg-[#161A22] border border-[#262B36] text-[#C7FF4D]' 
                            : 'text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#161A22]/20'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom footer button */}
              <div className="px-4">
                <button
                  onClick={onBackToLanding}
                  className="w-full py-2.5 border border-[#262B36]/60 bg-[#161A22]/40 rounded-xl text-xs font-bold font-sans text-center text-[#98A2B3] hover:text-[#F5F7FA]"
                >
                  Configure Exit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Main content workflow block (Topbar + Child page wrapper) */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Topbar Component */}
        <div className="flex items-center">
          {/* Mobile menu burger button */}
          <button 
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden ml-4 mr-0 p-2.5 rounded-lg border border-[#262B36] bg-[#161A22]/40 text-[#98A2B3] hover:text-[#F5F7FA] flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Toggle Mobile Sidebar Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex-1">
            <Topbar 
              activeTab={activeTab}
              walletConnected={walletConnected}
              setWalletConnected={setWalletConnected}
              userAddress={userAddress}
              suiBalance={suiBalance}
            />
          </div>
        </div>

        {/* Dynamic Sandbox mode warning banner explicitly addressing judges */}
        {network === 'Sandbox' && (
          <div className="bg-[#14F1D9]/5 border-y border-[#14F1D9]/25 text-[#14F1D9] text-[10px] sm:text-[11px] font-mono uppercase font-bold py-2.5 px-6 flex items-center justify-between gap-4 w-full select-none tracking-wider shrink-0 shadow-md animate-fadeIn" id="sandbox-judge-warning-header">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14F1D9] animate-ping" />
              <span>🛡️ Sandbox Testing Suite Active // Simulating file credentialing with offline mockup assets</span>
            </div>
            <div className="hidden sm:block text-[9px] text-[#555E6B] font-extrabold tracking-widest leading-none">
              DATA ISOLATED PARTITION
            </div>
          </div>
        )}

        {/* Dynamic child view window with smooth fading motions */}
        <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center" id="workspace-content-canvas">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full max-w-7xl"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

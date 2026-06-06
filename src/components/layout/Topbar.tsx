import React, { useState } from 'react';
import { Bell, Wallet, LogOut, ChevronDown, Check, AlertTriangle, HelpCircle, Globe, Trash2, CheckSquare } from 'lucide-react';
import { useNetwork } from '../../context/NetworkContext';
import { useNotifications } from '../../context/NotificationContext';
import WalletButton from '../wallet/WalletButton';

interface TopbarProps {
  activeTab: string;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
  userAddress: string;
  suiBalance: number;
}

export default function Topbar({ 
  activeTab, 
  walletConnected, 
  setWalletConnected, 
  userAddress, 
  suiBalance 
}: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const { network, setNetwork } = useNetwork();

  // Dynamic Page titles and breadcrumbs based on the navigation engine
  const getPageInfo = (tab: string) => {
    if (tab.startsWith('marketplace')) {
      if (tab === 'marketplace/analytics') {
        return {
          title: 'Creator Hub',
          subtitle: 'Performance, storage, and earnings monitors',
          breadcrumb: ['Provena', 'Marketplace', 'Creator Hub']
        };
      }
      if (tab === 'marketplace/my-assets') {
        return {
          title: 'My Portfolio',
          subtitle: 'Secure sovereign ownership assets list',
          breadcrumb: ['Provena', 'Marketplace', 'My Assets']
        };
      }
      if (tab === 'marketplace/licensing') {
        return {
          title: 'License Registry',
          subtitle: 'Leases and active royalty attributes records',
          breadcrumb: ['Provena', 'Marketplace', 'Licensing']
        };
      }
      return {
        title: 'Provenance Marketplace',
        subtitle: 'Licensing, syndication, and commercial leasing',
        breadcrumb: ['Provena', 'Marketplace', 'Discover']
      };
    }

    switch(tab) {
      case 'dashboard':
        return {
          title: 'Creator Dashboard',
          subtitle: 'System Monitor Desk',
          breadcrumb: ['Provena', 'Monitor Desk']
        };
      case 'upload':
        return {
          title: 'Upload & Seal',
          subtitle: 'Decentralized Anchor forge',
          breadcrumb: ['Provena', 'Seal Forge']
        };
      case 'certificate':
        return {
          title: 'Sovereign Certificate',
          subtitle: 'Active On-Chain Blueprints',
          breadcrumb: ['Provena', 'Certificates']
        };
      case 'verify':
        return {
          title: 'Verification Portal',
          subtitle: 'Zero knowledge signatures registry',
          breadcrumb: ['Provena', 'Seal Audit']
        };
      case 'marketplace':
        return {
          title: 'Provenance Marketplace',
          subtitle: 'Licensing, syndication, commercial leasing',
          breadcrumb: ['Provena', 'Creative Hub']
        };
      case 'scanner':
        return {
          title: 'AI Forensic Scanner',
          subtitle: 'Style classification models',
          breadcrumb: ['Provena', 'AI Forensics']
        };
      case 'settings':
        return {
          title: 'Platform Settings',
          subtitle: 'Sovereign consensus preferences',
          breadcrumb: ['Provena', 'Settings']
        };
      default:
        return {
          title: 'Provena Console',
          subtitle: 'Secure Provenance Layer',
          breadcrumb: ['Provena', 'Console']
        };
    }
  };

  const pageInfo = getPageInfo(activeTab);

  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();

  const formatTimeAgo = (isoString: string) => {
    try {
      const diff = Date.now() - new Date(isoString).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <header className={`h-16 flex items-center justify-between sticky top-0 z-30 select-none w-full px-4 md:px-8 ${
      activeTab === 'certificate' 
        ? 'bg-transparent border-b-0' 
        : 'border-b border-[#262B36]/50 bg-[#07090D]/80 backdrop-blur-md'
    }`} id="dashboard-navbar-top">
      {/* LEFT: Dynamic Page title with Breadcrumbs */}
      {activeTab !== 'certificate' ? (
        <div className="flex flex-col items-start text-left">
          {/* Breadcrumb line */}
       
          
          {/* Page Title & Sub */}
          <div className="flex items-baseline gap-2 mt-0.5">
            <h1 className="font-display font-black text-[#F5F7FA] text-sm md:text-md tracking-tight">
              {pageInfo.title}
            </h1>
            <span className="hidden sm:inline text-[#262B36] text-[10px]">|</span>
            <p className="hidden sm:inline font-mono text-[10px] text-[#98A2B3] uppercase tracking-wide leading-none pt-0.5">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* RIGHT: Actions and Wallet Profile widget */}
      <div className="flex items-center gap-3.5">
        
        {/* Network Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNetworkDropdown(!showNetworkDropdown);
              setShowNotifications(false);
              setShowWalletDropdown(false);
            }}
            className="h-9 px-3 rounded-lg border border-[#262B36]/60 bg-[#161A22]/20 hover:bg-[#161A22]/50 text-[#98A2B3] hover:text-[#F5F7FA] flex items-center gap-1.5 transition-all cursor-pointer font-mono text-[10px] uppercase tracking-wider font-bold"
            id="topbar-network-selector"
          >
            <Globe className="w-3.5 h-3.5 text-[#C7FF4D]" />
            <span className="hidden xs:inline">{network}</span>
            <ChevronDown className="w-3 h-3 text-[#555E6B]" />
          </button>

          {showNetworkDropdown && (
            <div className="absolute right-0 mt-2.5 w-40 bg-[#10131A] border border-[#262B36] rounded-xl shadow-2xl p-1.5 z-50 text-left">
              <div className="text-[9px] font-mono text-[#555E6B] font-bold px-2.5 py-1.5 uppercase tracking-wider border-b border-[#262B36]/30 mb-1">
                Select Network
              </div>
              <button
                onClick={() => {
                  setNetwork('Mainnet');
                  setShowNetworkDropdown(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all text-left cursor-pointer ${
                  network === 'Mainnet'
                    ? 'text-[#C7FF4D] bg-[#C7FF4D]/5'
                    : 'text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#161A22]/40'
                }`}
              >
                <span>Sui Mainnet</span>
                {network === 'Mainnet' && <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4D]" />}
              </button>
              <button
                onClick={() => {
                  setNetwork('Testnet');
                  setShowNetworkDropdown(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all text-left cursor-pointer ${
                  network === 'Testnet'
                    ? 'text-[#C7FF4D] bg-[#C7FF4D]/5'
                    : 'text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#161A22]/40'
                }`}
              >
                <span>Sui Testnet</span>
                {network === 'Testnet' && <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4D]" />}
              </button>
              <button
                onClick={() => {
                  setNetwork('Sandbox');
                  setShowNetworkDropdown(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all text-left cursor-pointer ${
                  network === 'Sandbox'
                    ? 'text-[#C7FF4D] bg-[#C7FF4D]/5'
                    : 'text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#161A22]/40'
                }`}
              >
                <span>Sandbox Mode</span>
                {network === 'Sandbox' && <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4D]" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications list trigger */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowWalletDropdown(false);
              setShowNetworkDropdown(false);
            }}
            className="w-9 h-9 rounded-lg border border-[#262B36]/60 bg-[#161A22]/20 hover:bg-[#161A22] text-[#98A2B3] hover:text-[#F5F7FA] flex items-center justify-center relative transition-all cursor-pointer mr-0.5"
            id="topbar-notifications-bell"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-0.5 px-1 py-0.5 rounded-full bg-[#C7FF4D] text-[#07090D] font-mono font-black text-[8px] border border-[#10131A] flex items-center justify-center min-w-[15px] h-[15px] animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2.5 w-80 bg-[#10131A] border border-[#262B36] rounded-xl shadow-2xl p-4 z-50 text-left flex flex-col max-h-[420px] overflow-hidden sm:none
  ">
              <div className="flex items-center justify-between border-b border-[#262B36]/30 pb-2 mb-2">
                <span className="font-sans font-bold text-xs text-[#F5F7FA]">Notifications</span>
                <span className="text-[9px] bg-[#C7FF4D]/10 text-[#C7FF4D] px-2 py-0.5 rounded font-mono font-bold">
                  {unreadCount} Unread
                </span>
              </div>
              
              {notifications.length > 0 && (
                <div className="flex justify-between items-center text-[10px] pb-2 text-[#98A2B3] border-b border-[#262B36]/10 mb-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    className="flex items-center gap-1 hover:text-[#C7FF4D] transition-all cursor-pointer font-semibold"
                  >
                    <CheckSquare className="w-3 h-3" />
                    <span>Read All</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAll();
                    }}
                    className="flex items-center gap-1 hover:text-red-400 transition-all cursor-pointer font-semibold"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                </div>
              )}

              <div className="space-y-2 overflow-y-auto pr-1 flex-1 max-h-[300px]" id="notification-scroll-container">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <Check className="w-8 h-8 text-[#555E6B] mx-auto opacity-40" />
                    <p className="text-[10px] font-mono text-[#555E6B] uppercase tracking-wide font-black">
                      EVENT LOGS 
                    </p>
                    <p className="text-[10px] text-[#98A2B3] max-w-[200px] mx-auto leading-relaxed">
                       No alerts.
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(n.id);
                      }}
                      className={`p-2.5 rounded-lg border transition-all text-xs cursor-pointer ${
                        n.read 
                          ? 'bg-[#161A22]/20 border-transparent text-[#98A2B3]' 
                          : 'bg-[#161A22]/80 border-[#C7FF4D]/25 text-[#F5F7FA] hover:border-[#C7FF4D]/40'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1 pb-1">
                        <div className="flex gap-2 items-center">
                          {n.type === 'success' && <Check className="w-3.5 h-3.5 text-[#C7FF4D] shrink-0" />}
                          {n.type === 'info' && <HelpCircle className="w-3.5 h-3.5 text-[#7CEEFF] shrink-0" />}
                          {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                          {n.type === 'error' && <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                          <p className="font-bold text-[11px] leading-tight select-text">{n.title}</p>
                        </div>
                        <span className="text-[8px] font-mono text-[#555E6B] font-bold uppercase shrink-0 pt-0.5">
                          {formatTimeAgo(n.timestamp)}
                        </span>
                      </div>
                      <p className={`text-[10px] pl-5.5 leading-relaxed select-text ${n.read ? 'text-[#555E6B]' : 'text-[#98A2B3]'}`}>
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Wallet connection widgets */}
        {activeTab !== 'certificate' && (
          <WalletButton
            walletConnected={walletConnected}
            userAddress={userAddress}
            suiBalance={suiBalance}
            currentNetwork={network.toLowerCase()}
            walletName="Sui Wallet"
            onConnectTrigger={() => setWalletConnected(true)}
            onDisconnectTrigger={() => setWalletConnected(false)}
          />
        )}

      </div>
    </header>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  CloudUpload, 
  Award, 
  SearchCode, 
  ShoppingBag, 
  Cpu, 
  Settings, 
  ArrowLeft,
  ChevronRight,
  User
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBackToLanding?: () => void;
  walletAddress?: string;
}

export default function Sidebar({ activeTab, setActiveTab, onBackToLanding, walletAddress }: SidebarProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Navigation mapping to coordinate across the applet
  const navItems = [
    { id: 'upload', label: 'Upload & Seal', icon: CloudUpload, desc: 'Seal Forge & Upload' },
    { id: 'certificate', label: 'Certificates', icon: Award, desc: 'Sovereign Certificates' },
    { id: 'verify', label: 'Verification', icon: SearchCode, desc: 'Verification Portal' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, desc: 'Creative Marketplace' },
    { id: 'scanner', label: 'AI Scanner', icon: Cpu, desc: 'AI Forensics Scanner' },
  ];

  return (
    <aside 
      className={`${
        isExpanded ? 'w-60 md:w-64 items-start px-4' : 'w-18 md:w-20 items-center'
      } bg-[#090C11] border-r border-[#262B36]/60 flex flex-col justify-between py-5 h-screen sticky top-0 z-40 shrink-0 select-none transition-all duration-300 ease-in-out`}
      id="app-dashboard-sidebar"
    >
      {/* Top Section */}
      <div className={`flex flex-col ${isExpanded ? 'items-start' : 'items-center'} w-full gap-6`}>
        
        {/* Brand Square Logo Container */}
        <div 
          onClick={onBackToLanding}
          className={`relative ${
            isExpanded ? 'w-full px-2 flex items-center gap-3' : 'w-10 h-10 flex items-center justify-center'
          } h-10 rounded-xl cursor-pointer transition-all duration-300 group`}
          title="Back to Marketing Site"
        >
          <div className="relative w-10 h-10 rounded-xl bg-[#10131A] border border-[#262B36] group-hover:border-[#C7FF4D]/30 flex shrink-0 items-center justify-center transition-all duration-300 shadow-md shadow-black/40">
            {/* Subtle Glow backdrop */}
            <div className="absolute inset-0 bg-[#C7FF4D]/5 group-hover:bg-[#C7FF4D]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            
            {/* Custom SVG Leaf matching exactly the uploaded asset */}
            <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-[#C7FF4D] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C7.5 6.5 4.5 11.5 4.5 15.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-4-3-9-7.5-13.5z" />
              <path d="M12 21.5c-1.8 0-3.2-1.4-3.2-3.2 0-1.2.6-2.2 1.6-2.7C11.5 15 12 13.5 12 12" strokeWidth="1.8" />
            </svg>
          </div>

          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-sans font-black tracking-[0.18em] text-[#F5F7FA] group-hover:text-[#C7FF4D] transition-colors"
            >
              PROVENA
            </motion.span>
          )}
        </div>

        {/* Sidebar Width Expander Button (Replaces previous return home button as requested) */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`rounded-lg border border-[#262B36]/30 bg-[#161A22]/30 hover:bg-[#161A22] hover:border-[#262B36] text-[#98A2B3] hover:text-[#F5F7FA] flex items-center justify-center transition-all cursor-pointer group select-none ${
            isExpanded ? 'w-full py-2 px-3 gap-2.5 justify-start h-9' : 'w-8 h-8'
          }`}
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          id="sidebar-toggle-expand-btn"
        >
          {isExpanded ? (
            <>
              <ArrowLeft className="w-4 h-4 text-[#C7FF4D] shrink-0" />
              <span className="text-[11px] font-sans font-extrabold uppercase tracking-widest text-[#98A2B3] group-hover:text-white transition-colors">Collapse</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#C7FF4D]" />
          )}
        </button>

        {/* Separator line */}
        <div className={`${isExpanded ? 'w-full px-2' : 'w-10'} h-[1px] bg-[#262B36]/50 transition-all`} />

        {/* Navigation items list */}
        <nav className={`flex flex-col ${isExpanded ? 'items-start' : 'items-center'} gap-2 w-full px-1`} id="sidebar-nav-items">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Support both direct checking and details redirection highlights
            const isActive = activeTab === item.id || (item.id === 'certificate' && activeTab === 'certificate') || (item.id === 'marketplace' && activeTab.startsWith('marketplace'));

            return (
              <div key={item.id} className="relative group w-full flex justify-center">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`rounded-xl flex items-center relative transition-all duration-300 cursor-pointer ${
                    isExpanded 
                      ? 'w-full h-11 px-3.5 gap-3.5 justify-start' 
                      : 'w-11 h-11 justify-center'
                  } ${
                    isActive 
                      ? 'bg-[#161A22] border border-[#262B36] text-[#C7FF4D] shadow-inner shadow-black/80' 
                      : 'text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#161A22]/40'
                  }`}
                  id={`sidebar-tab-${item.id}`}
                >
                  {/* Subtle active state edge gradient */}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-4 bg-[#C7FF4D] rounded-r-md" />
                  )}
                  
                  <Icon className={`w-5.5 h-5.5 shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'drop-shadow-[0_0_8px_rgba(199,255,77,0.4)]' : ''}`} />
                  
                  {isExpanded && (
                    <span className="text-xs font-sans font-bold tracking-wide leading-none select-none">
                      {item.label}
                    </span>
                  )}

                  {/* Outer active shadow glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#C7FF4D]/5 rounded-xl pointer-events-none blur-[6px]" />
                  )}
                </button>

                {/* Highly styled desktop Tooltip - only show when NOT expanded */}
                {!isExpanded && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#10131A] border border-[#262B36] text-[11px] text-[#F5F7FA] rounded-lg tracking-wide opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 shadow-xl whitespace-nowrap min-w-32 text-left top-1/2 -translate-y-1/2 ml-4">
                    <div className="font-bold flex items-center justify-between">
                      <span>{item.label}</span>
                      <ChevronRight className="w-2.5 h-2.5 text-[#C7FF4D] ml-2" />
                    </div>
                    <span className="text-[9px] text-[#98A2B3] font-mono uppercase tracking-wider block mt-0.5">{item.desc}</span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Settings & Profile */}
      <div className={`flex flex-col ${isExpanded ? 'items-start px-2' : 'items-center px-2'} w-full gap-4`}>
        <div className={`${isExpanded ? 'w-full' : 'w-10'} h-[1px] bg-[#262B36]/50 transition-all`} />

        {/* Settings button */}
        <div className="relative group flex justify-center w-full">
          <button
            onClick={() => setActiveTab('settings')}
            className={`rounded-xl flex items-center transition-all duration-300 cursor-pointer ${
              isExpanded 
                ? 'w-full h-11 px-3.5 gap-3.5 justify-start' 
                : 'w-11 h-11 justify-center'
            } ${
              activeTab === 'settings' 
                ? 'bg-[#161A22] border border-[#262B36] text-[#C7FF4D]' 
                : 'text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#161A22]/40'
            }`}
            id="sidebar-tab-settings"
          >
            <Settings className="w-5.5 h-5.5 shrink-0 group-hover:rotate-45 transition-transform duration-500" />
            
            {isExpanded && (
              <span className="text-xs font-sans font-bold tracking-wide leading-none select-none">
                Settings
              </span>
            )}
          </button>

          {/* Settings tooltip - only show when NOT expanded */}
          {!isExpanded && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#10131A] border border-[#262B36] text-[11px] text-[#F5F7FA] rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 shadow-xl whitespace-nowrap top-1/2 -translate-y-1/2 ml-4">
              <span className="font-bold">System Settings</span>
            </div>
          )}
        </div>

        {/* Avatar badge matching exactly the design */}
        {isExpanded ? (
          <div className="w-full flex items-center gap-3 p-2 bg-[#10131A]/40 border border-[#262B36]/20 rounded-xl overflow-hidden">
            <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#161A22] to-[#1B212C] border border-[#262B36] flex items-center justify-center overflow-hidden">
                <User className="w-3.5 h-3.5 text-[#98A2B3]" />
              </div>
              
              {/* Active status pulse green dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#C7FF4D] border-2 border-[#090C11] z-20" />
            </div>
            <div className="flex-1 min-w-0 select-text">
              <p className="text-[9px] font-mono text-[#C7FF4D] leading-none uppercase tracking-wider font-extrabold">Active</p>
              <p className="text-[11px] text-[#F5F7FA] font-bold truncate mt-1" title={walletAddress || "Alex Rivera"}>
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Alex Rivera"}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative group w-10 h-10 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#161A22] to-[#1B212C] border border-[#262B36] hover:border-[#C7FF4D]/40 flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer">
              <User className="w-4 h-4 text-[#98A2B3] group-hover:text-[#F5F7FA]" />
            </div>
            
            {/* Active status pulse green dot */}
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#C7FF4D] border-2 border-[#090C11] z-20" />
          </div>
        )}
      </div>
    </aside>
  );
}

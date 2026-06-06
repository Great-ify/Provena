/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Key, Coins, Code, Hourglass, Landmark, FileCheck } from 'lucide-react';
import { ProvenanceAsset, ActivityLog } from '../types';

interface MarketplaceProps {
  assets: ProvenanceAsset[];
  walletConnected: boolean;
  onPurchaseComplete: (log: any) => void;
  suiBalance: number;
  setSuiBalance: (b: number) => void;
  
  // Backwards compatibility elements to feed into the nested Analytics Dashboard
  logs?: ActivityLog[];
  onSelectCertificate?: (asset: ProvenanceAsset) => void;
  onOpenScanner?: () => void;
  initialSubTab?: 'discover' | 'my-assets' | 'licensing' | 'analytics';
  setActiveTab?: (tab: string) => void;
}

export default function Marketplace({
  assets,
  walletConnected,
  onPurchaseComplete,
  suiBalance,
  setSuiBalance,
  logs = [],
  onSelectCertificate,
  onOpenScanner,
  initialSubTab = 'discover',
  setActiveTab
}: MarketplaceProps) {
  
  const roadmapSteps = [
    {
      phase: "Phase 1 - On-Chain Settlement",
      title: "Move Split Agreements",
      desc: "Implement fully automated royalty fee partitioning directly within Sui Move smart contract signatures.",
      status: "Verified Build",
      completed: true
    },
    {
      phase: "Phase 2 - Content Protection",
      title: "Gated Decentralized Keys",
      desc: "Distribute cryptographically secured decryption tokens with high-performance storage replication on Walrus protocol.",
      status: "Active Prototype",
      completed: true
    },
    {
      phase: "Phase 3 - Global Ingress",
      title: "Royalty Collection Hub",
      desc: "Provide unified dashboards to view, trigger, and claim accumulated contract revenues across both testnet and mainnet.",
      status: "Q1 2027 Objective",
      completed: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-left select-none space-y-12" id="licensing-marketplace-coming-soon">
      
      {/* Upper Hero Panel */}
      <div className="bg-[#10131A] border border-[#262B36] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
        {/* Subtle red/blue & neon curves */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7FF4D]/5 rounded-full pointer-events-none blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#7CEEFF]/3 rounded-full pointer-events-none blur-3xl" />

        <div className="relative space-y-6 max-w-2xl">
          {/* Coming Soon status badge */}
          <div className="inline-flex items-center gap-2 bg-[#C7FF4D]/10 border border-[#C7FF4D]/30 text-[#C7FF4D] text-[10px] font-mono uppercase font-black px-3.5 py-1.5 rounded-full tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF4D] animate-pulse" />
            Coming Soon
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-display font-black text-[#F5F7FA] tracking-tight">
              Licensing Marketplace
            </h1>
            <p className="text-xs font-mono text-[#98A2B3] uppercase tracking-wider block">
              Sovereign copyright leasing and digital asset monetization pipelines
            </p>
          </div>

          <p className="text-sm text-[#98A2B3] font-sans leading-relaxed">
            Future decentralized licensing marketplace powered by Sui Move smart contracts and Walrus storage. This segment enables sovereign content creators to sell usage rights, sign automated licensing leases, and monitor royalty fee collections securely over distributed nodes.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-[#161a22]/80 border border-[#262B36] rounded-xl px-4 py-2.5 font-mono text-[10px]">
              <Code className="w-4 h-4 text-[#C7FF4D]" />
              <span className="text-[#98A2B3] font-bold uppercase">Language:</span>
              <span className="text-[#F5F7FA] font-extrabold">Sui Move v2</span>
            </div>
            <div className="flex items-center gap-2 bg-[#161a22]/80 border border-[#262B36] rounded-xl px-4 py-2.5 font-mono text-[10px]">
              <Landmark className="w-4 h-4 text-[#7CEEFF]" />
              <span className="text-[#98A2B3] font-bold uppercase">Storage:</span>
              <span className="text-[#F5F7FA] font-extrabold">Walrus Protocol</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Split Styling section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-mono uppercase font-black text-[#555E6B] tracking-widest">
            MARKETPLACE DEPLOYMENTS // CONTRACT STAGE MAP
          </h3>
          <p className="text-xs text-[#98A2B3] font-sans mt-1 font-medium">
            Active milestones leading to live on-chain decentralized distribution architectures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapSteps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-[#10131A] border border-[#262B36] rounded-2xl p-5 hover:border-[#C7FF4D]/35 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-[#C7FF4D] font-black uppercase tracking-wider">
                  {step.phase}
                </span>
                <h4 className="text-sm font-bold text-[#F5F7FA] tracking-tight">{step.title}</h4>
                <p className="text-xs text-[#98A2B3] leading-relaxed font-sans">{step.desc}</p>
              </div>

              <div className="border-t border-[#262B36]/50 pt-3 flex items-center justify-between mt-auto">
                <span className="text-[9px] font-mono text-[#555E6B] font-bold uppercase tracking-wider">
                  Status
                </span>
                <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded ${
                  step.completed 
                    ? 'bg-[#C7FF4D]/5 text-[#C7FF4D] border border-[#C7FF4D]/25' 
                    : 'bg-[#161a22] text-[#98A2B3] border border-[#262B36]'
                }`}>
                  {step.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Alert strip */}
      <div className="bg-[#161a22]/50 border border-[#262B36] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2.5 bg-[#C7FF4D]/10 rounded-xl border border-[#C7FF4D]/25 text-[#C7FF4D] shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#F5F7FA]">Liquidity pools provisioning coming soon</h4>
            <p className="text-[10px] text-[#98A2B3] uppercase font-mono mt-0.5">Automated SUI pairing contracts are currently processing internal security audits</p>
          </div>
        </div>
        <button 
          className="bg-[#C7FF4D]/10 hover:bg-[#C7FF4D]/20 border border-[#C7FF4D]/30 text-[#C7FF4D] font-mono text-[10px] uppercase font-bold py-2 px-4 rounded-lg tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0"
          onClick={() => alert("Sovereign licensing nodes are initializing. General beta pools scheduled concurrently with Testnet Epochs.")}
        >
          Check Node Status
        </button>
      </div>

    </div>
  );
}

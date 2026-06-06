/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldAlert, Cpu, Layers, Hourglass, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ScannerProps {
  onScanExecuted?: (score: number) => void;
}

export default function ScannerView({ onScanExecuted }: ScannerProps) {
  const roadmapSteps = [
    {
      phase: "Phase 1 - Diagnostic Foundation",
      title: "Deep Mimic Detection",
      desc: "Scan creative uploads to identify exact or parameterized vector replication and stylistic mimicking.",
      status: "In Development",
      completed: true
    },
    {
      phase: "Phase 2 - Smart Gateways",
      title: "Sui Neural Oracles",
      desc: "Bridge modular AI models with Sui Move contracts to authorize instant cryptographic attestation locks.",
      status: "Q4 2026 Core Focus",
      completed: false
    },
    {
      phase: "Phase 3 - Network Synergy",
      title: "Consolidated Registry",
      desc: "Auto-flag duplicate signatures across active testnet and mainnet partitions with live alerts.",
      status: "Planned Future Upgrade",
      completed: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-left select-none space-y-12" id="ai-scanner-coming-soon">
      {/* Upper Hero Panel */}
      <div className="bg-[#10131A] border border-[#262B36] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
        {/* Subtle radial ambient neon glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#14F1D9]/5 rounded-full pointer-events-none blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#C7FF4D]/3 rounded-full pointer-events-none blur-3xl" />

        <div className="relative space-y-6 max-w-2xl">
          {/* Coming Soon status badge */}
          <div className="inline-flex items-center gap-2 bg-[#14F1D9]/10 border border-[#14F1D9]/35 text-[#14F1D9] text-[10px] font-mono uppercase font-black px-3.5 py-1.5 rounded-full tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14F1D9] animate-pulse" />
            Coming Soon
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-display font-black text-[#F5F7FA] tracking-tight">
              AI Authenticity Scanner
            </h1>
            <p className="text-xs font-mono text-[#98A2B3] uppercase tracking-wider block">
              Neural Art protection & generative verification models
            </p>
          </div>

          <p className="text-sm text-[#98A2B3] font-sans leading-relaxed">
            Future release focused on AI-assisted originality analysis and creative authenticity verification. By comparing incoming uploads against global generative training matrices, Provéna will guard creators against style scraping and non-consensual replicate indexing.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-[#161a22]/80 border border-[#262B36] rounded-xl px-4 py-2.5 font-mono text-[10px]">
              <Cpu className="w-4 h-4 text-[#14F1D9]" />
              <span className="text-[#98A2B3] font-bold uppercase">Engine:</span>
              <span className="text-[#F5F7FA] font-extrabold">Omsi-Net-v0.8</span>
            </div>
            <div className="flex items-center gap-2 bg-[#161a22]/80 border border-[#262B36] rounded-xl px-4 py-2.5 font-mono text-[10px]">
              <Layers className="w-4 h-4 text-[#C7FF4D]" />
              <span className="text-[#98A2B3] font-bold uppercase">Partition:</span>
              <span className="text-[#F5F7FA] font-extrabold">Sui Decoupled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Split Styling section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-mono uppercase font-black text-[#555E6B] tracking-widest">
            ENGINE DEVELOPMENT ROADMAP // ACTIVE SPRINTS
          </h3>
          <p className="text-xs text-[#98A2B3] font-sans mt-1">
            Tracking milestones toward the sovereign launch of smart scanning oracles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapSteps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-[#10131A] border border-[#262B36] rounded-2xl p-5 hover:border-[#14F1D9]/30 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-[#14F1D9] font-black uppercase tracking-wider">
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

      {/* Subscription or Notice Banner */}
      <div className="bg-[#161a22]/50 border border-[#262B36] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#14F1D9]/10 rounded-xl border border-[#14F1D9]/25 text-[#14F1D9] shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#F5F7FA]">Beta Access List Opening Soon</h4>
            <p className="text-[10px] text-[#98A2B3] uppercase font-mono mt-0.5">Qualified creative guilds will receive priority consensus keys</p>
          </div>
        </div>
        <button 
          className="bg-[#14F1D9]/10 hover:bg-[#14F1D9]/20 border border-[#14F1D9]/30 text-[#14F1D9] font-mono text-[10px] uppercase font-bold py-2 px-4 rounded-lg tracking-wider transition-all cursor-pointer"
          onClick={() => alert("Registration queue will unlock concurrently with Sui Dev-Con v2 announcements.")}
        >
          View Release Manifest
        </button>
      </div>
    </div>
  );
}

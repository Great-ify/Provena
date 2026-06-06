/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Eye, ShieldAlert, GitBranch, ArrowUpRight } from 'lucide-react';

export default function FeaturePreviewGrid() {
  const futureCapabilities = [
    {
      id: 1,
      title: "Authenticity Analysis",
      desc: "Deep structure inspecting to prove digital originality. Analyzes source structural integrity, semantic traits, and cryptographic signatures to flag synthetic alterations.",
      icon: ShieldCheck,
      color: "from-[#C7FF4D]/10 to-[#C7FF4D]/2",
      textColor: "text-[#C7FF4D]",
      borderColor: "border-[#C7FF4D]/20 hover:border-[#C7FF4D]/40",
      accentGlow: "rgba(199, 255, 77, 0.04)"
    },
    {
      id: 2,
      title: "Ownership Similarity Detection",
      desc: "Cross-chain perceptual style hashing indices. Scanning decentralized ledgers and IPFS/Walrus buckets to locate near-identical vector duplicates or visual imitations.",
      icon: Eye,
      color: "from-[#14F1D9]/10 to-[#14F1D9]/2",
      textColor: "text-[#14F1D9]",
      borderColor: "border-[#14F1D9]/20 hover:border-[#14F1D9]/40",
      accentGlow: "rgba(20, 241, 217, 0.04)"
    },
    {
      id: 3,
      title: "AI Risk Assessment",
      desc: "Predictive threat profile indicators. Provides comprehensive grading on susceptibility to trademark infringement, licensing anomalies, or malicious clone campaigns.",
      icon: ShieldAlert,
      color: "from-[#7CEEFF]/10 to-[#7CEEFF]/2",
      textColor: "text-[#7CEEFF]",
      borderColor: "border-[#7CEEFF]/20 hover:border-[#7CEEFF]/40",
      accentGlow: "rgba(124, 238, 255, 0.04)"
    },
    {
      id: 4,
      title: "Content Provenance Tracking",
      desc: "Continuous historical lineage mapping. Unfold complete, verified ownership pathways from the initial seal stamp through subsequent secondary smart account acquisitions.",
      icon: GitBranch,
      color: "from-[#F5F7FA]/5 to-[#F5F7FA]/2",
      textColor: "text-white",
      borderColor: "border-[#262B36]/60 hover:border-[#98A2B3]/30",
      accentGlow: "rgba(245, 247, 250, 0.02)"
    }
  ];

  return (
    <div className="space-y-6 select-none" id="scanner-capabilities-desk">
      {/* Small Section Header */}
      <div className="text-left">
        <h3 className="text-xs font-mono text-[#555E6B] font-extrabold uppercase tracking-widest block">
          Core Diagnostic Modules
        </h3>
        <p className="text-xs text-[#98A2B3] mt-1">
          Futuristic machine learning capabilities engineering high-integrity proof systems.
        </p>
      </div>

      {/* Grid of Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {futureCapabilities.map((card, idx) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-6 rounded-2xl border bg-gradient-to-br ${card.color} ${card.borderColor} text-left transition-all relative overflow-hidden flex flex-col justify-between h-56`}
              style={{ boxShadow: `0 10px 30px ${card.accentGlow}` }}
            >
              {/* Corner decorative light element */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ backgroundColor: card.textColor }} />

              {/* Top Row: Icon + Glow Pill */}
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl border bg-black/40 ${card.textColor} border-current/20`}>
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>
                
                <div className="flex items-center gap-1 bg-black/40 py-1 px-2.5 rounded-full border border-[#262B36] text-[8px] font-mono font-bold text-[#98A2B3]">
                  <span>RESERVED TECH</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Bottom Row: Text Content */}
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-bold text-[#F5F7FA] font-display">
                  {card.title}
                </h4>
                <p className="text-[11px] leading-relaxed text-[#98A2B3] font-sans">
                  {card.desc}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

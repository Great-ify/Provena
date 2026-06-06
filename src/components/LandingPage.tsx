/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Database, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  RefreshCw, 
  FileCode, 
  HardDrive, 
  Key, 
  FileCheck, 
  Award, 
  Search, 
  HelpCircle,
  ExternalLink,
  Zap,
  Fingerprint
} from 'lucide-react';

interface LandingPageProps {
  onStartSealing: () => void;
  onOpenScanner: () => void;
  onOpenVerify: () => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
}

export default function LandingPage({
  onStartSealing,
  onOpenScanner,
  onOpenVerify,
  walletConnected,
  setWalletConnected,
}: LandingPageProps) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [activeHighlightTab, setActiveHighlightTab] = useState<number>(0);

  // 6 Pipeline Steps (Sprint 1 Required workflow)
  const pipelineSteps = [
    {
      title: "Upload",
      tagline: "Secure Ingest",
      descr: "Select work of any format (creative art, video, music, or dataset). Handled locally inside the sandbox.",
      icon: HardDrive,
      metric: "Local Ingest Check",
      statusColor: "text-[#7CEEFF]"
    },
    {
      title: "Hash",
      tagline: "SHA-256 Vector",
      descr: "Generate a cryptographically secure hash fingerprint. Your actual source content never leaves your direct environment.",
      icon: Fingerprint,
      metric: "SHA-256 Active",
      statusColor: "text-[#14F1D9]"
    },
    {
      title: "Encrypt",
      tagline: "AES-256-GCM",
      descr: "Client-side symmetrical cipher encryption. Zero-knowledge cryptographic leakage guarantees total privacy.",
      icon: Lock,
      metric: "Hardware Locked",
      statusColor: "text-[#C7FF4D]"
    },
    {
      title: "Walrus",
      tagline: "Redundant Swarm",
      descr: "Fragment the encrypted work into erasure chunks and stream them across the decentralized Walrus Storage network.",
      icon: Database,
      metric: "Storage Enqueue",
      statusColor: "text-[#7CEEFF]"
    },
    {
      title: "Sui",
      tagline: "Move Consensus",
      descr: "Anchor the tamper-proof metadata object on SUI blockchain. Move validators timestamp and publish ownership states.",
      icon: Cpu,
      metric: "Sui Gas Sync",
      statusColor: "text-[#14F1D9]"
    },
    {
      title: "Certificate",
      tagline: "Collectible Proof",
      descr: "Generate a prestigious digital ownership certificate. Immutably signed, printed, and ready for verification portals.",
      icon: Award,
      metric: "Mint Success 100%",
      statusColor: "text-[#C7FF4D]"
    }
  ];

  // 5 Feature highlights for Sprint 1
  const features = [
    {
      title: "Provenance Registry",
      badge: "Sui Mainnet",
      desc: "An enterprise-grade, decentralized registry that maps digital authorship directly onto the high-performance Sui blockchain. Bind your cryptographic signature to original works forever with zero reliance on cloud gatekeepers.",
      visualType: "registry",
      metric: "128,490 Anchored Assets",
      icon: Shield
    },
    {
      title: "Ownership Certificates",
      badge: "Non-Fungible Attestations",
      desc: "Mint beautiful, prestigious, collectible metadata capsules showcasing creation coordinates, file hashes, and sovereign tags. Print credentials directly to represent physical assets or back legal portfolios.",
      visualType: "certificates",
      metric: "Move Contract V2 Verified",
      icon: Award
    },
    {
      title: "Verification Engine",
      badge: "Double-Verification Protocol",
      desc: "An instantaneous search hub allowing creators and partners to match transaction hashes, block indices, or Walrus Blob IDs. Confirm integrity in under 2 seconds. Zero fee required.",
      visualType: "verify",
      metric: "Instant Indexer Search Active",
      icon: Search
    },
    {
      title: "Licensing Marketplace",
      badge: "Smart Royalties",
      desc: "A sovereign storefront giving creators absolute pricing control. Authorize AI modeling exclusions, lease commercial use rights, and configure automated, secure smart rules to govern usage permissions globally.",
      visualType: "marketplace",
      metric: "4,782.56 SUI Distributed",
      icon: Sparkles
    },
    {
      title: "AI Similarity Scanner",
      badge: "Neural Forensics",
      desc: "Advanced neural forensic scanner that analyzes topological visual states, waveforms, or textual structures. Compare your content to major open crawlers to verify original creations and detect unauthorized leaks.",
      visualType: "scanner",
      metric: "93.4% Baseline Style Accuracy",
      icon: Cpu
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden bg-[#07090D] text-[#F5F7FA]" id="provena-sprint1-landing">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative pt-12 md:pt-20 pb-8 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        id="provena-hero-refinement"
      >
        {/* Soft, professional gradient glows representing the 85% dark surface design system */}
        <div className="absolute top-[-100px] left-[-5%] w-[45%] h-[600px] bg-[#C7FF4D]/5 pointer-events-none rounded-full blur-[140px] z-0" />
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[500px] bg-[#14F1D9]/3 pointer-events-none rounded-full blur-[140px] z-0" />

        {/* Left Column: Bold Titles & Brand Meta */}
        <div className="lg:col-span-6 space-y-8 z-10 text-left">
          
          {/* Brand Prefix Badge */}
          <div className="inline-flex items-center gap-2 bg-[#161A22] border border-[#262B36] rounded-full px-3 py-1 text-xs select-none">
            <span className="w-2 h-2 rounded-full bg-[#C7FF4D] animate-ping" />
            <span className="text-[10px] text-[#98A2B3] font-mono uppercase tracking-[0.2em] font-semibold">Platform Live V1.0</span>
          </div>

          {/* Main Stacking Typography aligned to reference image but with our content constraint */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-display tracking-tight leading-[0.85] text-[#F5F7FA] font-black flex flex-col">
              <span>Prove.</span>
              <span>Protect.</span>
              <span className="text-[#C7FF4D] drop-shadow-[0_0_35px_rgba(199,255,77,0.18)]">Prosper.</span>
            </h1>
            <p className="text-[#98A2B3] text-sm md:text-base max-w-lg font-sans leading-relaxed pt-2">
              The Provenance & ownership layer for creators. Built on Sui + Walrus. Lock your intellectual work, verify originality, and resist algorithmic data harvesting with absolute permanence.
            </p>
          </div>

          {/* Action Call-To-Actions (CTAs) */}
          <div className="flex flex-wrap gap-4 pt-1">
            <button
              onClick={onStartSealing}
              className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-sans font-bold text-xs py-4 px-8 rounded-full flex items-center gap-2 transition-all duration-300 shadow-xl shadow-[#C7FF4D]/10 active:scale-95 cursor-pointer hover:shadow-[#C7FF4D]/20"
              id="hero-seal-work"
            >
              <span>{walletConnected ? "Enter Workspace" : "Connect Wallet"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenVerify}
              className="bg-[#161A22] hover:bg-[#1C212D] text-[#F5F7FA] border border-[#262B36] hover:border-[#C7FF4D]/40 font-sans font-semibold text-xs py-4 px-8 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
              id="hero-explore-marketplace"
            >
              {walletConnected ? "Open App" : "Explore Marketplace"}
            </button>
          </div>

          {/* Overlapping Creator Avatars and Pagination indicator from screenshot */}
          <div className="pt-8 border-t border-[#262B36]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[9px] text-[#555E6B] font-mono font-bold uppercase tracking-widest">TRUSTED BY VISIONARY CREATORS</p>
              <div className="flex items-center gap-3">
                {/* Simulated high-fidelity avatar stack */}
                <div className="flex -space-x-2.5 select-none">
                  {['AR', 'EV', 'AS', 'MV'].map((ini, i) => (
                    <div 
                      key={i} 
                      className={`w-[32px] h-[32px] rounded-full border-2 border-[#07090D] flex items-center justify-center text-[10px] font-bold ${
                        i === 1 ? 'bg-[#C7FF4D] text-[#07090D]' : i === 2 ? 'bg-[#14F1D9] text-[#07090D]' : 'bg-[#161A22] text-[#F5F7FA]'
                      }`}
                    >
                      {ini}
                    </div>
                  ))}
                </div>
                <div className="text-left select-none">
                  <span className="text-xs text-[#F5F7FA] font-bold block"> Creators</span>
                </div>
              </div>
            </div>

            {/* Pagination green layout marker blocks matching the reference */}
            <div className="flex items-center gap-2 mt-2 sm:mt-0 select-none">
              <span className="w-6 h-[4px] rounded-full bg-[#C7FF4D]" />
              <span className="w-2 h-[4px] rounded-full bg-[#262B36]" />
              <span className="w-2 h-[4px] rounded-full bg-[#262B36]" />
            </div>
          </div>

        </div>

        {/* Right Column: Floating 3D Block and Orbiting widgets (CRITICAL USER MANDATE COMPLETE) */}
        <div className="lg:col-span-6 flex justify-center items-center relative mt-12 lg:mt-0 select-none">
          
          {/* Base isometric grid backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#262B36_1px,transparent_1.5px)] bg-[size:28px_28px] pointer-events-none opacity-40" />

          {/* Concentric rotating glass panels */}
          <div className="absolute w-[450px] h-[450px] border border-[#262B36]/50 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[350px] h-[130px] border border-dashed border-[#14F1D9]/20 rounded-full rotate-x-60 animate-[spin_30s_linear_infinite]" />

          {/* Outer glowing coordinate dots representing blockchain parameters */}
          <div className="absolute top-[10%] left-[20%] w-1.5 h-1.5 bg-[#C7FF4D] rounded-full animate-pulse shadow-[0_0_8px_#C7FF4D]" />
          <div className="absolute bottom-[15%] right-[10%] w-1 h-1 bg-[#14F1D9] rounded-full animate-ping" />

          {/* Interactive 3D Block and widgets container */}
          <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center">
            
            {/* CENTRAL 3D BLOCK: Sleeker, Higher-Fidelity Isometric Glass Mesh Component */}
            <div className="absolute z-10 w-72 h-72 flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full text-[#C7FF4D]">
                <defs>
                  <linearGradient id="cubeFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C7FF4D" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#14F1D9" stopOpacity="0.05" />
                  </linearGradient>
                  
                  <filter id="ultraGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="12" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Light reflection ray */}
                <line x1="200" y1="10" x2="200" y2="390" stroke="#C7FF4D" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.12" />
                <line x1="10" y1="200" x2="390" y2="200" stroke="#14F1D9" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.12" />

                {/* Glowing Core Particle Nodes */}
                <circle cx="200" cy="115" r="4.5" fill="#C7FF4D" filter="url(#ultraGlow)">
                  <animate attributeName="cy" values="115;265;115" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="215" r="3.5" fill="#14F1D9" filter="url(#ultraGlow)" />

                {/* Isometric Cube face panels for high-fidelity glass transparency */}
                {/* Top Polygon */}
                <polygon points="200,80 300,130 200,180 100,130" fill="url(#cubeFaceGrad)" stroke="#C7FF4D" strokeWidth="1.5" strokeOpacity="0.6" />
                {/* Left Polygon */}
                <polygon points="100,130 200,180 200,290 100,240" fill="none" stroke="#C7FF4D" strokeWidth="1.2" strokeOpacity="0.3" />
                {/* Right Polygon */}
                <polygon points="300,130 200,180 200,290 300,240" fill="none" stroke="#14F1D9" strokeWidth="1.2" strokeOpacity="0.3" />

                {/* Inner smaller orbiting diamond (Double security visual) */}
                <polygon points="200,120 250,145 200,170 150,145" fill="none" stroke="#14F1D9" strokeWidth="1.5" strokeOpacity="0.5" />
                <polygon points="150,145 200,170 200,230 150,205" fill="none" stroke="#7CEEFF" strokeWidth="1" strokeOpacity="0.4" />
                <polygon points="250,145 200,170 200,230 250,205" fill="none" stroke="#C7FF4D" strokeWidth="1" strokeOpacity="0.4" />

                {/* Vertices neon accent markers */}
                <circle cx="200" cy="80" r="5" fill="#C7FF4D" filter="url(#ultraGlow)" />
                <circle cx="300" cy="130" r="4" fill="#14F1D9" />
                <circle cx="100" cy="130" r="4" fill="#14F1D9" />
                <circle cx="200" cy="290" r="5.5" fill="#7CEEFF" filter="url(#ultraGlow)" />
              </svg>
            </div>

            {/* Orbiting Metadata Badges representing verification points */}
            {/* Widget 1: Client-side cryptographic lock */}
            <div className="absolute top-[20px] right-[-20px] z-20 flex items-center gap-2.5 bg-[#161A22]/90 backdrop-blur-md border border-[#C7FF4D]/40 px-4 py-2.5 rounded-xl shadow-xl shadow-black/60 text-left">
              <div className="w-7 h-7 bg-[#C7FF4D]/10 border border-[#C7FF4D]/35 rounded-lg flex items-center justify-center text-[#C7FF4D]">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="leading-none">
                <span className="text-[10px] text-[#C7FF4D] uppercase font-mono tracking-wider font-bold block">Encrypted</span>
                <span className="text-[10px] text-[#98A2B3] font-sans block mt-1">Client-Side GCM</span>
              </div>
            </div>

            {/* Widget 2: Stored on Walrus Protocol */}
            <div className="absolute top-[135px] right-[-45px] z-20 flex items-center gap-2.5 bg-[#161A22]/90 backdrop-blur-md border border-[#262B36] px-4 py-2.5 rounded-xl shadow-xl shadow-black/60 text-left">
              <div className="w-7 h-7 bg-[#14F1D9]/10 border border-[#14F1D9]/25 rounded-lg flex items-center justify-center text-[#14F1D9]">
                <Database className="w-3.5 h-3.5" />
              </div>
              <div className="leading-none">
                <span className="text-[10px] text-[#F5F7FA] uppercase font-mono tracking-wider font-bold block">Stored</span>
                <span className="text-[10px] text-[#98A2B3] font-sans block mt-1">Walrus Storage</span>
              </div>
            </div>

            {/* Widget 3: Anchored on SUI Blockchain */}
            <div className="absolute bottom-[115px] left-[-35px] z-20 flex items-center gap-2.5 bg-[#161A22]/90 backdrop-blur-md border border-[#262B36] px-4 py-2.5 rounded-xl shadow-xl shadow-black/60 text-left">
              <div className="w-7 h-7 bg-[#7CEEFF]/10 border border-[#7CEEFF]/25 rounded-lg flex items-center justify-center text-[#7CEEFF]">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="leading-none">
                <span className="text-[10px] text-[#F5F7FA] uppercase font-mono tracking-wider font-bold block">Anchored</span>
                <span className="text-[10px] text-[#98A2B3] font-sans block mt-1">Sui Consensus</span>
              </div>
            </div>

            {/* Widget 4: Verified Forever */}
            <div className="absolute bottom-[10px] left-[25px] z-20 flex items-center gap-2.5 bg-[#161A22]/90 backdrop-blur-md border border-[#C7FF4D]/30 px-4 py-2.5 rounded-xl shadow-xl shadow-black/60 text-left">
              <div className="w-7 h-7 bg-[#C7FF4D]/10 border border-[#C7FF4D]/45 rounded-lg flex items-center justify-center text-[#C7FF4D]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="leading-none">
                <span className="text-[10px] text-[#C7FF4D] uppercase font-mono tracking-wider font-bold block">Verified</span>
                <span className="text-[10px] text-[#98A2B3] font-sans block mt-1">Immutable Stamp</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS CHRONOLOGICAL FLOW (Matches Image Layout Exactly) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 border-y border-[#262B36]/50 py-16 text-left relative">
        <div className="absolute top-[20px] right-[10%] w-[30%] h-[300px] bg-[#C7FF4D]/1 pointer-events-none rounded-full blur-[110px]" />
        
        {/* Header split text block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono text-[#C7FF4D] uppercase tracking-widest block font-bold" style={{ letterSpacing: '0.25em' }}>HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F7FA] font-display leading-none">
              From creation to cryptographic truth.
            </h2>
            <p className="text-xs md:text-sm text-[#98A2B3] font-sans max-w-xl leading-relaxed pt-2">
              PROVENA secures your creative work with client-side encryption, decentralized storage, and immutable on-chain proof.
            </p>
            <button 
              onClick={onOpenVerify}
              className="text-xs font-mono font-bold text-[#C7FF4D] hover:text-[#D9FF6B] inline-flex items-center gap-1.5 pt-2 cursor-pointer group transition-colors"
            >
              <span>Learn more</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Right side floating isometric hexagons */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Hexagon 1 */}
            <div className="relative bg-[#161A22]/30 border border-[#262B36]/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center overflow-hidden h-[155px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#262B36]" fill="none" stroke="currentColor" strokeWidth="1">
                  <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
                  <polygon points="50,25 72,37 72,63 50,75 28,63 28,37" />
                  <line x1="50" y1="15" x2="50" y2="25" />
                  <line x1="80" y1="32" x2="72" y2="37" />
                  <line x1="80" y1="68" x2="72" y2="63" />
                  <line x1="50" y1="85" x2="50" y2="75" />
                  <line x1="20" y1="68" x2="28" y2="63" />
                  <line x1="20" y1="32" x2="28" y2="37" />
                </svg>
              </div>
              <div className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#C7FF4D]/5 border border-[#C7FF4D]/20 shadow-[0_0_12px_rgba(199,255,77,0.12)] mb-2 animate-pulse">
                <Shield className="w-5 h-5 text-[#C7FF4D]" />
              </div>
              <span className="font-sans font-bold text-[10px] text-[#F5F7FA] z-10">Client Cryptography</span>
              <span className="text-[8px] text-[#98A2B3] font-mono mt-0.5 uppercase">Local Sandbox</span>
            </div>

            {/* Hexagon 2 */}
            <div className="relative bg-[#161A22]/30 border border-[#262B36]/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center overflow-hidden h-[155px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#262B36]" fill="none" stroke="currentColor" strokeWidth="1">
                  <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
                  <polygon points="50,25 72,37 72,63 50,75 28,63 28,37" />
                  <line x1="50" y1="15" x2="50" y2="25" />
                  <line x1="80" y1="32" x2="72" y2="37" />
                  <line x1="80" y1="68" x2="72" y2="63" />
                  <line x1="50" y1="85" x2="50" y2="75" />
                  <line x1="20" y1="68" x2="28" y2="63" />
                  <line x1="20" y1="32" x2="28" y2="37" />
                </svg>
              </div>
              <div className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#14F1D9]/5 border border-[#14F1D9]/20 shadow-[0_0_12px_rgba(20,241,217,0.12)] mb-2 animate-pulse">
                <Database className="w-5 h-5 text-[#14F1D9]" />
              </div>
              <span className="font-sans font-bold text-[10px] text-[#F5F7FA] z-10">Sui Consensus</span>
              <span className="text-[8px] text-[#98A2B3] font-mono mt-0.5 uppercase">Move Contract</span>
            </div>
          </div>
        </div>

        {/* 4 horizontal step cards with connect arrows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 relative items-stretch">
          
          {/* Step 1 */}
          <div className="bg-[#10131A]/90 hover:bg-[#161A22] border border-[#262B36]/60 rounded-2xl p-5 flex flex-col justify-between h-[160px] relative transition-all duration-300 group">
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#C7FF4D]/10 text-[#C7FF4D] border border-[#C7FF4D]/35 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold leading-none">
                  1
                </span>
                <span className="text-xs font-bold font-sans text-[#F5F7FA] uppercase tracking-wide">Upload</span>
              </div>
              <p className="text-[11px] text-[#98A2B3] leading-relaxed font-sans font-normal">
                Add your creative work securely. Files of any size are processed in-browser.
              </p>
            </div>
            {/* Chevron connector displayed only on desktop md: screens */}
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-[#C7FF4D] font-mono text-sm group-hover:translate-x-0.5 transition-transform">
              &gt;
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#10131A]/90 hover:bg-[#161A22] border border-[#262B36]/60 rounded-2xl p-5 flex flex-col justify-between h-[160px] relative transition-all duration-300 group">
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#C7FF4D]/10 text-[#C7FF4D] border border-[#C7FF4D]/35 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold leading-none">
                  2
                </span>
                <span className="text-xs font-bold font-sans text-[#F5F7FA] uppercase tracking-wide">Encrypt</span>
              </div>
              <p className="text-[11px] text-[#98A2B3] leading-relaxed font-sans font-normal">
                Client-side encryption before it leaves your device. Content keys remain secure.
              </p>
            </div>
            {/* Chevron connector */}
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-[#C7FF4D] font-mono text-sm group-hover:translate-x-0.5 transition-transform">
              &gt;
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#10131A]/90 hover:bg-[#161A22] border border-[#262B36]/60 rounded-2xl p-5 flex flex-col justify-between h-[160px] relative transition-all duration-300 group">
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#C7FF4D]/10 text-[#C7FF4D] border border-[#C7FF4D]/35 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold leading-none">
                  3
                </span>
                <span className="text-xs font-bold font-sans text-[#F5F7FA] uppercase tracking-wide">Store</span>
              </div>
              <p className="text-[11px] text-[#98A2B3] leading-relaxed font-sans font-normal">
                Encrypted file blobs are uploaded directly to Walrus Decentralized Storage nodes.
              </p>
            </div>
            {/* Chevron connector */}
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-[#C7FF4D] font-mono text-sm group-hover:translate-x-0.5 transition-transform">
              &gt;
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#10131A]/90 hover:bg-[#161A22] border border-[#262B36]/60 rounded-2xl p-5 flex flex-col justify-between h-[160px] transition-all duration-300">
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#C7FF4D]/10 text-[#C7FF4D] border border-[#C7FF4D]/35 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold leading-none">
                  4
                </span>
                <span className="text-xs font-bold font-sans text-[#F5F7FA] uppercase tracking-wide">Seal</span>
              </div>
              <p className="text-[11px] text-[#98A2B3] leading-relaxed font-sans font-normal">
                Anchors your content metadata on SUI and mints a verifiable ownership certificate.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE PRODUCT BENTO MODULES (100% physically similar to layout in template screenshot) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-left space-y-10" id="bento-modules">
        
        <div className="space-y-2 text-left">
          <span className="text-xs font-mono text-[#C7FF4D] uppercase tracking-widest block font-bold" style={{ letterSpacing: '0.2em' }}>PROVENA MODULES</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#F5F7FA] font-display">
            Cryptographic primitives for ownership.
          </h2>
        </div>

        {/* 3 Large Column Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Ownership Verification */}
          <div className="bg-[#10131A]/90 border border-[#262B36]/60 rounded-2xl p-6 flex flex-col justify-between h-[280px] relative overflow-hidden group transition-all duration-300 hover:border-[#C7FF4D]/40">
            <div className="space-y-3 text-left">
              <h3 className="text-lg font-bold text-[#F5F7FA] font-display">
                Ownership Verification
              </h3>
              <p className="text-xs text-[#98A2B3] leading-relaxed font-sans font-normal">
                Instantly verify authenticity with on-chain proof and encrypted metadata. Confirm credentials in absolute real-time.
              </p>
            </div>

            <div className="flex items-end justify-between mt-auto select-none pt-4">
              <button 
                onClick={onOpenVerify}
                className="text-xs font-mono font-bold text-[#C7FF4D] hover:text-[#D9FF6B] inline-flex items-center gap-1.5 cursor-pointer pb-1 border-b border-transparent hover:border-[#C7FF4D] transition-all"
              >
                Verify Now →
              </button>
              
              {/* Graphic bottom right: Isometric Hex plate with glowing leaf icon */}
              <div className="relative w-20 h-20 -mr-2 -mb-2 flex items-end justify-end">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-20 h-20 text-[#C7FF4D]/10" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <polygon points="50,20 85,40 85,80 50,100 15,80 15,40" fill="currentColor" fillOpacity="0.02" />
                  <polygon points="50,15 90,35 90,75 50,95 10,75 10,35" />
                  <line x1="50" y1="15" x2="50" y2="50" />
                  <line x1="90" y1="35" x2="50" y2="50" />
                  <line x1="90" y1="75" x2="50" y2="95" />
                </svg>
                {/* floating symbol */}
                <div className="relative z-10 mr-4 mb-3 text-[#C7FF4D] drop-shadow-[0_0_10px_rgba(199,255,77,0.35)] animate-bounce" style={{ animationDuration: '3s' }}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C7.5 6.5 4.5 11.5 4.5 15.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-4-3-9-7.5-13.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Creator Licensing */}
          <div className="bg-[#10131A]/90 border border-[#262B36]/60 rounded-2xl p-6 flex flex-col justify-between h-[280px] relative overflow-hidden group transition-all duration-300 hover:border-[#14F1D9]/40">
            <div className="space-y-3 text-left">
              <h3 className="text-lg font-bold text-[#F5F7FA] font-display">
                Creator Licensing
              </h3>
              <p className="text-xs text-[#98A2B3] leading-relaxed font-sans font-normal">
                License your work with programmable rules and smart contracts. Rent or lease content permissions directly to AI modelers.
              </p>
            </div>

            <div className="flex items-end justify-between mt-auto select-none pt-4">
              <button 
                onClick={onStartSealing}
                className="text-xs font-mono font-bold text-[#C7FF4D] hover:text-[#D9FF6B] inline-flex items-center gap-1.5 cursor-pointer pb-1 border-b border-transparent hover:border-[#C7FF4D] transition-all"
              >
                Start Licensing →
              </button>
              
              {/* Graphic bottom right: Isometric Hex plate with key lock symbol */}
              <div className="relative w-20 h-20 -mr-2 -mb-2 flex items-end justify-end">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-20 h-20 text-[#14F1D9]/10" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <polygon points="50,20 85,40 85,80 50,100 15,80 15,40" fill="currentColor" fillOpacity="0.02" />
                  <polygon points="50,15 90,35 90,75 50,95 10,75 10,35" />
                  <line x1="50" y1="15" x2="50" y2="50" />
                  <line x1="15" y1="40" x2="50" y2="50" />
                  <line x1="10" y1="75" x2="50" y2="95" />
                </svg>
                {/* floating symbol */}
                <div className="relative z-10 mr-5 mb-3 text-[#14F1D9] drop-shadow-[0_0_10px_rgba(20,241,217,0.35)] animate-bounce" style={{ animationDuration: '3.5s' }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Sui + Walrus Powering Provenance */}
          <div className="bg-[#10131A]/90 border border-[#262B36]/60 rounded-2xl p-6 flex flex-col justify-between h-[280px] relative overflow-hidden group transition-all duration-300 hover:border-[#7CEEFF]/40">
            <div className="space-y-3 text-left">
              <h3 className="text-lg font-bold text-[#F5F7FA] font-display">
                Sui + Walrus Powering Provenance
              </h3>
              <p className="text-xs text-[#98A2B3] leading-relaxed font-sans font-normal">
                Decentralized, immutable. Double-shield technology engineered directly for AI-era cryptographic sovereignty index checks.
              </p>
            </div>

            <div className="flex items-end justify-between mt-auto select-none pt-4">
              {/* Bottom left: Nested leaves icons */}
              <div className="flex items-center gap-1 mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C7FF4D]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C7.5 6.5 4.5 11.5 4.5 15.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-4-3-9-7.5-13.5z" />
                </svg>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4E5B6E]/80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C7.5 6.5 4.5 11.5 4.5 15.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-4-3-9-7.5-13.5z" />
                </svg>
              </div>

              {/* Bottom right: Interconnected network constellation mesh */}
              <div className="relative w-24 h-16 flex items-center justify-center">
                <svg viewBox="0 0 120 80" className="w-full h-full text-[#7CEEFF]" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="20" y1="40" x2="60" y2="20" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="60" y1="20" x2="100" y2="40" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="100" y1="40" x2="60" y2="60" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="60" y1="60" x2="20" y2="40" strokeWidth="0.8" strokeDasharray="2,2" />
                  <line x1="60" y1="20" x2="60" y2="60" strokeWidth="0.5" />
                  <line x1="20" y1="40" x2="60" y2="40" strokeWidth="0.5" />
                  <line x1="60" y1="40" x2="100" y2="40" strokeWidth="0.5" />
                  <circle cx="20" cy="40" r="2.5" fill="#7CEEFF" />
                  <circle cx="60" cy="20" r="2.5" fill="#C7FF4D" />
                  <circle cx="100" cy="40" r="2.5" fill="#14F1D9" />
                  <circle cx="60" cy="60" r="2.5" fill="#7CEEFF" />
                  <circle cx="60" cy="40" r="3" fill="#C7FF4D" className="animate-ping" style={{ animationDuration: '2s' }} />
                  <circle cx="60" cy="40" r="1.5" fill="#C7FF4D" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* 4. TECH STACK UNDERPINNING (BUILT FOR CREATORS. BACKED BY TECHNOLOGY.) */}
        <div className="pt-16 border-t border-[#262B36]/50 w-full text-center space-y-6">
          <p className="text-[10px] text-[#555E6B] font-mono uppercase tracking-[0.25em] font-black">
            BUILT FOR CREATORS. BACKED BY TECHNOLOGY.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-[#98A2B3] font-mono text-xs font-bold" id="ecosystem-logo-row">
            {/* Sui Logo */}
            <div className="flex items-center gap-2 hover:text-[#C7FF4D] transition-all cursor-default select-none py-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#14F1D9]" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1-5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
              </svg>
              <span className="font-sans font-black tracking-wider text-xs">Sui</span>
            </div>

            {/* WALRUS Logo */}
            <div className="flex items-center gap-2 hover:text-[#C7FF4D] transition-all cursor-default select-none py-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#C7FF4D]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 14.5A2.5 2.5 0 0 0 6.5 17h11a2.5 2.5 0 0 0 2.5-2.5V8" />
                <path d="m8 10 4 4 4-4" />
                <path d="M12 3v11" />
              </svg>
              <span className="font-sans font-black tracking-wider text-xs">WALRUS</span>
            </div>

            {/* Move language Logo */}
            <div className="flex items-center gap-2 hover:text-[#C7FF4D] transition-all cursor-default select-none py-1">
              <div className="w-4 h-4 bg-[#7CEEFF]/10 rounded border border-[#7CEEFF]/30 flex items-center justify-center font-mono text-[9px] text-[#7CEEFF] leading-none font-extrabold">
                M
              </div>
              <span className="font-sans font-black tracking-wider text-xs">Move</span>
            </div>

            {/* Cetus Logo */}
            <div className="flex items-center gap-2 hover:text-[#C7FF4D] transition-all cursor-default select-none py-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#14F1D9]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="font-sans font-bold tracking-tight text-xs">Cetus</span>
            </div>

            {/* BlueMove Logo */}
            <div className="flex items-center gap-2 hover:text-[#C7FF4D] transition-all cursor-default select-none py-1">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#7CEEFF] to-[#14F1D9]" />
              <span className="font-sans font-bold tracking-tight text-xs">BlueMove</span>
            </div>

          </div>
        </div>

      </section>

      {/* 5. PRESTIGE BOTTOM CTA CARD WITH MULTI-FACET SPINNING CRYSTAL NODE (Matches layout of template screenshot exactly) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-12">
        <div className="bg-[#10131A] border border-[#262B36]/70 rounded-3xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden" id="provenance-bottom-prestige-refined">
          
          <div className="absolute inset-0 bg-radial from-[#C7FF4D]/3 via-transparent to-transparent pointer-events-none" />
          
          {/* Bottom Left Details Column */}
          <div className="lg:col-span-8 text-left space-y-6 z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#F5F7FA] leading-[1.05] font-display">
              Your work deserves<br />eternal proof.
            </h2>
            <p className="text-xs md:text-sm text-[#98A2B3] font-sans max-w-xl leading-relaxed">
              Seal it. Own it. Monetize it. Secure cryptographic provenance anchors the instant you deploy. Expand licensing royalties onto global on-chain entities with zero knowledge leakage.
            </p>
            <div className="pt-1">
              {/* Dropdown-styled Button matching graphic: contains dropdown caret */}
              <button
                onClick={onStartSealing}
                className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-sans text-xs font-extrabold py-3.5 px-7 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer active:scale-95 shadow-lg shadow-[#C7FF4D]/10 hover:shadow-[#C7FF4D]/25"
              >
                <span>{walletConnected ? "Open Workspace" : "Connect Wallet Now"}</span>
                <span className="text-[10px] font-sans">▾</span>
              </button>
            </div>
          </div>

          {/* Bottom Right Spinning Crystal Polyhedron Element */}
          <div className="lg:col-span-4 flex justify-center items-center relative h-64 select-none">
            
            {/* Background Soft Glow Aura */}
            <div className="absolute w-44 h-44 bg-[#C7FF4D]/10 rounded-full blur-[48px] mix-blend-screen opacity-70 animate-pulse pointer-events-none" />

            {/* High-Fidelity Multi-layered 3D Crystal Node spinning nicely */}
            <motion.div
              className="w-44 h-44 cursor-grab"
              animate={{
                rotateY: 360,
                rotateX: [15, 25, 15],
                y: [-6, 6, -6]
              }}
              transition={{
                rotateY: { repeat: Infinity, duration: 20, ease: "linear" },
                rotateX: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full text-[#C7FF4D] drop-shadow-[0_0_24px_rgba(199,255,77,0.35)]">
                {/* Master Facets Gradient filled blocks representing complex crystalline structures */}
                <polygon points="100,20 160,100 100,100" fill="url(#crystalGrad1)" fillOpacity="0.25" stroke="#C7FF4D" strokeWidth="1" />
                <polygon points="100,20 40,100 100,100" fill="url(#crystalGrad2)" fillOpacity="0.15" stroke="#C7FF4D" strokeWidth="1" />
                <polygon points="100,180 160,100 100,100" fill="url(#crystalGrad2)" fillOpacity="0.2" stroke="#C7FF4D" strokeWidth="1" />
                <polygon points="100,180 40,100 100,100" fill="url(#crystalGrad1)" fillOpacity="0.3" stroke="#C7FF4D" strokeWidth="1" />
                
                {/* Outer high-contrast structural frame outline */}
                <polygon points="100,20 160,100 100,180 40,100" fill="none" stroke="#C7FF4D" strokeWidth="2" strokeOpacity="0.9" />
                
                {/* Secondary inner floating geometry (Teal and Cyan accents) */}
                <polygon points="100,45 145,100 100,155 55,100" fill="none" stroke="#14F1D9" strokeWidth="1" strokeOpacity="0.65" />
                <polygon points="100,60 130,100 100,140 70,100" fill="none" stroke="#7CEEFF" strokeWidth="0.8" strokeOpacity="0.45" />

                {/* Vertical split line */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="#C7FF4D" strokeWidth="1.2" strokeOpacity="0.5" />
                <line x1="40" y1="100" x2="160" y2="100" stroke="#C7FF4D" strokeWidth="1.2" strokeOpacity="0.5" />

                {/* Vertex pins */}
                <circle cx="100" cy="20" r="3.5" fill="#C7FF4D" />
                <circle cx="100" cy="180" r="3.5" fill="#14F1D9" />
                <circle cx="160" cy="100" r="3.5" fill="#7CEEFF" />
                <circle cx="40" cy="100" r="3.5" fill="#C7FF4D" />

                {/* Custom Gradient Definitions inside the SVG context */}
                <defs>
                  <linearGradient id="crystalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C7FF4D" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#14F1D9" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="crystalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7CEEFF" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#C7FF4D" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}

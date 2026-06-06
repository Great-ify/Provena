/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Scan, ShieldAlert, Binary } from 'lucide-react';
import ComingSoonBadge from './ComingSoonBadge';

export default function ScannerHero() {
  return (
    <div className="relative text-center py-10 md:py-16 space-y-8 overflow-hidden select-none" id="scanner-hero">
      
      {/* Background neon ambient glowing halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#14F1D9]/8 opacity-30 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C7FF4D]/5 opacity-20 blur-[120px] pointer-events-none" />

      {/* Futuristic floating container badge */}
      <ComingSoonBadge />

      {/* Main Title & Description */}
      <div className="max-w-3xl mx-auto space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-3xl md:text-5xl font-display font-black text-white leading-none tracking-tight"
        >
          AI Provenance <span className="bg-gradient-to-r from-[#C7FF4D] via-[#14F1D9] to-[#7CEEFF] bg-clip-text text-transparent">Scanner</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-sm md:text-base text-[#98A2B3] max-w-2xl mx-auto leading-relaxed font-sans"
        >
          Advanced AI-powered authenticity analysis, ownership verification, and similarity detection are currently under development. 
          The AI Scanner will help creators identify potential infringements, duplicate content, and ownership conflicts across digital ecosystems.
        </motion.p>
      </div>

      {/* Apple-vision-pro style central interactive holographic orb/mesh projection */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-48 h-48 md:w-56 md:h-56 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#161a22]/80 to-[#10131a] border border-[#262B36]/60 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden mt-8"
      >
        {/* Revolving laser radar sweeping effect line using CSS */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,transparent_49%,rgba(199,255,77,0.15)_50%,transparent_52%)] before:animate-[sweep_4s_linear_infinite]" />

        {/* Orbit ring 1 */}
        <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#14F1D9]/20 animate-[spin_20s_linear_infinite]" />
        
        {/* Orbit ring 2 */}
        <div className="absolute w-[60%] h-[60%] rounded-full border border-double border-[#C7FF4D]/10 animate-[spin_10s_linear_infinite_reverse]" />

        {/* Center icon */}
        <div className="relative flex flex-col items-center justify-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C7FF4D]/15 to-[#14F1D9]/15 border border-[#C7FF4D]/40 flex items-center justify-center text-[#C7FF4D] shadow-[0_0_20px_rgba(199,255,77,0.2)] group-hover:scale-105 transition-transform duration-500">
            <Scan className="w-8 h-8 text-[#C7FF4D]" />
          </div>
          <span className="text-[10px] font-sans font-bold tracking-wider text-[#98A2B3]">AI Scanner</span>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes sweep {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
          }
        `}} />
      </motion.div>
    </div>
  );
}

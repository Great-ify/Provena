/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function ComingSoonBadge() {
  return (
    <div className="flex justify-center select-none" id="scanner-coming-soon-badge">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7FF4D]/30 bg-[#C7FF4D]/5 hover:bg-[#C7FF4D]/10 backdrop-blur-md transition-all group overflow-hidden"
      >
        {/* Shimmer effect background */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-infinite animate-[shimmer_2s_infinite]" />

        <Sparkles className="w-3.5 h-3.5 text-[#C7FF4D] animate-pulse" />
        <span className="text-[10px] font-mono font-bold text-[#C7FF4D] uppercase tracking-widest leading-none" style={{ letterSpacing: '0.15em' }}>
          AI Core System v2.0 • Coming Soon
        </span>

        {/* CSS shimmer animation keyframes custom inject */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </motion.div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function VerificationHeader() {
  return (
    <div className="text-left space-y-2 mb-8 select-none" id="verify-header-section">
      <motion.span 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xs font-mono text-[#C7FF4D] uppercase tracking-[0.15em] block font-extrabold"
      >
        Independent Attestation Keyway
      </motion.span>
      
      <motion.h1 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-manrope font-bold text-[#F5F7FA] tracking-tight"
      >
        Verification Portal
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xs text-[#98A2B3] font-manrope max-w-xl font-medium"
      >
        Verify the authenticity of any work by querying decentralized mainnet registers and Walrus blob indices.
      </motion.p>
    </div>
  );
}

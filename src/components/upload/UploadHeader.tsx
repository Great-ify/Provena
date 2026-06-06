/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface UploadHeaderProps {
  title?: string;
  description?: string;
}

export default function UploadHeader({
  title = "Upload & Seal",
  description = "Secure your creative work in 4 simple steps."
}: UploadHeaderProps) {
  return (
    <div className="space-y-1.5 text-left mb-8" id="upload-header-cnt">
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xs font-mono text-[#C7FF4D] uppercase tracking-widest font-extrabold"
        style={{ letterSpacing: '0.15em' }}
      >
       
      </motion.p>
      
      <motion.h1
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-3xl md:text-4xl font-display font-black text-white tracking-tight"
      >
        {title}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm text-[#98A2B3] font-sans"
      >
        {description}
      </motion.p>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Lock, Cpu, Eye, ShoppingCart } from 'lucide-react';
import { ProvenanceAsset } from '../../types';
import VerifiedBadge from './VerifiedBadge';

interface AssetCardProps {
  asset: ProvenanceAsset;
  onLicense: (asset: ProvenanceAsset) => void;
  key?: string;
}

export default function AssetCard({ asset, onLicense }: AssetCardProps) {
  // Safe image fallback
  const fallbackUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop";
  const displayImage = asset.imageUrl || fallbackUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#10131A]/85 border border-[#262B36] rounded-2xl p-4 flex flex-col justify-between gap-5 hover:border-[#C7FF4D]/45 hover:shadow-[0_0_30px_rgba(199,255,77,0.06)] transition-all duration-300 relative group overflow-hidden select-none text-left"
    >
      {/* Absolute Glow Background Spot */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#14F1D9]/0 via-[#C7FF4D]/0 to-[#C7FF4D]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="space-y-4">
        
        {/* SECTION 1: ARTWORK PREVIEW WITH FLOATING VERIFICATION BADGES */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#07090D] border border-[#262B36] flex flex-col justify-end">
          {/* Static design grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40 z-0" />
          
          <img 
            src={displayImage} 
            alt={asset.title} 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none z-10"
          />

          {/* Glowing blue laser lines during hover mimicking deep scans */}
          <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C7FF4D]/60 to-transparent top-0 opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 ease-in-out pointer-events-none z-20" />

          {/* Floating tags */}
          <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center">
            <span className="text-[8px] bg-black/75 backdrop-blur-md border border-[#262B36] text-[#98A2B3] py-0.5 px-1.5 rounded uppercase tracking-wider font-semibold font-mono">
              {asset.licenseType ? asset.licenseType.replace(/_/g, " ") : "COMMERCIAL_USE"}
            </span>
            <VerifiedBadge />
          </div>

          {/* Vignette Overlay grad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none z-15" />

          {/* Interactive view icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <span className="p-2.5 bg-black/60 rounded-full border border-[#C7FF4D]/30 text-[#C7FF4D] drop-shadow-[0_0_10px_rgba(199,255,77,0.3)]">
              <Eye className="w-4 h-4" />
            </span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex justify-between items-center text-[7px] font-mono text-white/50">
            <span>SUI CONSENSUS SECURED</span>
            <span>PROVENA INDEX 259</span>
          </div>
        </div>

        {/* SECTION 2: TITLE & DESCRIPTION */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-manrope font-extrabold text-[#F5F7FA] text-sm tracking-tight truncate group-hover:text-[#C7FF4D] transition-colors flex-1 mr-2">
              {asset.title}
            </h3>
            <span className="text-[10px] text-[#C7FF4D] font-mono font-bold tracking-tight">
              {asset.originalityScore}% Original
            </span>
          </div>
          <p className="text-xs text-[#98A2B3] leading-relaxed line-clamp-2 h-8 font-manrope">
            {asset.description || "Decentralized creative asset stamped with cryptographic integrity attributes on the SUI blockchain."}
          </p>
        </div>

        {/* SECTION 3: CREATOR BANNER INFO */}
        <div className="flex items-center gap-2 border-t border-b border-[#262B36]/50 py-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#161A22] to-[#1D212C] border border-[#262B36] flex items-center justify-center text-[8px] font-mono font-bold text-[#C7FF4D]">
             {asset.creator ? asset.creator.slice(0, 2).toUpperCase() : "AR"}
          </div>
          <div className="flex-1 flex justify-between items-center">
            <span className="text-[10px] text-white/80 font-bold">{asset.creator || "Alex Rivera"}</span>
            <span className="text-[9px] font-mono text-[#555E6B] font-bold tracking-tight truncate max-w-[110px]" title={asset.creatorAddress}>
              {asset.creatorAddress ? `${asset.creatorAddress.slice(0, 5)}...${asset.creatorAddress.slice(-4)}` : "0x8a92...72ffba"}
            </span>
          </div>
        </div>

      </div>

      {/* SECTION 4: LICENSING TRIGGER AND PRICE ACCENT */}
      <div className="flex items-center justify-between border-t border-[#262B36]/40 pt-3 select-none">
        <div className="text-left font-mono">
          <span className="text-[8px] text-[#555E6B] uppercase font-bold block tracking-wider">License fee</span>
          <p className="text-sm font-black text-white leading-none mt-0.5">{asset.licensePriceSui || 150} SUI</p>
        </div>

        <button
          type="button"
          onClick={() => onLicense(asset)}
          className="h-8 px-3.5 bg-[#161A22] hover:bg-[#C7FF4D] text-[#C7FF4D] hover:text-[#07090D] border border-[#C7FF4D]/35 hover:border-[#C7FF4D] transition-all duration-300 font-manrope font-bold text-[10.5px] rounded-lg tracking-wide flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <ShoppingCart className="w-3 h-3 shrink-0" />
          <span>License Rights</span>
        </button>
      </div>

    </motion.div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle } from 'lucide-react';
import VerificationQRCode from './VerificationQRCode';
import CertificateMetadata from './CertificateMetadata';
import VerificationBadge from './VerificationBadge';

interface CertificateCardProps {
  id: string;
  title: string;
  creator: string;
  creatorAddress?: string;
  ownerAddress?: string;
  sealedOn: string;
  network?: string;
  walrusBlobId: string;
  suiTxHash: string;
  sha256Hash: string;
  signatureName?: string;
  thumbnailUrl?: string;
}

export default function CertificateCard({
  id,
  title,
  creator,
  creatorAddress = "0x892a...e911",
  ownerAddress = "0x892a34bc...e9114b7e",
  sealedOn,
  network = "Sui",
  walrusBlobId,
  suiTxHash,
  sha256Hash,
  signatureName = "Alex Rivera",
  thumbnailUrl
}: CertificateCardProps) {
  // Use a stunning emerald green/glowing topographically appropriate unsplash image to match reference UI color palette.
  const visualArtUrl = thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, boxShadow: "0 0 45px rgba(199,255,77,0.12), 0 0 80px rgba(199,255,77,0.06)" }}
      className="relative w-full rounded-3xl p-6 md:p-8 overflow-hidden font-manrope select-none transition-all duration-300"
      style={{
        background: "rgba(12, 16, 22, 0.85)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(199, 255, 77, 0.18)",
        boxShadow: "0 0 30px rgba(199,255,77,0.08), 0 0 60px rgba(199,255,77,0.04), inset 0 0 0 1px rgba(199,255,77,0.08)"
      }}
      id="certificate-collectible-deed"
    >
      {/* Decorative ultra-thin border highlight line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C7FF4D]/30 to-transparent pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* ==================== LEFT AREA (Artwork preview & Signature) ==================== */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Framed collectible presentation box */}
          <div className="relative aspect-square w-full rounded-[14px] overflow-hidden border border-[#262B36] group shadow-[0_0_20px_rgba(199,255,77,0.05)]">
            <img 
              src={visualArtUrl} 
              alt={title || "Secured Asset Matrix"} 
              className="w-full h-full object-cover transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-105 select-none brightness-[0.88]"
              referrerPolicy="no-referrer"
            />
            {/* Soft shadow depth cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090D]/50 via-transparent to-transparent opacity-80" />
            
            {/* Top right subtle badge overlay */}
            <div className="absolute top-3 right-3 bg-[#07090D]/85 border border-[#C7FF4D]/25 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium text-[#D9FF6B] uppercase tracking-wider backdrop-blur-md">
              Verified Original
            </div>
          </div>

          {/* Verification note & digital legal sign-off section */}
          <div className="space-y-4 pt-1">
            <p className="text-[11px] text-[#98A2B3] font-manrope leading-relaxed max-w-sm text-left">
              This certificate proves the ownership and originality of the sealed work.
            </p>

            <div className="flex items-end justify-between border-t border-[#1C1F26]/60 pt-3 text-left">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#555E6B] font-bold block">
                  AUTHORIZED OFFICER
                </span>
                <span className="text-[#F5F7FA] text-xs font-semibold font-manrope block">
                  {creator}
                </span>
              </div>

              {/* Dynamic script digital sign-off */}
              <span className="font-signature text-xl text-[#D9FF6B]/70 tracking-wide pr-2 select-all transform rotate-[-3deg]">
                {creator.replace(/\s+/g, '')} Protocol
              </span>
            </div>
          </div>

        </div>

        {/* ==================== RIGHT AREA (Metadata and Verifiers) ==================== */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 pl-0 lg:pl-4">
          
          <div className="space-y-6">
            
            {/* Title Block with premium octagonal medallion icon aligned beautifully */}
            <div className="flex items-center gap-4 text-left border-b border-[#1C1F26]/60 pb-5">
              
              {/* Ornate Octagonal Certificate Seal Medallion aligned left of title */}
              <div className="relative shrink-0 w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#C7FF4D]" fill="none">
                  {/* Subtle outer custom polygon resembling high wealth deed seals */}
                  <polygon 
                    points="50,5 85,15 95,50 85,85 50,95 15,85 5,50 15,15" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="opacity-90"
                    style={{ filter: "drop-shadow(0px 0px 5px rgba(199,255,77,0.35))" }}
                  />
                  <polygon 
                    points="50,15 78,25 85,50 78,75 50,85 22,75 15,50 22,25" 
                    stroke="#14F1D9" 
                    strokeWidth="1" 
                    strokeOpacity="0.6"
                  />
                  <circle cx="50" cy="50" r="14" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
                </svg>
                {/* Embedded Award inside seal */}
                <Award className="w-4 h-4 text-[#C7FF4D] absolute inset-0 m-auto" />
              </div>

              <div className="space-y-0.5">
                {/* Title styled precisely to specs */}
                <h3 className="text-[24px] font-semibold text-[#F5F7FA] font-manrope tracking-[-0.03em] leading-tight">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <VerificationBadge label="Ownership Confirmed" />
                </div>
              </div>

            </div>

            {/* Custom metadata attribute specifications table list */}
            <CertificateMetadata 
              certificateId={id}
              creator={creator}
              ownerAddress={ownerAddress}
              sealedOn={sealedOn}
              network={network}
              walrusBlobId={walrusBlobId}
              suiTxHash={suiTxHash}
              sha256Hash={sha256Hash || "e3b0c44298fc1c149afbf4c8996fb42407383f5307124ab74235e3b0c442"}
            />

          </div>

          {/* QR Verification matching spec bottom-right (or bottom-left) container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2.5">
            <div className="flex justify-start select-all bg-[#0C1016]/45 p-1.5 rounded-xl border border-[#1C212A]">
              <VerificationQRCode />
            </div>

            {/* View on Suiscan blockchain explorer action */}
            {suiTxHash && !suiTxHash.startsWith('sim-') && !suiTxHash.startsWith('pending') && (
              <a
                href={network.toLowerCase().includes('testnet') 
                  ? `https://testnet.suivision.xyz/txblock/${suiTxHash}` 
                  : `https://suivision.xyz/txblock/${suiTxHash}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#C7FF4D] text-[#C7FF4D] hover:bg-[#C7FF4D]/10 active:scale-[0.98] transition-all font-semibold font-manrope text-[12px] uppercase tracking-wider"
                id="view-suiscan-btn"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#14F1D9] animate-pulse" />
                View On Suiscan
              </a>
            )}
          </div>

        </div>

      </div>

    </motion.div>
  );
}


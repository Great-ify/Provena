/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import AuthenticityBadge from './AuthenticityBadge';
import VerificationMetadata from './VerificationMetadata';
import { useNetwork } from '../../context/NetworkContext';

export interface VerifiedRecord {
  title: string;
  creator: string;
  sealedOn: string;
  network: string;
  certificateId: string;
  walrusBlobId: string;
  transactionId: string;
  imageUrl?: string;
  status: 'Verified' | 'Pending' | 'Failed' | 'Authentic' | 'Ownership Confirmed';
}

interface VerificationResultProps {
  isVerifying: boolean;
  hasSearched: boolean;
  matchedRecord: VerifiedRecord | null;
  searchQuery: string;
}

export default function VerificationResult({
  isVerifying,
  hasSearched,
  matchedRecord,
  searchQuery
}: VerificationResultProps) {
  const { network } = useNetwork();
  // 1. Loading active lookup status
  if (isVerifying) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#161A22]/30 border border-[#262B36]/50 rounded-2xl p-12 text-center space-y-4 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[220px]"
        id="lookup-loading-spinner"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#C7FF4D]/10 rounded-full blur-[20px] animate-pulse" />
          <RefreshCw className="w-8 h-8 text-[#C7FF4D] animate-spin relative z-10" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-mono text-[#C7FF4D] uppercase tracking-widest font-extrabold animate-pulse">Running Decentralized Consensus Audits...</p>
          <p className="text-[11px] text-[#98A2B3] max-w-xs mx-auto">Verifying cryptographic hash anchors against the Provena on-chain registry.</p>
        </div>
      </motion.div>
    );
  }

  // 2. Initial state - Wait for query entry
  if (!hasSearched) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-[#262B36]/40 bg-[#161A22]/20 rounded-2xl p-10 text-center space-y-3 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[160px] select-none"
        id="awaiting-search-state"
      >
        <FileText className="w-7 h-7 text-[#555E6B] opacity-[0.45]" />
        <div>
          <h3 className="text-xs text-[#98A2B3] font-manrope uppercase tracking-wider font-semibold">Provenance Ledger Standby</h3>
          <p className="text-[11px] text-[#555E6B] font-manrope mt-1">Enter a secure object hash or blob reference above to invoke on-chain verification.</p>
        </div>
      </motion.div>
    );
  }

  // 3. No match found for the spec searchQuery
  if (!matchedRecord) {
    const formattedQuery = searchQuery.length > 32 
      ? `${searchQuery.substring(0, 16)}...${searchQuery.substring(searchQuery.length - 12)}` 
      : searchQuery;

    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden p-[1px] select-text text-left"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(38, 43, 54, 0.4) 30%, rgba(38, 43, 54, 0.1) 100%)"
        }}
        id="unverified-matching-alert"
      >
        <div 
          className="w-full h-full bg-[#161a22]/85 backdrop-blur-md rounded-2xl p-5 md:p-7 space-y-6"
          style={{
            boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.95)'
          }}
        >
          {/* Alert Header Badge & Label */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#262B36]/65">
            <div>
              <span className="text-[10px] font-mono text-[#E53E3E] uppercase tracking-widest block font-extrabold">Crypto Audit Fail</span>
              <h3 className="text-lg md:text-xl font-bold font-manrope text-[#F5F7FA] mt-0.5 tracking-tight">
                Cryptographic Target Unresolved
              </h3>
            </div>
            
            {/* Unverified badge capsule */}
            <div 
              className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full text-xs font-manrope font-semibold tracking-wide text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)] select-none"
              id="verification-failure-pill"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Unverified / Void</span>
            </div>
          </div>

          {/* Diagnostic specifications column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-5 pt-1">
            
            <div className="flex flex-col space-y-1 pb-1 border-b border-[#262B36]/40">
              <span className="text-[#98A2B3] text-[10px] md:text-[11px] font-manrope uppercase tracking-[0.12em] block">
                Queried Signature Input
              </span>
              <span className="text-[12px] md:text-[13px] font-semibold font-mono text-red-300 truncate" title={searchQuery}>
                {formattedQuery}
              </span>
            </div>

            <div className="flex flex-col space-y-1 pb-1 border-b border-[#262B36]/40">
              <span className="text-[#98A2B3] text-[10px] md:text-[11px] font-manrope uppercase tracking-[0.12em] block">
                Registry Index Match
              </span>
              <span className="text-[13px] md:text-[14px] font-extrabold font-manrope text-white/50">
                0 Records found
              </span>
            </div>

            <div className="flex flex-col space-y-1 pb-1 border-b border-[#262B36]/40">
              <span className="text-[#98A2B3] text-[10px] md:text-[11px] font-manrope uppercase tracking-[0.12em] block">
                Audited Block Network
              </span>
              <span className="text-[13px] md:text-[14px] font-semibold font-manrope text-[#98A2B3]">
                Sui {network} (Block 82,912,944 to Tip)
              </span>
            </div>

            <div className="flex flex-col space-y-1 pb-1 border-b border-[#262B36]/40">
              <span className="text-[#98A2B3] text-[10px] md:text-[11px] font-manrope uppercase tracking-[0.12em] block">
                Walrus Blob Status
              </span>
              <span className="text-[13px] md:text-[14px] font-semibold font-manrope text-[#98A2B3]">
                Shard Index Empty
              </span>
            </div>

          </div>

          {/* Diagnostic warnings log */}
          <div className="bg-[#0D0F14] border border-[#262B36]/50 rounded-xl p-4 text-left font-mono text-[11px] text-red-200/70 space-y-1 select-none">
            <p className="text-red-400 font-bold border-b border-red-500/10 pb-1.5 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
              <span>●</span> Cryptographic Security Warning
            </p>
            <p>Verification returned zero matched integrity proofs. The submitted target key does not point to any registered seal, on-chain mint asset, or valid metadata block. Original creator signatures cannot be attested.</p>
          </div>

          {/* Bottom Alert bar */}
          <div className="pt-2 flex items-center gap-2.5 select-none">
            <div className="p-1 bg-red-400/10 rounded-full border border-red-400/20">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            </div>
            <p className="text-[11px] md:text-xs font-manrope font-semibold text-red-400 leading-tight">
              Security Notice: This work is unregistered and currently unverified.
            </p>
          </div>

        </div>
      </motion.div>
    );
  }

  // 4. Success - Cryptographic authenticity verified!
  const defaultArtworkUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden p-[1px] select-none"
      style={{
        background: "linear-gradient(135deg, rgba(199, 255, 77, 0.25) 0%, rgba(38, 43, 54, 0.4) 30%, rgba(38, 43, 54, 0.2) 100%)"
      }}
      id="matched-verification-result"
    >
      <div 
        className="w-full h-full bg-[#161a22]/85 backdrop-blur-md rounded-2xl p-5 md:p-7 flex flex-col lg:flex-row items-stretch gap-6 md:gap-8"
        style={{
          boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.95)'
        }}
      >
        {/* Left: Artwork Preview Image Frame */}
        <div className="flex justify-center select-none shrink-0" id="result-artwork-container">
          <div className="w-[140px] md:w-[155px] aspect-[4/5] rounded-xl overflow-hidden bg-[#07090D] border border-[#262B36] relative group shadow-2xl flex flex-col justify-end">
            
            {/* Fallback geometric vectors if no image */}
            <div className="absolute inset-0 bg-[#07090D] flex items-center justify-center z-0">
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#C7FF4D]/10">
                <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="none" stroke="currentColor" strokeWidth="1" />
                <polygon points="50,25 75,40 75,70 50,85 25,70 25,40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>

            {/* High visual quality representation */}
            <img 
              src={matchedRecord.imageUrl || defaultArtworkUrl} 
              alt={matchedRecord.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 select-none z-10 pointer-events-none"
            />

            {/* Glowing matrix scanner line representing AI fingerprint scan */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C7FF4D]/70 to-transparent top-0 animate-[bounce_3s_infinite] pointer-events-none z-20" />
            
            {/* Dark bottom overlay vignette for artwork labels */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-15" />
            
            {/* Miniature decorative coordinates overlay */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex justify-between items-center select-none pointer-events-none">
              <span className="font-mono text-[7px] text-[#C7FF4D] font-extrabold tracking-wider bg-black/60 px-1 py-0.5 rounded border border-[#C7FF4D]/25">
                SECURED ID
              </span>
              <span className="font-mono text-[6px] text-white/50">
                PROV_26
              </span>
            </div>
          </div>
        </div>

        {/* Right: Verification Metadata List & Status pill */}
        <div className="flex-1 flex flex-col justify-between py-1 text-left">
          <div className="space-y-4">
            
            {/* Title & Authentic Status Shield */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#262B36]/55">
              <div>
                <span className="text-[10px] font-mono text-[#555E6B] uppercase tracking-wider block font-bold">Anchored Master Record</span>
                <h3 className="text-xl md:text-2xl font-black font-manrope text-[#F5F7FA] mt-0.5 tracking-tight">
                  {matchedRecord.title}
                </h3>
              </div>
              <AuthenticityBadge status={matchedRecord.status} />
            </div>

            {/* Specifications Matrix Metadata Grid */}
            <VerificationMetadata 
              title={matchedRecord.title}
              creator={matchedRecord.creator}
              sealedOn={matchedRecord.sealedOn}
              network={matchedRecord.network}
              certificateId={matchedRecord.certificateId}
              walrusBlobId={matchedRecord.walrusBlobId}
              transactionId={matchedRecord.transactionId}
            />

          </div>

          {/* Authentic banner details */}
          <div className="mt-6 pt-4 border-t border-[#262B36]/60 flex items-center gap-2.5 select-none text-left">
            <div className="p-1 bg-[#C7FF4D]/10 rounded-full border border-[#C7FF4D]/20 animate-pulse">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7FF4D]" />
            </div>
            <p className="text-[11px] md:text-xs font-manrope font-semibold text-[#C7FF4D] tracking-wide leading-tight drop-shadow-[0_0_10px_rgba(199,255,77,0.2)]">
              This work is authentic and verified on-chain.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

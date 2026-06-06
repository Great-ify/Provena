/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Search, 
  ArrowUpDown, 
  Copy, 
  Check, 
  ExternalLink, 
  Calendar, 
  Hash, 
  Clock, 
  User, 
  Eye, 
  ShieldCheck, 
  Database,
  FileText
} from 'lucide-react';
import { ProvenanceAsset } from '../../types';

interface CertificateRegistryProps {
  assets: ProvenanceAsset[];
  onSelectAsset: (asset: ProvenanceAsset) => void;
  networkName: string;
}

export default function CertificateRegistry({ assets, onSelectAsset, networkName }: CertificateRegistryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: 'hash' | 'tx' | null }>({});

  const handleCopyText = (id: string, text: string, type: 'hash' | 'tx') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopyFeedback(prev => ({ ...prev, [id]: type }));
    setTimeout(() => {
      setCopyFeedback(prev => ({ ...prev, [id]: null }));
    }, 1800);
  };

  // Filter & Sort
  const processedAssets = useMemo(() => {
    let list = [...assets];

    // Filter by query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(asset => 
        asset.title.toLowerCase().includes(q) || 
        asset.id.toLowerCase().includes(q) ||
        (asset.sha256Hash && asset.sha256Hash.toLowerCase().includes(q))
      );
    }

    // Sort by criterion
    if (sortBy === 'newest') {
      list.sort((a, b) => {
        const timeA = a.mintedTimestamp ? new Date(a.mintedTimestamp).getTime() : 0;
        const timeB = b.mintedTimestamp ? new Date(b.mintedTimestamp).getTime() : 0;
        return timeB - timeA;
      });
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => {
        const timeA = a.mintedTimestamp ? new Date(a.mintedTimestamp).getTime() : 0;
        const timeB = b.mintedTimestamp ? new Date(b.mintedTimestamp).getTime() : 0;
        return timeA - timeB;
      });
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [assets, searchQuery, sortBy]);

  // ISO to human string formatting
  const formatDateString = (timestamp?: string) => {
    if (!timestamp) return 'Unminted...';
    try {
      const d = new Date(timestamp);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'June 4, 2026';
    }
  };

  return (
    <div className="space-y-6 text-left select-none" id="certificate-registry-view">
      
      {/* Header and Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262B36]/30 pb-5">
        <div>
          <h2 className="text-xl font-display font-black text-[#F5F7FA] tracking-tight">Sovereign Registry Archive</h2>
          <p className="text-xs font-mono text-[#98A2B3] uppercase tracking-wider mt-1">Immutable credential deeds matching network: Sui {networkName}</p>
        </div>

        {/* Search, Sort, Stats Panel */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#555E6B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID or digest..."
              className="w-full bg-[#10131A] border border-[#262B36] font-sans text-xs text-[#F5F7FA] rounded-xl pl-9 pr-4 py-2.5 focus:border-[#C7FF4D] focus:outline-none transition-all"
            />
          </div>

          {/* Sort selector dropdown */}
          <div className="relative shrink-0 flex items-center bg-[#10131A] border border-[#262B36] rounded-xl px-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#555E6B] ml-1.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#98A2B3] hover:text-[#F5F7FA] text-xs font-mono uppercase font-bold py-2.5 pl-1.5 pr-8 focus:outline-none cursor-pointer border-0 transition-colors"
              style={{ appearance: 'none' }}
            >
              <option value="newest" className="bg-[#10131A]">Newest Seals</option>
              <option value="oldest" className="bg-[#10131A]">Oldest Seals</option>
              <option value="name" className="bg-[#10131A]">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {processedAssets.length === 0 ? (
        /* Dynamic Empty state */
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#10131A] border border-[#262B36] rounded-2xl p-12 text-center space-y-4 max-w-xl mx-auto"
        >
          <div className="w-12 h-12 rounded-xl bg-[#262B36]/25 border border-[#262B36]/50 flex items-center justify-center mx-auto">
            <Award className="w-5.5 h-5.5 text-[#555E6B]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#F5F7FA]">No Certificates Found</h3>
            <p className="text-xs text-[#98A2B3] leading-relaxed uppercase font-mono">
              There are no sealed original digital objects inside active partition {networkName}.
            </p>
          </div>
          {networkName === 'Sandbox' && (
            <p className="text-[10px] text-[#555E6B] font-mono leading-relaxed">
              *Try switching setting environments or complete a file signature mint loop.
            </p>
          )}
        </motion.div>
      ) : (
        /* Registry Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {processedAssets.map((asset, index) => {
              const imagePreview = asset.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
              const isSealed = asset.status === 'Sealed';
              const truncatedHash = asset.sha256Hash 
                ? `${asset.sha256Hash.slice(0, 10)}...${asset.sha256Hash.slice(-8)}` 
                : 'Unresolved hex...';
              
              const txHashPreview = asset.suiTxHash 
                ? `${asset.suiTxHash.slice(0, 8)}...${asset.suiTxHash.slice(-6)}` 
                : 'Pending validation...';

              const isHashCopied = copyFeedback[asset.id] === 'hash';
              const isTxCopied = copyFeedback[asset.id] === 'tx';

              return (
                <motion.div
                  key={asset.id}
                  layoutId={asset.id}
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2), ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#10131A] border border-[#262B36] rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg group hover:border-[#C7FF4D]/35 transition-all text-left"
                >
                  
                  {/* Aspect Card Header Artwork Image */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-[#262B36]">
                    <img 
                      src={imagePreview} 
                      alt={asset.title} 
                      className="w-full h-full object-cover brightness-[0.80] group-hover:scale-102 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10131A] via-transparent to-transparent opacity-80" />
                    
                    {/* Top left status badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${
                        isSealed 
                          ? 'bg-[#C7FF4D]/10 border border-[#C7FF4D]/30 text-[#C7FF4D]' 
                          : 'bg-yellow-400/10 border border-yellow-400/30 text-yellow-500'
                      }`}>
                        {isSealed ? 'Authentic' : 'Draft'}
                      </span>
                    </div>

                    {/* Network indicator badge top-right */}
                    <div className="absolute top-3 right-3 bg-[#07090D]/80 border border-[#262B36] px-2 py-0.5 rounded-full text-[9px] font-mono font-medium text-[#98A2B3] uppercase tracking-wider backdrop-blur-sm">
                      {asset.licensingType || 'Standard License'}
                    </div>

                    {/* Bottom-left display name */}
                    <div className="absolute bottom-2.5 left-3">
                      <p className="text-[9px] font-mono text-[#C7FF4D] uppercase font-bold tracking-tight">Object Credential ID</p>
                      <p className="text-[10px] font-mono text-[#F5F7FA] font-bold block">{asset.id}</p>
                    </div>
                  </div>

                  {/* Body Details Area */}
                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold font-display text-[#F5F7FA] tracking-tight truncate" title={asset.title}>
                        {asset.title}
                      </h3>

                      {/* Diagnostic details section */}
                      <div className="space-y-2 text-[11px] font-mono border-b border-[#262B36]/30 pb-3">
                        <div className="flex justify-between items-center text-[#98A2B3]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            SEALED ON:
                          </span>
                          <span className="text-right text-[#F5F7FA]">{formatDateString(asset.mintedTimestamp)}</span>
                        </div>

                        <div className="flex justify-between items-center text-[#98A2B3]">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            OWNER ADDRESS:
                          </span>
                          <span className="text-right text-[#F5F7FA] tracking-wider truncate" style={{ maxWidth: '140px' }} title={asset.ownerWallet || asset.creatorAddress}>
                            {asset.ownerWallet 
                              ? `${asset.ownerWallet.slice(0, 6)}...${asset.ownerWallet.slice(-4)}`
                              : `${asset.creatorAddress?.slice(0, 6)}...${asset.creatorAddress?.slice(-4)}`
                            }
                          </span>
                        </div>

                        {/* SHA256 copy bar */}
                        <div className="flex justify-between items-center text-[#98A2B3] pt-0.5">
                          <span className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            SHA256:
                          </span>
                          <div className="flex items-center gap-1 text-[#F5F7FA] font-bold">
                            <span className="truncate">{truncatedHash}</span>
                            <button
                              onClick={() => handleCopyText(asset.id, asset.sha256Hash || '', 'hash')}
                              disabled={!asset.sha256Hash}
                              className="text-[#555E6B] hover:text-[#C7FF4D] p-0.5 rounded hover:bg-[#161a22] transition-colors cursor-pointer"
                              title="Copy SHA256"
                            >
                              {isHashCopied ? <Check className="w-3 h-3 text-[#C7FF4D]" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>

                        {/* Transaction copy bar */}
                        <div className="flex justify-between items-center text-[#98A2B3]">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            TX DIGEST:
                          </span>
                          <div className="flex items-center gap-1 text-[#C7FF4D] font-bold">
                            <span className="truncate">{txHashPreview}</span>
                            <button
                              onClick={() => handleCopyText(asset.id, asset.suiTxHash || '', 'tx')}
                              disabled={!asset.suiTxHash}
                              className="text-[#555E6B] hover:text-[#C7FF4D] p-0.5 rounded hover:bg-[#161a22] transition-colors cursor-pointer"
                              title="Copy Transaction Hash"
                            >
                              {isTxCopied ? <Check className="w-3 h-3 text-[#C7FF4D]" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Action Footer */}
                    <div className="flex gap-2.5 pt-1">
                      <button
                        onClick={() => onSelectAsset(asset)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C7FF4D] hover:bg-[#D4FF70] text-[#07090D] font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>

                      {asset.suiTxHash && !asset.suiTxHash.startsWith('sim-') && !asset.suiTxHash.startsWith('pending') && (
                        <a
                          href={networkName.toLowerCase().includes('testnet')
                            ? `https://testnet.suivision.xyz/txblock/${asset.suiTxHash}`
                            : `https://suivision.xyz/txblock/${asset.suiTxHash}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-2 rounded-lg border border-[#262B36] hover:border-[#555E6B] text-[#98A2B3] hover:text-[#F5F7FA] flex items-center justify-center transition-colors shrink-0"
                          title="Open in On-Chain Ledger Explorer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}

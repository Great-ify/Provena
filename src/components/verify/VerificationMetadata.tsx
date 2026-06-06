/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface VerificationMetadataProps {
  title: string;
  creator: string;
  sealedOn: string;
  network: string;
  certificateId: string;
  walrusBlobId?: string;
  transactionId?: string;
}

export default function VerificationMetadata({
  title,
  creator,
  sealedOn,
  network,
  certificateId,
  walrusBlobId = "bafkre778auv...7vu32",
  transactionId = "0x8f4d929be65839281a8bc47382d9bcbe817dc9f02931bc11a9fbc6293cb805ff"
}: VerificationMetadataProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const metadataRows = [
    { label: 'Artwork', value: title, raw: title, isCrypto: false },
    { label: 'Creator', value: creator, raw: creator, isCrypto: false },
    { label: 'Sealed On', value: sealedOn, raw: sealedOn, isCrypto: false },
    { label: 'Network', value: network, raw: network, isCrypto: false },
    { 
      label: 'Certificate ID', 
      value: certificateId.length > 20 ? `${certificateId.substring(0, 10)}...${certificateId.substring(certificateId.length - 8)}` : certificateId, 
      raw: certificateId, 
      isCrypto: true 
    },
    { 
      label: 'Walrus ID', 
      value: walrusBlobId.length > 20 ? `${walrusBlobId.substring(0, 10)}...${walrusBlobId.substring(walrusBlobId.length - 8)}` : walrusBlobId, 
      raw: walrusBlobId, 
      isCrypto: true 
    },
    { 
      label: 'Transaction Digest', 
      value: transactionId.length > 20 ? `${transactionId.substring(0, 14)}...${transactionId.substring(transactionId.length - 10)}` : transactionId, 
      raw: transactionId, 
      isCrypto: true 
    }
  ];

  return (
    <div className="w-full font-manrope text-left select-text" id="verification-metadata-grid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-5 border-t border-[#262B36]/60 pt-5 mt-4">
        {metadataRows.map((row) => (
          <div 
            key={row.label} 
            className="flex flex-col space-y-1 pb-1 border-b border-[#262B36]/40 group transition-colors hover:border-[#C7FF4D]/20 text-left"
          >
            <span className="text-[#98A2B3] text-[10px] md:text-[11px] font-manrope uppercase tracking-[0.12em] block">
              {row.label}
            </span>

            <div className="flex items-center gap-2 max-w-full overflow-hidden">
              <span 
                className={`text-[13px] md:text-[14px] font-semibold text-[#F5F7FA] font-manrope truncate select-all ${
                  row.isCrypto ? 'text-[#C7FF4D]/90 font-mono text-[12px]' : ''
                }`}
                title={row.raw}
              >
                {row.value}
              </span>

              <button
                type="button"
                onClick={() => handleCopy(row.raw, row.label)}
                className="opacity-0 group-hover:opacity-100 text-[#555E6B] hover:text-[#C7FF4D] transition-opacity cursor-pointer p-0.5 shrink-0"
                title={`Copy ${row.label}`}
              >
                {copiedField === row.label ? (
                  <Check className="w-3 h-3 text-[#C7FF4D]" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CertificateMetadataProps {
  certificateId: string;
  creator: string;
  ownerAddress: string;
  sealedOn: string;
  network: string;
  walrusBlobId: string;
  suiTxHash: string;
  sha256Hash: string;
}

export default function CertificateMetadata({
  certificateId,
  creator,
  ownerAddress,
  sealedOn,
  network,
  walrusBlobId,
  suiTxHash,
  sha256Hash
}: CertificateMetadataProps) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  const rows = [
    { label: 'Certificate ID', value: certificateId, raw: certificateId, isCrypto: true },
    { label: 'Creator', value: creator, raw: creator, isCrypto: false },
    { label: 'Owner Address', value: ownerAddress, raw: ownerAddress, isCrypto: true },
    { label: 'Sealed On', value: sealedOn, raw: sealedOn, isCrypto: false },
    { label: 'Network', value: network, raw: network, isCrypto: false },
    { label: 'SHA-256 Hash', value: sha256Hash, raw: sha256Hash, isCrypto: true },
    { label: 'Walrus Blob ID', value: walrusBlobId, raw: walrusBlobId, isCrypto: true },
    { label: 'Transaction Digest', value: suiTxHash, raw: suiTxHash, isCrypto: true }
  ];

  return (
    <div className="w-full font-manrope text-left" id="certificate-metadata-panel">
      <div className="flex flex-col space-y-[15px]">
        {rows.map((row) => (
          <div 
            key={row.label} 
            className="flex items-center justify-between pb-2 border-b border-[#1C1F26]/60 group transition-colors"
          >
            {/* Metadata Label - Styled to match spec perfectly */}
            <span className="text-[#98A2B3] text-[11px] font-manrope uppercase tracking-[0.12em] block">
              {row.label}
            </span>

            {/* Metadata Value - Styled to match spec perfectly */}
            <div className="flex items-center gap-2 max-w-[220px] sm:max-w-xs overflow-hidden">
              <span 
                className={`text-[14px] font-medium text-[#F5F7FA] font-manrope select-all truncate ${
                  row.isCrypto ? 'text-[#C7FF4D]/95 font-mono text-[12px]' : ''
                }`}
                title={row.raw}
              >
                {row.value}
              </span>

              {/* Secret Copy Button */}
              <button
                onClick={() => handleCopy(row.raw, row.label)}
                className="opacity-0 group-hover:opacity-100 text-[#555E6B] hover:text-[#C7FF4D] transition-opacity cursor-pointer p-0.5 shrink-0"
                title={`Copy ${row.label}`}
              >
                {copiedLabel === row.label ? (
                  <Check className="w-3.5 h-3.5 text-[#C7FF4D]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


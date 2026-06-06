/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ProvenanceAsset } from '../types';
import CertificateHeader from './certificates/CertificateHeader';
import CertificateViewer from './certificates/CertificateViewer';
import OwnershipTimeline from './certificates/OwnershipTimeline';
import CertificateLayout from './certificates/CertificateLayout';

interface CertificateProps {
  asset: ProvenanceAsset;
  onBack: () => void;
}

export default function CertificatePage({ asset, onBack }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Safe ISO timestamp formatting
  const formattedSealedDate = React.useMemo(() => {
    try {
      const d = new Date(asset.mintedTimestamp);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) + " UTC";
    } catch {
      return "Jun 04, 2026 01:30 PM UTC";
    }
  }, [asset.mintedTimestamp]);

  return (
    <div 
      className="relative min-h-[85vh] w-full rounded-3xl overflow-hidden p-6 md:p-10 text-left space-y-6 text-white transition-all select-none"
      style={{
        background: "radial-gradient(circle at center, rgba(199, 255, 77, 0.06), transparent 55%), #07090D",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.85)"
      }}
      id="certificate-page-container"
    >
      {/* Premium ambient decorative glow behind the certificate card with elegant breathing animations */}
      <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[520px] h-[350px] sm:h-[520px] bg-[rgba(199,255,77,0.05)] rounded-full blur-[110px] pointer-events-none select-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] bg-[rgba(20,241,217,0.03)] rounded-full blur-[130px] pointer-events-none select-none z-0 animate-pulse" style={{ animationDuration: '14s' }} />

      {/* Subtle Noise Texture Overlay to mimic high-end textured paper/film */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-0 select-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Decorative ultra-faint blueprint grid representation to increase perceived certificate fidelity */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none select-none opacity-50 z-0" />

      <div ref={certificateRef} className="relative z-10">
        <CertificateLayout
          header={
            <CertificateHeader 
              onBack={onBack} 
              onPrint={handlePrint}
              userAddress={asset.creatorAddress || "0x892a...e911"}
              walletConnected={true}
            />
          }
          certificateCard={
            <CertificateViewer
              id={asset.id}
              title={asset.title}
              creator={asset.creator}
              creatorAddress={asset.creatorAddress}
              ownerAddress={asset.ownerWallet || asset.creatorAddress}
              sealedOn={formattedSealedDate}
              network="Sui"
              walrusBlobId={asset.walrusBlobId || "bafkre778auvkpwh7gmjym6kpxz2pxq2f5mkeic6st3msstzbytwic7vu32"}
              suiTxHash={asset.suiTxHash || "0x8f4d929be65839281a8bc47382d9bcbe817dc9f02931bc11a9fbc6293cb805ff"}
              sha256Hash={asset.sha256Hash || "e3b0c44298fc1c149afbf4c8996fb42407383f5307124ab74235e3b0c442"}
              signatureName={asset.creator || "Alex Rivera"}
              thumbnailUrl={asset.imageUrl}
            />
          }
          timeline={
            <OwnershipTimeline 
              mintedTimestamp={asset.mintedTimestamp}
            />
          }
        />
      </div>

    </div>
  );
}

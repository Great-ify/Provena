/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import CertificateCard from './CertificateCard';

interface CertificateViewerProps {
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

export default function CertificateViewer({
  id,
  title,
  creator,
  creatorAddress,
  ownerAddress,
  sealedOn,
  network,
  walrusBlobId,
  suiTxHash,
  sha256Hash,
  signatureName,
  thumbnailUrl
 }: CertificateViewerProps) {
  return (
    <div className="w-full h-full flex flex-col justify-stretch" id="certificate-viewer-component">
      <CertificateCard
        id={id}
        title={title}
        creator={creator}
        creatorAddress={creatorAddress}
        ownerAddress={ownerAddress}
        sealedOn={sealedOn}
        network={network}
        walrusBlobId={walrusBlobId}
        suiTxHash={suiTxHash}
        sha256Hash={sha256Hash}
        signatureName={signatureName}
        thumbnailUrl={thumbnailUrl}
      />
    </div>
  );
}

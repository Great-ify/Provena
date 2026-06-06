/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ProvenanceAsset } from '../../types';
import AssetCard from './AssetCard';

interface MarketplaceGridProps {
  assets: ProvenanceAsset[];
  onLicense: (asset: ProvenanceAsset) => void;
}

export default function MarketplaceGrid({ assets, onLicense }: MarketplaceGridProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      id="marketplace-items-grid"
    >
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onLicense={onLicense}
        />
      ))}
    </motion.div>
  );
}

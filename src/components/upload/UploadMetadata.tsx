/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

interface UploadMetadataProps {
  fileName?: string;
  fileSize?: string;
  walrusBlobId?: string;
  network?: string;
  onCancel: () => void;
  showCancel?: boolean;
}

export default function UploadMetadata({
  fileName = "Ocean_Concept.mp4",
  fileSize = "2.45 GB",
  walrusBlobId = "bafkre7...7vu33",
  network = "Sui Testnet",
  onCancel,
  showCancel = true
}: UploadMetadataProps) {
  return (
    <div className="w-full bg-[#0B0D12]/70 border border-[#1C1F26] rounded-2xl p-5 mt-6 select-none" id="upload-metadata-panel">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
        
        {/* Core details mapping columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 flex-1 text-left">
          
          {/* File Name info column */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#555E6B] font-mono uppercase tracking-wider font-bold block">
              File Name
            </span>
            <p className="text-xs text-white font-sans font-bold block truncate max-w-[130px] sm:max-w-none">
              {fileName}
            </p>
          </div>

          {/* File Size info column */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#555E6B] font-mono uppercase tracking-wider font-bold block">
              File Size
            </span>
            <p className="text-xs text-white font-mono font-bold block">
              {fileSize}
            </p>
          </div>

          {/* Walrus Blob ID info column */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#555E6B] font-mono uppercase tracking-wider font-bold block">
              Walrus Blob ID
            </span>
            <p className="text-xs text-[#98A2B3] font-mono font-bold block truncate max-w-[120px] sm:max-w-none" title={walrusBlobId}>
              {walrusBlobId}
            </p>
          </div>

          {/* Network target info column */}
          <div className="space-y-1">
            <span className="text-[10px] text-[#555E6B] font-mono uppercase tracking-wider font-bold block">
              Network
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#C7FF4D]/80 animate-pulse shrink-0" />
              <p className="text-xs text-white font-mono font-bold block">
                {network}
              </p>
            </div>
          </div>

        </div>

        {/* Cancel Action controller */}
        {showCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full md:w-auto bg-[#161A22] hover:bg-[#1C212D] text-[#F5F7FA] border border-[#262B36] hover:border-red-400/30 px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 active:scale-95 leading-none shrink-0"
            id="metadata-cancel-button"
          >
            Cancel
          </button>
        )}

      </div>
    </div>
  );
}

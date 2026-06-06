/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface UploadLayoutProps {
  header: React.ReactNode;
  stepper: React.ReactNode;
  uploadZone: React.ReactNode;
  progressCard: React.ReactNode;
  metadata: React.ReactNode;
  presetsPanel?: React.ReactNode;
}

export default function UploadLayout({
  header,
  stepper,
  uploadZone,
  progressCard,
  metadata,
  presetsPanel
}: UploadLayoutProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-1 py-2 sm:py-4 flex flex-col" id="upload-layout-root-container">
      {/* 1. Header Portion */}
      {header}

      {/* 2. Stepper Ribbon Progress */}
      {stepper}

      {/* 3. Optional Presets Panel (helpful fallback for simulation) */}
      {presetsPanel && (
        <div className="mb-6 w-full">
          {presetsPanel}
        </div>
      )}

      {/* 4. Main Two Column workspace area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full mb-6">
        
        {/* Left Side: Upload Zone */}
        <div className="lg:col-span-7 flex flex-col justify-stretch">
          {uploadZone}
        </div>

        {/* Right Side: Encryption Progress Status */}
        <div className="lg:col-span-5 flex flex-col justify-stretch">
          {progressCard}
        </div>

      </div>

      {/* 5. Footer Specs Metadata and actions */}
      {metadata}
    </div>
  );
}

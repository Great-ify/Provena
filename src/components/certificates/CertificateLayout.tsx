/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CertificateLayoutProps {
  header: React.ReactNode;
  certificateCard: React.ReactNode;
  timeline: React.ReactNode;
}

export default function CertificateLayout({
  header,
  certificateCard,
  timeline
}: CertificateLayoutProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-1 py-2 sm:py-4 flex flex-col" id="cert-layout-root-view">
      
      {/* 2. Top Navigation header portion */}
      {header}

      {/* 3. Splitted layout grid displaying Certificate + Timeline side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8 items-stretch pt-2">
        
        {/* Left Aspect: Certificate Deck (70% width) */}
        <div className="lg:col-span-7 flex flex-col justify-stretch">
          {certificateCard}
        </div>

        {/* Right Aspect: Ownership timeline points tracking list (30% width) */}
        <div className="lg:col-span-3 flex flex-col justify-stretch">
          {timeline}
        </div>

      </div>

    </div>
  );
}

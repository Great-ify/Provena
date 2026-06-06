/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VerificationBadgeProps {
  label?: string;
}

export default function VerificationBadge({
  label = "Ownership Confirmed"
}: VerificationBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-[rgba(199,255,77,0.15)] border border-[rgba(199,255,77,0.25)] px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wide text-[#D9FF6B]" id="verification-badge-container">
      <CheckCircle2 className="w-3 h-3 text-[#D9FF6B] shrink-0" />
      <span>{label}</span>
    </div>
  );
}

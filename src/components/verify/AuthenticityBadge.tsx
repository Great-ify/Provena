/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AuthenticityBadgeProps {
  status?: 'Verified' | 'Pending' | 'Failed' | 'Authentic' | 'Ownership Confirmed';
}

export default function AuthenticityBadge({ status = 'Verified' }: AuthenticityBadgeProps) {
  if (status === 'Failed') {
    return (
      <div 
        className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full text-xs font-manrope font-semibold tracking-wide text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
        id="eligibility-status-capsule-failed"
      >
        <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
        <span>Failed</span>
      </div>
    );
  }

  if (status === 'Pending') {
    return (
      <div 
        className="inline-flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-manrope font-semibold tracking-wide text-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.15)]"
        id="eligibility-status-capsule-pending"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 shrink-0 animate-pulse" />
        <span>Pending</span>
      </div>
    );
  }

  return (
    <div 
      className="inline-flex items-center gap-1.5 bg-[#C7FF4D]/10 border border-[#C7FF4D]/30 px-3 py-1 rounded-full text-xs font-manrope font-semibold tracking-wide text-[#D9FF6B] shadow-[0_0_12px_rgba(199,255,77,0.15)]"
      id="eligibility-status-capsule-verified"
    >
      <CheckCircle className="w-3.5 h-3.5 text-[#C7FF4D] shrink-0" />
      <span>{status}</span>
    </div>
  );
}

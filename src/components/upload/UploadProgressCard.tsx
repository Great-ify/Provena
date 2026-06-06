/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Loader, Sparkles } from 'lucide-react';

export type ProgressState = 'pending' | 'processing' | 'completed';

export interface ProgressStepItem {
  id: string;
  label: string;
  state: ProgressState;
}

interface UploadProgressCardProps {
  progressPercent: number;
  steps: ProgressStepItem[];
  algorithmLabel?: string;
}

export default function UploadProgressCard({
  progressPercent,
  steps,
  algorithmLabel = "AES-256-GCM"
}: UploadProgressCardProps) {
  return (
    <div className="bg-[#0B0D12]/75 border border-[#1C1F26] rounded-3xl p-6 select-none flex flex-col justify-between h-full" id="upload-progress-card">
      <div className="space-y-4 text-left">
        {/* Title & Algorithm identifier */}
        <div>
          <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">
            Encryption Progress
          </h3>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#555E6B] mt-1.5 font-bold">
            <span className="text-[#98A2B3]">{algorithmLabel}</span>
            <span className={`${progressPercent > 0 ? "text-[#C7FF4D]" : "text-[#555E6B]"} font-extrabold`}>
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Dynamic Glowing Progress Bar */}
        <div className="w-full h-[6px] bg-[#161A22] rounded-full overflow-hidden border border-[#262B36]/50">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#C7FF4D] to-[#98A2B3] blur-[0.3px]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ ease: 'easeOut', duration: 0.15 }}
          />
        </div>

        {/* Status list with exquisite spacing */}
        <div className="space-y-[18px] pt-4 border-t border-[#1C1F26]/60">
          {steps.map((step) => {
            return (
              <div 
                key={step.id} 
                className="flex items-center justify-between text-xs font-sans font-medium"
                id={`progress-row-${step.id}`}
              >
                {/* Left: Indicator Icon & Label */}
                <div className="flex items-center gap-3">
                  {step.state === 'completed' && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#C7FF4D]/10">
                      <CheckCircle2 className="w-4 h-4 text-[#C7FF4D]" />
                    </div>
                  )}

                  {step.state === 'processing' && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#C7FF4D]/5 text-yellow-400">
                      <Loader className="w-4 h-4 text-[#C7FF4D] animate-spin" />
                    </div>
                  )}

                  {step.state === 'pending' && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center border border-dashed border-[#262B36] bg-transparent">
                      <Circle className="w-3 h-3 text-[#555E6B] stroke-[1.2]" />
                    </div>
                  )}

                  <span className={`${
                    step.state === 'completed' 
                      ? 'text-[#F5F7FA] font-medium' 
                      : step.state === 'processing'
                        ? 'text-[#F5F7FA] font-medium'
                        : 'text-[#555E6B]'
                  } transition-colors duration-200`}>
                    {step.label}
                  </span>
                </div>

                {/* Right Status Badge */}
                <div>
                  {step.state === 'completed' && (
                    <span className="text-[11px] font-sans font-bold text-[#C7FF4D] uppercase tracking-wider">
                      Completed
                    </span>
                  )}
                  {step.state === 'processing' && (
                    <span className="text-[11px] font-sans font-bold text-[#C7FF4D] uppercase tracking-wider animate-pulse">
                      In Progress
                    </span>
                  )}
                  {step.state === 'pending' && (
                    <span className="text-[11px] font-sans font-bold text-[#555E6B] uppercase tracking-wider">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded security micro-badge */}
      <div className="mt-6 pt-4 border-t border-[#1C1F26]/40 flex items-center gap-2 text-[10px] font-mono text-[#555E6B]">
        <Sparkles className="w-3 h-3 text-[#C7FF4D]" />
        <span>Hardware accelerated encryption</span>
      </div>
    </div>
  );
}

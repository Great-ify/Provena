/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { FileText, Lock, Server, FileCheck2 } from 'lucide-react';

export type StepId = 'upload' | 'encrypt' | 'store' | 'seal';

export interface Step {
  id: StepId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface UploadStepperProps {
  activeStep: StepId;
  onStepClick?: (stepId: StepId) => void;
  completedSteps: StepId[];
}

export const STEPS: Step[] = [
  { id: 'upload', label: 'Upload', icon: FileText },
  { id: 'encrypt', label: 'Encrypt', icon: Lock },
  { id: 'store', label: 'Store', icon: Server },
  { id: 'seal', label: 'Seal', icon: FileCheck2 },
];

export default function UploadStepper({
  activeStep,
  onStepClick,
  completedSteps
}: UploadStepperProps) {
  const activeIndex = STEPS.findIndex(s => s.id === activeStep);

  return (
    <div className="w-full bg-transparent py-4 mb-2 select-none" id="upload-stepper-panel">
      {/* Container aligning with the main reference photo */}
      <div className="relative flex flex-col w-full max-w-2xl mx-auto">
        
        {/* UPPER LAYER: Horizontal row of capsules matching reference layout */}
        <div className="flex justify-between items-center w-full z-10 px-1">
          {STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = completedSteps.includes(step.id) || idx < activeIndex;

            return (
              <div
                key={step.id}
                onClick={() => onStepClick?.(step.id)}
                className="flex flex-col items-center justify-center cursor-pointer group flex-1"
                id={`stepper-pill-${step.id}`}
              >
                {/* Step Capsule container */}
                <motion.div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C7FF4D]/10 border-[#C7FF4D] text-[#C7FF4D] font-bold shadow-[0_0_15px_rgba(199,255,77,0.12)]'
                      : isCompleted
                        ? 'bg-transparent border-[#1C1F26] text-white/95 text-xs'
                        : 'bg-transparent border-transparent text-[#555E6B] hover:text-neutral-400 text-xs'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <StepIcon className={`w-3.5 h-3.5 ${
                    isActive 
                      ? 'text-[#C7FF4D]' 
                      : isCompleted 
                        ? 'text-white/80' 
                        : 'text-[#555E6B]'
                  }`} />
                  
                  <span className={`text-xs font-mono font-bold tracking-wider ${
                    isActive ? 'text-[#C7FF4D]' : 'text-inherit'
                  }`}>
                    {step.label}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* LOWER LAYER: Horizontal Progress Line and Junction Nodes */}
        <div className="relative w-full h-8 flex items-center justify-between px-16 mt-3">
          
          {/* Background Connecting bar */}
          <div className="absolute left-[70px] right-[70px] h-[1.5px] bg-[#1C1F26] top-1/2 -translate-y-1/2 z-0" />
          
          {/* Active Segment highlighted bar */}
          <motion.div 
            className="absolute left-[70px] h-[1.8px] bg-[#C7FF4D] top-1/2 -translate-y-1/2 z-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: activeIndex / (STEPS.length - 1) 
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ right: '70px' }}
          />

          {/* Node Bullets indicating state on the timeline */}
          {STEPS.map((step, idx) => {
            const isActive = activeStep === step.id;
            const isCompleted = completedSteps.includes(step.id) || idx <= activeIndex;

            return (
              <div 
                key={step.id} 
                className="relative z-10 flex items-center justify-center w-6 h-6"
              >
                {/* Visual state-driven dot indicator */}
                <span className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-[#C7FF4D] border-[#C7FF4D] scale-110 shadow-[0_0_8px_rgba(199,255,77,0.8)]' 
                    : 'bg-[#07090D] border-[#1C1F26]'
                }`} />

                {/* Outer ring on active dot index */}
                {isActive && (
                  <span className="absolute w-5 h-5 rounded-full border border-[#C7FF4D]/40 animate-ping opacity-60" />
                )}
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Loader2, Sparkles, Check, X } from 'lucide-react';
import { TxStepStatus } from '../../services/blockchain/transactionService';

interface TransactionModalProps {
  isOpen: boolean;
  status: TxStepStatus;
  message: string;
  progressPercent: number;
  txHash?: string;
  onClose: () => void;
}

export default function TransactionModal({
  isOpen,
  status,
  message,
  progressPercent,
  txHash,
  onClose,
}: TransactionModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop Mask */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === 'confirmed' || status === 'failed' ? onClose : undefined}
          className="absolute inset-0 bg-[#07090D]/95 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 24, stiffness: 320 }}
          className="relative w-full max-w-[420px] bg-[#10131A] border border-[#262B36] rounded-2xl shadow-2xl p-6 overflow-hidden z-10 text-center space-y-6"
        >
          {/* Decorative gradients */}
          <div className="absolute -top-[120px] -right-[120px] w-64 h-64 bg-[#C7FF4D]/5 rounded-full blur-[70px] pointer-events-none" />
          <div className="absolute -bottom-[120px] -left-[120px] w-64 h-64 bg-[#14F1D9]/4 rounded-full blur-[70px] pointer-events-none" />

          {/* Icon Stage */}
          <div className="relative flex justify-center">
            {status === 'pending' && (
              <div className="w-14 h-14 rounded-full bg-[#14F1D9]/5 border border-[#14F1D9]/20 flex items-center justify-center text-[#14F1D9]">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
            {status === 'signing' && (
              <div className="w-14 h-14 rounded-full bg-[#C7FF4D]/5 border border-[#C7FF4D]/25 flex items-center justify-center text-[#C7FF4D] relative">
                <span className="absolute inset-0 bg-[#C7FF4D]/10 rounded-full animate-ping" />
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 12h-2V7a3 3 0 0 0-6 0v5H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
                </svg>
              </div>
            )}
            {status === 'submitting' && (
              <div className="w-14 h-14 rounded-full bg-blue-500/5 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
            {status === 'confirmed' && (
              <div className="w-14 h-14 rounded-full bg-[#C7FF4D] flex items-center justify-center text-[#07090D]">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
            )}
            {status === 'failed' && (
              <div className="w-14 h-14 rounded-full bg-red-950/20 border border-red-500/30 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
            )}
          </div>

          {/* Typography */}
          <div className="space-y-2">
            <h4 className="text-sm font-black tracking-wider uppercase text-[#98A2B3] font-mono">
              {status === 'confirmed' ? 'Signature Anchor Complete' : 
               status === 'failed' ? 'Ledger Exception' : 
               'Ledger Synchronisation'}
            </h4>
            <p className="text-xs font-bold text-[#F5F7FA] font-sans leading-relaxed px-2">
              {message}
            </p>
          </div>

          {/* Progress / Hash Details */}
          <div className="space-y-4">
            {status !== 'confirmed' && status !== 'failed' ? (
              <div className="space-y-1.5 px-4">
                <div className="flex justify-between text-[10px] font-mono text-[#98A2B3]">
                  <span>Progress Profile</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#262B36] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#14F1D9] to-[#C7FF4D]"
                  />
                </div>
              </div>
            ) : txHash ? (
              <div className="bg-[#161A22]/50 border border-[#262B36] rounded-xl p-3 text-left space-y-1">
                <span className="text-[9px] font-mono font-bold text-[#555E6B] block uppercase">
                  Sui Transaction Digest
                </span>
                <span className="font-mono text-[10.5px] text-[#C7FF4D] block truncate">
                  {txHash}
                </span>
                <a
                  href={`https://suivision.xyz/txblock/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-blue-400 font-sans font-bold hover:underline pt-1"
                >
                  <span>Verify on SuiVision Explorer</span>
                  <span>↗</span>
                </a>
              </div>
            ) : null}
          </div>

          {/* Control Button Actions */}
          {(status === 'confirmed' || status === 'failed') && (
            <button
              onClick={onClose}
              className={`w-full py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                status === 'confirmed'
                  ? 'bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D]'
                  : 'bg-[#161A22] border border-[#262B36] hover:bg-[#1E2532] text-[#F5F7FA]'
              }`}
            >
              {status === 'confirmed' ? 'Complete Workspace Session' : 'Close and Revise Stream'}
            </button>
          )}

          {/* Subtext info indicators */}
          {status !== 'confirmed' && status !== 'failed' && (
            <p className="text-[9.5px] font-mono text-[#555E6B] uppercase tracking-wide leading-relaxed">
              Do not close browser or disconnect extension wallet during active signature requests.
            </p>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { TxStepStatus } from '../../services/blockchain/transactionService';

interface TransactionToastProps {
  isOpen: boolean;
  status: TxStepStatus;
  message: string;
  onClose: () => void;
}

export default function TransactionToast({
  isOpen,
  status,
  message,
  onClose,
}: TransactionToastProps) {
  if (!isOpen || status === 'idle') return null;

  const getToastStyle = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#10131A] border-[#C7FF4D]/30 text-[#C7FF4D]';
      case 'failed':
        return 'bg-[#10131A] border-red-500/30 text-red-400';
      default:
        return 'bg-[#10131A] border-[#262B36] text-[#F5F7FA]';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-[120] max-w-[340px] w-full" id="blockchain-toast-container">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`flex items-start gap-3 p-3.5 border rounded-xl shadow-2xl relative overflow-hidden ${getToastStyle()}`}
        >
          {/* Status Icon */}
          <div className="shrink-0 mt-0.5">
            {status === 'confirmed' ? (
              <CheckCircle2 className="w-4 h-4 text-[#C7FF4D]" />
            ) : status === 'failed' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <Loader2 className="w-4 h-4 text-[#14F1D9] animate-spin" />
            )}
          </div>

          {/* Description details */}
          <div className="flex-1 text-left min-w-0 pr-1">
            <span className="text-[10px] font-mono text-[#555E6B] tracking-wider uppercase block leading-none font-bold mb-1">
              {status === 'confirmed' ? 'Success Seal' : 
               status === 'failed' ? 'Failure' : 'Ledger Event'}
            </span>
            <p className="text-[11px] font-sans font-medium text-[#98A2B3] leading-relaxed truncate">
              {message}
            </p>
          </div>

          {/* Action close toggle */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer shrink-0 ml-1.5 focus:outline-none"
            aria-label="Close toast notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

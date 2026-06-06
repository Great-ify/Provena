/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Key, 
  Share2, 
  ExternalLink 
} from 'lucide-react';
import { TxStepStatus } from '../../services/blockchain/transactionService';

interface TransactionStatusProps {
  status: TxStepStatus;
  message: string;
  progressPercent: number;
  txHash?: string;
  onClear?: () => void;
}

export default function TransactionStatus({
  status,
  message,
  progressPercent,
  txHash,
  onClear,
}: TransactionStatusProps) {
  if (status === 'idle') return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-5 h-5 text-[#14F1D9] animate-spin" />;
      case 'signing':
        return <Key className="w-5 h-5 text-[#C7FF4D] animate-pulse" />;
      case 'submitting':
        return <Share2 className="w-5 h-5 text-blue-400 animate-bounce" />;
      case 'confirmed':
        return <CheckCircle2 className="w-5 h-5 text-[#C7FF4D]" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'border-[#C7FF4D]/35 bg-[#C7FF4D]/5 text-[#C7FF4D]';
      case 'failed':
        return 'border-red-500/25 bg-red-950/20 text-red-400';
      default:
        return 'border-[#262B36] bg-[#161A22]/50 text-[#F5F7FA]';
    }
  };

  return (
    <div className={`p-4 border rounded-xl overflow-hidden relative transition-all duration-300 ${getStatusColor()}`}>
      <div className="flex items-start gap-3.5">
        <div className="mt-0.5 shrink-0">
          {getStatusIcon()}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-bold font-sans tracking-wide">
            {status === 'confirmed' ? 'TRANSACTION COMPLETE' : 
             status === 'failed' ? 'TRANSACTION BLOCK REJECTED' : 
             'LEDGER OPERATION IN PROGRESS'}
          </p>
          <p className="text-[11px] text-[#98A2B3] leading-relaxed mt-1 font-sans">
            {message}
          </p>

          {/* SUI Tx Hash Link */}
          {txHash && (
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-[9.5px] font-mono text-[#555E6B] uppercase tracking-wider">Digest:</span>
              <a
                href={`https://suivision.xyz/txblock/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-[#C7FF4D] hover:underline flex items-center gap-1.5 transition-all truncate"
              >
                <span>{txHash.substring(0, 10)}...{txHash.slice(-10)}</span>
                <ExternalLink className="w-3 h-3 hover:scale-110" />
              </a>
            </div>
          )}
        </div>

        {onClear && (status === 'confirmed' || status === 'failed') && (
          <button
            onClick={onClear}
            className="text-[10px] uppercase font-mono px-2 py-0.5 border border-[#262B36] hover:border-[#F5F7FA]/30 rounded bg-[#10131A] text-[#98A2B3] hover:text-white cursor-pointer transition-colors shrink-0"
          >
            Dismiss
          </button>
        )}
      </div>

      {/* Embedded Progress Line Indicator */}
      {status !== 'confirmed' && status !== 'failed' && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#262B36] overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#14F1D9] to-[#C7FF4D]"
          />
        </div>
      )}
    </div>
  );
}

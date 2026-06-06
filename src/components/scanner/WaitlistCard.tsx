/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export default function WaitlistCard() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid cryptographic email address.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    // Simulate blockchain list registration
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#262B36] bg-[#10131A] p-6 md:p-8 text-center max-w-2xl mx-auto shadow-2xl select-none" id="scanner-waitlist">
      {/* Background visual gloss elements */}
      <div className="absolute -bottom-24 -left-20 w-48 h-48 bg-[#14F1D9]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-20 w-48 h-48 bg-[#C7FF4D]/3 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="waitlist-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header titles */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-[#C7FF4D] uppercase font-black tracking-widest bg-[#C7FF4D]/10 px-2.5 py-1 rounded border border-[#C7FF4D]/25">
                Priority Allocation Pool
              </span>
              <h3 className="text-lg md:text-xl font-bold font-display text-white mt-3">
                Notify Me When Available
              </h3>
              <p className="text-xs text-[#98A2B3] max-w-sm mx-auto font-sans leading-relaxed">
                Join the exclusive AI Scanner preview network. Gain priority computational slots on launch.
              </p>
            </div>

            {/* Email form submit container */}
            <form onSubmit={handleJoin} className="space-y-3 max-w-md mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#555E6B] group-focus-within:text-[#C7FF4D] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your creator email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-[#161A22] border border-[#262B36] focus:border-[#C7FF4D]/45 focus:outline-none rounded-xl pl-11 pr-4 py-3 text-xs text-[#F5F7FA] font-sans transition-all disabled:opacity-50"
                />
              </div>

              {errorMsg && (
                <p className="text-[10px] text-red-400 font-mono text-left pl-1">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-sans text-xs font-black bg-[#C7FF4D] hover:bg-[#D4FF66] text-black transition-all cursor-pointer flex items-center justify-center gap-2 select-none active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Indexing address...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Join Priority Waitlist</span>
                  </>
                )}
              </button>
            </form>

            <span className="text-[9px] font-mono text-[#555E6B] block">
              Zero storage charges. Instant offnode dispatch alerts standard.
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 py-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#C7FF4D]/10 border border-[#C7FF4D]/35 flex items-center justify-center mx-auto text-[#C7FF4D]">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-md md:text-lg font-bold font-display text-white">
                Waitlist Index Registered!
              </h3>
              <p className="text-xs text-[#98A2B3] max-w-sm mx-auto font-sans leading-relaxed">
                Your email <strong className="text-[#F5F7FA] font-mono font-bold select-all">{email}</strong> has been prioritised. We will notify you the moment the neural diagnostic modules go live.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
              className="text-[11px] font-mono text-[#14F1D9] hover:underline cursor-pointer"
            >
              Sign up another email
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

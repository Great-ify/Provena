/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function SettingsHeader() {
  return (
    <div className="border-b border-[#262B36]/60 pb-6 text-left" id="settings-header">
      <span className="text-xs font-mono text-[#C7FF4D] uppercase tracking-widest select-none" style={{ letterSpacing: '0.15em' }}>
        Sovereign Console
      </span>
      <h1 className="text-2xl md:text-3xl font-display font-black text-[#F5F7FA] mt-1">
        Control Settings
      </h1>
      <p className="text-xs md:text-sm text-[#98A2B3] mt-2 font-sans max-w-2xl leading-relaxed">
        Manage your Provena account, ownership preferences, privacy controls, and storage settings. Securely configured inside your sovereign sandbox.
      </p>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, CheckCircle2, FileText, AlertOctagon, RotateCw } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: { name: string; size: number; type: string }, realFile?: File) => void;
  selectedFile: { name: string; size: number; type: string } | null;
  onClear: () => void;
  isSimulating: boolean;
}

export default function UploadZone({
  onFileSelect,
  selectedFile,
  onClear,
  isSimulating
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream'
      }, file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream'
      }, file);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full" id="upload-zone-wrapper">
      <motion.div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isSimulating && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-10 md:p-14 text-center transition-all duration-300 select-none flex flex-col items-center justify-center min-h-[380px] bg-[#0B0D12]/30 backdrop-blur-md overflow-hidden ${
          isSimulating
            ? 'border-neutral-800 bg-neutral-900/10 cursor-not-allowed'
            : dragActive 
              ? 'border-[#C7FF4D] bg-[#C7FF4D]/5 shadow-[0_0_30px_rgba(199,255,77,0.12)]' 
              : selectedFile 
                ? 'border-[#C7FF4D]/50 bg-[#161A22]/20 hover:border-[#C7FF4D] cursor-pointer' 
                : 'border-[#262B36] hover:border-[#C7FF4D]/55 hover:bg-[#161A22]/15 cursor-pointer'
        }`}
        whileHover={!isSimulating ? { y: -2 } : {}}
        id="drag-and-drop-workspace"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isSimulating}
        />

        {/* Cinematic Scanline effect */}
        {dragActive && (
          <div className="absolute inset-x-0 h-1 bg-[#C7FF4D]/25 blur-sm top-0 pointer-events-none animate-[scan_2s_infinite_ease-in-out]" />
        )}

        <div className="space-y-6 max-w-sm flex flex-col items-center">
          {/* Main Visual Icon Container matching the reference icon layout */}
          <div className="relative flex items-center justify-center w-24 h-24">
            
            {/* Pulsing ambient circle background */}
            <div className={`absolute inset-0 rounded-full blur-[15px] transition-all duration-700 ${
              dragActive || isSimulating 
                ? 'bg-[#C7FF4D]/15' 
                : selectedFile 
                  ? 'bg-[#C7FF4D]/8' 
                  : 'bg-[#C7FF4D]/2'
            }`} />

            {/* Custom vault / safe locks vector logo */}
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#C7FF4D] relative z-10" fill="none">
              {/* Outer Hexagon outline */}
              <polygon 
                points="50,15 80,32 80,68 50,85 20,68 20,32" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeOpacity={dragActive ? "1" : "0.35"} 
                className={isSimulating ? "animate-spin-slow" : "group-hover:stroke-opacity-80"}
                style={{ transformOrigin: '50% 50%' }}
              />

              {/* Inner Archival safe container */}
              <rect 
                x="33" 
                y="35" 
                width="34" 
                height="34" 
                rx="6" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />
              
              {/* Lock dial or concentric details */}
              <circle cx="50" cy="52" r="8" stroke="currentColor" strokeWidth="2.1" />
              <circle cx="50" cy="52" r="3" fill="currentColor" fillOpacity={isSimulating ? "1" : "0.4"} />
              <path d="M50,22 L50,30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-2">
            {isSimulating ? (
              <>
                <h3 className="text-sm font-display font-extrabold text-[#F5F7FA]">
                  Sealing Process Active
                </h3>
                <p className="text-xs text-[#98A2B3] font-sans">
                  Computing client-side AES payloads. Please reserve gas window ...
                </p>
              </>
            ) : selectedFile ? (
              <>
                <h3 className="text-sm font-display font-extrabold text-white">
                  File Ready for Seal Anchor
                </h3>
                <p className="text-xs text-[#C7FF4D] font-mono break-all font-semibold">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-[#98A2B3] font-mono uppercase">
                  {formatSize(selectedFile.size)} — {selectedFile.type || 'application/octet-stream'}
                </p>
                
                <div className="pt-2 flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClear();
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 bg-red-400/5 hover:bg-red-400/10 border border-red-400/20 px-2.5 py-1 rounded font-mono font-bold uppercase transition-all"
                  >
                    Remove File
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-[#F5F7FA] text-base font-display font-medium leading-normal tracking-wide">
                  Drop your file here
                </h3>
                <p className="text-xs text-[#98A2B3] font-sans">
                  or <span className="text-[#C7FF4D] font-semibold underline underline-offset-2">browse to upload</span>
                </p>
                <div className="h-[1px] w-12 bg-neutral-800 mx-auto my-3" />
                <p className="text-[10px] text-[#555E6B] font-sans leading-normal">
                  Supports: mp4, mov, png, psd, ai, pdf, zip (Max 100GB)
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

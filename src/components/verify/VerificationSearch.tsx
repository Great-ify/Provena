import React, { useState } from 'react';
import { UploadCloud, FileIcon, Loader2 } from 'lucide-react';
import VerificationTabs, { VerificationTabId } from './VerificationTabs';
import VerificationInput from './VerificationInput';

interface VerificationSearchProps {
  activeTab: VerificationTabId;
  onChangeTab: (tabId: VerificationTabId) => void;
  searchQuery: string;
  onSearchQueryChange: (val: string) => void;
  onVerify: () => void;
  isVerifying: boolean;
  error?: string | null;
  onFileSelect?: (file: File) => void;
  isHashingFile?: boolean;
  hashedFileName?: string | null;
}

export default function VerificationSearch({
  activeTab,
  onChangeTab,
  searchQuery,
  onSearchQueryChange,
  onVerify,
  isVerifying,
  error,
  onFileSelect,
  isHashingFile = false,
  hashedFileName = null
}: VerificationSearchProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (onFileSelect) {
        onFileSelect(e.target.files[0]);
      }
    }
  };

  return (
    <div className="space-y-5 select-none" id="verify-search-composite">
      
      {/* 1. Switchable Verification Tabs Header */}
      <VerificationTabs 
        activeTab={activeTab} 
        onChangeTab={onChangeTab} 
      />

      {/* 2. Drag & Drop container for physical file hashing when Content Hash active */}
      {activeTab === 'content' && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
            isDragActive
              ? 'border-[#C7FF4D] bg-[#C7FF4D]/5 shadow-lg shadow-[#C7FF4D]/5'
              : 'border-[#262B36] hover:border-[#C7FF4D]/35 bg-[#0C1016]/45'
          }`}
        >
          <input
            type="file"
            id="verification-file-picker"
            className="hidden"
            onChange={handleFileInput}
            disabled={isVerifying || isHashingFile}
          />
          
          <div className="space-y-3 flex flex-col items-center justify-center">
            {isHashingFile ? (
              <div className="relative">
                <div className="absolute inset-0 bg-[#C7FF4D]/10 rounded-full blur-[10px] animate-pulse" />
                <Loader2 className="w-8 h-8 text-[#C7FF4D] animate-spin relative z-10" />
              </div>
            ) : hashedFileName ? (
              <FileIcon className="w-8 h-8 text-[#C7FF4D]" />
            ) : (
              <UploadCloud className="w-8 h-8 text-[#555E6B] group-hover:text-[#C7FF4D]" />
            )}

            <div className="space-y-1">
              <label 
                htmlFor="verification-file-picker"
                className="text-xs font-manrope font-bold text-[#F5F7FA] cursor-pointer hover:text-[#C7FF4D] transition-colors"
              >
                {isHashingFile 
                  ? 'Calculating SHA256 Fingerprint...' 
                  : hashedFileName 
                    ? `Loaded: ${hashedFileName}` 
                    : 'Drag & Drop original work file or browse computer'}
              </label>
              <p className="text-[10px] text-[#555E6B] font-manrope">
                {hashedFileName ? 'Local integrity audit completed' : 'Hashing runs entirely inside browser sandbox to preserve privacy'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Primary text interaction box */}
      <VerificationInput
        activeTab={activeTab}
        value={searchQuery}
        onChange={onSearchQueryChange}
        onVerify={onVerify}
        isVerifying={isVerifying || isHashingFile}
      />

      {/* Elegant Live Validation Warning */}
      {error && (
        <div className="mt-2 text-amber-300 border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 rounded-xl text-xs font-mono flex items-start gap-2 select-text animate-fadeIn text-left">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
}

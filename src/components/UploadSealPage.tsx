

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, ShieldCheck, ChevronRight, FileText, ArrowRight, Layers, Lock, Cpu, Database, Eye, Printer, Share2 } from 'lucide-react';
import UploadHeader from './upload/UploadHeader';
import UploadStepper, { StepId } from './upload/UploadStepper';
import UploadZone from './upload/UploadZone';
import UploadProgressCard, { ProgressStepItem, ProgressState } from './upload/UploadProgressCard';
import UploadMetadata from './upload/UploadMetadata';
import UploadLayout from './upload/UploadLayout';
import TransactionModal from './shared/TransactionModal';
import { ProvenanceAsset } from '../types';
import { computeRealSHA256, computeDeterministicHash } from '../lib/blockchain';
import { useBlockchain } from '../context/BlockchainContext';
import { useNetwork } from '../context/NetworkContext';
import { useNotifications } from '../context/NotificationContext';

interface UploadSealPageProps {
  onSealComplete: (newAsset: ProvenanceAsset) => void;
  walletConnected: boolean;
  userAddress: string;
  onViewCertificate?: (asset: ProvenanceAsset) => void;
}

const SIMULATED_PRESETS = [
  { name: "Ocean_Concept.mp4", size: 2630660000, type: "video/mp4", title: "Ocean Concept Core Vector Scan" },
  { name: "NeuroMesh_Synapse.cpp", size: 68100, type: "text/x-c++src", title: "NeuroMesh Audio Synapse Module" },
  { name: "Quantum_Mesh_Model.obj", size: 5410000, type: "model/obj", title: "Quantum Anisotropic Gravity Mesh v1" },
];

export default function UploadSealPage({
  onSealComplete,
  walletConnected,
  userAddress,
  onViewCertificate
}: UploadSealPageProps) {
  const { sealAssetWorkflow, txStatus, txMessage, txProgressPercent, clearTxState } = useBlockchain();
  const { network } = useNetwork();
  const { addNotification } = useNotifications();

  // Stepper & simulation states
  const [activeStep, setActiveStep] = useState<StepId>('upload');
  const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number; type: string } | null>(null);
  const [selectedRawFile, setSelectedRawFile] = useState<File | null>(null);
  const [newlyCreatedAsset, setNewlyCreatedAsset] = useState<ProvenanceAsset | null>(null);
  const [calculatedHash, setCalculatedHash] = useState<string>("");
  
  // Progress status card states
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [simulatedBlobId, setSimulatedBlobId] = useState<string>("bafkre...7vu33");
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'success'>('idle');

  // Diagnostic states mapping list items
  const [fileEncryptedState, setFileEncryptedState] = useState<ProgressState>('pending');
  const [walrusStorageState, setWalrusStorageState] = useState<ProgressState>('pending');
  const [suiVerificationState, setSuiVerificationState] = useState<ProgressState>('pending');
  const [mintCertificateState, setMintCertificateState] = useState<ProgressState>('pending');

  // Track last progress step seen to prevent duplicate notifications during updates
  const [lastStepSeen, setLastStepSeen] = useState<string>('idle');

  // Sync execution loader progress values dynamically with blockchain coordinates
  useEffect(() => {
    if (simulationState === 'running') {
      setProgressPercent(txProgressPercent);

      if (txProgressPercent < 15) {
        setFileEncryptedState('processing');
        setWalrusStorageState('pending');
        setSuiVerificationState('pending');
        setMintCertificateState('pending');
        setActiveStep('encrypt');
      } else if (txProgressPercent >= 15 && txProgressPercent < 35) {
        setFileEncryptedState('completed');
        setWalrusStorageState('processing');
        setSuiVerificationState('pending');
        setMintCertificateState('pending');
        setActiveStep('encrypt');
        
        if (lastStepSeen !== 'encrypt-done') {
          addNotification('File Cryptographed', `SHA-256 calculated: ${calculatedHash.slice(0, 12)}...`, 'success');
          setLastStepSeen('encrypt-done');
        }
      } else if (txProgressPercent >= 35 && txProgressPercent < 70) {
        setFileEncryptedState('completed');
        setWalrusStorageState('completed');
        setSuiVerificationState('processing');
        setMintCertificateState('pending');
        setCompletedSteps(['upload', 'encrypt']);
        setActiveStep('store');

        if (lastStepSeen !== 'walrus-done') {
          addNotification('Walrus Segment Replicated', 'Payload chunks distributed to decentralized nodes.', 'success');
          setLastStepSeen('walrus-done');
        }
      } else if (txProgressPercent >= 70 && txProgressPercent < 100) {
        setFileEncryptedState('completed');
        setWalrusStorageState('completed');
        setSuiVerificationState('completed');
        setMintCertificateState('processing');
        setCompletedSteps(['upload', 'encrypt', 'store']);
        setActiveStep('seal');

        if (lastStepSeen !== 'sui-done') {
          addNotification('Sui Ledger Anchor Broadcasted', 'Asset registration transaction payload signed.', 'info');
          setLastStepSeen('sui-done');
        }
      } else if (txProgressPercent === 100) {
        setFileEncryptedState('completed');
        setWalrusStorageState('completed');
        setSuiVerificationState('completed');
        setMintCertificateState('completed');
        setCompletedSteps(['upload', 'encrypt', 'store', 'seal']);
        setActiveStep('seal');

        if (lastStepSeen !== 'mint-done') {
          addNotification('Certificate Generated', `Holographic deed registered for ${selectedFile?.name.split('.')[0] || 'Asset'}`, 'success');
          setLastStepSeen('mint-done');
        }
      }
    }
  }, [txProgressPercent, simulationState, calculatedHash, selectedFile, lastStepSeen]);

  // Trigger file selection
  const handleFileSelect = async (file: { name: string; size: number; type: string }, realFile?: File) => {
    setSelectedFile(file);
    addNotification('Asset Uploaded', `File ${file.name} loaded into the staging forge.`, 'info');
    if (realFile) {
      setSelectedRawFile(realFile);
    } else {
      setSelectedRawFile(null);
    }
    
    // Set step to Encrypt to match the exact reference layout
    setActiveStep('encrypt');
    setCompletedSteps(['upload', 'encrypt']);
    
    // Set realistic mock blob ID for this file
    const randSuffix = Math.random().toString(36).substring(2, 7);
    setSimulatedBlobId(`bafkre7${randSuffix}...7vu33`);

    // Compute real cryptographic SHA-256 hash of the selected raw file
    if (realFile) {
      try {
        const liveHash = await computeRealSHA256(realFile);
        setCalculatedHash(liveHash);
      } catch (err) {
        const fall = computeDeterministicHash(file.name, file.size);
        setCalculatedHash(fall);
      }
    } else {
      const fall = computeDeterministicHash(file.name, file.size);
      setCalculatedHash(fall);
    }

    // Initialize progress values to match the exact mockup screenshot loaded by the user
    setProgressPercent(100);
    setFileEncryptedState('completed');
    setWalrusStorageState('completed');
    setSuiVerificationState('processing');
    setMintCertificateState('pending');
    setSimulationState('idle');
  };

  // Reset the portal state
  const handleReset = () => {
    setSelectedFile(null);
    setSelectedRawFile(null);
    setActiveStep('upload');
    setCompletedSteps([]);
    setProgressPercent(0);
    setSimulationState('idle');
    setFileEncryptedState('pending');
    setWalrusStorageState('pending');
    setSuiVerificationState('pending');
    setMintCertificateState('pending');
    setLastStepSeen('idle');
    clearTxState();
  };

  // Run the cinematic automated blockchain pipeline simulation sequence
  const executeCryptographicSeal = async () => {
    if (!selectedFile || simulationState === 'running') return;

    if (!walletConnected) {
      alert("Please connect your Sui cryptographic ledger keys to seal work.");
      return;
    }

    setSimulationState('running');
    setProgressPercent(0);
    setLastStepSeen('idle');
    addNotification('Sealing Cycle Initiated', `Opening sovereign ledger seal channel for ${selectedFile.name}...`, 'info');
    
    let fileToSeal = selectedRawFile;
    if (!fileToSeal) {
      // Setup dynamic fallback representing standard mock sizes
      fileToSeal = new File(
        [new ArrayBuffer(selectedFile.size)],
        selectedFile.name,
        { type: selectedFile.type }
      );
    }

    const assetTitle = selectedFile.name.split('.')[0].replace(/_/g, ' ');

    try {
      const assetOutcome = await sealAssetWorkflow(
        fileToSeal,
        assetTitle,
        "Immutable provenance ledger proof verified and secured via Provena pipeline.",
        "AI_Exclusion",
        15
      );

      setSimulatedBlobId(assetOutcome.walrusBlobId);
      setNewlyCreatedAsset(assetOutcome);
      onSealComplete(assetOutcome);
      setSimulationState('success');
    } catch (err: any) {
      console.warn('Core Sealing Exception in workspace pipeline:', err);
      setSimulationState('idle');
    }
  };

  // Format File Size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizeLabels = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizeLabels[i];
  };

  // Convert list to acceptable card props array
  const checklistItems: ProgressStepItem[] = [
    { id: 'encrypt', label: 'File Encrypted', state: fileEncryptedState },
    { id: 'store', label: 'Walrus Storage', state: walrusStorageState },
    { id: 'sui', label: 'Sui Verification', state: suiVerificationState },
    { id: 'certificate', label: 'Mint Certificate', state: mintCertificateState },
  ];

  return (
    <div className="w-full text-left" id="upload-seal-workflow-desk">
      
      {/* 1. If successfully complete, show a majestic holographic Mint Certificate Overlay */}
      {simulationState === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-[#0B0D12] border border-[#C7FF4D]/30 p-8 rounded-3xl text-center space-y-8 shadow-[0_0_50px_rgba(199,255,77,0.06)] relative overflow-hidden"
          id="success-mint-modal"
        >
          {/* Diagnostic ambient lights */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#C7FF4D]/10 rounded-full blur-[30px]" />

          <div className="mx-auto w-16 h-16 bg-[#C7FF4D]/10 rounded-full border border-[#C7FF4D]/40 flex items-center justify-center animate-bounce">
            <ShieldCheck className="w-8 h-8 text-[#C7FF4D]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black text-[#C7FF4D] uppercase tracking-widest bg-[#C7FF4D]/10 px-3 py-1 rounded border border-[#C7FF4D]/25">
              CRYPTOGRAPHIC SEAL SECURED
            </span>
            <h2 className="text-2xl font-display font-black text-white tracking-tight pt-2">
              Provenance Seal Secured
            </h2>
            <p className="text-xs text-[#98A2B3] max-w-sm mx-auto leading-relaxed">
              Your work has been encrypted, distributed onto decentralized Walrus storage node segments, and anchored irrevocably on Sui {network}.
            </p>
          </div>

          {/* Secure cryptographic details panel */}
          <div className="bg-[#10131A] border border-[#1C1F26] rounded-2xl p-4 text-left font-mono text-[11px] space-y-3">
            <div className="flex justify-between items-center border-b border-[#262B36]/60 pb-2">
              <span className="text-[#555E6B] font-bold">BLOCK TITLE</span>
              <span className="text-white font-bold max-w-[170px] truncate">
                {selectedFile?.name.split('.')[0]}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-[#262B36]/60 pb-2">
              <span className="text-[#555E6B] font-bold">DECENTRALIZED AGGREGATOR</span>
              <span className="text-[#C7FF4D] font-bold">Walrus Storage</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#262B36]/60 pb-2">
              <span className="text-[#555E6B] font-bold">GAS BLOCK DISPATCH</span>
              <span className="text-white text-[10px]">~0.0031 SUI</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#555E6B] font-bold">BLOB ADDRESS REGISTER</span>
              <span className="text-[#7CEEFF] text-[10.5px] tracking-tight truncate max-w-[150px]">
                {simulatedBlobId}
              </span>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center select-none pt-2">
            <button
              onClick={handleReset}
              className="bg-[#161A22] hover:bg-[#1D222F] text-white border border-[#262B36] py-3 px-6 rounded-xl text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#98A2B3]" />
              <span>Seal Another Work</span>
            </button>
            <button
              onClick={() => {
                if (onViewCertificate && newlyCreatedAsset) {
                  onViewCertificate(newlyCreatedAsset);
                } else {
                  window.location.reload();
                }
              }}
              className="bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] py-3 px-6 rounded-xl text-xs font-black cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#C7FF4D]/10 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Print Secure Certificate</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* 2. Main workflow layout embedding exquisite modular structures */
        <UploadLayout
          header={<UploadHeader />}
          stepper={
            <UploadStepper 
              activeStep={activeStep} 
              completedSteps={completedSteps}
              onStepClick={(sid) => {
                // Let user toggle simulated steps only if file is already loaded
                if (selectedFile) {
                  setActiveStep(sid);
                }
              }}
            />
          }
          presetsPanel={
            !selectedFile ? (
              <div className="space-y-2.5 text-left border-t border-[#1C1F26] pt-6 select-none animate-fadeIn">
                <span className="text-[10px] text-[#555E6B] font-mono uppercase tracking-widest font-black block">
                  Or load a museum preview asset:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {SIMULATED_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleFileSelect(preset)}
                      className="bg-[#0B0D12]/40 hover:bg-[#161A22]/40 border border-[#1C1F26] hover:border-[#C7FF4D]/30 p-3.5 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-[90px] group"
                    >
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#7CEEFF]">
                        <FileText className="w-3.5 h-3.5 font-bold shrink-0" />
                        <span className="truncate">{preset.name}</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#C7FF4D] transition-colors truncate">
                        {preset.title}
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-[#555E6B] mt-1 pr-1 font-bold">
                        <span>{formatSize(preset.size)}</span>
                        <span className="text-[#C7FF4D]">Load Demo ▴</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          }
          uploadZone={
            <UploadZone 
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              onClear={handleReset}
              isSimulating={simulationState === 'running'}
            />
          }
          progressCard={
            <UploadProgressCard 
              progressPercent={progressPercent}
              steps={checklistItems}
            />
          }
          metadata={
            <div className="w-full">
              {selectedFile ? (
                /* Metadata Panel when a file is selected */
                <UploadMetadata 
                  fileName={selectedFile.name}
                  fileSize={formatSize(selectedFile.size)}
                  walrusBlobId={simulatedBlobId}
                  network={`Sui ${network}`}
                  onCancel={handleReset}
                  showCancel={true}
                />
              ) : (
                /* Empty/Dashed Placeholder Metadata when idle */
                <UploadMetadata 
                  fileName="No file selected"
                  fileSize="0.00 Bytes"
                  walrusBlobId="Unassigned"
                  network="Offline Sandbox"
                  onCancel={handleReset}
                  showCancel={false}
                />
              )}

              {/* Dynamic Execute Primary CTA trigger below */}
              {selectedFile && simulationState === 'idle' && (
                <motion.div 
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex justify-end select-none"
                >
                  <button
                    onClick={executeCryptographicSeal}
                    className="w-full sm:w-auto bg-[#C7FF4D] hover:bg-[#D9FF6B] text-[#07090D] font-display font-black text-xs py-3.5 px-8 rounded-xl flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-[#C7FF4D]/10 hover:shadow-[#C7FF4D]/25 active:scale-95 transition-all"
                    id="execute-seal-trigger-btn"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Execute Cryptographic Seal</span>
                  </button>
                </motion.div>
              )}

              {simulationState === 'running' && (
                <div className="mt-4 p-3 bg-[#161A22] border border-[#262B36] rounded-xl font-mono text-[10px] text-[#C7FF4D] flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#C7FF4D] animate-ping" />
                  <span>Compiling metadata and anchoring proof on Sui ledger...</span>
                </div>
              )}
            </div>
          }
        />
      )}

      {/* Transaction Status Overlay Modal */}
      <TransactionModal 
        isOpen={simulationState === 'running' && txStatus !== 'idle'}
        status={txStatus}
        message={txMessage}
        progressPercent={txProgressPercent}
        txHash={newlyCreatedAsset?.suiTxHash || undefined}
        onClose={() => {
          if (txStatus === 'confirmed') {
            setSimulationState('success');
          } else {
            setSimulationState('idle');
          }
          clearTxState();
        }}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import UploadSealPage from "./components/UploadSealPage";
import ScannerView from "./components/ScannerView";
import CertificatePage from "./components/CertificatePage";
import Marketplace from "./components/Marketplace";
import VerificationPortal from "./components/VerificationPortal";
import CertificateRegistry from "./components/certificates/CertificateRegistry";

import WalletConnectModal from "./components/shared/WalletConnectModal";
import EnvValidationOverlay from "./components/shared/EnvValidationOverlay";
import AppShell from "./components/layout/AppShell";
import SettingsView from "./components/SettingsView";
import { useWallet } from "./context/WalletContext";
import { useNetwork } from "./context/NetworkContext";
import { assetStore } from "./store/assetStore";

import { ProvenanceAsset, ActivityLog } from "./types";

export default function App() {
  // Navigation View Router
  const [activeTab, setActiveTab] = useState<string>("landing");

  // Hook the live Sui connection parameters from unified WalletContext
  const {
    connected: walletConnected,
    address: userAddress,
    balance: suiBalance,
    isWalletModalOpen,
    setIsWalletModalOpen,
    modalRedirectTarget,
    setModalRedirectTarget,
    disconnect,
  } = useWallet();

  const setWalletConnected = (connect: boolean) => {
    if (connect) {
      setIsWalletModalOpen(true);
    } else {
      disconnect();
    }
  };

  const setSuiBalance = (b: any) => {
    // Sui wallet handles on-chain balances autonomously
  };

  const { network } = useNetwork();

  // Stateful indices synchronized across components via Asset Store
  const [assets, setAssets] = useState<ProvenanceAsset[]>(
    assetStore.getAssets(),
  );
  const [logs, setLogs] = useState<ActivityLog[]>(assetStore.getLogs());

  useEffect(() => {
    const unsubscribe = assetStore.subscribe(() => {
      setAssets(assetStore.getAssets());
      setLogs(assetStore.getLogs());
    });
    return unsubscribe;
  }, []);

  // Selected certificate focused view
  const [selectedCertificate, setSelectedCertificate] =
    useState<ProvenanceAsset | null>(null);

  // Route Guading logic: disconnect triggers homepage redirection
  useEffect(() => {
    if (!walletConnected && activeTab !== "landing") {
      setActiveTab("landing");
    }
    // Deep compatibility redirect for legacy /dashboard route
    if (activeTab === "dashboard") {
      setActiveTab("marketplace/analytics");
    }
  }, [walletConnected, activeTab]);

  // Handle centralized authentication/redirection router intercept
  const handleNavigationAttempt = (targetTab: string) => {
    if (targetTab === "landing") {
      setSelectedCertificate(null);
      setActiveTab("landing");
      return;
    }

    if (walletConnected) {
      setSelectedCertificate(null);
      setActiveTab(targetTab);
    } else {
      setModalRedirectTarget(targetTab);
      setIsWalletModalOpen(true);
    }
  };

  const handleConnectSuccess = (simulatedAddress: string) => {
    // Apply redirection targets defined during Launch App or CTA triggers
    if (modalRedirectTarget) {
      setActiveTab(modalRedirectTarget);
      setModalRedirectTarget(null);
    } else {
      setActiveTab("upload"); // fallback
    }
  };

  // Append new sealed assets into our active database index
  const handleSealComplete = (newAsset: ProvenanceAsset) => {
    // The asset is already registered in the store for contextual pipelines,
    // but this maintains full backwards compatibility with Sprint 1 props.
    // If it's not already in the store, we save it here.
    const exists = assetStore
      .getAssets()
      .some((a) => a.sha256Hash === newAsset.sha256Hash);
    if (!exists) {
      assetStore.registerAsset(newAsset);
    }
  };

  // Append licensing acquisitions inside ledger logs
  const handlePurchaseComplete = (purchaseLog: ActivityLog) => {
    // Already tracked by context buyLicenseWorkflow, we let the store sync handle this.
  };

  const handleSelectCertificateView = (asset: ProvenanceAsset) => {
    setSelectedCertificate(asset);
    setActiveTab("certificate");
  };

  const onScanExecutedCallback = (score: number) => {
    // Let's add general audit logging if AI Scan completes successfully
    // We register this into the stores dynamically of Provena
    const aiLog: ActivityLog = {
      id: "log-" + Math.floor(Math.random() * 9000),
      type: "UPLOAD",
      assetId: "scanned-work",
      assetTitle: `AI Origin Forensic Scan Completed (Style score: ${score}%)`,
      actor: walletConnected ? "Sui Sovereign Creator" : "Anonymity Workspace",
      txHash:
        "0x" +
        Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16),
        ).join(""),
      timestamp: new Date().toISOString(),
      status: "SUCCESS",
    };

    // Quick injection to keep activity logs alive
    // This maintains compatibility for client forensic verification runs
    const storedLogs = assetStore.getLogs();
    localStorage.setItem(
      "provena_logs",
      JSON.stringify([aiLog, ...storedLogs]),
    );
    // Force a store notify
    assetStore.updateAssetStatus("asset-1", "Sealed");
  };

  return (
    <div
      className="min-h-screen text-[#F5F7FA] relative flex flex-col print:bg-white print:text-black font-sans bg-[#07090D]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(199,255,77,0.06), transparent 35%),
          radial-gradient(circle at 85% 85%, rgba(20,241,217,0.04), transparent 45%),
          radial-gradient(circle at 50% 10%, rgba(124,238,255,0.02), transparent 40%)
        `,
      }}
      id="provena-root-wrapper"
    >
      <EnvValidationOverlay />
      {activeTab === "landing" ? (
        /* PUBLIC MARKETING LAYOUT */
        <>
          {/* Header Navigation elements */}
          <Navigation
            activeTab={activeTab}
            setActiveTab={handleNavigationAttempt}
            walletConnected={walletConnected}
            setWalletConnected={setWalletConnected}
            userAddress={userAddress}
            suiBalance={suiBalance}
          />

          {/* Main Content Arena */}
          <main className="flex-1 w-full mx-auto" id="provena-content-main">
            <LandingPage
              onStartSealing={() => handleNavigationAttempt("upload")}
              onOpenScanner={() => handleNavigationAttempt("scanner")}
              onOpenVerify={() => handleNavigationAttempt("verify")}
              walletConnected={walletConnected}
              setWalletConnected={setWalletConnected}
            />
          </main>

          {/* Landing Footer branding detail */}
          <footer className="border-t border-[rgba(255,255,255,0.05)] bg-[#07090D]/50 backdrop-blur-sm py-6 text-center text-xs text-[#98A2B3] font-mono select-none px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <p>© 2026 PROVENA Protocol Inc.</p>
              <div className="flex gap-4 items-center">
                <span>Tatum Sui RPC Indexer</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#14F1D9] animate-pulse " />
                <span className="hidden md:block">Walrus decentralized archive sandbox</span>
              </div>
            </div>
          </footer>
        </>
      ) : (
        /* AUTENTICATED PROTECTED SHELL WORKING ENGINE */
        <AppShell
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
          userAddress={userAddress}
          suiBalance={suiBalance}
          onBackToLanding={() => handleNavigationAttempt("landing")}
        >
          {activeTab === "dashboard" && (
            <Dashboard
              assets={assets}
              logs={logs}
              onSelectCertificate={handleSelectCertificateView}
              onOpenScanner={() => setActiveTab("scanner")}
            />
          )}

          {activeTab === "upload" && (
            <UploadSealPage
              onSealComplete={handleSealComplete}
              walletConnected={walletConnected}
              userAddress={userAddress}
              onViewCertificate={handleSelectCertificateView}
            />
          )}

          {activeTab === "scanner" && (
            <ScannerView onScanExecuted={onScanExecutedCallback} />
          )}

          {activeTab === "verify" && <VerificationPortal assets={assets} />}

          {activeTab.startsWith("marketplace") && (
            <Marketplace
              assets={assets}
              walletConnected={walletConnected}
              onPurchaseComplete={handlePurchaseComplete}
              suiBalance={suiBalance}
              setSuiBalance={setSuiBalance}
              logs={logs}
              onSelectCertificate={handleSelectCertificateView}
              onOpenScanner={() => setActiveTab("scanner")}
              initialSubTab={
                activeTab === "marketplace/analytics"
                  ? "analytics"
                  : activeTab === "marketplace/my-assets"
                    ? "my-assets"
                    : activeTab === "marketplace/licensing"
                      ? "licensing"
                      : "discover"
              }
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "certificate" && selectedCertificate !== null && (
            <CertificatePage
              asset={selectedCertificate}
              onBack={() => {
                setSelectedCertificate(null);
              }}
            />
          )}

          {activeTab === "certificate" && selectedCertificate === null && (
            <CertificateRegistry
              assets={assets}
              onSelectAsset={handleSelectCertificateView}
              networkName={network}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView userAddress={userAddress} suiBalance={suiBalance} />
          )}
        </AppShell>
      )}

      {/* Universal premium Wallet modal for client-side keys generation */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnectSuccess={handleConnectSuccess}
      />
    </div>
  );
}

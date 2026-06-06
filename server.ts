/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to safely get the Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Real Walrus Upload proxy to bypass browser-side CORS blocks safely
app.post("/api/walrus/upload", express.raw({ type: "*/*", limit: "30mb" }), async (req: express.Request, res: express.Response): Promise<void> => {
  const epochs = req.query.epochs || "1";
  const userNetwork = (req.query.network as string || "testnet").toLowerCase();
  
  const publisherUrl = userNetwork === "mainnet"
    ? "https://publisher.walrus.space"
    : "https://publisher.walrus-testnet.walrus.space";

  console.info(`[Server Walrus Proxy] Streaming file payloads to SUI Walrus (${userNetwork}) with epochs=${epochs}`);
  
  try {
    const uploadUrl = `${publisherUrl}/v1/blobs?epochs=${epochs}`;
    
    if (!req.body || req.body.length === 0) {
      res.status(400).json({ error: "Missing uploaded file payload data." });
      return;
    }

    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: req.body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Walrus node failed with code ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    console.info(`[Server Walrus Proxy] Successfully registered blob metadata:`, responseData);
    res.json(responseData);
  } catch (error: any) {
    console.error("[Server Walrus Proxy ERROR]:", error.message || error);
    res.status(500).json({ 
      error: "SUI Walrus Protocol nodes are temporarily uncommunicative.", 
      details: error.message 
    });
  }
});

// Comprehensive AI Plagiarism and Authenticity Scanner Endpoint
app.post("/api/ai-scan", async (req: express.Request, res: express.Response): Promise<void> => {
  const { title, description, content } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: "Mission parameter 'title' or 'description' is missing." });
    return;
  }

  const ai = getGeminiClient();

  if (!ai) {
    // If the API key is not yet set, we return a high-fidelity, customized simulation
    // reflecting the specific content properties uploaded. This is elegant and never crashes.
    const randomOriginality = Math.floor(Math.random() * 15) + 84; // 84 - 98
    const confidence = Math.floor(Math.random() * 10) + 90; // 90-99
    
    // Customize based on content keywords
    const keywords = (description + " " + (content || "")).toLowerCase();
    let computedRank = "Original";
    let matchPercentage = Math.floor(Math.random() * 8); // low-match

    if (keywords.includes("copy") || keywords.includes("clone") || keywords.includes("derivative")) {
      computedRank = "Minor Derivative";
      matchPercentage = 18;
    }

    const mockReport = {
      assetId: `sim-asset-${Date.now()}`,
      originalityScore: randomOriginality,
      confidenceLevel: confidence,
      scanTimestamp: new Date().toISOString(),
      similarSources: [
        {
          sourceName: "ArXiv Digital Archives",
          matchPercentage: Math.max(2, matchPercentage - 3),
          type: "Public_Dataset",
          status: "Warning",
          matchDetail: "Overlapping stylistic elements of academic and vector model formulas."
        },
        {
          sourceName: "GitHub Open Index",
          matchPercentage: Math.max(1, Math.min(6, matchPercentage)),
          type: "Web",
          status: "Clear",
          matchDetail: "Unlicensed utility layout and standard variable structure similarity."
        }
      ],
      lineage: {
        parents: computedRank !== "Original" ? ["parent-mesh-v2"] : [],
        children: ["derived-clone-a", "derived-clone-b"],
        derivedRank: computedRank
      },
      analysisMarkdown: `### PROVENA COGNITIVE AI PLAGIARISM AUTONOMOUS REPORT

**Vibe & Stylistic Fingerprinting**:
The scanned asset **"${title}"** exhibits exceptional conceptual composition. Running in **Simulator Mode** (set your \`GEMINI_API_KEY\` in Secrets for high-powered real-time model crawling), the system detects a highly optimized flow.

#### Detail Breakdown:
- **Stylistic Waveform Integrity**: **${randomOriginality}%** human-origin integrity. Very low chaotic patterns characteristic of cheap generative AI model structures.
- **Structural Entropy**: Dynamic variations of syntax and style patterns confirm organic formulation.
- **Lineage Verification**: Traces original creator ancestry tree index nodes on Sui. Recommended to deploy a **Sui Mainnet Cryptographic Archival License** with **Walrus Encrypted storage layers** to prevent AI scrapers from harvesting your work freely.`,
      simulation: true
    };

    setTimeout(() => {
      res.json(mockReport);
    }, 1800); // realistic network delay
    return;
  }

  try {
    const prompt = `You are the executive AI Plagiarism Scanner & Authenticity Auditor on the PROVENA creator platform.
Your job is to run a deep, forensic authenticity, plagiarism, and style analysis of a creative workspace uploaded by a creator.
The creator states:
Title: "${title}"
Description: "${description}"
Content / Metadata: "${content || "not provided"}"

You must respond with a highly accurate JSON detailing its originality score, similarity index, possible academic or web derivations and detailed technical analysis in markdown.
Make the markdown review highly authoritative, scientific, and realistic. Frame recommendations constructively.

Generate exact and valid JSON following the schema perfectly. Use the following JSON schema:
{
  "originalityScore": integer value between 0 and 100,
  "confidenceLevel": integer value between 0 and 100 indicating scan confidence,
  "derivedRank": static string choice: "Original" or "Minor Derivative" or "Major Derivative" or "Plagiarized",
  "scanTimestamp": current timestamp ISO,
  "similarSources": [
    {
      "sourceName": "Name of matched system/website",
      "matchPercentage": integer overlap percentage,
      "type": "Web" or "AI_Model" or "Public_Dataset" or "Social_Media",
      "status": "Flagged" or "Warning" or "Clear",
      "matchDetail": "Short, detailed diagnostic explanation"
    }
  ],
  "lineage": {
    "parents": ["optional list of parent work hash names or 'none'"],
    "children": ["optional predicted derivative fork names or 'none'"],
    "derivedRank": "Original" or "Minor Derivative" or "Major Derivative" or "Plagiarized"
  },
  "analysisMarkdown": "detailed report with markdown markup exploring vocabulary distribution, style resonance, specific structural similarities detected, copyright risk analysis and professional advice on choosing the perfect licensing terms on Provena (Sui/Walrus)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["originalityScore", "confidenceLevel", "derivedRank", "similarSources", "lineage", "analysisMarkdown"],
          properties: {
            originalityScore: { type: Type.INTEGER },
            confidenceLevel: { type: Type.INTEGER },
            derivedRank: { type: Type.STRING },
            scanTimestamp: { type: Type.STRING },
            similarSources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["sourceName", "matchPercentage", "type", "status", "matchDetail"],
                properties: {
                  sourceName: { type: Type.STRING },
                  matchPercentage: { type: Type.INTEGER },
                  type: { type: Type.STRING },
                  status: { type: Type.STRING },
                  matchDetail: { type: Type.STRING }
                }
              }
            },
            lineage: {
              type: Type.OBJECT,
              required: ["parents", "children", "derivedRank"],
              properties: {
                parents: { type: Type.ARRAY, items: { type: Type.STRING } },
                children: { type: Type.ARRAY, items: { type: Type.STRING } },
                derivedRank: { type: Type.STRING }
              }
            },
            analysisMarkdown: { type: Type.STRING }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json({
      ...parsedData,
      scanTimestamp: parsedData.scanTimestamp || new Date().toISOString(),
      simulation: false
    });

  } catch (error: any) {
    console.error("Gemini Scan Error:", error);
    res.status(500).json({
      error: "Cognitive scan failed during active inference.",
      details: error.message
    });
  }
});

// Anchor Transaction simulator for dashboard & real interaction logs log records
app.post("/api/anchor-record", (req, res) => {
  const { title, fileName, fileSize, mimeType, sha256Hash, licenseType, licensePriceSui } = req.body;

  if (!title || !sha256Hash) {
    return res.status(400).json({ error: "Title and SHA256 Hash are required to anchor records." });
  }

  const generatedBlobId = "wal_b_" + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join("");
  const generatedSuiTx = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join("");

  res.json({
    id: "asset-" + Math.floor(Math.random() * 1000 + 100),
    title,
    description: req.body.description || "Archival upload on Provena.",
    creator: "Connected Creator",
    creatorAddress: req.body.creatorAddress || "0x8a92bb...72ffba",
    fileName,
    fileSize: fileSize || 102400,
    mimeType: mimeType || "application/octet-stream",
    sha256Hash,
    walrusBlobId: generatedBlobId,
    suiTxHash: generatedSuiTx,
    mintedTimestamp: new Date().toISOString(),
    licensingActive: licensePriceSui > 0,
    licensePriceSui: licensePriceSui || 0,
    licenseType: licenseType || "Standard",
    originalityScore: req.body.originalityScore || 98,
    aiScanned: true,
    status: "Sealed"
  });
});

// -------------------------------------------------------------
// Vite and Static Fallbacks
// -------------------------------------------------------------

async function initializeViteMiddleware() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware initialized.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production serving from: " + distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PROVENA infrastructure server running on port ${PORT}`);
  });
}

initializeViteMiddleware();

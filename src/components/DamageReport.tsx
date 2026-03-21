"use client";

import { useState } from "react";
import { Camera, Image as ImageIcon, Loader2, CheckCircle } from "lucide-react";

export default function DamageReport() {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ tag: string; severity: string; confidence: number } | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    
    // Simulating AI Analysis
    // In a real app, you'd upload to cloud storage and then call a Vision API
    setTimeout(() => {
      const results = [
        { tag: "Flood", severity: "HIGH", confidence: 0.92 },
        { tag: "Blocked Road", severity: "MEDIUM", confidence: 0.85 },
        { tag: "Structure Damage", severity: "CRITICAL", confidence: 0.78 }
      ];
      
      // Randomly pick one for demo
      const result = results[Math.floor(Math.random() * results.length)];
      setAiResult(result);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)", marginBottom: "2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>AI Damage Verification</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        Upload a photo of the disaster to get automated tagging and faster verification.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <label style={{ 
          flex: 1, 
          minWidth: "200px",
          height: "120px", 
          border: "2px dashed var(--border)", 
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer",
          transition: "background 0.2s"
        }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
           onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
          <ImageIcon size={32} color="var(--text-muted)" />
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Upload Photo</span>
          <input type="file" hidden onChange={handleUpload} accept="image/*" />
        </label>

        <button style={{ 
          flex: 1, 
          minWidth: "200px",
          height: "120px", 
          background: "rgba(37,99,235,0.1)",
          border: "1px solid var(--primary)",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer",
          color: "white"
        }}>
          <Camera size={32} color="var(--primary)" />
          <span style={{ fontSize: "0.875rem" }}>Take Camera Shot</span>
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "var(--primary)" }}>
          <Loader2 className="animate-spin" />
          <span>Analysing damage with AI...</span>
        </div>
      )}

      {aiResult && (
        <div style={{ 
          marginTop: "1.5rem", 
          padding: "1rem", 
          borderRadius: "1rem", 
          background: "rgba(34, 197, 94, 0.1)", 
          border: "1px solid var(--success)" 
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "var(--success)" }}>
            <CheckCircle size={20} />
            <span style={{ fontWeight: "700" }}>AI ANALYSIS COMPLETE</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Detected Type</p>
              <p style={{ fontWeight: "600" }}>{aiResult.tag}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Est. Severity</p>
              <p style={{ fontWeight: "600", color: aiResult.severity === "CRITICAL" ? "var(--danger)" : "var(--accent)" }}>{aiResult.severity}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

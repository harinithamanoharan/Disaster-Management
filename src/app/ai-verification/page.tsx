import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AIVerificationPage() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <ShieldAlert size={40} color="var(--primary)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>AI Verification</h1>
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "2rem" }}>
        AI Verification uses machine learning to analyze photos from disaster zones. By identifying the severity of damage, the system helps prioritize rescue targets and resource allocation.
      </p>
      <div style={{ padding: "2rem", background: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: "1rem" }}>How it Works</h2>
        <ul style={{ color: "var(--text-muted)", paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Automated Image Analysis</li>
          <li style={{ marginBottom: "0.5rem" }}>Damage Severity Scoring</li>
          <li style={{ marginBottom: "0.5rem" }}>Rescue Priority Mapping</li>
          <li>Fraud Prevention & Verification</li>
        </ul>
      </div>
    </div>
  );
}

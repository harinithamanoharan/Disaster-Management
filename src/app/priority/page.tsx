import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function SmartPriorityPage() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <Zap size={40} color="var(--accent)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Smart Priority</h1>
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "2rem" }}>
        Smart Priority uses AI-driven algorithms to match the most urgent needs with the nearest available resources. This ensures that help reaches those who need it most in the shortest possible time.
      </p>
      <div style={{ padding: "2rem", background: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: "1rem" }}>Efficiency Engines</h2>
        <ul style={{ color: "var(--text-muted)", paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Real-time Resource Tracking</li>
          <li style={{ marginBottom: "0.5rem" }}>Urgency-based Demand Scoring</li>
          <li style={{ marginBottom: "0.5rem" }}>Proximity Matching</li>
          <li>Dynamic Route Optimization</li>
        </ul>
      </div>
    </div>
  );
}

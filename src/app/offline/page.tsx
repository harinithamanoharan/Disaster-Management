import Link from "next/link";
import { Globe, ArrowLeft } from "lucide-react";

export default function OfflineFirstPage() {
  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <Globe size={40} color="var(--success)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Offline First</h1>
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "2rem" }}>
        Our platform is designed with an offline-first architecture. All requests and data are stored locally on the device and automatically synchronized with the server as soon as internet connectivity is restored.
      </p>
      <div style={{ padding: "2rem", background: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: "1rem" }}>Resilience Features</h2>
        <ul style={{ color: "var(--text-muted)", paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Local Storage of Critical Data</li>
          <li style={{ marginBottom: "0.5rem" }}>Automatic Background Sync</li>
          <li style={{ marginBottom: "0.5rem" }}>Conflict Resolution Strategy</li>
          <li>Zero-Latency Local Interactions</li>
        </ul>
      </div>
    </div>
  );
}

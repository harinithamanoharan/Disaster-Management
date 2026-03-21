"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function DisasterMapPage() {
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      {/* Absolute Header Overlay */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        background: "rgba(30, 41, 59, 0.9)",
        padding: "1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "0.5rem", fontWeight: "600" }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#f8fafc", margin: 0 }}>Disaster Map</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "5px 0 0 0" }}>Live tracking of incidents, rescue efforts, and resources.</p>
      </div>

      {/* Interactive Map */}
      <MapComponent />
    </div>
  );
}

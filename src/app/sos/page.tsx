"use client";

import { useState } from "react";
import Link from "next/link";
import { Radio, ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";

export default function SOSPage() {
  const [loading, setLoading] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const sendEmergencyAlert = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date(position.timestamp).toLocaleString(),
        };

        const res = await fetch("/api/sos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setAlertSent(true);
        } else {
          const data = await res.json();
          alert(data.error || "Failed to send emergency alert.");
        }
      } catch (err) {
        console.error("SOS Alert failed", err);
        alert("An error occurred while sending the emergency alert.");
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("Geolocation error", error);
      let errorMessage = "Failed to get location. Please enable location services.";
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage = "Location access denied. Please enable location permissions to send an SOS alert.";
      }
      alert(errorMessage);
      setLoading(false);
    });
  };

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <Radio size={40} color="var(--danger)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>SOS Response</h1>
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "3rem" }}>
        The SOS Response feature ensures that disaster victims can broadcast their GPS location even on low bandwidth or unstable connections. 
        One-click emergency lock triggers an immediate alert to nearby rescue teams and emergency services.
      </p>

      {alertSent ? (
        <div style={{ padding: "3rem", background: "rgba(239, 68, 68, 0.1)", border: "2px solid var(--danger)", borderRadius: "1.5rem", textAlign: "center", marginBottom: "3rem" }}>
          <AlertTriangle size={48} color="var(--danger)" style={{ margin: "0 auto 1.5rem" }} />
          <h2 style={{ color: "var(--danger)", marginBottom: "0.5rem" }}>🚨 Emergency Alert Sent!</h2>
          <p style={{ color: "white" }}>Help is on the way. Please stay where you are if safe.</p>
        </div>
      ) : (
        <button 
          onClick={sendEmergencyAlert}
          disabled={loading}
          style={{ 
            width: "100%", 
            padding: "2rem", 
            background: "var(--danger)", 
            color: "white", 
            border: "none", 
            borderRadius: "1.5rem", 
            fontSize: "1.5rem", 
            fontWeight: "800", 
            cursor: "pointer", 
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            boxShadow: "0 10px 30px -5px rgba(239, 68, 68, 0.5)",
            transition: "all 0.3s ease"
          }}
          className="sos-button-glow"
        >
          {loading ? <Loader2 className="animate-spin" size={32} /> : <Radio size={32} />}
          {loading ? "Sending..." : "Send Emergency Alert"}
          <style dangerouslySetInnerHTML={{ __html: `
            .sos-button-glow:hover { transform: scale(1.02); filter: brightness(1.1); }
            .sos-button-glow:active { transform: scale(0.98); }
          `}} />
        </button>
      )}

      <div style={{ padding: "2rem", background: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: "1rem" }}>Key Capabilities</h2>
        <ul style={{ color: "var(--text-muted)", paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>GPS Location Broadcasting</li>
          <li style={{ marginBottom: "0.5rem" }}>Low Bandwidth Optimization</li>
          <li style={{ marginBottom: "0.5rem" }}>Immediate Emergency Lock</li>
          <li>Real-time Notification to Rescuers</li>
        </ul>
      </div>
    </div>
  );
}


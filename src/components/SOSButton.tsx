"use client";

import { useState } from "react";
import { AlertCircle, MapPin, Loader2 } from "lucide-react";

export default function SOSButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSOS = async () => {
    setLoading(true);
    
    // 1. Get Location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        // 2. Trigger SOS Request
        const res = await fetch("/api/sos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat: latitude, lng: longitude }),
        });
        
        if (res.ok) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
      } catch (err) {
        console.error("SOS failed", err);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("Location access denied", error);
      setLoading(false);
    });
  };

  return (
    <div className="sos-section" style={{ 
      background: "rgba(239, 68, 68, 0.1)", 
      border: "1px solid rgba(239, 68, 68, 0.2)",
      borderRadius: "1.5rem",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "1.5rem",
      marginBottom: "2.5rem"
    }}>
      <div style={{ color: "var(--danger)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <AlertCircle size={24} />
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Emergency SOS</h2>
      </div>
      <p style={{ color: "var(--text-muted)", maxWidth: "500px" }}>
        Press the button below to instantly broadcast your location to nearby rescuers and emergency contacts.
      </p>
      
      <button 
        onClick={handleSOS}
        disabled={loading}
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: success ? "var(--success)" : "var(--danger)",
          border: "8px solid rgba(255, 255, 255, 0.1)",
          boxShadow: success ? "0 0 40px var(--success)" : "0 0 40px var(--danger)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: loading ? "scale(0.95)" : "scale(1)",
        }}
        className="sos-pulse"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={48} />
        ) : success ? (
          <>
            <MapPin size={48} />
            <span style={{ fontWeight: "700" }}>SENT!</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: "2.5rem", fontWeight: "800" }}>SOS</span>
            <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>TAP TO BROADCAST</span>
          </>
        )}
      </button>

      <style jsx>{`
        .sos-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 30px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
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

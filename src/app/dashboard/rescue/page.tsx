import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ShieldAlert, MapPin, Phone, AlertCircle } from "lucide-react";

export default async function RescueDashboard() {
  
  // Fetch high priority verified reports
  const reports = await prisma.helpRequest.findMany({
    where: { 
      OR: [
        { urgency: "CRITICAL" },
        { urgency: "HIGH" },
        { aiVerificationStatus: "VERIFIED" }
      ]
    },
    orderBy: [
      { priorityScore: "desc" },
      { createdAt: "desc" }
    ],
    take: 10
  });

  return (
    <div className="rescue-dashboard">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ShieldAlert color="var(--danger)" />
            Rescue Team Operations
          </h1>
          <p style={{ color: "var(--text-muted)" }}>Verified damage reports and high-priority rescue targets.</p>
        </div>
        <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--danger)", padding: "0.5rem 1rem", borderRadius: "2rem", fontWeight: "600", fontSize: "0.875rem" }}>
          LIVE EMERGENCY FEED
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
        {reports.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", background: "var(--card-bg)", borderRadius: "1.5rem", border: "1px solid var(--border)" }}>
            <AlertCircle size={48} color="var(--text-muted)" style={{ marginBottom: "1rem" }} />
            <p>No high-priority rescue requests at the moment.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} style={{ 
              background: "var(--card-bg)", 
              padding: "1.5rem", 
              borderRadius: "1.5rem", 
              border: `1px solid ${report.urgency === "CRITICAL" ? "var(--danger)" : "var(--border)"}`,
              display: "grid",
              gridTemplateColumns: "1fr 180px",
              gap: "2rem",
              alignItems: "center"
            }}>
              <div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ 
                    background: report.urgency === "CRITICAL" ? "var(--danger)" : "var(--accent)", 
                    color: "white", 
                    padding: "0.25rem 0.75rem", 
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "700"
                  }}>
                    {report.urgency}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    {new Date(report.createdAt).toLocaleTimeString()}
                  </span>
                  {report.aiVerificationStatus === "VERIFIED" && (
                    <span style={{ color: "var(--success)", fontSize: "0.75rem", fontWeight: "700", border: "1px solid var(--success)", padding: "0.2rem 0.5rem", borderRadius: "0.4rem" }}>
                      AI VERIFIED
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{report.type} Request</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>{report.description}</p>
                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                    <MapPin size={16} />
                    <span>Lat: {report.lat.toFixed(4)}, Lng: {report.lng.toFixed(4)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)" }}>
                    <Phone size={16} />
                    <span>Contact Victim</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <button className="primary-btn" style={{ margin: 0 }}>Assign Team</button>
                <button style={{ 
                  background: "transparent", 
                  border: "1px solid var(--border)", 
                  color: "white", 
                  padding: "0.75rem", 
                  borderRadius: "0.75rem",
                  cursor: "pointer"
                }}>
                  View on Map
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

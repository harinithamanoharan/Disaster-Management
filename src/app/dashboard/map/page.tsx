import DisasterMap from "@/components/DisasterMap";

export default function MapPage() {
  return (
    <div className="map-page" style={{ padding: "1rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#f8fafc" }}>Real-Time Disaster Map</h1>
        <p style={{ color: "var(--text-muted)" }}>View active incidents, rescue operations, and resource centers.</p>
      </header>

      <DisasterMap />
      
      {/* Legend */}
      <div style={{ 
        marginTop: "2rem", 
        display: "flex", 
        gap: "1.5rem", 
        flexWrap: "wrap", 
        background: "#1e293b", 
        padding: "1rem", 
        borderRadius: "1rem",
        border: "1px solid var(--border)"
      }}>
        <h3 style={{ width: "100%", fontSize: "1.125rem", marginBottom: "0.5rem", color: "#f8fafc" }}>Map Legend</h3>
        
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", border: "1px solid white" }}>🔥</div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Active Incidents</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", border: "1px solid white" }}>🚁</div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Rescue Teams</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", border: "1px solid white" }}>🛡️</div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Safe Shelters</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", border: "1px solid white" }}>📦</div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Relief Centers</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", border: "1px solid white" }}>🆘</div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Emergency SOS</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", border: "1px solid white" }}>🙋</div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Help Requests</span>
        </div>
      </div>
    </div>
  );
}

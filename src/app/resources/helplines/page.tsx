import Link from "next/link";
import { ArrowLeft, Phone, Ambulance, Flame, ShieldAlert, HeartHandshake } from "lucide-react";

export default function HelplinesPage() {
  const helplines = [
    { icon: <Ambulance size={24} />, title: "Ambulance", number: "108", desc: "Emergency medical services and transport." },
    { icon: <Flame size={24} />, title: "Fire Department", number: "101", desc: "Report fires, structural collapses, and related emergencies." },
    { icon: <ShieldAlert size={24} />, title: "Police", number: "100", desc: "Law enforcement, security, and immediate life-threatening situations." },
    { icon: <HeartHandshake size={24} />, title: "Disaster Management Hotline", number: "1078", desc: "National disaster management round-the-clock emergency operations." }
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/resources" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Resources
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <Phone size={40} color="var(--accent)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Emergency Helplines</h1>
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "3rem" }}>
        Important emergency contact numbers such as ambulance, fire department, police, and disaster management helplines.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {helplines.map((item, i) => (
          <div key={i} style={{ padding: "1.5rem", background: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--danger, #ef4444)", padding: "0.75rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: "50%" }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: "1.25rem", margin: 0 }}>{item.title}</h3>
            </div>
            
            <a href={`tel:${item.number}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "0.5rem", textAlign: "center", border: "1px dashed var(--border)", transition: "all 0.2s ease" }}>
                <span style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text)", letterSpacing: "2px" }}>{item.number}</span>
              </div>
            </a>
            
            <p style={{ color: "var(--text-muted)", lineHeight: "1.5", fontSize: "0.9375rem" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { 
  BookOpen, 
  ArrowLeft, 
  Package, 
  MapPin, 
  Phone, 
  ShieldAlert, 
  Droplets, 
  Home, 
  AlertCircle, 
  ShieldCheck,
  Flame,
  Wind,
  Zap
} from "lucide-react";

export default function ResourcesPage() {
  const reliefCenters = [
    { name: "Chennai Relief Hub", location: "Koyambedu, Chennai", contact: "044-24794242" },
    { name: "Madurai Distribution Point", location: "Anna Nagar, Madurai", contact: "0452-2533344" },
    { name: "Coimbatore Supply Center", location: "RS Puram, Coimbatore", contact: "0422-2300100" },
  ];

  const shelterLocations = [
    { name: "Tamil Nadu State Shelter", location: "Saidapet, Chennai", capacity: "500 People" },
    { name: "Trichy Community Hall", location: "Cantt Area, Trichy", capacity: "300 People" },
    { name: "Salem Relief Camp", location: "Steel Plant Road, Salem", capacity: "200 People" },
  ];

  const helplines = [
    { name: "National Emergency", number: "112", icon: <AlertCircle size={20} /> },
    { name: "Ambulance", number: "108", icon: <Droplets size={20} /> },
    { name: "Fire", number: "101", icon: <Flame size={20} /> },
    { name: "Police", number: "100", icon: <ShieldCheck size={20} /> },
    { name: "NDMA Helpline", number: "1078", icon: <Zap size={20} /> },
    { name: "TN Disaster Helpline", number: "1070", icon: <Package size={20} /> },
    { name: "Flood Relief", number: "044-28524500", icon: <Droplets size={20} /> },
  ];

  const safetyTips = [
    { title: "Flood Safety", tips: ["Move to higher ground", "Avoid walking/driving through flood water", "Keep emergency kit ready"], icon: <Droplets size={24} color="#3b82f6" /> },
    { title: "Earthquake Safety", tips: ["Drop, Cover, and Hold on", "Stay away from glass/windows", "If outside, move to open area"], icon: <Zap size={24} color="#f59e0b" /> },
    { title: "Cyclone Safety", tips: ["Stay indoors until officially cleared", "Disconnect electrical appliances", "Keep battery radio for updates"], icon: <Wind size={24} color="#10b981" /> },
    { title: "Fire Safety", tips: ["Crawl low under smoke", "Stop, Drop, and Roll if clothes catch fire", "Have an escape plan"], icon: <Flame size={24} color="#ef4444" /> },
  ];

  const sectionStyle: React.CSSProperties = {
    marginBottom: "4rem",
  };

  const cardStyle: React.CSSProperties = {
    padding: "1.5rem",
    background: "var(--card-bg)",
    borderRadius: "1rem",
    border: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "1.75rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <BookOpen size={40} color="var(--accent)" />
        <h1 style={{ fontSize: "3rem", fontWeight: "800" }}>Disaster Resources</h1>
      </div>
      <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "4rem" }}>
        Comprehensive directory of relief supplies, shelters, emergency contacts, and safety manuals for disaster response.
      </p>

      {/* Section 1: Relief Supplies */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}><Package color="var(--primary)" /> Relief Supplies</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {reliefCenters.map((center, i) => (
            <div key={i} style={cardStyle}>
              <h3 style={{ fontSize: "1.25rem" }}>{center.name}</h3>
              <div style={{ color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={16} /> {center.location}</p>
                <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Phone size={16} /> {center.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Shelter Locations */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}><Home color="var(--primary)" /> Shelter Locations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {shelterLocations.map((shelter, i) => (
            <div key={i} style={cardStyle}>
              <h3 style={{ fontSize: "1.25rem" }}>{shelter.name}</h3>
              <div style={{ color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={16} /> {shelter.location}</p>
                <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Package size={16} /> Capacity: {shelter.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Emergency Helplines */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}><Phone color="var(--primary)" /> Emergency Helplines</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {helplines.map((help, i) => (
            <div key={i} style={{ ...cardStyle, alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: 'var(--primary)' }}>
                {help.icon}
              </div>
              <div>
                <h4 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{help.name}</h4>
                <a href={`tel:${help.number}`} style={{ color: "var(--primary)", fontSize: "1.25rem", fontWeight: "700", textDecoration: "none" }}>{help.number}</a>
              </div>
              <a 
                href={`tel:${help.number}`}
                style={{ width: "100%", padding: "0.75rem", background: "var(--primary)", color: "white", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "600", fontSize: "0.875rem", marginTop: "0.5rem" }}
              >
                Call Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Safety Guides */}
      <section style={{ ...sectionStyle, marginBottom: "0" }}>
        <h2 style={headingStyle}><ShieldAlert color="var(--primary)" /> Safety Guides</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {safetyTips.map((guide, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ marginBottom: "0.5rem" }}>{guide.icon}</div>
              <h3 style={{ fontSize: "1.25rem" }}>{guide.title}</h3>
              <ul style={{ color: "var(--text-muted)", paddingLeft: "1.25rem", fontSize: "0.875rem" }}>
                {guide.tips.map((tip, j) => (
                  <li key={j} style={{ marginBottom: "0.25rem" }}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

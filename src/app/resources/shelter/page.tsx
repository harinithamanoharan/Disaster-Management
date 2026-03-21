import Link from "next/link";
import { ArrowLeft, MapPin, Home, Tent, Navigation } from "lucide-react";

export default function ShelterPage() {
  const shelters = [
    { icon: <Home size={24} />, title: "Safe Shelters", desc: "Designated community buildings and schools actively operating as safe shelters." },
    { icon: <Tent size={24} />, title: "Temporary Camps", desc: "Makeshift camp locations set up by relief organizations offering basic living amenities." },
    { icon: <Navigation size={24} />, title: "Evacuation Centers", desc: "Primary assembly points for organized relocations to safer areas." }
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/resources" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Resources
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <MapPin size={40} color="var(--accent)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Shelter Locations</h1>
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "3rem" }}>
        Displaying safe shelters, temporary camps, and evacuation centers where people can stay during disasters.
      </p>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {shelters.map((item, i) => (
          <div key={i} style={{ padding: "1.5rem", background: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--border)", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
            <div style={{ color: "var(--primary)", padding: "1rem", background: "rgba(var(--primary-rgb), 0.1)", borderRadius: "50%" }}>
              {item.icon}
            </div>
            <div>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>{item.title}</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.5" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

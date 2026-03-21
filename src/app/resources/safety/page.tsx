import Link from "next/link";
import { ArrowLeft, BookOpen, Waves, Zap, Wind, Flame } from "lucide-react";

export default function SafetyPage() {
  const guides = [
    { icon: <Waves size={24} />, title: "Floods", items: ["Move to higher ground immediately.", "Avoid walking or driving through flood waters.", "Disconnect electrical appliances before evacuating."] },
    { icon: <Zap size={24} />, title: "Earthquakes", items: ["Drop to your hands and knees.", "Cover your head and neck under a sturdy table.", "Hold on until the shaking stops."] },
    { icon: <Wind size={24} />, title: "Cyclones", items: ["Stay indoors and away from windows.", "Secure loose outdoor objects.", "Turn off utilities if instructed to do so."] },
    { icon: <Flame size={24} />, title: "Fires", items: ["Get out immediately and stay out.", "Crawl low under any smoke to your exit.", "Once outside, call emergency services."] }
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/resources" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Resources
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <BookOpen size={40} color="var(--accent)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Safety Guides</h1>
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "3rem" }}>
        Essential safety instructions for surviving various natural and environmental disasters.
      </p>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {guides.map((guide, i) => (
          <div key={i} style={{ padding: "1.5rem", background: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--border)", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
            <div style={{ color: "var(--primary)", padding: "1rem", background: "rgba(var(--primary-rgb), 0.1)", borderRadius: "50%" }}>
              {guide.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem", display: "flex", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>{guide.title}</h3>
              <ul style={{ color: "var(--text-muted)", lineHeight: "1.6", paddingLeft: "1.5rem", margin: 0 }}>
                {guide.items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "0.5rem" }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

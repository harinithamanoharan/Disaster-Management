import Link from "next/link";
import { ShieldAlert, Globe, Radio, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="landing-page" style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      background: "radial-gradient(circle at top right, rgba(37, 99, 235, 0.15), transparent), radial-gradient(circle at bottom left, rgba(245, 158, 11, 0.1), transparent)"
    }}>
      <nav style={{ padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.5rem", fontWeight: "700" }}>
          <div style={{ width: "32px", height: "32px", background: "var(--primary)", borderRadius: "0.5rem" }}></div>
          DisasterHelp
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/login" style={{ color: "var(--text-muted)", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link href="/signup" className="primary-btn" style={{ margin: 0, padding: "0.6rem 1.5rem" }}>Get Started</Link>
        </div>
      </nav>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--primary)", padding: "0.5rem 1rem", borderRadius: "2rem", fontWeight: "600", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
          RESILIENT COORDINATION PLATFORM
        </div>
        <h1 style={{ fontSize: "4rem", fontWeight: "800", maxWidth: "900px", lineHeight: "1.1", marginBottom: "1.5rem" }}>
          Saving Lives Through <span style={{ background: "linear-gradient(to right, #60a5fa, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Real-Time Coordination</span>
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", marginBottom: "3rem" }}>
          connecting disaster victims with volunteers and emergency services instantly. Built with AI verification and offline resilience.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/volunteer" className="primary-btn" style={{ padding: "1rem 2.5rem", fontSize: "1.125rem", textDecoration: "none" }}>Join as Volunteer</Link>
          <Link href="/disaster-map" style={{ 
            padding: "1rem 2.5rem", 
            borderRadius: "0.75rem", 
            border: "1px solid var(--border)", 
            color: "white", 
            textDecoration: "none",
            fontWeight: "600",
            background: "rgba(255,255,255,0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }} className="secondary-btn-hover">Browse Disaster Map</Link>
          <style dangerouslySetInnerHTML={{ __html: `
            .secondary-btn-hover:hover {
              background: rgba(255, 255, 255, 0.1);
              border-color: var(--primary);
            }
          `}} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1100px", marginTop: "6rem" }}>
          <FeatureCard 
            href="/sos"
            icon={<Radio color="var(--danger)" />} 
            title="SOS Response" 
            desc="One-click emergency lock with GPS broadcast even on low bandwidth." 
          />
          <FeatureCard 
            href="/help-request"
            icon={<ShieldAlert color="var(--primary)" />} 
            title="Help Request" 
            desc="Submit a request for food, medical support, or rescue assistance." 
          />
          <FeatureCard 
            href="/volunteer"
            icon={<Globe color="var(--success)" />} 
            title="Volunteer" 
            desc="Join our community to help those in need during disasters." 
          />
          <FeatureCard 
            href="/resources"
            icon={<Zap color="var(--accent)" />} 
            title="Resources" 
            desc="Find relief supplies, shelter locations, and safety guides." 
          />
        </div>
      </main>

      <footer style={{ padding: "3rem", borderTop: "1px solid var(--border)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>
        © 2026 Disaster Help Coordination Platform. Open Source for Global Resilience.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, href }: any) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div className="feature-card" style={{ 
        background: "var(--card-bg)", 
        padding: "2rem", 
        borderRadius: "1.5rem", 
        border: "1px solid var(--border)", 
        textAlign: "left",
        transition: "all 0.3s ease",
        cursor: "pointer",
        height: "100%"
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .feature-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.2);
            background: rgba(255, 255, 255, 0.03);
          }
        `}} />
        <div style={{ marginBottom: "1.5rem" }}>{icon}</div>
        <h3 style={{ marginBottom: "0.75rem" }}>{title}</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: "1.5" }}>{desc}</p>
      </div>
    </Link>
  );
}

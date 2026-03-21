import { auth } from "@/auth";
import SOSButton from "@/components/SOSButton";
import { prisma } from "@/lib/prisma";
import { 
  Users, 
  MapPin, 
  CheckCircle2 
} from "lucide-react";

async function getStats() {
  const [requestCount, volunteerCount, activeSOS] = await Promise.all([
    prisma.helpRequest.count({ where: { status: "PENDING" } }),
    prisma.user.count({ where: { role: "VOLUNTEER" } }),
    prisma.helpRequest.count({ where: { type: "SOS", status: "PENDING" } }),
  ]);

  return { requestCount, volunteerCount, activeSOS };
}

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getStats();
  const role = (session?.user as { role?: string })?.role;

  return (
    <div className="dashboard-page">
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          Welcome, {session?.user?.name}
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          {role === "VICTIM" 
            ? "Stay safe. Request help if you need it." 
            : "Thank you for volunteering. Browse requests to help others."}
        </p>
      </header>

      {role === "VICTIM" && <SOSButton />}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, min-max(240px, 1fr))", 
        gap: "1.5rem",
        marginBottom: "3rem"
      }}>
        <StatCard 
          title="Active Requests" 
          value={stats.requestCount} 
          icon={<MapPin color="var(--primary)" />} 
          color="rgba(37, 99, 235, 0.1)" 
        />
        <StatCard 
          title="Available Volunteers" 
          value={stats.volunteerCount} 
          icon={<Users color="var(--success)" />} 
          color="rgba(34, 197, 94, 0.1)" 
        />
        <StatCard 
          title="Active SOS Alerts" 
          value={stats.activeSOS} 
          icon={<AlertCircle color="var(--danger)" />} 
          color="rgba(239, 68, 68, 0.1)" 
        />
        <StatCard 
          title="Completed Help" 
          value="124" 
          icon={<CheckCircle2 color="var(--accent)" />} 
          color="rgba(245, 158, 11, 0.1)" 
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "1.25rem", border: "1px solid var(--border)" }}>
           <h3 style={{ marginBottom: "1.5rem" }}>Recent Requests</h3>
           <p style={{ color: "var(--text-muted)" }}>Loading recent activity...</p>
        </div>
        <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "1.25rem", border: "1px solid var(--border)" }}>
           <h3 style={{ marginBottom: "1.5rem" }}>Quick Actions</h3>
           <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
             <button className="primary-btn" style={{ margin: 0 }}>Request New Help</button>
             {role === "VOLUNTEER" && <button className="primary-btn" style={{ margin: 0, background: "var(--success)" }}>Offer Supplies</button>}
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div style={{ 
      background: "var(--card-bg)", 
      padding: "1.5rem", 
      borderRadius: "1.25rem", 
      border: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }}>
      <div style={{ 
        width: "48px", 
        height: "48px", 
        borderRadius: "0.75rem", 
        background: color, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        {icon}
      </div>
      <div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: "600" }}>{title}</p>
        <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>{value}</p>
      </div>
    </div>
  );
}

function AlertCircle({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  );
}

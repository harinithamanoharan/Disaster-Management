import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BarChart3, TrendingUp, Users, Package, AlertCircle } from "lucide-react";

async function getAnalytics() {
  const [totalRequests, activeVolunteers, criticalRequests, completedRequests] = await Promise.all([
    prisma.helpRequest.count(),
    prisma.user.count({ where: { role: "VOLUNTEER" } }),
    prisma.helpRequest.count({ where: { urgency: "CRITICAL" } }),
    prisma.helpRequest.count({ where: { status: "COMPLETED" } }),
  ]);

  return { totalRequests, activeVolunteers, criticalRequests, completedRequests };
}

export default async function AnalyticsPage() {
  const stats = await getAnalytics();

  return (
    <div className="analytics-page">
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <BarChart3 />
          Disaster Analytics Dashboard
        </h1>
        <p style={{ color: "var(--text-muted)" }}>Regional demand tracking and resource distribution metrics.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
         <MetricCard title="Total Help Requests" value={stats.totalRequests} icon={<AlertCircle color="var(--primary)" />} trend="+12% from yesterday" />
         <MetricCard title="Active Volunteers" value={stats.activeVolunteers} icon={<Users color="var(--success)" />} trend="+5 new today" />
         <MetricCard title="Critical Situations" value={stats.criticalRequests} icon={<TrendingUp color="var(--danger)" />} trend="Focus required here" />
         <MetricCard title="Resources Distributed" value={stats.completedRequests} icon={<Package color="var(--accent)" />} trend="284 units today" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
         <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)" }}>
            <h3 style={{ marginBottom: "1.5rem" }}>Regional Demand Heatmap</h3>
            <div style={{ height: "300px", background: "rgba(0,0,0,0.2)", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
               [Regional Heatmap Visualization Placeholder]
            </div>
         </div>
         <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)" }}>
            <h3 style={{ marginBottom: "1.5rem" }}>Demand by Category</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
               <CategoryBar label="Food" percentage={65} color="var(--primary)" />
               <CategoryBar label="Medical" percentage={45} color="var(--danger)" />
               <CategoryBar label="Shelter" percentage={30} color="var(--accent)" />
               <CategoryBar label="Rescue" percentage={20} color="var(--success)" />
            </div>
         </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend }: { title: string; value: string | number; icon: React.ReactNode; trend: string }) {
  return (
    <div style={{ background: "var(--card-bg)", padding: "1.5rem", borderRadius: "1.25rem", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.75rem" }}>{icon}</div>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{trend}</span>
      </div>
      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{title}</p>
      <p style={{ fontSize: "2rem", fontWeight: "700" }}>{value}</p>
    </div>
  );
}

function CategoryBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.4rem" }}>
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div style={{ height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ width: `${percentage}%`, height: "100%", background: color }}></div>
      </div>
    </div>
  );
}

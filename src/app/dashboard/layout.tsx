import { useSession, SessionProvider } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardContent>{children}</DashboardContent>
    </SessionProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [lowBandwidth, setLowBandwidth] = useState(false);

  if (status === "loading") return <div className="p-8 text-center text-muted">Loading session...</div>;
  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any)?.role || "VICTIM";

  return (
    <div className={`dashboard-layout ${lowBandwidth ? "low-bandwidth" : ""}`}>
      <Sidebar role={role} />
      <main className="main-content">
        <div style={{ 
          marginBottom: "1rem", 
          display: "flex", 
          justifyContent: "flex-end",
          fontSize: "0.75rem" 
        }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "var(--text-muted)" }}>
            <input 
              type="checkbox" 
              checked={lowBandwidth} 
              onChange={() => setLowBandwidth(!lowBandwidth)} 
            />
            Low-Bandwidth Mode
          </label>
        </div>
        {children}
      </main>

      <style jsx global>{`
        .low-bandwidth * {
          background-image: none !important;
          animation: none !important;
          transition: none !important;
        }
        .low-bandwidth body {
          background: #000 !important;
        }
        .low-bandwidth img, .low-bandwidth .logo-icon {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

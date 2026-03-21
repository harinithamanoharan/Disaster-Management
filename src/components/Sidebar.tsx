"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Map as MapIcon, 
  AlertTriangle, 
  HandHelping, 
  LogOut,
  BarChart3,
  ShieldAlert
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Disaster Map", icon: <MapIcon size={20} />, path: "/dashboard/map" },
    { name: "My Requests", icon: <AlertTriangle size={20} />, path: "/dashboard/requests" },
  ];

  if (role === "VOLUNTEER" || role === "ADMIN") {
    menuItems.push({ name: "Offer Help", icon: <HandHelping size={20} />, path: "/dashboard/offers" });
  }

  if (role === "ADMIN") {
    menuItems.push({ name: "Analytics", icon: <BarChart3 size={20} />, path: "/dashboard/analytics" });
    menuItems.push({ name: "Rescue Center", icon: <ShieldAlert size={20} />, path: "/dashboard/rescue" });
  }

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon"></div>
        DisasterHelp
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: "none" }}>
          {menuItems.map((item) => (
            <li key={item.path} style={{ marginBottom: "0.5rem" }}>
              <Link 
                href={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  color: pathname === item.path ? "white" : "var(--text-muted)",
                  background: pathname === item.path ? "rgba(37, 99, 235, 0.2)" : "transparent",
                  transition: "all 0.2s"
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
        <button 
          onClick={() => signOut()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            width: "100%",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

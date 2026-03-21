import { auth } from "@/auth";
import HelpRequestForm from "@/components/HelpRequestForm";
import { prisma } from "@/lib/prisma";

export default async function RequestsPage() {
  const session = await auth();
  
  const myRequests = await prisma.helpRequest.findMany({
    where: { requesterId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="requests-page">
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem" }}>Help Requests</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
        <HelpRequestForm />

        <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)" }}>
           <h3 style={{ marginBottom: "1.5rem" }}>My Active Requests</h3>
           {myRequests.length === 0 ? (
             <p style={{ color: "var(--text-muted)" }}>You haven&apos;t submitted any requests yet.</p>
           ) : (
             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
               {myRequests.map((req: { id: string; type: string; status: string; description: string | null }) => (
                 <div key={req.id} style={{ 
                   padding: "1rem", 
                   borderRadius: "0.75rem", 
                   border: "1px solid var(--border)",
                   background: "rgba(15, 23, 42, 0.4)"
                 }}>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                     <span style={{ fontWeight: "700", color: "var(--primary)" }}>{req.type}</span>
                     <span style={{ 
                       padding: "0.25rem 0.5rem", 
                       borderRadius: "0.5rem", 
                       fontSize: "0.75rem",
                       background: req.status === "PENDING" ? "rgba(245, 158, 11, 0.2)" : "rgba(34, 197, 94, 0.2)",
                       color: req.status === "PENDING" ? "var(--accent)" : "var(--success)"
                     }}>
                       {req.status}
                     </span>
                   </div>
                   <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{req.description}</p>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

"use client";

// Simple Offline Store using localStorage with Sync support
export const OfflineStore = {
  saveRequest: (request: unknown) => {
    const queue = JSON.parse(localStorage.getItem("offline_requests") || "[]");
    queue.push({ ...(request as Record<string, unknown>), id: crypto.randomUUID(), offline: true, timestamp: Date.now() });
    localStorage.setItem("offline_requests", JSON.stringify(queue));
    console.log("Request saved offline:", request);
  },

  getQueue: () => {
    return JSON.parse(localStorage.getItem("offline_requests") || "[]");
  },

  sync: async () => {
    const queue = OfflineStore.getQueue();
    if (queue.length === 0) return;

    console.log("Attempting to sync offline requests...");
    
    for (const req of queue) {
      try {
        const res = await fetch("/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req),
        });
        
        if (res.ok) {
          // Remove from queue if successful
          const currentQueue = OfflineStore.getQueue();
          const newQueue = currentQueue.filter((item: { id: string }) => item.id !== req.id);
          localStorage.setItem("offline_requests", JSON.stringify(newQueue));
        }
      } catch (err) {
        console.error("Sync failed for request", req.id, err);
      }
    }
  }
};

// Global listener for online status
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    console.log("Stable connection restored. Triggering sync...");
    OfflineStore.sync();
  });
}

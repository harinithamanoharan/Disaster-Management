"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createCustomIcon = (color: string, isBig = false) => {
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: ${isBig ? '30px' : '20px'}; height: ${isBig ? '30px' : '20px'}; border-radius: 50%; border: ${isBig ? '4px' : '2px'} solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    className: '',
    iconSize: isBig ? [30, 30] : [20, 20],
    iconAnchor: isBig ? [15, 15] : [10, 10],
    popupAnchor: [0, isBig ? -15 : -10],
  });
};

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function Map() {
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [osmData, setOsmData] = useState<any[]>([]);
  const [disasters, setDisasters] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState<number>(5);

  const fetchData = async () => {
    try {
      // 1. Fetch live requests
      console.log("Fetching /api/requests...");
      const res = await fetch("/api/requests");
      if (res.ok) {
        const data = await res.json();
        console.log("Loaded Help Requests:", data);
        setRequests(data);

        if (data && data.length > 0) {
          // Find latest valid coordinates
          const latest = data.find((r: any) => r.lat !== 0 && r.lng !== 0);
          if (latest) {
            setMapCenter([latest.lat, latest.lng]);
            setMapZoom(12);
            console.log("Latest request found at:", latest.lat, latest.lng);
            
            // 2. Query OSM for nearby infrastructure (10km)
            const overpassQuery = `
              [out:json];
              (
                node["social_facility"="shelter"](around:10000,${latest.lat},${latest.lng});
                node["amenity"="hospital"](around:10000,${latest.lat},${latest.lng});
                node["amenity"="school"](around:10000,${latest.lat},${latest.lng});
              );
              out;
            `;
            
            
            console.log("Querying Overpass API for nearby infrastructure...");
            const osmRes = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
            if (osmRes.ok) {
              const osmJson = await osmRes.json();
              console.log("Loaded OSM Infrastructure:", osmJson.elements?.length || 0, "items");
              setOsmData(osmJson.elements || []);
            } else {
              console.error("Overpass API failed:", osmRes.statusText);
            }
          }
        } else {
           console.log("No help requests found in DB.");
        }
      } else {
         console.error("Failed to fetch /api/requests:", res.statusText);
      }

      // 3. Fetch automated disasters from ReliefWeb
      console.log("Fetching /api/disasters...");
      const disRes = await fetch("/api/disasters");
      if (disRes.ok) {
        const disData = await disRes.json();
        console.log("Loaded ReliefWeb Disasters:", disData.length, "items");
        setDisasters(disData || []);
      } else {
        console.error("Failed to fetch /api/disasters:", disRes.statusText);
      }

    } catch (err) {
      console.error("Failed to fetch map data", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    // fetchData(); // Removed from here to avoid synchronous setState in effect
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchData(); // Initial fetch after mount
    }
  }, [mounted]);

  if (!mounted) return <div style={{ height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Map...</div>;

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: "100%", width: "100%" }}
      >
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Render Help Requests */}
        {requests.map((req) => (
          <Marker 
            key={req.id} 
            position={[req.lat, req.lng]} 
            icon={req.type === "SOS" ? createCustomIcon("#ef4444", true) : createCustomIcon("#f97316", true)}
          >
            <Popup>
              <div style={{ color: "#1e293b", minWidth: "150px" }}>
                <h4 style={{ margin: 0, color: req.type === "SOS" ? "#ef4444" : "#f97316", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>
                  {req.type === "SOS" ? "Emergency SOS" : "Help Request"}
                </h4>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>Location: {req.lat.toFixed(4)}, {req.lng.toFixed(4)}</p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>{req.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                   <span>Urgency: <b>{req.urgency}</b></span>
                   <span>People: <b>{req.peopleAffected}</b></span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render ReliefWeb Auto-Detected Disasters */}
        {disasters.map((disaster) => (
          <Marker 
            key={disaster.id} 
            position={[disaster.lat, disaster.lng]} 
            icon={createCustomIcon("#ef4444", true)} // Red
          >
            <Popup>
              <div style={{ color: "#1e293b", minWidth: "150px" }}>
                <h4 style={{ margin: 0, color: "#ef4444", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>
                  Active Disaster
                </h4>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>{disaster.name}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.875rem", color: "#64748b", marginTop: "4px" }}>
                   <span>Status: <b>{disaster.status === "ongoing" ? "Ongoing" : "Past"}</b></span>
                   <span>Date: {new Date(disaster.date).toLocaleDateString()}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render OSM Data */}
        {osmData.map((node) => {
          let type = "Unknown";
          let color = "#cbd5e1"; // Gray default
          
          if (node.tags?.social_facility === "shelter") { type = "Shelter"; color = "#10b981"; /* Green */ }
          else if (node.tags?.amenity === "hospital") { type = "Hospital"; color = "#3b82f6"; /* Blue */ }
          else if (node.tags?.amenity === "school") { type = "School / Relief Camp"; color = "#a855f7"; /* Purple */ }

          // Haversine distance calculator
          const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
            const p = 0.017453292519943295;    
            const c = Math.cos;
            const a = 0.5 - c((lat2 - lat1) * p)/2 + 
                    c(lat1 * p) * c(lat2 * p) * 
                    (1 - c((lon2 - lon1) * p))/2;
            return 12742 * Math.asin(Math.sqrt(a)); 
          };

          const distance = getDistance(mapCenter[0], mapCenter[1], node.lat, node.lon).toFixed(1);
          
          return (
            <Marker key={node.id} position={[node.lat, node.lon]} icon={createCustomIcon(color)}>
              <Popup>
                 <div style={{ color: "#1e293b", minWidth: "150px" }}>
                  <h4 style={{ margin: 0, color, borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>
                    {type}
                  </h4>
                  <p style={{ margin: "5px 0", fontWeight: "bold" }}>{node.tags?.name || "Unnamed Facility"}</p>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>Distance: {distance} km away</p>
                  {node.tags?.["addr:full"] && <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "#64748b" }}>{node.tags["addr:full"]}</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Legend Override Overlay */}
      <div style={{
        position: "absolute",
        bottom: "30px",
        left: "30px",
        zIndex: 1000,
        background: "rgba(30, 41, 59, 0.9)",
        padding: "1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        color: "#f8fafc",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
      }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "1rem" }}>Map Legend</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#ef4444", border: "2px solid white" }}></div>
          <span style={{ fontSize: "0.875rem" }}>Emergency SOS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#f97316", border: "2px solid white" }}></div>
          <span style={{ fontSize: "0.875rem" }}>Help Request</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#10b981", border: "2px solid white" }}></div>
          <span style={{ fontSize: "0.875rem" }}>Nearby Shelter</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#3b82f6", border: "2px solid white" }}></div>
          <span style={{ fontSize: "0.875rem" }}>Nearby Hospital</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#a855f7", border: "2px solid white" }}></div>
          <span style={{ fontSize: "0.875rem" }}>School / Relief Camp</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet elements (SSR bypass)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Mock Data
const incidentsData = [
  { id: 1, lat: 19.0760, lng: 72.8777, type: "Severe Flooding", desc: "Water levels rising rapidly." },
  { id: 2, lat: 28.7041, lng: 77.1025, type: "Industrial Fire", desc: "Large fire at chemical plant." },
];

const rescueTeamsData = [
  { id: 1, lat: 19.1, lng: 72.9, name: "Alpha Rescue Unit", status: "Active Search" },
  { id: 2, lat: 28.6, lng: 77.2, name: "Bravo Evac Team", status: "Evacuating residents" },
];

const sheltersData = [
  { id: 1, lat: 19.2, lng: 72.8, name: "City Stadium Safe Zone", capacity: "500/1000" },
  { id: 2, lat: 28.8, lng: 77.0, name: "North Community Hall", capacity: "120/200" },
];

const reliefCentersData = [
  { id: 1, lat: 18.9, lng: 72.8, name: "Central Relief Station", resources: "Food, Water, Meds" },
  { id: 2, lat: 28.5, lng: 77.3, name: "East Supply Hub", resources: "Blankets, Water" },
];

export default function DisasterMap() {
  const [requests, setRequests] = useState<any[]>([]);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Load Leaflet library for icons/markers
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });

    // Fetch user help requests
    fetch("/api/requests")
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  if (!L) return <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Map...</div>;

  // Custom Icons logic
  const createCustomIcon = (color: string, iconHtml: string) => {
    return new L.DivIcon({
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5); font-size: 16px;">${iconHtml}</div>`,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
  };

  const icons = {
    incident: createCustomIcon("#ef4444", "🔥"),     // Red
    rescue: createCustomIcon("#f59e0b", "🚁"),       // Amber/Orange
    shelter: createCustomIcon("#10b981", "🛡️"),      // Green
    relief: createCustomIcon("#8b5cf6", "📦"),       // Purple
    sos: createCustomIcon("#dc2626", "🆘"),          // Dark Red
    request: createCustomIcon("#3b82f6", "🙋"),     // Blue
  };

  return (
    <div style={{ height: "600px", width: "100%", borderRadius: "1.5rem", overflow: "hidden", border: "1px solid var(--border)" }}>
      <MapContainer 
        center={[23, 75]} // Central India approx
        zoom={5} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Incidents */}
        {incidentsData.map((incident) => (
          <Marker key={`inc-${incident.id}`} position={[incident.lat, incident.lng]} icon={icons.incident}>
            <Popup>
              <div style={{ color: "#1e293b", minWidth: "150px" }}>
                <h4 style={{ margin: 0, color: "#ef4444", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>Active Incident</h4>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>{incident.type}</p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>{incident.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Rescue Teams */}
        {rescueTeamsData.map((team) => (
          <Marker key={`rescue-${team.id}`} position={[team.lat, team.lng]} icon={icons.rescue}>
            <Popup>
              <div style={{ color: "#1e293b", minWidth: "150px" }}>
                <h4 style={{ margin: 0, color: "#f59e0b", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>Rescue Team</h4>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>{team.name}</p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>Status: {team.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Shelters */}
        {sheltersData.map((shelter) => (
          <Marker key={`shelter-${shelter.id}`} position={[shelter.lat, shelter.lng]} icon={icons.shelter}>
            <Popup>
              <div style={{ color: "#1e293b", minWidth: "150px" }}>
                <h4 style={{ margin: 0, color: "#10b981", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>Safe Shelter</h4>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>{shelter.name}</p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>Capacity: {shelter.capacity}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Relief Centers */}
        {reliefCentersData.map((center) => (
          <Marker key={`relief-${center.id}`} position={[center.lat, center.lng]} icon={icons.relief}>
            <Popup>
              <div style={{ color: "#1e293b", minWidth: "150px" }}>
                <h4 style={{ margin: 0, color: "#8b5cf6", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>Relief Center</h4>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>{center.name}</p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>Resources: {center.resources}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User Help Requests */}
        {requests.map((req: any) => (
          <Marker 
            key={`req-${req.id}`} 
            position={[req.lat, req.lng]} 
            icon={req.type === "SOS" ? icons.sos : icons.request}
          >
            <Popup>
              <div style={{ color: "#1e293b", minWidth: "150px" }}>
                <h4 style={{ margin: 0, color: req.type === "SOS" ? "#dc2626" : "#3b82f6", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px" }}>
                  {req.type === "SOS" ? "Emergency SOS" : "Help Request"}
                </h4>
                <p style={{ margin: "5px 0", fontSize: "0.875rem" }}>{req.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                   <span>Urgency: <b>{req.urgency}</b></span>
                   <span>People: <b>{req.peopleAffected}</b></span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

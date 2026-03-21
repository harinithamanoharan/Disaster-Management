"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

const HELP_TYPES = ["FOOD", "SHELTER", "MEDICINE", "RESCUE", "TRANSPORT"];
const URGENCY_LEVELS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function HelpRequestForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: "FOOD",
    description: "",
    urgency: "MEDIUM",
    peopleAffected: 1,
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Nominatim to geocode the location string
      let lat = 0;
      let lng = 0;
      if (formData.location) {
        const fetchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.location)}&format=json&limit=1`;
        const geoRes = await fetch(fetchUrl);
        const geoData = await geoRes.json();
        
        if (geoData && geoData.length > 0) {
          lat = parseFloat(geoData[0].lat);
          lng = parseFloat(geoData[0].lon);
        } else {
          console.warn("Could not find coordinates for location:", formData.location);
        }
      }

      // Automatically fallback to browser GPS if textual geocoding failed/missing
      if (lat === 0 && lng === 0 && "geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            submitData(latitude, longitude);
         }, () => {
            // Geolocation blocked or failed, submit with 0,0 anyway
            submitData(0, 0);
         });
      } else {
         submitData(lat, lng);
      }
    } catch (err) {
      console.error("Failed to process location", err);
      setLoading(false);
    }
  };

  const submitData = async (lat: number, lng: number) => {
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lat, lng }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ type: "FOOD", description: "", urgency: "MEDIUM", peopleAffected: 1, location: "" });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to submit request", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--card-bg)", padding: "2rem", borderRadius: "1.5rem", border: "1px solid var(--border)" }}>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "700" }}>Request Help</h2>
      
      {success && (
        <div style={{ background: "var(--success)", color: "white", padding: "1rem", borderRadius: "0.75rem", marginBottom: "1.5rem", textAlign: "center" }}>
          Request submitted successfully! Rescuers have been notified.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type of Help Needed</label>
          <select 
            value={formData.type} 
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            {HELP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <select 
            value={formData.urgency} 
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
          >
            {URGENCY_LEVELS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Number of People Affected</label>
          <input 
            type="number" 
            min="1" 
            value={formData.peopleAffected} 
            onChange={(e) => setFormData({ ...formData, peopleAffected: parseInt(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label>Location (City, Area, or exactly where you are)</label>
          <input 
            type="text" 
            value={formData.location || ""} 
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={{ 
              width: "100%", 
              padding: "0.75rem 1rem", 
              background: "rgba(15, 23, 42, 0.6)", 
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              color: "white",
              fontSize: "1rem",
              marginBottom: "1rem"
            }}
            placeholder="e.g., Namakkal, Tamil Nadu"
            required
          />
        </div>

        <div className="form-group">
          <label>Description (Describe the situation)</label>
          <textarea 
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ 
              width: "100%", 
              padding: "0.75rem 1rem", 
              background: "rgba(15, 23, 42, 0.6)", 
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              color: "white",
              fontSize: "1rem"
            }}
            placeholder="e.g., We are stranded on the roof, need immediate rescue."
          />
        </div>

        <button 
          type="submit" 
          className="primary-btn" 
          disabled={loading}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          {loading ? "Submitting..." : "Submit Help Request"}
        </button>
      </form>
    </div>
  );
}

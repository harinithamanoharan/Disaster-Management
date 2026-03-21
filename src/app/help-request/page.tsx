"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Send } from "lucide-react";

const HELP_TYPES = ["Food", "Medical", "Rescue", "Shelter"];

export default function HelpRequestPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    helpType: "Food",
    message: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/help-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          helpType: "Food",
          message: "",
          location: "",
        });
      }
    } catch (err) {
      console.error("Failed to submit request", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div style={{ background: "var(--card-bg)", padding: "2.5rem", borderRadius: "1.5rem", border: "1px solid var(--border)" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>Request Help</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Fill out the form below to request immediate assistance.</p>
        
        {success ? (
          <div style={{ background: "var(--success)", color: "white", padding: "1.5rem", borderRadius: "1rem", textAlign: "center", marginBottom: "1rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Sent Successfully!</h3>
            <p>Your help request has been sent. Rescue team will contact you soon.</p>
            <button 
              onClick={() => setSuccess(false)}
              style={{ marginTop: "1rem", background: "rgba(255,255,255,0.2)", border: "none", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer" }}
            >
              Send Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "white" }}
                />
              </div>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "white" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "white" }}
                />
              </div>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Type of Help Needed</label>
                <select 
                  value={formData.helpType} 
                  onChange={(e) => setFormData({ ...formData, helpType: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "white" }}
                >
                  {HELP_TYPES.map(t => <option key={t} value={t} style={{ background: "#1e293b" }}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Location</label>
              <input 
                required
                type="text" 
                placeholder="Address or Landmarks"
                value={formData.location} 
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "white" }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Message</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "white" }}
                placeholder="Describe your situation..."
              />
            </div>

            <button 
              type="submit" 
              className="primary-btn" 
              disabled={loading}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", width: "100%", padding: "1rem", marginTop: "1rem" }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              {loading ? "Sending..." : "Send Help Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

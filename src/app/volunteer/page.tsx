"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function VolunteerPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "On-ground Rescue Support",
    availability: "Available Now",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Volunteer registration error:", error);
      alert("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <CheckCircle size={64} color="var(--primary)" style={{ margin: "0 auto 2rem" }} />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem" }}>Registration Successful!</h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "3rem" }}>
          Thank you for registering as a volunteer! We have sent a confirmation email to {formData.email}.
        </p>
        <Link href="/" style={{ padding: "1rem 2rem", background: "var(--primary)", color: "white", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "600" }}>
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "600" }}>
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <Users size={40} color="var(--primary)" />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Join as Volunteer</h1>
      </div>
      
      <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "3rem" }}>
        Become a part of our global network of first responders and volunteers. Your help can save lives during critical disaster events.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", background: "var(--card-bg)", padding: "2.5rem", borderRadius: "1.5rem", border: "1px solid var(--border)", boxShadow: "0 10px 30px -5px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="name" style={{ fontWeight: "600", fontSize: "0.875rem" }}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "#1a1a1a", border: "1px solid var(--border)", color: "white" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="email" style={{ fontWeight: "600", fontSize: "0.875rem" }}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "#1a1a1a", border: "1px solid var(--border)", color: "white" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="phone" style={{ fontWeight: "600", fontSize: "0.875rem" }}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "#1a1a1a", border: "1px solid var(--border)", color: "white" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="location" style={{ fontWeight: "600", fontSize: "0.875rem" }}>Location (City)</label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="New York"
              style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "#1a1a1a", border: "1px solid var(--border)", color: "white" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="role" style={{ fontWeight: "600", fontSize: "0.875rem" }}>Volunteer Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "#1a1a1a", border: "1px solid var(--border)", color: "white" }}
          >
            <option value="On-ground Rescue Support">On-ground Rescue Support</option>
            <option value="Resource Coordination">Resource Coordination</option>
            <option value="Digital Verification">Digital Verification</option>
            <option value="Community Outreach">Community Outreach</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="availability" style={{ fontWeight: "600", fontSize: "0.875rem" }}>Availability</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            style={{ padding: "0.75rem", borderRadius: "0.5rem", background: "#1a1a1a", border: "1px solid var(--border)", color: "white" }}
          >
            <option value="Available Now">Available Now</option>
            <option value="Available on Weekends">Available on Weekends</option>
            <option value="Available on Request">Available on Request</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle size={24} />}
          {loading ? "Registering..." : "Register as Volunteer"}
        </button>
      </form>

      <div style={{ marginTop: "4rem", padding: "2rem", background: "rgba(255,255,255,0.05)", borderRadius: "1rem", border: "1px solid var(--border)" }}>
        <h2 style={{ marginBottom: "1rem" }}>Why Volunteer?</h2>
        <ul style={{ color: "var(--text-muted)", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li>Help communities during critical times</li>
          <li>Gain experience in disaster management</li>
          <li>Network with professionals and rescuers</li>
          <li>Make a real impact on people's lives</li>
        </ul>
      </div>
    </div>
  );
}

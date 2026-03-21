"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("VICTIM");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Failed to create account");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Join the Disaster Help Coordination Platform</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Your Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="VICTIM">Victim (Need Help)</option>
              <option value="VOLUNTEER">Volunteer (Offer Help)</option>
            </select>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>
        <p className="footer-link">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

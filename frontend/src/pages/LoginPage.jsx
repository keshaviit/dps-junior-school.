import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { schoolData } from "../data/school";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}!`);

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/teacher");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials or account is disabled.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultAdmin = () => {
    setEmail("admin@school.com");
    setPassword("admin123");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--bg)",
        padding: "1.5rem"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: "100%", maxWidth: "440px" }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1.25rem"
              }}
            >
              SX
            </div>
          </Link>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>School Portal Login</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Attendance & Institutional Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="card" style={{ padding: "2.25rem", boxShadow: "var(--shadow-lg)" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="e.g. admin@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1rem", padding: "0.85rem" }}
            >
              {loading ? "Authenticating..." : "Sign In to Portal →"}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div
            style={{
              marginTop: "1.75rem",
              padding: "1rem",
              backgroundColor: "var(--surface-alt)",
              borderRadius: "var(--radius-md)",
              border: "1px dashed var(--border)",
              fontSize: "0.85rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontWeight: 700, color: "var(--text)" }}>Default Admin Credentials:</span>
              <button
                type="button"
                onClick={fillDefaultAdmin}
                style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.8rem", textDecoration: "underline" }}
              >
                Auto-fill
              </button>
            </div>
            <p style={{ color: "var(--text-muted)" }}>Email: <code>admin@school.com</code></p>
            <p style={{ color: "var(--text-muted)" }}>Password: <code>admin123</code></p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 500 }}>
            ← Back to Public Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}


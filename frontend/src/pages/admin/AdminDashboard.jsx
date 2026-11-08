import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/client";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/api/admin/summary");
      setSummary(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Aggregating attendance summary..." />;
  }

  if (error) {
    return (
      <div className="card" style={{ borderLeft: "4px solid var(--error)", padding: "1.5rem" }}>
        <h3 style={{ color: "var(--error)", marginBottom: "0.5rem" }}>Error Loading Dashboard</h3>
        <p style={{ color: "var(--text-muted)" }}>{error}</p>
        <button onClick={fetchSummary} className="btn btn-secondary btn-sm" style={{ marginTop: "1rem" }}>
          Retry
        </button>
      </div>
    );
  }

  const { totalStudents = 0, presentToday = 0, absentToday = 0, classesNotMarked = [] } = summary || {};
  const attendanceRate = totalStudents > 0 ? Math.round((presentToday / totalStudents) * 100) : 0;

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>Admin Dashboard</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Real-time daily attendance overview for today ({new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}).
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
          style={{ borderLeft: "4px solid var(--primary-light)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
                Total Students
              </p>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.25rem" }}>
                {totalStudents}
              </h2>
            </div>
            <div style={{ fontSize: "2.25rem" }}>🎓</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card"
          style={{ borderLeft: "4px solid var(--success)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
                Present Today
              </p>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--success)", marginTop: "0.25rem" }}>
                {presentToday}
              </h2>
            </div>
            <div style={{ fontSize: "2.25rem" }}>✅</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card"
          style={{ borderLeft: "4px solid var(--error)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
                Absent Today
              </p>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--error)", marginTop: "0.25rem" }}>
                {absentToday}
              </h2>
            </div>
            <div style={{ fontSize: "2.25rem" }}>❌</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="card"
          style={{ borderLeft: "4px solid var(--accent)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
                Attendance Rate
              </p>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--accent)", marginTop: "0.25rem" }}>
                {attendanceRate}%
              </h2>
            </div>
            <div style={{ fontSize: "2.25rem" }}>📊</div>
          </div>
        </motion.div>
      </div>

      {/* Classes Pending Attendance Notice */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        <div className="card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)" }}>
              Classes Pending Attendance
            </h3>
            <span className="badge badge-absent">{classesNotMarked.length} Pending</span>
          </div>

          {classesNotMarked.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 0", color: "var(--success)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎉</div>
              <p style={{ fontWeight: 600 }}>All classes have recorded today's attendance!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {classesNotMarked.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.85rem 1rem",
                    backgroundColor: "var(--surface-alt)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)"
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: "var(--text)" }}>Class {c.name}</span>
                    <span style={{ color: "var(--text-muted)", marginLeft: "0.5rem" }}>Section {c.section}</span>
                  </div>
                  <span className="badge badge-leave">Not Marked</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Admin Actions */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)", marginBottom: "1.25rem" }}>
            Quick Operations
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link
              to="/admin/teachers"
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "0.85rem 1.25rem" }}
            >
              <span>👨‍🏫</span> Manage Faculty & Assign Classes
            </Link>
            <Link
              to="/admin/classes"
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "0.85rem 1.25rem" }}
            >
              <span>🏫</span> Add or Modify Classes & Sections
            </Link>
            <Link
              to="/admin/students"
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "0.85rem 1.25rem" }}
            >
              <span>📥</span> Student Registry & Bulk CSV Upload
            </Link>
            <Link
              to="/admin/reports"
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "0.85rem 1.25rem" }}
            >
              <span>📈</span> Generate & Export Monthly Attendance Excel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


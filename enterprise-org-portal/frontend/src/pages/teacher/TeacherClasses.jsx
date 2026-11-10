import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/client";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/teacher/classes");
        setClasses(res.data);
      } catch (err) {
        toast.error("Failed to load your assigned classes.");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Fetching your assigned classes..." />;
  }

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>My Assigned Classes</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Select a class to record daily attendance, view student histories, or examine monthly reports.
        </p>
      </div>

      {classes.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 1rem", border: "1px dashed var(--border)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🏫</div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)" }}>No Classes Assigned Yet</h3>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", maxWidth: "480px", margin: "0.5rem auto 0" }}>
            Please contact the school administrator to link your faculty account to your corresponding classes and sections.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {classes.map((cls) => (
            <div key={cls.id} className="card card-hover" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span className="badge badge-active">Class {cls.name}</span>
                  <span className="badge badge-leave">Section {cls.section}</span>
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary)", marginBottom: "0.5rem" }}>
                  Grade {cls.name} - {cls.section}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                  Regular division curriculum
                </p>
              </div>

              <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.75rem" }}>
                <Link
                  to={`/teacher/attendance?classId=${cls.id}`}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: "0.65rem", fontSize: "0.9rem" }}
                >
                  📝 Mark Attendance
                </Link>
                <Link
                  to={`/teacher/reports?classId=${cls.id}`}
                  className="btn btn-secondary btn-sm"
                  title="View Reports"
                >
                  📊
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


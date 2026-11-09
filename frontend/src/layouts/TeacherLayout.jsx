import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { schoolData } from "../data/school";

export default function TeacherLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { title: "My Classes", path: "/teacher", icon: "🏫", end: true },
    { title: "Mark Attendance", path: "/teacher/attendance", icon: "📝" },
    { title: "Attendance History", path: "/teacher/history", icon: "📅" },
    { title: "Monthly Reports", path: "/teacher/reports", icon: "📊" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      {/* Sidebar for Desktop */}
      <aside
        className="teacher-sidebar"
        style={{
          width: "260px",
          backgroundColor: "#1e293b",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0
        }}
      >
        {/* Brand */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1rem"
            }}
          >
            DPS
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{schoolData.shortName}</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Faculty Portal</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "1.5rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.925rem",
                fontWeight: 600,
                color: isActive ? "#ffffff" : "#94a3b8",
                backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                transition: "all 0.2s"
              })}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout at bottom */}
        <div style={{ padding: "1.25rem", borderTop: "1px solid #334155", backgroundColor: "#0f172a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              👨‍🏫
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                {user?.name || "Teacher"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Faculty Member</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-sm"
            style={{ width: "100%", justifyContent: "center", color: "var(--error)", borderColor: "#334155" }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Navbar */}
        <header
          style={{
            height: "64px",
            backgroundColor: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="teacher-mobile-toggle"
              style={{ fontSize: "1.25rem", color: "var(--text)" }}
            >
              ☰
            </button>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>
              Teacher Attendance Desk
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/" target="_blank" className="btn btn-secondary btn-sm">
              🌐 View Public Site
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div
            style={{
              backgroundColor: "#1e293b",
              color: "#ffffff",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}
          >
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  backgroundColor: isActive ? "var(--primary-light)" : "transparent"
                })}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Page Content */}
        <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .teacher-sidebar { display: none !important; }
          .teacher-mobile-toggle { display: block !important; }
        }
        @media (min-width: 861px) {
          .teacher-mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
}


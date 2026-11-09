import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { schoolData } from "../data/school";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin", icon: "📊", end: true },
    { title: "Teachers", path: "/admin/teachers", icon: "👨‍🏫" },
    { title: "Classes & Sections", path: "/admin/classes", icon: "🏫" },
    { title: "Students", path: "/admin/students", icon: "🎓" },
    { title: "Monthly Reports", path: "/admin/reports", icon: "📈" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      {/* Sidebar for Desktop */}
      <aside
        className="admin-sidebar"
        style={{
          width: "260px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0
        }}
      >
        {/* Brand */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--accent)",
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
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Admin Portal</div>
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
                backgroundColor: isActive ? "var(--primary)" : "transparent",
                transition: "all 0.2s"
              })}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout at bottom */}
        <div style={{ padding: "1.25rem", borderTop: "1px solid #1e293b", backgroundColor: "#0b1329" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              👤
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                {user?.name || "Administrator"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{user?.email}</div>
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
              className="admin-mobile-toggle"
              style={{ fontSize: "1.25rem", color: "var(--text)" }}
            >
              ☰
            </button>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>
              Institutional Management Portal
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
              backgroundColor: "#0f172a",
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
                  backgroundColor: isActive ? "var(--primary)" : "transparent"
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
          .admin-sidebar { display: none !important; }
          .admin-mobile-toggle { display: block !important; }
        }
        @media (min-width: 861px) {
          .admin-mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
}


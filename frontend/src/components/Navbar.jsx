import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { schoolData } from "../data/school";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Notices", path: "/notices" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px" }}>
        {/* Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "1.25rem",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            SX
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--primary)", lineHeight: 1.2 }}>
              {schoolData.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{schoolData.affiliation}</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="desktop-nav">
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: "0.5rem 0.85rem",
                  fontSize: "0.925rem",
                  fontWeight: 600,
                  borderRadius: "var(--radius-sm)",
                  color: isActive(link.path) ? "var(--primary)" : "var(--text-muted)",
                  backgroundColor: isActive(link.path) ? "var(--primary-soft)" : "transparent",
                  transition: "all 0.2s"
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to="/login"
            className="btn btn-primary"
            style={{
              fontSize: "0.9rem",
              padding: "0.5rem 1.15rem",
              borderRadius: "var(--radius-full)",
              minHeight: "40px"
            }}
          >
            <span>🔐</span> Portal Login
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="mobile-toggle"
          style={{
            padding: "0.5rem",
            fontSize: "1.5rem",
            color: "var(--text)"
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: "1rem 1.25rem 1.5rem",
            backgroundColor: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                color: isActive(link.path) ? "var(--primary)" : "var(--text)",
                backgroundColor: isActive(link.path) ? "var(--primary-soft)" : "transparent"
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            🔐 Portal Login
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}


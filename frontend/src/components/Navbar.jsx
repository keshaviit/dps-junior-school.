import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "78px" }}>
        {/* Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "1.15rem",
              letterSpacing: "0.05em",
              boxShadow: "0 8px 16px -4px rgba(30, 64, 175, 0.35)",
              border: "2px solid rgba(255,255,255,0.4)"
            }}
          >
            DPS
          </motion.div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--primary)", lineHeight: 1.2 }}>
              {schoolData.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.03em" }}>
              CBSE Affiliation No. 2130894 • Est. {schoolData.established}
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="desktop-nav">
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  position: "relative",
                  padding: "0.6rem 0.95rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  borderRadius: "var(--radius-md)",
                  color: isActive(link.path) ? "var(--primary)" : "var(--text-muted)",
                  backgroundColor: isActive(link.path) ? "var(--primary-soft)" : "transparent",
                  transition: "all 0.2s ease"
                }}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "15%",
                      width: "70%",
                      height: "3px",
                      backgroundColor: "var(--primary)",
                      borderRadius: "2px"
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="btn btn-primary"
              style={{
                fontSize: "0.9rem",
                padding: "0.6rem 1.35rem",
                borderRadius: "var(--radius-full)",
                minHeight: "42px",
                boxShadow: "0 4px 14px 0 rgba(30, 64, 175, 0.3)"
              }}
            >
              <span>🔐</span> Portal Login
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="mobile-toggle"
          style={{
            padding: "0.5rem",
            fontSize: "1.6rem",
            color: "var(--primary)"
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
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
                padding: "0.85rem 1rem",
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
            style={{ width: "100%", marginTop: "0.5rem", padding: "0.85rem" }}
          >
            🔐 Staff & Teacher Portal Login
          </Link>
        </motion.div>
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

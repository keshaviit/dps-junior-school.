import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { schoolData } from "../data/school";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About & Ethos", path: "/about" },
    { name: "Campus Life", path: "/gallery" },
    { name: "News & Bulletins", path: "/notices" },
    { name: "Admissions & Visit", path: "/contact" }
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "#ffffff" }}>
      {/* Top Announcement Bar (Great Walstead style) */}
      <div
        style={{
          backgroundColor: "var(--primary)",
          color: "#ffffff",
          padding: "0.45rem 1rem",
          fontSize: "0.825rem",
          fontWeight: 600,
          letterSpacing: "0.02em"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--accent)" }}>🍂</span>
            <span><strong>Open Morning 2026:</strong> Book your private woodland campus tour</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.8rem" }}>
            <a href={`tel:${schoolData.contact.phone}`} style={{ color: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span>📞</span> {schoolData.contact.phone}
            </a>
            <Link to="/contact" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "underline" }}>
              Arrange a Visit →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "82px"
          }}
        >
          {/* Brand Emblem */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.95rem" }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
              transition={{ duration: 0.35 }}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 8px 18px -4px rgba(20, 56, 44, 0.35)",
                border: "2px solid #ffffff"
              }}
            >
              <span style={{ fontSize: "1.1rem", fontWeight: 900, lineHeight: 1 }}>DPS</span>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)" }}>JUNIOR</span>
            </motion.div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 800, fontSize: "1.25rem", color: "var(--primary)", lineHeight: 1.15 }}>
                {schoolData.name}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.02em" }}>
                Independent Prep & Nursery • Est. {schoolData.established}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="desktop-nav">
            <div style={{ display: "flex", gap: "0.25rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    position: "relative",
                    padding: "0.65rem 1rem",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "var(--radius-full)",
                    color: isActive(link.path) ? "var(--primary)" : "var(--text-muted)",
                    backgroundColor: isActive(link.path) ? "var(--primary-soft)" : "transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNavTab"
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "25%",
                        width: "50%",
                        height: "3px",
                        backgroundColor: "var(--accent)",
                        borderRadius: "2px"
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Action CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/contact"
                  className="btn btn-accent btn-sm"
                  style={{
                    boxShadow: "0 4px 14px 0 rgba(216, 150, 37, 0.35)"
                  }}
                >
                  Book a Visit
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/login"
                  className="btn btn-secondary btn-sm"
                  style={{
                    fontWeight: 700
                  }}
                >
                  <span>🔐</span> Portal
                </Link>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-toggle"
            style={{
              padding: "0.6rem",
              fontSize: "1.6rem",
              color: "var(--primary)",
              display: "none"
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: "var(--surface)",
              borderBottom: "2px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
              padding: "1.25rem 1.5rem 2rem"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: "0.85rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: isActive(link.path) ? "var(--primary)" : "var(--text)",
                    backgroundColor: isActive(link.path) ? "var(--primary-soft)" : "transparent"
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-accent"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book a Personal Tour →
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                🔐 Staff & Teacher Portal Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}

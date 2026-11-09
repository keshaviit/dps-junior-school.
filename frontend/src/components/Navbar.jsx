import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { schoolData } from "../data/school";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pure, calm navigation links (removed News, Bulletins, Campus Life)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About & Ethos", path: "/about" },
    { name: "Admissions & Visit", path: "/contact" }
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
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.90)" : "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(0, 0, 0, 0.03)",
        boxShadow: scrolled ? "0 8px 24px -4px rgba(20, 56, 44, 0.05)" : "none",
        transition: "background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease"
      }}
    >
      {/* Calm, Refined Announcement Ribbon */}
      <div
        style={{
          backgroundColor: "var(--primary)",
          color: "#ffffff",
          padding: "0.35rem 1rem",
          fontSize: "0.785rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          transition: "all 0.3s ease"
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
            <span style={{ color: "var(--accent)", fontSize: "0.7rem" }}>●</span>
            <span>Admissions 2027–28 Open &bull; Personal Headmaster Morning Tours</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.775rem" }}>
            <a href={`tel:${schoolData.contact.phone}`} style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
              📞 {schoolData.contact.phone}
            </a>
            <Link to="/contact" style={{ color: "var(--accent)", fontWeight: 700 }}>
              Arrange Visit →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar with Smooth Animated Height */}
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? "66px" : "76px",
          transition: "height 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Brand */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: scrolled ? "40px" : "44px",
              height: scrolled ? "40px" : "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(20, 56, 44, 0.18)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <span style={{ fontSize: scrolled ? "0.95rem" : "1.05rem", fontWeight: 800, lineHeight: 1 }}>DPS</span>
            <span style={{ fontSize: "0.48rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent)" }}>JUNIOR</span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 800,
                fontSize: scrolled ? "1.15rem" : "1.25rem",
                color: "var(--primary)",
                lineHeight: 1.15,
                transition: "font-size 0.35s ease"
              }}
            >
              {schoolData.name}
            </div>
            <div style={{ fontSize: "0.725rem", color: "var(--text-muted)", fontWeight: 500 }}>
              Independent Prep & Nursery
            </div>
          </div>
        </Link>

        {/* Clean Calm Desktop Navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2.25rem" }} className="desktop-nav">
          <div style={{ display: "flex", gap: "0.35rem" }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    position: "relative",
                    padding: "0.5rem 1rem",
                    fontSize: "0.925rem",
                    fontWeight: 600,
                    borderRadius: "var(--radius-full)",
                    color: active ? "var(--primary)" : "var(--text-muted)",
                    backgroundColor: active ? "var(--primary-soft)" : "transparent",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="smoothActiveIndicator"
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        left: "20%",
                        width: "60%",
                        height: "2px",
                        backgroundColor: "var(--primary)",
                        borderRadius: "2px"
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="btn btn-accent btn-sm"
                style={{
                  padding: "0.5rem 1.35rem",
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 14px rgba(216, 150, 37, 0.22)"
                }}
              >
                Book a Visit
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                className="btn btn-secondary btn-sm"
                style={{
                  padding: "0.5rem 1.15rem",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}
              >
                <span>🔐</span> Portal
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          className="mobile-toggle"
          style={{
            padding: "0.5rem",
            fontSize: "1.5rem",
            color: "var(--primary)",
            display: "none"
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
              padding: "1rem 1.5rem 1.75rem"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: isActive(link.path) ? "var(--primary)" : "var(--text)",
                    backgroundColor: isActive(link.path) ? "var(--primary-soft)" : "transparent"
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-accent"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book a Visit →
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                🔐 Staff Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 840px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}

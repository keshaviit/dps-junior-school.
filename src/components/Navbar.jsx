import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockIcon } from "./Icons";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (target.startsWith("/")) {
      if (target.includes("#")) {
        const [path, hash] = target.split("#");
        if (location.pathname === path) {
          const el = document.getElementById(hash);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 86;
            window.scrollTo({ top, behavior: "smooth" });
          }
        } else {
          navigate(target);
        }
      } else {
        navigate(target);
      }
    } else {
      if (location.pathname === "/") {
        const el = document.getElementById(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 86;
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else {
        navigate(`/#${target}`);
      }
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 86;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 120);
    }
  }, [location]);

  const isActive = (path) => location.pathname === path && !location.hash;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          right: "16px",
          zIndex: 900,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1060px",
            height: "64px",
            backgroundColor: "rgba(255, 255, 255, 0.90)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "32px",
            padding: "0 10px 0 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.07)",
            pointerEvents: "auto",
            transition: "all 0.3s ease"
          }}
        >
          {/* Brand Logo & Play to 8 Badge */}
          <Link
            to="/"
            onClick={() => handleNavClick("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "var(--palette-coral)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--palette-white)"
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  color: "var(--palette-ink)",
                  fontSize: "17px",
                  letterSpacing: "-0.4px",
                  lineHeight: 1.1
                }}
              >
                DPS JUNIOR
              </div>
              <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.8px", color: "var(--palette-coralDark)" }}>
                PUBLIC SCHOOL · PLAY TO VIII
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links (Rearranged according to the actual site structure) */}
          <nav
            style={{
              display: "none",
              gap: "20px",
              alignItems: "center"
            }}
            className="navbar-desktop-links"
          >
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick("/")}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: isActive("/") ? 700 : 500,
                color: isActive("/") ? "var(--palette-ink)" : "var(--palette-muted)",
                fontSize: "14px",
                cursor: "pointer",
                position: "relative",
                transition: "color 0.15s ease"
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--palette-ink)")}
              onMouseLeave={(e) => {
                if (!isActive("/")) e.target.style.color = "var(--palette-muted)";
              }}
            >
              Home
              {isActive("/") && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    backgroundColor: "var(--palette-coralDark)",
                    borderRadius: "1px"
                  }}
                />
              )}
            </button>

            {/* 2. About Us */}
            <button
              onClick={() => handleNavClick("/about")}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: isActive("/about") ? 700 : 500,
                color: isActive("/about") ? "var(--palette-ink)" : "var(--palette-muted)",
                fontSize: "14px",
                cursor: "pointer",
                position: "relative",
                transition: "color 0.15s ease"
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--palette-ink)")}
              onMouseLeave={(e) => {
                if (!isActive("/about")) e.target.style.color = "var(--palette-muted)";
              }}
            >
              About Us
              {isActive("/about") && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    backgroundColor: "var(--palette-coralDark)",
                    borderRadius: "1px"
                  }}
                />
              )}
            </button>

            {/* 3. Admissions */}
            <button
              onClick={() => handleNavClick("/admissions")}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: isActive("/admissions") ? 700 : 500,
                color: isActive("/admissions") ? "var(--palette-ink)" : "var(--palette-muted)",
                fontSize: "14px",
                cursor: "pointer",
                position: "relative",
                transition: "color 0.15s ease"
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--palette-ink)")}
              onMouseLeave={(e) => {
                if (!isActive("/admissions")) e.target.style.color = "var(--palette-muted)";
              }}
            >
              Admissions
              {isActive("/admissions") && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    backgroundColor: "var(--palette-coralDark)",
                    borderRadius: "1px"
                  }}
                />
              )}
            </button>

            {/* 4. Contact Us */}
            <button
              onClick={() => handleNavClick("/contact")}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: isActive("/contact") ? 700 : 500,
                color: isActive("/contact") ? "var(--palette-ink)" : "var(--palette-muted)",
                fontSize: "14px",
                cursor: "pointer",
                position: "relative",
                transition: "color 0.15s ease"
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--palette-ink)")}
              onMouseLeave={(e) => {
                if (!isActive("/contact")) e.target.style.color = "var(--palette-muted)";
              }}
            >
              Contact Us
              {isActive("/contact") && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    backgroundColor: "var(--palette-coralDark)",
                    borderRadius: "1px"
                  }}
                />
              )}
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Book a visit CTA (lands on /about#book-visit) */}
            <button
              onClick={() => handleNavClick("/about#book-visit")}
              style={{
                backgroundColor: "var(--palette-coral)",
                borderRadius: "22px",
                height: "42px",
                padding: "0 16px",
                display: "inline-flex",
                gap: "7px",
                alignItems: "center",
                color: "var(--palette-ink)",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                boxShadow: "0 2px 10px rgba(156, 81, 78, 0.15)",
                cursor: "pointer",
                transition: "transform 0.15s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>Book a Visit</span>
              <ArrowRight size={14} color="var(--palette-ink)" />
            </button>

            {/* Staff Login Button */}
            <Link
              to="/login"
              style={{
                backgroundColor: "var(--palette-ink)",
                borderRadius: "22px",
                height: "42px",
                padding: "0 16px",
                display: "inline-flex",
                gap: "7px",
                alignItems: "center",
                color: "var(--palette-white)",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
              }}
            >
              <LockIcon size={14} color="var(--palette-white)" />
              <span>Staff Login</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="navbar-mobile-toggle"
              aria-label="Toggle navigation menu"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                cursor: "pointer"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--palette-ink)" strokeWidth="2.2">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "88px",
            left: "16px",
            right: "16px",
            zIndex: 899,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "22px",
            boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}
        >
          <button
            onClick={() => handleNavClick("/")}
            style={{ textAlign: "left", fontSize: "16px", fontWeight: 600, color: "var(--palette-ink)", padding: "6px 0" }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("/about")}
            style={{ textAlign: "left", fontSize: "16px", fontWeight: 600, color: "var(--palette-ink)", padding: "6px 0" }}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick("/admissions")}
            style={{ textAlign: "left", fontSize: "16px", fontWeight: 600, color: "var(--palette-ink)", padding: "6px 0" }}
          >
            Admissions (Play to 8)
          </button>
          <button
            onClick={() => handleNavClick("/contact")}
            style={{ textAlign: "left", fontSize: "16px", fontWeight: 600, color: "var(--palette-ink)", padding: "6px 0" }}
          >
            Contact Us
          </button>
          <div style={{ height: "1px", backgroundColor: "var(--palette-line)", margin: "4px 0" }} />
          <button
            onClick={() => handleNavClick("/about#book-visit")}
            style={{ textAlign: "left", fontSize: "15px", fontWeight: 700, color: "var(--palette-coralDark)", padding: "6px 0" }}
          >
            📅 Book a Visit & Campus Tour →
          </button>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--palette-ink)",
              padding: "8px 0",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <LockIcon size={16} color="var(--palette-ink)" />
            <span>Staff Login (Admin & Teachers) →</span>
          </Link>
        </div>
      )}

      {/* Responsive Style Tag */}
      <style>{`
        @media (min-width: 960px) {
          .navbar-desktop-links {
            display: flex !important;
          }
          .navbar-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

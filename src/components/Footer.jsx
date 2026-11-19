import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLink = (target) => {
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

  return (
    <footer
      style={{
        padding: "50px 42px",
        borderTop: "1px solid var(--palette-line)",
        backgroundColor: "var(--palette-paper)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "30px",
        position: "relative",
        zIndex: 10
      }}
      className="footer-wrap"
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "var(--palette-coral)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "var(--palette-white)"
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "17px",
              color: "var(--palette-ink)",
              letterSpacing: "-0.4px"
            }}
          >
            DPS JUNIOR PUBLIC SCHOOL
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--palette-muted)",
            fontSize: "13px",
            marginTop: "10px"
          }}
        >
          An Adventure in Learning • Playgroup to Class VIII
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
        <button
          onClick={() => handleLink("/about")}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: "var(--palette-ink)",
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          About Us
        </button>
        <button
          onClick={() => handleLink("/admissions")}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: "var(--palette-ink)",
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          Admissions
        </button>
        <button
          onClick={() => handleLink("/about#book-visit")}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            color: "var(--palette-coralDark)",
            fontSize: "13px",
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: "3px"
          }}
        >
          Book a Visit
        </button>
        <Link
          to="/login"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: "var(--palette-muted)",
            fontSize: "13px",
            textDecoration: "none"
          }}
        >
          Staff Login
        </Link>
      </div>

      <div
        style={{
          fontFamily: "var(--font-sans)",
          color: "#A8A29E",
          fontSize: "12px"
        }}
      >
        © 2026 DPS JUNIOR PUBLIC SCHOOL. All rights reserved.
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-wrap {
            padding: 40px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}

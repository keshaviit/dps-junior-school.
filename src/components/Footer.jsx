import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToElement } from "../utils/scroll";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || "https://dps-junior-school.onrender.com";

  const handleLink = (target) => {
    if (target.startsWith("/")) {
      if (target.includes("#")) {
        const [path, hash] = target.split("#");
        if (location.pathname === path) {
          scrollToElement(hash);
        } else {
          navigate(target);
        }
      } else {
        navigate(target);
      }
    } else {
      if (location.pathname === "/") {
        scrollToElement(target);
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
          An Adventure in Learning • Playgroup to Class VIII (CBSE Affiliated)
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
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            color: "var(--palette-muted)",
            fontSize: "13px",
            textDecoration: "none"
          }}
        >
          Staff Login ↗
        </a>
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

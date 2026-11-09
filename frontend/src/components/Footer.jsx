import React from "react";
import { Link } from "react-router-dom";
import { schoolData } from "../data/school";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0c241c", color: "#f8fafc", paddingTop: "5rem", paddingBottom: "3rem" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "3.5rem",
            marginBottom: "4rem"
          }}
        >
          {/* Column 1: School Identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.95rem", marginBottom: "1.25rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "var(--accent)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "#ffffff"
                }}
              >
                <span>DPS</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                  {schoolData.name}
                </h3>
                <div style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700 }}>
                  Independent Prep & Nursery School
                </div>
              </div>
            </div>
            <p style={{ color: "#9cb3a7", fontSize: "0.925rem", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              {schoolData.tagline}
            </p>
            <div style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.7 }}>
              <p>🏛 {schoolData.affiliation}</p>
              <p>🌲 Set within {schoolData.campusSize}</p>
            </div>
          </div>

          {/* Column 2: Age Stages & Academics */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem", borderBottom: "2px solid var(--accent)", display: "inline-block", paddingBottom: "0.3rem" }}>
              Age Stages
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li><Link to="/about" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Early Years & Nursery (2–5 yrs)</Link></li>
              <li><Link to="/about" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Pre-Prep Department (5–8 yrs)</Link></li>
              <li><Link to="/about" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Junior Prep Academy (8–13 yrs)</Link></li>
              <li><Link to="/gallery" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Forest School & Woodlands</Link></li>
              <li><Link to="/gallery" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>STEM, Robotics & Arts</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem", borderBottom: "2px solid var(--accent)", display: "inline-block", paddingBottom: "0.3rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li><Link to="/" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Home Page</Link></li>
              <li><Link to="/about" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Headmaster's Welcome</Link></li>
              <li><Link to="/gallery" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Campus Photography & Film</Link></li>
              <li><Link to="/notices" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>School Circulars & Dates</Link></li>
              <li><Link to="/contact" style={{ color: "#9cb3a7", fontSize: "0.95rem" }}>Book a Visit & Contact</Link></li>
              <li><Link to="/login" style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.95rem" }}>Staff & Teacher Portal 🔐 →</Link></li>
            </ul>
          </div>

          {/* Column 4: Admissions & Location */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem", borderBottom: "2px solid var(--accent)", display: "inline-block", paddingBottom: "0.3rem" }}>
              Admissions Desk
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.925rem", color: "#9cb3a7" }}>
              <p>📍 {schoolData.contact.address}</p>
              <p>
                📞 Telephone:{" "}
                <a href={`tel:${schoolData.contact.phone}`} style={{ color: "#ffffff", fontWeight: 700 }}>
                  {schoolData.contact.phone}
                </a>
              </p>
              <p>
                ✉️ Admissions:{" "}
                <a href={`mailto:${schoolData.contact.email}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>
                  {schoolData.contact.email}
                </a>
              </p>
              <p>🕒 {schoolData.contact.officeHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            color: "#6b877a",
            fontSize: "0.85rem"
          }}
        >
          <p>© {new Date().getFullYear()} {schoolData.name}. All rights reserved.</p>
          <p>Celebrating the magic of childhood through nature, curiosity, and high achievement.</p>
        </div>
      </div>
    </footer>
  );
}

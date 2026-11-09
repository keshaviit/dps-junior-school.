import React from "react";
import { Link } from "react-router-dom";
import { schoolData } from "../data/school";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f172a", color: "#f8fafc", paddingTop: "4.5rem", paddingBottom: "2.5rem" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "3rem",
            marginBottom: "3.5rem"
          }}
        >
          {/* Column 1: School Overview */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "#ffffff"
                }}
              >
                DPS
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>{schoolData.name}</h3>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.925rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              {schoolData.tagline}
            </p>
            <div style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.6 }}>
              <p>🏛 {schoolData.affiliation}</p>
              <p>📅 Established {schoolData.established}</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem", borderBottom: "2px solid var(--accent)", display: "inline-block", paddingBottom: "0.25rem" }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <li><Link to="/" style={{ color: "#94a3b8", fontSize: "0.925rem" }}>Home Page</Link></li>
              <li><Link to="/about" style={{ color: "#94a3b8", fontSize: "0.925rem" }}>About & Principal's Vision</Link></li>
              <li><Link to="/gallery" style={{ color: "#94a3b8", fontSize: "0.925rem" }}>Campus Photo Gallery</Link></li>
              <li><Link to="/notices" style={{ color: "#94a3b8", fontSize: "0.925rem" }}>Circulars & Bulletins</Link></li>
              <li><Link to="/contact" style={{ color: "#94a3b8", fontSize: "0.925rem" }}>Contact & Admissions</Link></li>
              <li><Link to="/login" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.925rem" }}>Staff & Teacher Portal 🔐 →</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem", borderBottom: "2px solid var(--accent)", display: "inline-block", paddingBottom: "0.25rem" }}>
              Campus Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.925rem", color: "#94a3b8" }}>
              <p>📍 {schoolData.contact.address}</p>
              <p>
                📞 Telephone:{" "}
                <a href={`tel:${schoolData.contact.phone}`} style={{ color: "#ffffff", textDecoration: "underline" }}>
                  {schoolData.contact.phone}
                </a>
              </p>
              <p>
                ✉️ Email:{" "}
                <a href={`mailto:${schoolData.contact.email}`} style={{ color: "#ffffff", textDecoration: "underline" }}>
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
            borderTop: "1px solid #334155",
            paddingTop: "1.75rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            color: "#64748b",
            fontSize: "0.85rem"
          }}
        >
          <p>© {new Date().getFullYear()} {schoolData.name}. All rights reserved.</p>
          <p>Inspiring young learners with passion, care, and integrity.</p>
        </div>
      </div>
    </footer>
  );
}

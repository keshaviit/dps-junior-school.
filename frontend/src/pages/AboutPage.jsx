import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { schoolData } from "../data/school";

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Header Banner */}
      <section
        style={{
          backgroundColor: "#102f24",
          color: "#ffffff",
          padding: "6rem 0 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url("https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <span className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "var(--accent)" }}>
            Our Ethos & Heritage
          </span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 900, marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            An Adventure in Learning
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#e2e8f0", lineHeight: 1.7 }}>
            Founded in {schoolData.established}, {schoolData.name} champions an idyllic prep school education where childhood is cherished and curiosity is ignited every single day.
          </p>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "2.75rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2rem",
              textAlign: "center"
            }}
          >
            {schoolData.stats.map((st, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>
                  <CountUp end={st.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span>{st.suffix}</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "#e2e8f0", marginTop: "0.4rem", fontWeight: 600 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headmaster's Welcome Card */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: "3.5rem 2.5rem", maxWidth: "1050px", margin: "0 auto", boxShadow: "var(--shadow-xl)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3.5rem", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "220px",
                    height: "220px",
                    borderRadius: "28px",
                    overflow: "hidden",
                    margin: "0 auto 1.5rem",
                    boxShadow: "var(--shadow-lg)",
                    border: "4px solid #ffffff"
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                    alt={schoolData.principal.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", color: "var(--primary)" }}>{schoolData.principal.name}</h3>
                <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.95rem" }}>{schoolData.principal.title}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.35rem" }}>{schoolData.principal.qualification}</p>
              </div>

              <div>
                <span className="section-tag">
                  From the Headmaster
                </span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.1rem", color: "var(--primary)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
                  “Where Joy and Academic Excellence Walk Hand in Hand”
                </h2>
                <p style={{ color: "var(--text)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  {schoolData.principal.message}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
                  We invite every parent to visit our grounds, breathe in the fresh forest air, listen to the children laughing in our woodlands, and witness firsthand why DPS Junior is so special.
                </p>
                <div style={{ marginTop: "1.75rem" }}>
                  <Link to="/contact" className="btn btn-accent">
                    Book a Meeting with the Headmaster →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Age Stages Detailed */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span className="section-tag">
              🌱 Educational Pathways
            </span>
            <h2 className="section-title">The Three Pillars of Childhood</h2>
            <p className="section-subtitle">
              Every stage is developmentally tailored to provide confidence, joy, and individual scholastic achievement.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {schoolData.ageStages.map((stage, idx) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="card"
                style={{
                  padding: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2.5rem",
                  alignItems: "center"
                }}
              >
                <div style={{ order: idx % 2 === 1 ? 2 : 1 }}>
                  <span className="badge badge-active" style={{ marginBottom: "0.75rem" }}>{stage.badge}</span>
                  <h3 style={{ fontSize: "1.85rem", color: "var(--primary)", marginBottom: "0.5rem" }}>{stage.title}</h3>
                  <h4 style={{ color: "var(--accent)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>{stage.subtitle}</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {stage.description}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {stage.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, fontSize: "0.925rem" }}>
                        <span style={{ color: "var(--accent)" }}>✦</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ order: idx % 2 === 1 ? 1 : 2, borderRadius: "var(--radius-lg)", overflow: "hidden", height: "320px", boxShadow: "var(--shadow-md)" }}>
                  <img src={stage.image} alt={stage.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Facilities Showcase */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span className="section-tag">
              🌳 Campus Exploration
            </span>
            <h2 className="section-title">Our 45-Acre Parkland Facilities</h2>
            <p className="section-subtitle">
              Immerse yourself in our specialist sports arenas, science laboratories, and natural learning spaces.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {schoolData.facilities.map((fac, idx) => (
              <div key={idx} className="card card-hover" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ height: "220px" }}>
                  <img src={fac.image} alt={fac.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{fac.icon}</div>
                  <h3 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "0.5rem" }}>{fac.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{fac.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

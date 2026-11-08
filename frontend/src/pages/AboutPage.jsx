import React from "react";
import CountUp from "react-countup";
import { schoolData } from "../data/school";

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Page Header */}
      <section style={{ backgroundColor: "var(--surface-alt)", padding: "4rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            About Our Institution
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem", marginBottom: "1rem" }}>
            Tradition of Excellence, Passion for Innovation
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Founded in {schoolData.established}, {schoolData.name} has empowered generations of scholars, innovators, and leaders to leave a positive imprint on the world.
          </p>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "2.5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "2rem",
              textAlign: "center"
            }}
          >
            {schoolData.stats.map((st, i) => (
              <div key={i}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                  <CountUp end={st.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span>{st.suffix}</span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "#e2e8f0", marginTop: "0.35rem" }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Story */}
      <section className="section">
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginBottom: "1.25rem" }}>
            Our 26-Year Scholastic Journey
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text)", fontSize: "1.05rem", lineHeight: 1.8 }}>
            <p>
              St. Xavier's Model Senior Secondary School began in 1998 with a visionary premise: that an educational institution must be a crucible of character, not merely an engine of academic examinations. Starting from humble grounds with 80 students and 6 teachers, we have evolved into a distinguished community educating more than 2,400 students across kindergarten through Grade 12.
            </p>
            <p>
              Affiliated with the Central Board of Secondary Education (CBSE), New Delhi, the institution is recognized for achieving 100% first-division results year after year, with alumni pursuing education at premier global universities, IITs, AIIMS, and civil services.
            </p>
            <p>
              Our philosophy reconciles time-tested Guru-Shishya values with contemporary global pedagogical practices, emphasizing inquiry-driven learning, environmental stewardship, and compassionate leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {/* Vision Card */}
            <div className="card" style={{ borderTop: "4px solid var(--primary)", padding: "2.5rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔭</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--primary)", marginBottom: "1rem" }}>
                Our Vision
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                {schoolData.vision}
              </p>
            </div>

            {/* Mission Card */}
            <div className="card" style={{ borderTop: "4px solid var(--accent)", padding: "2.5rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎯</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)", marginBottom: "1rem" }}>
                Our Mission
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem", color: "var(--text)" }}>
                {schoolData.mission.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.975rem" }}>
                    <span style={{ color: "var(--success)", fontWeight: "bold" }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Desk */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: "3rem 2.5rem", maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "5rem",
                    margin: "0 auto 1.25rem",
                    boxShadow: "var(--shadow-md)"
                  }}
                >
                  👨‍💼
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary)" }}>{schoolData.principal.name}</h3>
                <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem" }}>Principal & Director of Academics</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{schoolData.principal.qualification}</p>
              </div>

              <div>
                <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Message from the Principal's Desk
                </span>
                <h4 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.25rem", marginBottom: "1rem" }}>
                  “Nurturing the Sparks of Tomorrow”
                </h4>
                <p style={{ color: "var(--text)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1rem" }}>
                  {schoolData.principal.message}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  We invite every parent to be a companion in this sacred task of education. With mutual trust, constant support, and shared values, we prepare our children not only for examinations, but for life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Facilities */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <h2 className="section-title">Campus Facilities & Infrastructure</h2>
          <p className="section-subtitle">
            An environment thoughtfully designed to promote academic rigor, sportsmanship, and creative expression.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.75rem" }}>
            {schoolData.facilities.map((fac, idx) => (
              <div key={idx} className="card card-hover" style={{ padding: "2rem" }}>
                <div style={{ fontSize: "2.75rem", marginBottom: "1rem" }}>{fac.icon}</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem" }}>
                  {fac.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {fac.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


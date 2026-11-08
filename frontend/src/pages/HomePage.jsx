import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import NotebookHero from "../components/NotebookHero";
import { schoolData } from "../data/school";

export default function HomePage() {
  const topNotices = schoolData.notices.slice(0, 3);
  const featuredFacilities = schoolData.facilities.slice(0, 4);

  return (
    <div>
      {/* Animated Hero Section */}
      <NotebookHero />

      {/* Animated Stats Bar */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "3rem 0" }}>
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
                <div style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                  <CountUp end={st.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span>{st.suffix}</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "#e2e8f0", marginTop: "0.5rem", fontWeight: 500 }}>
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome & Philosophy */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Welcome to Our Institution
              </span>
              <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
                Cultivating Character, Curiosity, and Global Ambition
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                For over a quarter of a century, {schoolData.name} has served as a beacon of scholastic innovation and holistic human formation. Our educational approach integrates cutting-edge STEM discovery with timeless humanitarian values.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
                  <div><strong>Student-Centric Pedagogy:</strong> Individual attention with an optimal 1:20 teacher-student ratio.</div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
                  <div><strong>Transparent Daily Attendance:</strong> Digital record-keeping with instant faculty synchronization.</div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
                  <div><strong>All-Round Development:</strong> 30+ co-curricular clubs spanning arts, robotics, debate, and athletics.</div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">
                Read Principal's Message & Vision →
              </Link>
            </div>

            {/* Principal Quote Highlight Card */}
            <div className="card" style={{ padding: "2.5rem", borderLeft: "4px solid var(--accent)", background: "var(--surface)" }}>
              <div style={{ fontSize: "2.5rem", color: "var(--accent)", lineHeight: 1, marginBottom: "1rem" }}>“</div>
              <blockquote style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--text)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {schoolData.principal.message}
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                  👨‍🏫
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: "var(--primary)" }}>{schoolData.principal.name}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{schoolData.principal.qualification}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <h2 className="section-title">World-Class Campus Infrastructure</h2>
          <p className="section-subtitle">
            Designed to foster intellectual exploration, athletic vitality, and creative self-expression.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {featuredFacilities.map((fac, idx) => (
              <div key={idx} className="card card-hover" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{fac.icon}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem" }}>
                  {fac.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, flex: 1 }}>
                  {fac.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/gallery" className="btn btn-secondary">
              View Campus Photo Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Notices Preview */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                Stay Informed
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.25rem" }}>
                Latest Notices & Circulars
              </h2>
            </div>
            <Link to="/notices" style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.95rem" }}>
              View All Notices ({schoolData.notices.length}) →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {topNotices.map((n) => (
              <div
                key={n.id}
                className="card"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.25rem 1.75rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flex: 1, minWidth: "260px" }}>
                  <div
                    style={{
                      backgroundColor: "var(--primary-soft)",
                      color: "var(--primary)",
                      padding: "0.5rem 0.85rem",
                      borderRadius: "var(--radius-sm)",
                      textAlign: "center",
                      fontWeight: 700,
                      minWidth: "75px"
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                      {new Date(n.date).toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div style={{ fontSize: "1.25rem", lineHeight: 1 }}>
                      {new Date(n.date).getDate()}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <span className="badge badge-active">{n.category}</span>
                      {n.important && <span className="badge badge-absent">Important</span>}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>{n.title}</h3>
                  </div>
                </div>
                <Link to="/notices" className="btn btn-secondary btn-sm">
                  Read Circular →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "4rem 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "750px" }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "1rem" }}>
            Ready to Embark on Your Child's Journey?
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#e2e8f0", marginBottom: "2rem", lineHeight: 1.6 }}>
            Admissions for the upcoming academic year are underway. Connect with our admission counsellors or visit our campus for a guided tour.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-accent" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
              Inquire Now
            </Link>
            <a href={`tel:${schoolData.contact.phone}`} className="btn btn-secondary" style={{ padding: "0.85rem 1.75rem" }}>
              Call: {schoolData.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


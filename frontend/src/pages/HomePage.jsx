import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import NotebookHero from "../components/NotebookHero";
import { schoolData } from "../data/school";

export default function HomePage() {
  const topNotices = schoolData.notices.slice(0, 3);
  const featuredFacilities = schoolData.facilities.slice(0, 4);

  return (
    <div>
      {/* Animated Notebook Hero Section */}
      <NotebookHero />

      {/* Animated Stats Bar */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "3.25rem 0", position: "relative", overflow: "hidden" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2.25rem",
              textAlign: "center"
            }}
          >
            {schoolData.stats.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div style={{ fontSize: "2.85rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>
                  <CountUp end={st.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span>{st.suffix}</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "#e2e8f0", marginTop: "0.5rem", fontWeight: 600 }}>
                  {st.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome & Philosophy */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Welcome to {schoolData.name}
              </span>
              <h2 style={{ fontSize: "2.35rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                Where Learning is an Adventure of Curiosity & Joy
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                At {schoolData.name}, we provide a vibrant, caring ecosystem where foundational scholastic rigor harmonizes with character building, creative expression, and athletic enthusiasm.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
                  <div><strong>Nurturing Early Mentorship:</strong> 1:18 mentor-student ratio for personalized care.</div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
                  <div><strong>Smart Digital Attendance:</strong> Transparent attendance synchronization with teacher portal.</div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>✓</div>
                  <div><strong>STEM & Creativity:</strong> Robotics, pottery, western music, skating, and swimming clubs.</div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem" }}>
                Discover Principal's Message & Vision →
              </Link>
            </motion.div>

            {/* Principal Quote Highlight Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card"
              style={{
                padding: "2.75rem 2.25rem",
                borderLeft: "5px solid var(--accent)",
                background: "var(--surface)",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ fontSize: "3rem", color: "var(--accent)", lineHeight: 1, marginBottom: "0.75rem" }}>“</div>
              <blockquote style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--text)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                {schoolData.principal.message}
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>
                  👨‍🏫
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, color: "var(--primary)" }}>{schoolData.principal.name}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{schoolData.principal.qualification}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Preview with Stagger Animation */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Enriching Campus Facilities</h2>
            <p className="section-subtitle">
              Crafted meticulously to inspire creative discovery, physical fitness, and collaborative learning.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem" }}>
            {featuredFacilities.map((fac, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 15px 30px -5px rgba(0,0,0,0.12)" }}
                transition={{ duration: 0.3 }}
                className="card"
                style={{ display: "flex", flexDirection: "column", height: "100%", padding: "2rem" }}
              >
                <div style={{ fontSize: "2.75rem", marginBottom: "1rem" }}>{fac.icon}</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary)", marginBottom: "0.75rem" }}>
                  {fac.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, flex: 1 }}>
                  {fac.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/gallery" className="btn btn-secondary" style={{ padding: "0.85rem 2rem" }}>
              Explore Full Photo Gallery (6 Areas) →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Notices Preview */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase" }}>
                School Circulars
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.25rem" }}>
                Latest Notices for Parents & Guardians
              </h2>
            </div>
            <Link to="/notices" style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.95rem" }}>
              View All Bulletins ({schoolData.notices.length}) →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {topNotices.map((n, idx) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="card"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.35rem 1.75rem",
                  borderLeft: n.important ? "4px solid var(--error)" : "4px solid var(--primary-light)"
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
                      fontWeight: 800,
                      minWidth: "75px"
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                      {new Date(n.date).toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div style={{ fontSize: "1.3rem", lineHeight: 1 }}>
                      {new Date(n.date).getDate()}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <span className="badge badge-active">{n.category}</span>
                      {n.important && <span className="badge badge-absent">Urgent</span>}
                    </div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)" }}>{n.title}</h3>
                  </div>
                </div>
                <Link to="/notices" className="btn btn-secondary btn-sm">
                  View Details →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "4.5rem 0", textAlign: "center", position: "relative" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ fontSize: "2.35rem", fontWeight: 900, marginBottom: "1rem" }}>
              Admissions Open at DPS Junior Public School
            </h2>
            <p style={{ fontSize: "1.15rem", color: "#e2e8f0", marginBottom: "2.25rem", lineHeight: 1.6 }}>
              Give your child the ideal blend of joyous discovery, foundational logic, and holistic values. Tour our campus or register online today.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/contact" className="btn btn-accent" style={{ padding: "0.9rem 2.25rem", fontSize: "1.05rem" }}>
                Apply for Admission 2027-28
              </Link>
              <a href={`tel:${schoolData.contact.phone}`} className="btn btn-secondary" style={{ padding: "0.9rem 1.85rem", fontSize: "1rem" }}>
                Call: {schoolData.contact.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

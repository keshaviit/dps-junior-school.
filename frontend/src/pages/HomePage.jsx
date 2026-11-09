import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import NotebookHero from "../components/NotebookHero";
import { schoolData } from "../data/school";

export default function HomePage() {
  const [activeStageId, setActiveStageId] = useState("early-years");
  const activeStage = schoolData.ageStages.find((s) => s.id === activeStageId) || schoolData.ageStages[0];

  return (
    <div>
      {/* 1. Serene & Immersive Hero */}
      <NotebookHero />

      {/* 2. Calm Stats Bar */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "3rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2.5rem",
              textAlign: "center"
            }}
          >
            {schoolData.stats.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 3.5vw, 2.9rem)", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                  <CountUp end={st.value} duration={2.2} enableScrollSpy scrollSpyOnce />
                  <span>{st.suffix}</span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "#e2e8f0", marginTop: "0.5rem", fontWeight: 500, letterSpacing: "0.02em" }}>
                  {st.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Calm & Clean Headmaster Welcome */}
      <section className="section" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4.5rem", alignItems: "center" }}>
            {/* Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--border)",
                  height: "440px"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                  alt="Outdoor learning"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Minimal floating quote */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-15px",
                  backgroundColor: "var(--surface)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem 1.5rem",
                  boxShadow: "var(--shadow-md)",
                  maxWidth: "300px",
                  borderLeft: "4px solid var(--accent)"
                }}
              >
                <p style={{ fontStyle: "italic", fontSize: "0.875rem", color: "var(--text)", lineHeight: 1.5, marginBottom: "0.4rem" }}>
                  “We encourage children to be curious about the world, and joyful in exploring it.”
                </p>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)" }}>
                  — {schoolData.principal.name}
                </span>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">
                Our Educational Ethos
              </span>
              <h2 className="section-title">
                A Calmer, More Joyful Way to Learn
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                At {schoolData.name}, we believe early education should inspire deep understanding rather than stress. Set within {schoolData.campusSize}, our environment fosters natural curiosity, independent thought, and warm companionship.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.25rem" }}>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0, fontSize: "0.85rem" }}>✓</div>
                  <div style={{ fontSize: "0.95rem" }}><strong>Experiential Learning:</strong> Weekly woodland forest exploration, natural sciences, and creative expression.</div>
                </div>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0, fontSize: "0.85rem" }}>✓</div>
                  <div style={{ fontSize: "0.95rem" }}><strong>Gentle Mentorship:</strong> Small class divisions of 16-18 students with dedicated personal care.</div>
                </div>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0, fontSize: "0.85rem" }}>✓</div>
                  <div style={{ fontSize: "0.95rem" }}><strong>Digital Attendance Synchronization:</strong> Instant record-keeping between classroom teachers and the portal.</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/about" className="btn btn-primary">
                  Learn About Our Ethos →
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Arrange a Visit
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Streamlined Age Stages Section */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span className="section-tag">
              Age Pathways
            </span>
            <h2 className="section-title">Tailored for Every Stage</h2>
            <p className="section-subtitle">
              From early nursery wonder to confident leadership, explore how we guide your child.
            </p>

            {/* Stage Selector Tabs */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              {schoolData.ageStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className="btn"
                  style={{
                    backgroundColor: activeStageId === stage.id ? "var(--primary)" : "var(--surface)",
                    color: activeStageId === stage.id ? "#ffffff" : "var(--text)",
                    boxShadow: activeStageId === stage.id ? "var(--shadow-sm)" : "none",
                    border: "1px solid",
                    borderColor: activeStageId === stage.id ? "var(--primary)" : "var(--border)",
                    padding: "0.6rem 1.25rem",
                    fontSize: "0.9rem"
                  }}
                >
                  {stage.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card"
              style={{
                padding: "2.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2.5rem",
                alignItems: "center"
              }}
            >
              <div>
                <span className="badge badge-active" style={{ marginBottom: "0.75rem" }}>
                  {activeStage.badge}
                </span>
                <h3 style={{ fontSize: "1.85rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                  {activeStage.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {activeStage.description}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.75rem" }}>
                  {activeStage.highlights.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
                      <span style={{ color: "var(--accent)" }}>✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="btn btn-accent btn-sm">
                  Inquire for {stageTitle(activeStage.title)} →
                </Link>
              </div>

              <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "320px", boxShadow: "var(--shadow-sm)" }}>
                <img
                  src={activeStage.image}
                  alt={activeStage.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Parent Reflections (Clean & Calm) */}
      <section className="section" style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 3rem" }}>
            <span className="section-tag">
              Parent Experiences
            </span>
            <h2 className="section-title">Reflections from Our Community</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {schoolData.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "2rem",
                  borderTop: "3px solid var(--accent)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <p style={{ fontStyle: "italic", color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  “{t.quote}”
                </p>
                <div>
                  <h4 style={{ fontWeight: 700, color: "var(--primary)", fontSize: "0.95rem" }}>{t.author}</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Calm Call to Action */}
      <section
        style={{
          backgroundColor: "var(--primary)",
          color: "#ffffff",
          padding: "4.5rem 0",
          textAlign: "center"
        }}
      >
        <div className="container" style={{ maxWidth: "720px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Visit DPS Junior Public School
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#e2e8f0", marginBottom: "2rem", lineHeight: 1.6 }}>
            Experience our parklands and meet our dedicated educators in a relaxed personal tour.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-accent" style={{ padding: "0.85rem 2rem" }}>
              Arrange a Visit →
            </Link>
            <a href={`tel:${schoolData.contact.phone}`} className="btn btn-outline-white" style={{ padding: "0.85rem 1.75rem" }}>
              Call: {schoolData.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bar */}
      <div className="mobile-bottom-bar">
        <a href={`tel:${schoolData.contact.phone}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
          📞 Call
        </a>
        <Link to="/contact" className="btn btn-accent btn-sm" style={{ flex: 2 }}>
          Book a Visit
        </Link>
        <Link to="/login" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          🔐 Portal
        </Link>
      </div>
    </div>
  );
}

function stageTitle(title) {
  return title.split(" ")[0];
}

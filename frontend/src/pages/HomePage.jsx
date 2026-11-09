import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import NotebookHero from "../components/NotebookHero";
import { schoolData } from "../data/school";

export default function HomePage() {
  const [activeStageId, setActiveStageId] = useState("early-years");
  const activeStage = schoolData.ageStages.find((s) => s.id === activeStageId) || schoolData.ageStages[0];

  const topNotices = schoolData.notices.slice(0, 3);
  const featuredFacilities = schoolData.facilities.slice(0, 6);

  return (
    <div>
      {/* 1. Immersive Award-Winning Hero */}
      <NotebookHero />

      {/* 2. Key Stats & Accreditations (CountUp on Scroll) */}
      <section style={{ backgroundColor: "var(--primary)", color: "#ffffff", padding: "3.5rem 0", position: "relative" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "2.5rem",
              textAlign: "center"
            }}
          >
            {schoolData.stats.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 4vw, 3.25rem)", fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>
                  <CountUp end={st.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span>{st.suffix}</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "#e2e8f0", marginTop: "0.6rem", fontWeight: 600 }}>
                  {st.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. "Adventure into Education" - Head of School Welcome */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "4rem", alignItems: "center" }}>
            {/* Visual Collage */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xl)",
                  border: "4px solid #ffffff",
                  height: "460px"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                  alt="Students exploring nature"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Floating quote pill */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  right: "-20px",
                  backgroundColor: "var(--surface)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem 1.5rem",
                  boxShadow: "var(--shadow-lg)",
                  maxWidth: "320px",
                  borderLeft: "5px solid var(--accent)"
                }}
              >
                <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                  “We teach children to be curious about the world, and brave in how they explore it.”
                </p>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--primary)" }}>
                  — {schoolData.principal.name}
                </span>
              </motion.div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-tag">
                🌲 The Great Walstead Spirit
              </span>
              <h2 className="section-title">
                Unlocking Every Child's Unique Potential Through Adventure
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Education at {schoolData.name} combines rigorous intellectual foundations with joyful outdoor exploration. Set across our 45-acre parkland, children learn science in ancient woodlands, develop teamwork on athletic fields, and discover creative passions in our performing arts conservatories.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.25rem" }}>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 }}>✓</div>
                  <div><strong>Forest School Pedagogy:</strong> Weekly woodland learning sessions promoting resilience, environmental stewardship, and teamwork.</div>
                </div>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 }}>✓</div>
                  <div><strong>Individual Tutoring & Small Classes:</strong> Max 18 pupils per class ensuring bespoke academic encouragement.</div>
                </div>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 }}>✓</div>
                  <div><strong>Transparent Daily Attendance:</strong> Instant faculty synchronization and attendance tracking for peace of mind.</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/about" className="btn btn-primary">
                  Meet the Headmaster & Faculty →
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Arrange Private Tour
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Signature Great Walstead Feature: Explore by Age Stages */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3rem" }}>
            <span className="section-tag">
              🐣 Tailored for Every Step
            </span>
            <h2 className="section-title">Explore Life at DPS Junior by Age</h2>
            <p className="section-subtitle">
              From our nurturing Early Years nursery to the confident leadership of Senior Prep, explore our age-specific provisions.
            </p>

            {/* Stage Selector Tabs */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
              {schoolData.ageStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className="btn"
                  style={{
                    backgroundColor: activeStageId === stage.id ? "var(--primary)" : "var(--surface)",
                    color: activeStageId === stage.id ? "#ffffff" : "var(--text)",
                    boxShadow: activeStageId === stage.id ? "var(--shadow-md)" : "none",
                    border: "1.5px solid",
                    borderColor: activeStageId === stage.id ? "var(--primary)" : "var(--border)",
                    padding: "0.65rem 1.35rem",
                    fontSize: "0.925rem"
                  }}
                >
                  {stage.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="card"
              style={{
                padding: "2.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2.5rem",
                alignItems: "center",
                boxShadow: "var(--shadow-lg)"
              }}
            >
              <div>
                <span className="badge badge-active" style={{ marginBottom: "0.75rem", fontSize: "0.85rem" }}>
                  {activeStage.badge}
                </span>
                <h3 style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                  {activeStage.title}
                </h3>
                <h4 style={{ color: "var(--accent)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {activeStage.subtitle}
                </h4>
                <p style={{ color: "var(--text-muted)", fontSize: "1.025rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {activeStage.description}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "2rem" }}>
                  {activeStage.highlights.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>
                      <span style={{ color: "var(--accent)", fontSize: "1rem" }}>✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="btn btn-accent">
                  Book a Visit for {activeStage.title} →
                </Link>
              </div>

              <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "360px", boxShadow: "var(--shadow-md)" }}>
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

      {/* 5. A Day in the Life Timeline (Interactive Great Walstead Feature) */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem" }}>
            <span className="section-tag">
              ⏰ Daily Rhythm & Adventure
            </span>
            <h2 className="section-title">A Day in the Life at DPS Junior</h2>
            <p className="section-subtitle">
              Every day is thoughtfully structured to blend academic focus with physical energy, fresh air, and creative arts.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              maxWidth: "840px",
              margin: "0 auto",
              paddingLeft: "2rem",
              borderLeft: "3px solid var(--accent)"
            }}
          >
            {schoolData.dayInTheLife.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{
                  position: "relative",
                  marginBottom: "2rem",
                  paddingLeft: "1.5rem"
                }}
              >
                {/* Node dot on timeline */}
                <div
                  style={{
                    position: "absolute",
                    left: "-2.65rem",
                    top: "4px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent)",
                    border: "3px solid #ffffff",
                    boxShadow: "var(--shadow-sm)"
                  }}
                />
                <div style={{ display: "inline-block", fontSize: "0.85rem", fontWeight: 800, color: "var(--accent)", textTransform: "uppercase" }}>
                  {step.time}
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary)", marginTop: "0.2rem", marginBottom: "0.35rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. World-Class Campus Facilities (Masonry Cards) */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3rem" }}>
            <span className="section-tag">
              🏛 45-Acre Parkland
            </span>
            <h2 className="section-title">Purpose-Built for Discovery</h2>
            <p className="section-subtitle">
              From our all-weather athletic turfs to our indoor heated pool, discover state-of-the-art facilities designed for young champions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {featuredFacilities.map((fac, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="card card-hover"
                style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={fac.image}
                    alt={fac.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      fontSize: "1.75rem",
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "12px",
                      padding: "0.3rem 0.6rem",
                      backdropFilter: "blur(6px)"
                    }}
                  >
                    {fac.icon}
                  </span>
                </div>
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--primary)", marginBottom: "0.5rem" }}>
                    {fac.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.925rem", lineHeight: 1.6, flex: 1 }}>
                    {fac.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/gallery" className="btn btn-secondary" style={{ padding: "0.85rem 2.25rem" }}>
              View Complete Campus Gallery & Facilities →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Parent Testimonials Carousel (Great Walstead style) */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
            <span className="section-tag">
              💬 Parent Voices
            </span>
            <h2 className="section-title">What Our Families Say</h2>
            <p className="section-subtitle">
              Real reflections from parents on why DPS Junior is such a transformative start for their children.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {schoolData.testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="card"
                style={{
                  padding: "2.25rem",
                  borderTop: "4px solid var(--accent)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ fontSize: "2.5rem", color: "var(--accent)", lineHeight: 1, marginBottom: "0.5rem" }}>“</div>
                  <p style={{ fontStyle: "italic", color: "var(--text)", fontSize: "0.975rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {t.quote}
                  </p>
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, color: "var(--primary)" }}>{t.author}</h4>
                  <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Latest News & Notices Preview */}
      <section className="section" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
            <div>
              <span className="section-tag">
                📰 Life at School
              </span>
              <h2 className="section-title">Latest News & Bulletins</h2>
            </div>
            <Link to="/notices" style={{ color: "var(--primary)", fontWeight: 700 }}>
              View All Bulletins ({schoolData.notices.length}) →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {topNotices.map((n) => (
              <div key={n.id} className="card card-hover" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                    <span className="badge badge-active">{n.category}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      {new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--primary)", marginBottom: "0.75rem" }}>
                    {n.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.925rem", lineHeight: 1.6 }}>
                    {n.content}
                  </p>
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <Link to="/notices" style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.875rem" }}>
                    Read Full Circular →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Grand Call to Action Banner (Book a Visit) */}
      <section
        style={{
          backgroundColor: "var(--primary)",
          color: "#ffffff",
          padding: "5rem 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div className="container" style={{ maxWidth: "800px", position: "relative", zIndex: 1 }}>
          <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            The Adventure Begins Here
          </span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: 900, marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            Experience DPS Junior in Person
          </h2>
          <p style={{ fontSize: "1.15rem", color: "#e2e8f0", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            There is no substitute for experiencing the warmth, outdoor laughter, and vibrant energy of our campus firsthand. Book your private Head of School tour today.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-accent" style={{ padding: "1rem 2.5rem", fontSize: "1.05rem" }}>
              Book Your Visit Now →
            </Link>
            <a href={`tel:${schoolData.contact.phone}`} className="btn btn-outline-white" style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
              Call Admissions: {schoolData.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 10. Sticky Mobile Bottom Bar (100% Phone Friendly) */}
      <div className="mobile-bottom-bar">
        <a
          href={`tel:${schoolData.contact.phone}`}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, padding: "0.6rem" }}
        >
          📞 Call
        </a>
        <Link
          to="/contact"
          className="btn btn-accent btn-sm"
          style={{ flex: 2, padding: "0.6rem" }}
        >
          Book a Tour
        </Link>
        <Link
          to="/login"
          className="btn btn-primary btn-sm"
          style={{ flex: 1, padding: "0.6rem" }}
        >
          🔐 Portal
        </Link>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartIcon,
  LeafIcon,
  SunnyIcon
} from "../components/Icons";
import palette from "../theme/palette";
import { scrollToElement } from "../utils/scroll";
import VisitBookingForm from "../components/VisitBookingForm";

export default function AboutPage() {
  const location = useLocation();

  // Scroll to hash if URL contains #book-visit
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        scrollToElement(location.hash);
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div style={{ backgroundColor: palette.paper, minHeight: "100vh", paddingTop: "110px", paddingBottom: "80px" }}>
      {/* 1. HERO BANNER */}
      <section style={{ padding: "60px 0 70px", position: "relative", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "860px", position: "relative", zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "7px 16px",
              borderRadius: "20px",
              border: "1px solid var(--palette-line)",
              marginBottom: "20px"
            }}
          >
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: palette.coralDark }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", color: palette.coralDark, textTransform: "uppercase" }}>
              Our Story & Ethos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              color: palette.ink,
              fontSize: "clamp(42px, 5.8vw, 72px)",
              lineHeight: 1.08,
              letterSpacing: "-2px"
            }}
          >
            Where childhood is <br />
            <span className="script-hero">cherished.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "19px",
              lineHeight: "30px",
              color: palette.muted,
              marginTop: "22px",
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            DPS JUNIOR PUBLIC SCHOOL was founded on a simple, enduring conviction: childhood is not a race to rush through, but an adventure to live with wide-eyed curiosity, dirty hands, and abundant joy.
          </motion.p>
        </div>
      </section>

      {/* 2. THREE GUIDING PILLARS */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "28px"
            }}
          >
            {[
              {
                number: "01",
                title: "Rhythm Over Rush",
                desc: "We prioritize deep focus and reflective inquiry. Children are never rushed from one task to the next; they are given the time to linger, inspect, and truly master their questions.",
                icon: SunnyIcon,
                bg: palette.blush,
                accent: palette.coralDark
              },
              {
                number: "02",
                title: "Nature as Co-Teacher",
                desc: "Our woodlands, mud kitchens, and botany beds are daily classrooms. In all seasons, learners connect directly with living ecosystems, developing resilience and profound wonder.",
                icon: LeafIcon,
                bg: palette.sage,
                accent: "#5F7B67"
              },
              {
                number: "03",
                title: "Known by Name & Heart",
                desc: "With small groups of only 10 learners per mentor, every little individual is observed with devotion. Their unique spark, quirks, and passions shape the trajectory of each day.",
                icon: HeartIcon,
                bg: palette.lavender,
                accent: "#776C9B"
              }
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  style={{
                    backgroundColor: palette.white,
                    borderRadius: "32px",
                    padding: "36px 30px",
                    border: "1px solid #F5F5F4",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <span style={{ fontFamily: "var(--font-script)", fontSize: "36px", color: pillar.accent }}>
                        {pillar.number}
                      </span>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          backgroundColor: pillar.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Icon size={22} color={pillar.accent} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: 600, color: palette.ink, letterSpacing: "-0.5px" }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: "15px", lineHeight: "24px", color: palette.muted, marginTop: "12px" }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SCHOOL LEADERSHIP */}
      {[
        {
          role: "Manager",
          name: "Mr. Nitin Kumar Manav",
          initials: "NM",
          photo: null,
          heading: "Message from the Manager",
          paragraphs: [
            "Education is the most powerful tool we can use to shape the future, and it begins with building a strong foundation in the early years. At DPS Junior Public School, Baghpat, our mission is to foster holistic development—balancing academics, creativity, discipline, and values.",
            "We strive to create a nurturing second home for our students, empowering them to dream big and grow into responsible citizens. Thank you for entrusting us with your child’s foundational journey."
          ],
          closing: "Best wishes,"
        },
        {
          role: "Principal",
          name: "Mrs. Nupur Sharma",
          initials: "NS",
          photo: "/images/principal_nupur_sharma.jpg",
          email: "sharma.nupur0911@gmail.com",
          heading: "From the Principal’s Desk",
          salutation: "Dear Parents, Students, and Visitors,",
          paragraphs: [
            "Welcome to the official website of DPS Junior Public School, Baghpat.",
            "Having had the privilege of serving as the Principal of this wonderful institution for the past 12 years, I have witnessed firsthand the transformative power of nurturing young minds with care, patience, and purpose. Over the last decade and more, watching batches of curious little learners blossom into confident, responsible, and compassionate individuals has been my greatest reward.",
            "At DPS Junior Public School, we believe that early education lays the true foundation for life. Along with strong academic fundamentals, we place equal emphasis on moral values, discipline, creativity, and emotional well-being. Supported by a team of dedicated and passionate educators, we ensure every child feels safe, valued, and inspired to explore their unique potential.",
            "The unwavering trust and partnership of our parents over these 12 years have been the backbone of our journey. Together, let us continue to give our children the roots of strong values and the wings of knowledge."
          ],
          closing: "Warm regards,"
        }
      ].map((leader, index) => (
        <section className="leadership-section" key={leader.role} aria-labelledby={`leader-${leader.role.toLowerCase()}`}>
          <div className="container leadership-container">
            <article className="leadership-card">
              <div className="leadership-identity">
                <span className="leadership-number">0{index + 1} / 02</span>
                {leader.photo ? (
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="leadership-photo"
                  />
                ) : (
                  <div className="leadership-monogram" aria-hidden="true">{leader.initials}</div>
                )}
                <p className="leadership-role">{leader.role}</p>
                <h2 id={`leader-${leader.role.toLowerCase()}`} className="leadership-name">{leader.name}</h2>
                <p className="leadership-school">DPS Junior Public School<br />Baghpat</p>
                {leader.email && (
                  <a
                    href={`mailto:${leader.email}`}
                    style={{
                      marginTop: "12px",
                      fontSize: "12px",
                      color: "var(--palette-coralDark)",
                      fontWeight: 600,
                      wordBreak: "break-all"
                    }}
                  >
                    {leader.email}
                  </a>
                )}
              </div>
              <div className="leadership-letter">
                <span className="leadership-eyebrow">A MESSAGE TO OUR SCHOOL COMMUNITY</span>
                <h3 className="leadership-heading">{leader.heading}</h3>
                {leader.salutation && <p className="leadership-salutation">{leader.salutation}</p>}
                <div className="leadership-copy">
                  {leader.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="leadership-signature">
                  <span>{leader.closing}</span>
                  <strong>{leader.name}</strong>
                  <span>{leader.role}, DPS Junior Public School, Baghpat</span>
                  {leader.email && (
                    <a
                      href={`mailto:${leader.email}`}
                      style={{ color: "var(--palette-coralDark)", fontSize: "13px", marginTop: "4px" }}
                    >
                      ✉️ {leader.email}
                    </a>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
      ))}

      {/* 4. THE COMPLETE VISIT BOOKING FORM */}
      <VisitBookingForm />
    </div>
  );
}

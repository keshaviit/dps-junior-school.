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
import { useSEO } from "../utils/useSEO";

export default function AboutPage() {
  useSEO({
    title: "About Us & Educational Philosophy | DPS Junior Public School",
    description: "Learn about DPS Junior Public School's ethos, child-centered experiential learning pedagogy, 15-acre green parkland campus, and leadership.",
    canonical: "/about"
  });

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

      {/* 3. HEAD OF SCHOOL MESSAGE */}
      <section style={{ padding: "80px 0", backgroundColor: "#F7F4EE" }}>
        <div className="container" style={{ maxWidth: "1060px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "50px",
              alignItems: "center"
            }}
          >
            {/* Portrait Frame */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  height: "420px",
                  borderRadius: "40px",
                  overflow: "hidden",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
                  backgroundColor: palette.sage
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Arvind S. Sharma, Head of School"
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Tape sticker effect */}
              <div
                style={{
                  position: "absolute",
                  left: "20px",
                  bottom: "-15px",
                  backgroundColor: "rgba(253, 252, 248, 0.96)",
                  backdropFilter: "blur(8px)",
                  padding: "14px 22px",
                  borderRadius: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
                }}
              >
                <div style={{ fontFamily: "var(--font-script)", fontSize: "24px", color: palette.ink, lineHeight: 1 }}>
                  Dr. Arvind S. Sharma
                </div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.1px", color: palette.muted, marginTop: "4px" }}>
                  HEAD OF SCHOOL & PEDAGOGY
                </div>
              </div>
            </div>

            {/* Note Quote */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px", color: palette.coralDark, textTransform: "uppercase" }}>
                A NOTE FROM OUR HEAD OF SCHOOL
              </div>
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 500,
                  lineHeight: 1.18,
                  letterSpacing: "-1px",
                  color: palette.ink,
                  marginTop: "14px"
                }}
              >
                "We don't teach to tests; <br />
                we teach to <span className="script-heading">spark lifelong joy."</span>
              </h2>
              <p style={{ fontSize: "16px", lineHeight: "27px", color: palette.muted, marginTop: "18px" }}>
                Welcome to DPS JUNIOR PUBLIC SCHOOL. When families step onto our campus, they often tell us they feel an immediate sense of calm and breathing room.
                That feeling is deliberate.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "27px", color: palette.muted, marginTop: "14px" }}>
                Our classrooms are filled with natural sunlight, tactile building blocks, paints, open-ended books, and botanical samples. Here, children learn math through weighing seeds, science through pond-dipping, and emotional courage through collaborative storytelling.
              </p>
              <div style={{ marginTop: "24px" }}>
                <a
                  href="#book-visit"
                  className="pill-button pill-button-coral"
                  style={{ display: "inline-flex" }}
                >
                  <span>Schedule a personal walk with the Head of School</span>
                  <ArrowRight size={16} color={palette.ink} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE COMPLETE VISIT BOOKING FORM */}
      <VisitBookingForm />
    </div>
  );
}

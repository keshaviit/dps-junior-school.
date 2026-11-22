import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  SunnyIcon,
  StarIcon,
  PlayIcon,
  HeartIcon,
  LeafIcon,
  PaletteIcon,
  HappyIcon,
  SparklesIcon,
  RocketIcon,
  SchoolIcon,
  PlusIcon
} from "../components/Icons";
import StoryModal from "../components/StoryModal";
import { sendFormEmail } from "../data/school";
import palette from "../theme/palette";
import { scrollToElement } from "../utils/scroll";
import { useSEO } from "../utils/useSEO";

const classroomImage = "/images/water_splash_day.jpg";

const faqs = [
  {
    q: "Which classes are open for admission?",
    a: "DPS Junior welcomes children from Playgroup, Nursery, LKG and UKG through Classes 1 to 8. Please contact admissions to discuss the right class for your child.",
  },
  {
    q: "What is a normal school day like for my child?",
    a: "The day includes morning prayer, classroom learning, activities and time to play. Children finish with afternoon prayer before going home.",
  },
  {
    q: "What if my child needs extra help with studies?",
    a: "Please speak with your child's teacher about any concerns. Teachers can explain how your child is doing and discuss ways to support learning at school and at home.",
  },
  {
    q: "Can we visit the school before taking admission?",
    a: "Yes. You can request a campus visit to see the school and speak with the admissions team before applying.",
  },
];

function SectionHeading({ eyebrow, title, script, body, centered = false }) {
  return (
    <div style={{ maxWidth: "680px", margin: centered ? "0 auto" : "0", textAlign: centered ? "center" : "left" }}>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1.8px",
          color: palette.coralDark,
          marginBottom: "14px",
          textTransform: "uppercase"
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          color: palette.ink,
          fontSize: "clamp(32px, 4vw, 44px)",
          lineHeight: 1.15,
          letterSpacing: "-1.2px"
        }}
      >
        {title} {script ? <span className="script-heading">{script}</span> : null}
      </h2>
      {body ? (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: palette.muted,
            fontSize: "16px",
            lineHeight: "26px",
            marginTop: "18px",
            maxWidth: centered ? "560px" : "100%",
            marginLeft: centered ? "auto" : "0",
            marginRight: centered ? "auto" : "0"
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function PhoneMockup({ tint, label, title, icon: Icon, offset = 0, faded = false, center = false }) {
  return (
    <div
      style={{
        width: center ? "286px" : "260px",
        height: center ? "590px" : "540px",
        borderRadius: "44px",
        border: "7px solid #FFFFFF",
        backgroundColor: tint,
        padding: "22px",
        boxShadow: center ? "0 20px 45px rgba(0,0,0,0.12)" : "0 10px 30px rgba(0,0,0,0.06)",
        marginTop: offset,
        opacity: faded ? 0.78 : 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        transform: center ? "translateY(-10px)" : "none",
        transition: "all 0.3s ease",
        flexShrink: 0
      }}
    >
      {/* Top Notch */}
      <div
        style={{
          width: "72px",
          height: "20px",
          borderRadius: "11px",
          backgroundColor: "#FFFFFF",
          margin: "-14px auto 0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
        }}
      />

      {/* Topline Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "18px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <SparklesIcon size={16} color={palette.ink} />
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: palette.muted }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: palette.muted }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: palette.muted }} />
        </div>
      </div>

      {/* Copy */}
      <div style={{ marginTop: "24px" }}>
        <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.3px", color: palette.muted, textTransform: "uppercase" }}>
          {label}
        </div>
        <h4
          style={{
            fontSize: center ? "27px" : "24px",
            fontWeight: 500,
            lineHeight: 1.2,
            color: palette.ink,
            marginTop: "10px",
            letterSpacing: "-0.8px"
          }}
        >
          {title}
        </h4>
      </div>

      {/* Illustration & Orbit */}
      <div style={{ position: "relative", height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            border: "1px dashed rgba(41, 37, 36, 0.2)",
            position: "absolute",
            transform: "rotate(24deg)"
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: center ? palette.coral : palette.ink,
              position: "absolute",
              top: "-6px",
              left: "64px"
            }}
          />
        </div>
        <div
          style={{
            width: center ? "84px" : "72px",
            height: center ? "84px" : "72px",
            borderRadius: "50%",
            backgroundColor: center ? palette.coral : "rgba(255,255,255,0.85)",
            boxShadow: center ? "0 10px 24px rgba(156, 81, 78, 0.3)" : "0 4px 12px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2
          }}
        >
          <Icon size={center ? 30 : 26} color={palette.ink} />
        </div>
      </div>

      {/* Note */}
      <p style={{ fontSize: "12px", color: palette.muted, textAlign: "center", lineHeight: "18px", padding: "0 12px", marginBottom: "8px" }}>
        {center ? "Take your time. Learning is not a race." : "A small prompt for a thoughtful day."}
      </p>
    </div>
  );
}

export default function HomePage() {
  useSEO({
    title: "DPS JUNIOR PUBLIC SCHOOL | Playgroup to Class VIII | An Adventure in Learning",
    description: "An inspiring CBSE prep school from Playgroup to Class 8, where curious young minds build solid conceptual foundations in academics, nature inquiry, and enduring values.",
    canonical: "/"
  });

  const [openFaq, setOpenFaq] = useState(0);
  const [email, setEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [activeChip, setActiveChip] = useState("Make");
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  const scrollTo = (id) => scrollToElement(id);

  const submitInterest = async (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (valid) {
      const sent = await sendFormEmail(`Open Morning Lead - ${email.trim()}`, {
        "Parent Email": email.trim(),
        "Source": "Homepage Quick Interest Bar"
      });
      if (sent) {
        setFormMessage("Thank you! Your interest has been recorded.");
        setEmail("");
      } else {
        setFormMessage("We could not record your interest. Please call admissions at +91 9359159934.");
      }
    } else {
      setFormMessage("Please enter a valid email address.");
    }
  };

  return (
    <div style={{ backgroundColor: palette.paper, overflow: "hidden" }}>
      {/* 1. HERO SECTION */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "860px",
          paddingTop: "150px",
          paddingBottom: "110px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Animated Background Blobs */}
        <div
          className="anim-float-1"
          style={{
            position: "absolute",
            width: "430px",
            height: "430px",
            borderRadius: "50%",
            backgroundColor: palette.blush,
            top: "80px",
            left: "-180px",
            opacity: 0.75,
            pointerEvents: "none",
            filter: "blur(20px)"
          }}
        />
        <div
          className="anim-float-2"
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "#E6E6FA",
            top: "160px",
            right: "-200px",
            opacity: 0.75,
            pointerEvents: "none",
            filter: "blur(25px)"
          }}
        />

        {/* Floating Doodles */}
        <div
          className="anim-sun hero-doodle-sun"
          style={{
            position: "absolute",
            left: "9%",
            top: "130px",
            width: "64px",
            height: "64px",
            borderRadius: "28px",
            backgroundColor: palette.sunshine,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(248, 217, 122, 0.4)",
            zIndex: 2
          }}
        >
          <SunnyIcon size={34} color="#A26B42" />
        </div>

        <div
          className="anim-star hero-doodle-star"
          style={{
            position: "absolute",
            right: "9%",
            top: "210px",
            width: "58px",
            height: "58px",
            borderRadius: "22px",
            backgroundColor: palette.lavender,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(239, 237, 244, 0.6)",
            zIndex: 2
          }}
        >
          <StarIcon size={28} color="#776C9B" />
        </div>

        {/* Hero Content Container */}
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: "1080px" }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(8px)",
              padding: "8px 15px",
              borderRadius: "18px",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
            }}
          >
            <div
              className="anim-pulse-dot"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#71947A"
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: palette.muted,
                textTransform: "uppercase"
              }}
            >
              PLAYGROUP TO CLASS VIII · AGES 2–14
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              color: palette.ink,
              fontSize: "clamp(46px, 6.8vw, 84px)",
              lineHeight: 1.04,
              letterSpacing: "-2.8px",
              marginTop: "24px"
            }}
          >
            Big little days, <br />
            growing <span className="script-hero">gently.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              lineHeight: "28px",
              color: palette.muted,
              maxWidth: "620px",
              margin: "24px auto 0"
            }}
          >
            An inspiring school from Playgroup to Class 8, where curious young minds build solid conceptual foundations in academics, nature inquiry, and enduring values.
          </motion.p>

          {/* Play Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginTop: "24px"
            }}
          >
            {[
              { label: "Make", icon: PaletteIcon, bg: palette.blush },
              { label: "Explore", icon: LeafIcon, bg: palette.sage },
              { label: "Play", icon: HappyIcon, bg: palette.sunshine },
              { label: "Wonder", icon: SparklesIcon, bg: palette.lavender }
            ].map(({ label, icon: Icon, bg }) => (
              <button
                key={label}
                onClick={() => setActiveChip(label)}
                style={{
                  minHeight: "34px",
                  padding: "0 14px",
                  borderRadius: "17px",
                  backgroundColor: bg,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  border: activeChip === label ? "1.5px solid var(--palette-ink)" : "1.5px solid transparent",
                  transform: activeChip === label ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.18s ease"
                }}
              >
                <Icon size={15} color={palette.ink} />
                <span style={{ fontSize: "12px", fontWeight: 700, color: palette.ink }}>{label}</span>
              </button>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginTop: "24px"
            }}
          >
            <button
              onClick={() => scrollTo("approach")}
              className="pill-button pill-button-coral"
            >
              <span>Explore our school</span>
              <ArrowRight size={17} color={palette.ink} />
            </button>

            <div
              className="pill-button pill-button-white"
              style={{ cursor: "default", opacity: 0.9, pointerEvents: "none", userSelect: "none" }}
            >
              <span>Watch our story</span>
              <PlayIcon size={14} color={palette.ink} />
            </div>
          </motion.div>

          {/* Hero Photo Wrap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              width: "100%",
              maxWidth: "1020px",
              height: "clamp(280px, 42vw, 470px)",
              borderRadius: "48px",
              overflow: "hidden",
              marginTop: "54px",
              backgroundColor: palette.sage,
              position: "relative",
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.08)"
            }}
          >
            <img
              src={classroomImage}
              alt="DPS Junior Public School Baghpat Students - Joyful Water Splash Day"
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Bottom-Left Sticker */}
            <div
              style={{
                position: "absolute",
                left: "16px",
                bottom: "16px",
                backgroundColor: "rgba(253, 252, 248, 0.94)",
                backdropFilter: "blur(6px)",
                borderRadius: "20px",
                padding: "12px 18px",
                textAlign: "left",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
              }}
            >
              <div style={{ fontFamily: "var(--font-script)", fontSize: "25px", color: palette.ink, lineHeight: 1 }}>
                Learning is an adventure
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "1.2px", color: palette.muted, marginTop: "4px" }}>
                DPS JUNIOR · ARYA NAGAR, BAGHPAT
              </div>
            </div>

            {/* Top-Right Yellow Stat Card */}
            <div
              style={{
                position: "absolute",
                right: "16px",
                top: "16px",
                width: "124px",
                backgroundColor: palette.sunshine,
                borderRadius: "22px",
                padding: "16px",
                textAlign: "left",
                boxShadow: "0 8px 20px rgba(248, 217, 122, 0.45)"
              }}
            >
              <HeartIcon size={18} color={palette.coralDark} />
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "36px",
                  color: palette.ink,
                  letterSpacing: "-1.5px",
                  lineHeight: 1,
                  marginTop: "6px"
                }}
              >
                10
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "11px", lineHeight: "14px", color: palette.ink, marginTop: "4px" }}>
                little learners per play group
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE DPS JUNIOR WAY SECTION */}
      <section id="approach" style={{ padding: "100px 0", backgroundColor: "#F7F4EE" }}>
        <div className="container">
          <SectionHeading
            eyebrow="THE DPS JUNIOR WAY"
            title="Learning that feels like"
            script="play."
            body="Young children learn best with their whole selves—hands busy, bodies moving, and imaginations switched all the way on."
            centered
          />

          {/* Phone Stage Mockups */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              marginTop: "60px",
              overflowX: "auto",
              padding: "20px 0"
            }}
          >
            <div className="approach-phone-left">
              <PhoneMockup
                tint={palette.sage}
                label="MONDAY · 9:30"
                title="Can you find a leaf shaped like a heart?"
                icon={LeafIcon}
                offset={48}
                faded
              />
            </div>

            <PhoneMockup
              tint={palette.blush}
              label="TODAY'S BIG QUESTION"
              title="What would you build on the moon?"
              icon={RocketIcon}
              center
            />

            <div className="approach-phone-right">
              <PhoneMockup
                tint={palette.lavender}
                label="FRIDAY · 2:00"
                title="Show us your proudest, messiest creation."
                icon={HeartIcon}
                offset={96}
                faded
              />
            </div>
          </div>

          {/* Values Row */}
          <div
            style={{
              maxWidth: "1040px",
              margin: "50px auto 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "40px"
            }}
          >
            {[
              ["01", "Foundational (Playgroup – UKG)", "Phonics, mud kitchens, number play, song circles, and tactile sensory joy."],
              ["02", "Primary Wing (Classes I – V)", "Conceptual mathematics, science labs, bilingual reading, computer coding, and arts."],
              ["03", "Middle Wing (Classes VI – VIII)", "Physics, Chemistry, Biology labs, advanced mathematics, robotics, and sports fixtures."]
            ].map(([number, title, body]) => (
              <div key={number} style={{ borderTop: "1px solid #D6D3D1", paddingTop: "20px" }}>
                <div style={{ fontFamily: "var(--font-script)", color: palette.coralDark, fontSize: "32px", lineHeight: 1 }}>
                  {number}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: palette.ink, marginTop: "8px" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "22px", color: palette.muted, marginTop: "8px" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GOOD QUESTIONS (FAQ ACCORDION) */}
      <section id="faq" style={{ padding: "110px 0", backgroundColor: palette.sage }}>
        <div className="container">
          <div
            style={{
              maxWidth: "1060px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "60px",
              alignItems: "flex-start"
            }}
          >
            {/* Left Intro */}
            <div>
              <SectionHeading
                eyebrow="GOOD QUESTIONS"
                title="A few things families"
                script="often ask."
                body="If your question isn’t here, we’d love to hear from you."
              />
              <Link
                to="/contact"
                style={{
                  display: "inline-block",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: palette.ink,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  marginTop: "24px"
                }}
              >
                Contact admissions →
              </Link>
            </div>

            {/* Right Accordion List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={item.q}
                    style={{
                      backgroundColor: palette.white,
                      borderRadius: "18px",
                      border: "1px solid rgba(231,229,228,0.8)",
                      padding: "0 22px",
                      overflow: "hidden",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      style={{
                        width: "100%",
                        minHeight: "72px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "18px",
                        textAlign: "left",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: 500, color: palette.ink }}>{item.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ flexShrink: 0 }}
                      >
                        <PlusIcon size={22} color={palette.ink} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: "hidden" }}
                        >
                          <p style={{ fontSize: "14px", lineHeight: "22px", color: palette.muted, paddingBottom: "22px", paddingRight: "28px" }}>
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. COME SAY HELLO (VISIT SECTION) */}
      <section
        id="visit"
        style={{
          position: "relative",
          minHeight: "680px",
          padding: "100px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {/* Glow */}
        <div
          className="anim-float-2"
          style={{
            position: "absolute",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            backgroundColor: palette.blush,
            opacity: 0.8,
            top: "20px",
            pointerEvents: "none",
            filter: "blur(30px)"
          }}
        />

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: "680px" }}>
          {/* Badge Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "22px",
              backgroundColor: palette.ink,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              position: "relative",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "11px",
                right: "12px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: palette.coral
              }}
            />
            <SchoolIcon size={28} color={palette.white} />
          </div>

          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px", color: palette.coralDark, textTransform: "uppercase" }}>
            COME SAY HELLO
          </div>

          <h2
            style={{
              fontSize: "clamp(38px, 5.5vw, 64px)",
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: "-1.8px",
              color: palette.ink,
              marginTop: "16px"
            }}
          >
            See if DPS JUNIOR feels <br />
            like <span className="script-hero">your place.</span>
          </h2>

          <p style={{ fontSize: "16px", lineHeight: "26px", color: palette.muted, maxWidth: "560px", margin: "22px auto 0" }}>
            Join an open morning, wander through our studios, and meet the people who make this school feel like home.
          </p>

          {/* Form */}
          <form
            onSubmit={submitInterest}
            style={{
              maxWidth: "620px",
              margin: "32px auto 0",
              backgroundColor: palette.white,
              borderRadius: "34px",
              padding: "6px 6px 6px 24px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
              border: "1px solid #E7E5E4"
            }}
            className="visit-form-box"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormMessage("");
              }}
              placeholder="Your email address"
              aria-label="Email address for open morning booking"
              style={{
                flex: 1,
                minHeight: "50px",
                fontSize: "15px",
                color: palette.ink,
                border: "none",
                outline: "none",
                backgroundColor: "transparent"
              }}
            />
            <button
              type="submit"
              className="pill-button pill-button-dark"
              style={{ flexShrink: 0 }}
            >
              <span>Book an open morning</span>
              <ArrowRight size={15} color={palette.white} />
            </button>
          </form>

          {formMessage && (
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: formMessage.startsWith("Please") ? palette.coralDark : "#5F7B67",
                marginTop: "14px"
              }}
            >
              {formMessage}
            </div>
          )}

          <div style={{ fontSize: "11px", color: "#A8A29E", marginTop: "14px" }}>
            No spam. Just visit dates and a little more about our school.
          </div>

          <div style={{ marginTop: "24px" }}>
            <Link
              to="/about#book-visit"
              style={{
                display: "inline-block",
                fontSize: "14px",
                fontWeight: 600,
                color: palette.coralDark,
                textDecoration: "underline",
                textUnderlineOffset: "4px"
              }}
            >
              Or fill out the complete campus visit reservation form →
            </Link>
          </div>
        </div>
      </section>

      {/* Story Video Modal */}
      <StoryModal isOpen={storyModalOpen} onClose={() => setStoryModalOpen(false)} />

      {/* Responsive Style Overrides */}
      <style>{`
        @media (max-width: 900px) {
          .hero-doodle-sun, .hero-doodle-star {
            display: none !important;
          }
          .approach-phone-left, .approach-phone-right {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .visit-form-box {
            flex-direction: column !important;
            padding: 8px !important;
            background-color: transparent !important;
            box-shadow: none !important;
            border: none !important;
            gap: 10px !important;
          }
          .visit-form-box input {
            width: 100% !important;
            background-color: #FFFFFF !important;
            border-radius: 28px !important;
            padding: 0 20px !important;
            border: 1px solid #E7E5E4 !important;
          }
          .visit-form-box button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

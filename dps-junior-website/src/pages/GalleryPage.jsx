import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { schoolData } from "../data/school";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ["All", "Woodland Adventure", "Sports & Vitality", "STEM Discovery", "Music & Arts", "Early Years"];

  const filteredPhotos = selectedCategory === "All"
    ? schoolData.gallery
    : schoolData.gallery.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ paddingBottom: "6rem" }}>
      {/* Header */}
      <section
        style={{
          backgroundColor: "#102f24",
          color: "#ffffff",
          padding: "5rem 0 3.5rem",
          textAlign: "center",
          position: "relative"
        }}
      >
        <div className="container" style={{ maxWidth: "750px" }}>
          <span className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "var(--accent)" }}>
            Visual Storytelling
          </span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.35rem, 5vw, 3.5rem)", fontWeight: 900, marginTop: "0.5rem", marginBottom: "1rem" }}>
            Campus Life in Action
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#e2e8f0" }}>
            Take a visual tour through our 45-acre parkland, STEM laboratories, equestrian fixtures, and music studios.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "3.5rem" }}>
        {/* Category Filter Pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn btn-sm"
              style={{
                borderRadius: "var(--radius-full)",
                padding: "0.6rem 1.4rem",
                fontSize: "0.9rem",
                fontWeight: 700,
                backgroundColor: selectedCategory === cat ? "var(--primary)" : "var(--surface)",
                color: selectedCategory === cat ? "#ffffff" : "var(--text)",
                border: "1.5px solid",
                borderColor: selectedCategory === cat ? "var(--primary)" : "var(--border)",
                boxShadow: selectedCategory === cat ? "var(--shadow-md)" : "none"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem"
          }}
        >
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              whileHover={{ y: -6 }}
              className="card card-hover"
              style={{
                padding: 0,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "relative", height: "260px", overflow: "hidden", backgroundColor: "#e2e8f0" }}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    backgroundColor: "rgba(20, 56, 44, 0.85)",
                    color: "#ffffff",
                    fontSize: "0.775rem",
                    fontWeight: 700,
                    padding: "0.3rem 0.8rem",
                    borderRadius: "var(--radius-full)",
                    backdropFilter: "blur(6px)"
                  }}
                >
                  {photo.category}
                </span>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", color: "var(--primary)", marginBottom: "0.4rem" }}>
                  {photo.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem"
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActivePhoto(null)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(10, 26, 20, 0.88)",
                backdropFilter: "blur(8px)"
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                position: "relative",
                maxWidth: "880px",
                width: "100%",
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
                zIndex: 1001
              }}
            >
              <div style={{ position: "relative", maxHeight: "68vh", backgroundColor: "#000" }}>
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  style={{ width: "100%", height: "auto", maxHeight: "68vh", objectFit: "contain", display: "block" }}
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#ffffff",
                    fontSize: "1.3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <span className="badge badge-active">{activePhoto.category}</span>
                  <h3 style={{ fontSize: "1.45rem", color: "var(--primary)" }}>{activePhoto.title}</h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6 }}>{activePhoto.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

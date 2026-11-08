import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { schoolData } from "../data/school";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ["All", "Academics", "Sports", "Campus", "Events"];

  const filteredPhotos = selectedCategory === "All"
    ? schoolData.gallery
    : schoolData.gallery.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Header */}
      <section style={{ backgroundColor: "var(--surface-alt)", padding: "4rem 0 2.5rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "750px" }}>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
            Visual Tour
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem", marginBottom: "1rem" }}>
            Campus Life & Memories
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
            Explore moments of triumph, scientific discovery, cultural expressions, and sportsmanship.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "3rem" }}>
        {/* Category Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                borderRadius: "var(--radius-full)",
                padding: "0.5rem 1.25rem",
                minHeight: "40px",
                fontSize: "0.9rem",
                backgroundColor: selectedCategory === cat ? "var(--primary)" : "var(--surface)",
                color: selectedCategory === cat ? "#ffffff" : "var(--text)",
                border: "1px solid",
                borderColor: selectedCategory === cat ? "var(--primary)" : "var(--border)"
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
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.75rem"
          }}
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="card card-hover"
              style={{
                padding: 0,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "relative", height: "240px", overflow: "hidden", backgroundColor: "#e2e8f0" }}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "rgba(15, 23, 42, 0.75)",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    backdropFilter: "blur(4px)"
                  }}
                >
                  {photo.category}
                </span>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.4rem" }}>
                  {photo.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Framer Motion Scale & Fade */}
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
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(6px)"
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                position: "relative",
                maxWidth: "800px",
                width: "100%",
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
                zIndex: 1001
              }}
            >
              <div style={{ position: "relative", maxHeight: "65vh", backgroundColor: "#000" }}>
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  style={{ width: "100%", height: "auto", maxHeight: "65vh", objectFit: "contain", display: "block" }}
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#ffffff",
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                  <span className="badge badge-active">{activePhoto.category}</span>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--primary)" }}>{activePhoto.title}</h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{activePhoto.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


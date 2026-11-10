import React, { useState } from "react";
import { schoolData } from "../data/school";

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Academic", "Sports", "Achievement", "Admissions", "General"];

  const filteredNotices = schoolData.notices
    .filter((n) => {
      const matchesCategory = selectedCategory === "All" || n.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Header */}
      <section style={{ backgroundColor: "var(--surface-alt)", padding: "4rem 0 2.5rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "750px" }}>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
            Official Bulletins
          </span>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem", marginBottom: "1rem" }}>
            Circulars & School Notices
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
            Important updates regarding academic calendars, examinations, events, and advisories.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "3rem", maxWidth: "900px" }}>
        {/* Search & Category Filter */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem"
          }}
        >
          <div style={{ flex: 1, minWidth: "260px" }}>
            <input
              type="text"
              placeholder="Search notices by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="btn btn-sm"
                style={{
                  borderRadius: "var(--radius-full)",
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
        </div>

        {/* Notices List */}
        {filteredNotices.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", background: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px dashed var(--border)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📰</div>
            <p style={{ color: "var(--text-muted)" }}>No notices found matching your criteria.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="card"
                style={{
                  borderLeft: notice.important ? "4px solid var(--error)" : "4px solid var(--primary-light)",
                  padding: "1.5rem 1.75rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span className="badge badge-active">{notice.category}</span>
                    {notice.important && <span className="badge badge-absent">Urgent / Important</span>}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    📅 {new Date(notice.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </div>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem" }}>
                  {notice.title}
                </h3>

                <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


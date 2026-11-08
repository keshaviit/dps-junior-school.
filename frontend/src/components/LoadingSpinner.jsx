import React from "react";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizePixels = size === "sm" ? 20 : size === "lg" ? 48 : 32;

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1rem" }}>
      <div
        style={{
          width: sizePixels,
          height: sizePixels,
          border: "3px solid #e2e8f0",
          borderTopColor: "var(--primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }}
      />
      {text && <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{text}</span>}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


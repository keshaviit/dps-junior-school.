import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function DataTable({
  columns,
  data = [],
  loading = false,
  emptyText = "No records found.",
  keyField = "id"
}) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", background: "var(--surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
        <LoadingSpinner text="Fetching data..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3.5rem 1rem",
          background: "var(--surface)",
          borderRadius: "var(--radius-md)",
          border: "1px dashed var(--border)"
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📋</div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={col.key || idx} style={col.style || {}}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={row[keyField] || rowIdx}>
              {columns.map((col, colIdx) => (
                <td key={col.key || colIdx} style={col.style || {}}>
                  {col.render ? col.render(row[col.key], row, rowIdx) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


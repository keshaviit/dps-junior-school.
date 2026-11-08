import React from "react";

export default function StatusBadge({ status }) {
  if (!status) return null;

  const normalized = String(status).toUpperCase();

  let className = "badge";
  let display = normalized;

  switch (normalized) {
    case "PRESENT":
      className += " badge-present";
      display = "✓ Present";
      break;
    case "ABSENT":
      className += " badge-absent";
      display = "✗ Absent";
      break;
    case "LEAVE":
      className += " badge-leave";
      display = "◷ Leave";
      break;
    case "ACTIVE":
    case "TRUE":
      className += " badge-active";
      display = "Active";
      break;
    case "INACTIVE":
    case "FALSE":
      className += " badge-inactive";
      display = "Inactive";
      break;
    default:
      className += " badge-inactive";
      display = status;
  }

  return <span className={className}>{display}</span>;
}


import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import DataTable from "../../components/DataTable";

export default function TeacherReports() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  });

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/api/teacher/classes");
        setClasses(res.data);
        if (res.data.length > 0) setSelectedClassId(String(res.data[0].id));
      } catch (err) {
        toast.error("Failed to load your classes.");
      }
    };
    fetchClasses();
  }, []);

  const fetchReport = async (classId, month) => {
    if (!classId || !month) return;
    try {
      setLoading(true);
      const res = await api.get(`/api/attendance/report?classId=${classId}&month=${month}`);
      setReportData(res.data);
    } catch (err) {
      toast.error("Failed to load monthly attendance report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassId && selectedMonth) {
      fetchReport(selectedClassId, selectedMonth);
    }
  }, [selectedClassId, selectedMonth]);

  const handleExportExcel = async () => {
    if (!selectedClassId || !selectedMonth) return;
    try {
      setExporting(true);
      const res = await api.get(`/api/attendance/report/export?classId=${selectedClassId}&month=${selectedMonth}`, {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `class-attendance-${selectedMonth}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Excel report downloaded!");
    } catch (err) {
      toast.error("Excel export failed.");
    } finally {
      setExporting(false);
    }
  };

  const columns = [
    { title: "Roll No", key: "rollNo", render: (r) => <strong>{r}</strong> },
    { title: "Student Name", key: "studentName" },
    {
      title: "Present",
      key: "present",
      render: (p) => <span style={{ color: "var(--success)", fontWeight: 700 }}>{p}</span>
    },
    {
      title: "Absent",
      key: "absent",
      render: (a) => <span style={{ color: "var(--error)", fontWeight: 700 }}>{a}</span>
    },
    {
      title: "Leave",
      key: "leave",
      render: (l) => <span style={{ color: "var(--warning)", fontWeight: 700 }}>{l}</span>
    },
    {
      title: "Percentage",
      key: "percentage",
      render: (pct) => {
        const isGood = pct >= 75;
        return (
          <span
            style={{
              fontWeight: 800,
              padding: "0.25rem 0.5rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: isGood ? "var(--success-bg)" : "var(--error-bg)",
              color: isGood ? "var(--success)" : "var(--error)"
            }}
          >
            {pct}%
          </span>
        );
      }
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>Class Attendance Reports</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Monthly summary of presence, absences, and attendance ratios for your students.
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          disabled={exporting || reportData.length === 0}
          className="btn btn-primary"
        >
          {exporting ? "Generating..." : "📊 Export to Excel (.xlsx)"}
        </button>
      </div>

      <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.25rem" }}>
            Select Class:
          </label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="form-select"
            style={{ minWidth: "220px" }}
          >
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Class {cls.name} ({cls.section})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.25rem" }}>
            Select Month:
          </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-input"
            style={{ minWidth: "180px" }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={reportData}
        loading={loading}
        emptyText="No records found for this class and month."
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";

export default function AttendanceHistory() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];
  const lastWeekStr = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [from, setFrom] = useState(lastWeekStr);
  const [to, setTo] = useState(todayStr);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/api/teacher/classes");
        setClasses(res.data);
        if (res.data.length > 0) setSelectedClassId(String(res.data[0].id));
      } catch (err) {
        toast.error("Failed to load assigned classes.");
      }
    };
    fetchClasses();
  }, []);

  const fetchHistory = async () => {
    if (!selectedClassId || !from || !to) return;
    try {
      setLoading(true);
      const res = await api.get(`/api/attendance/history?classId=${selectedClassId}&from=${from}&to=${to}`);
      setRecords(res.data);
    } catch (err) {
      toast.error("Failed to load attendance history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassId) {
      fetchHistory();
    }
  }, [selectedClassId, from, to]);

  const columns = [
    { title: "Date", key: "date", render: (d) => <strong>{d}</strong> },
    { title: "Roll No", key: "rollNo" },
    { title: "Student Name", key: "studentName" },
    {
      title: "Attendance Status",
      key: "status",
      render: (s) => <StatusBadge status={s} />
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>Attendance History</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Audit past attendance records across customized date ranges.
        </p>
      </div>

      <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "flex-end" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.25rem" }}>
            Class:
          </label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="form-select"
            style={{ minWidth: "200px" }}
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
            From:
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.25rem" }}>
            To:
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={records}
        loading={loading}
        emptyText="No historical records found for this period."
      />
    </div>
  );
}


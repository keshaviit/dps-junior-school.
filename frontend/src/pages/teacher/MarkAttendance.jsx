import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/client";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function MarkAttendance() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialClassId = searchParams.get("classId") || "";

  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(initialClassId);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);

  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // { [studentId]: "PRESENT" | "ABSENT" | "LEAVE" }
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Today max constraint
  const maxDate = new Date().toISOString().split("T")[0];

  // Fetch teacher's classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/api/teacher/classes");
        setClasses(res.data);
        if (res.data.length > 0 && !selectedClassId) {
          setSelectedClassId(String(res.data[0].id));
        }
      } catch (err) {
        toast.error("Failed to load your assigned classes.");
      }
    };
    fetchClasses();
  }, []);

  // Fetch students & existing attendance for selected class & date
  useEffect(() => {
    if (!selectedClassId) return;

    const loadClassAttendance = async () => {
      try {
        setLoading(true);
        // Load students of this class
        const studentsRes = await api.get(`/api/classes/${selectedClassId}/students`);
        const studentList = studentsRes.data;
        setStudents(studentList);

        // Load existing attendance if marked
        const attRes = await api.get(`/api/attendance?classId=${selectedClassId}&date=${selectedDate}`);
        const existingRecords = attRes.data; // [{ studentId, status }, ...]

        const initialMap = {};
        if (existingRecords.length > 0) {
          existingRecords.forEach((rec) => {
            initialMap[rec.studentId] = rec.status;
          });
          // Ensure all students have a status (default to PRESENT if newly added)
          studentList.forEach((s) => {
            if (!initialMap[s.id]) initialMap[s.id] = "PRESENT";
          });
          toast("Existing attendance loaded for this date.", { icon: "ℹ️" });
        } else {
          // Default all to PRESENT
          studentList.forEach((s) => {
            initialMap[s.id] = "PRESENT";
          });
        }
        setAttendanceMap(initialMap);
      } catch (err) {
        toast.error("Failed to fetch class attendance data.");
      } finally {
        setLoading(false);
      }
    };

    loadClassAttendance();
  }, [selectedClassId, selectedDate]);

  // Status toggle handler
  const setStatus = (studentId, status) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Mark all present
  const markAllPresent = () => {
    const allPresent = {};
    students.forEach((s) => {
      allPresent[s.id] = "PRESENT";
    });
    setAttendanceMap(allPresent);
    toast.success("All students marked as Present!");
  };

  // Counts
  const counts = students.reduce(
    (acc, s) => {
      const st = attendanceMap[s.id] || "PRESENT";
      if (st === "PRESENT") acc.present++;
      else if (st === "ABSENT") acc.absent++;
      else if (st === "LEAVE") acc.leave++;
      return acc;
    },
    { present: 0, absent: 0, leave: 0 }
  );

  // Save attendance
  const handleSave = async () => {
    if (students.length === 0) {
      toast.error("No students to mark attendance for.");
      return;
    }

    const payload = {
      classId: Number(selectedClassId),
      date: selectedDate,
      attendance: students.map((s) => ({
        studentId: s.id,
        status: attendanceMap[s.id] || "PRESENT"
      }))
    };

    try {
      setSaving(true);
      await api.post("/api/attendance", payload);
      toast.success(`✓ Attendance saved for ${students.length} students!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>Daily Attendance Register</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Mark presence, absence, or approved leave with instant faculty synchronization.
        </p>
      </div>

      {/* Control Bar: Class selector, Date picker, Quick Action */}
      <div className="card" style={{ padding: "1.5rem", marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", flex: 1 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.35rem" }}>
                Select Class:
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value);
                  setSearchParams({ classId: e.target.value });
                }}
                className="form-select"
                style={{ minWidth: "220px" }}
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    Class {c.name} - Section {c.section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.35rem" }}>
                Attendance Date:
              </label>
              <input
                type="date"
                max={maxDate}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-input"
                style={{ minWidth: "180px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button
              onClick={markAllPresent}
              type="button"
              className="btn btn-secondary"
              style={{ minHeight: "44px", fontWeight: 700 }}
            >
              ✓ Mark All Present
            </button>
            <button
              onClick={handleSave}
              disabled={saving || loading || students.length === 0}
              type="button"
              className="btn btn-primary"
              style={{ minHeight: "44px", padding: "0.75rem 1.75rem", fontWeight: 700, fontSize: "1rem" }}
            >
              {saving ? "Saving..." : "💾 Save Attendance"}
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.1rem" }}>👥</span>
            <span style={{ fontWeight: 700 }}>Total Students:</span>
            <span style={{ color: "var(--primary)", fontWeight: 800 }}>{students.length}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge badge-present" style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}>
              ✓ Present: {counts.present}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge badge-absent" style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}>
              ✗ Absent: {counts.absent}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge badge-leave" style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}>
              ◷ Leave: {counts.leave}
            </span>
          </div>
        </div>
      </div>

      {/* Student List with 3-way toggle buttons */}
      {loading ? (
        <LoadingSpinner text="Loading student roll..." />
      ) : students.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem 1rem", border: "1px dashed var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No students enrolled in this class yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {students.map((student, idx) => {
            const currentStatus = attendanceMap[student.id] || "PRESENT";

            return (
              <div
                key={student.id}
                className="card"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1.25rem",
                  gap: "1rem",
                  borderLeft:
                    currentStatus === "PRESENT"
                      ? "4px solid var(--success)"
                      : currentStatus === "ABSENT"
                      ? "4px solid var(--error)"
                      : "4px solid var(--warning)"
                }}
              >
                {/* Student Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "220px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "var(--surface-alt)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      color: "var(--text-muted)"
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{student.name}</h4>
                    <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>Roll No: {student.rollNo}</p>
                  </div>
                </div>

                {/* 3-Way Status Toggle */}
                <div
                  style={{
                    display: "inline-flex",
                    backgroundColor: "var(--surface-alt)",
                    borderRadius: "var(--radius-md)",
                    padding: "3px",
                    gap: "3px"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setStatus(student.id, "PRESENT")}
                    style={{
                      minHeight: "40px",
                      padding: "0.5rem 1.15rem",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      backgroundColor: currentStatus === "PRESENT" ? "var(--success)" : "transparent",
                      color: currentStatus === "PRESENT" ? "#ffffff" : "var(--text-muted)",
                      boxShadow: currentStatus === "PRESENT" ? "var(--shadow-sm)" : "none"
                    }}
                  >
                    ✓ Present
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus(student.id, "ABSENT")}
                    style={{
                      minHeight: "40px",
                      padding: "0.5rem 1.15rem",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      backgroundColor: currentStatus === "ABSENT" ? "var(--error)" : "transparent",
                      color: currentStatus === "ABSENT" ? "#ffffff" : "var(--text-muted)",
                      boxShadow: currentStatus === "ABSENT" ? "var(--shadow-sm)" : "none"
                    }}
                  >
                    ✗ Absent
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus(student.id, "LEAVE")}
                    style={{
                      minHeight: "40px",
                      padding: "0.5rem 1.15rem",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      backgroundColor: currentStatus === "LEAVE" ? "var(--warning)" : "transparent",
                      color: currentStatus === "LEAVE" ? "#ffffff" : "var(--text-muted)",
                      boxShadow: currentStatus === "LEAVE" ? "var(--shadow-sm)" : "none"
                    }}
                  >
                    ◷ Leave
                  </button>
                </div>
              </div>
            );
          })}

          {/* Bottom Save bar */}
          <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
            <button
              onClick={handleSave}
              disabled={saving || loading || students.length === 0}
              className="btn btn-primary"
              style={{ minHeight: "48px", padding: "0.85rem 2.5rem", fontSize: "1.05rem", fontWeight: 700 }}
            >
              {saving ? "Saving..." : "💾 Save Attendance"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

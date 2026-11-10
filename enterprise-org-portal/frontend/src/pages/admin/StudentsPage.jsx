import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import StatusBadge from "../../components/StatusBadge";

export default function StudentsPage() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [currentStudent, setCurrentStudent] = useState(null);
  const [formRollNo, setFormRollNo] = useState("");
  const [formName, setFormName] = useState("");
  const [formClassId, setFormClassId] = useState("");

  // CSV upload state
  const [csvFile, setCsvFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/api/admin/classes");
      setClasses(res.data);
      if (res.data.length > 0 && !selectedClassId) {
        setSelectedClassId(String(res.data[0].id));
      }
    } catch (err) {
      toast.error("Failed to load classes.");
    }
  };

  const fetchStudents = async (classId) => {
    if (!classId) return;
    try {
      setLoading(true);
      const res = await api.get(`/api/admin/students?classId=${classId}`);
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to fetch student registry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchStudents(selectedClassId);
    }
  }, [selectedClassId]);

  const handleOpenAdd = () => {
    setFormRollNo("");
    setFormName("");
    setFormClassId(selectedClassId || (classes[0] ? String(classes[0].id) : ""));
    setAddModalOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/admin/students", {
        rollNo: formRollNo,
        name: formName,
        classId: Number(formClassId)
      });
      toast.success("Student added successfully!");
      setAddModalOpen(false);
      fetchStudents(selectedClassId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add student.");
    }
  };

  const handleOpenEdit = (student) => {
    setCurrentStudent(student);
    setFormRollNo(student.rollNo);
    setFormName(student.name);
    setFormClassId(String(student.classId));
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/students/${currentStudent.id}`, {
        rollNo: formRollNo,
        name: formName,
        classId: Number(formClassId)
      });
      toast.success("Student information updated!");
      setEditModalOpen(false);
      fetchStudents(selectedClassId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update student.");
    }
  };

  const handleDisable = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this student?")) return;
    try {
      await api.patch(`/api/admin/students/${id}/disable`);
      toast.success("Student status updated to inactive.");
      fetchStudents(selectedClassId);
    } catch (err) {
      toast.error("Failed to disable student.");
    }
  };

  const handleUploadCsv = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      toast.error("Please select a .csv file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      setUploading(true);
      setUploadResult(null);
      const res = await api.post("/api/admin/students/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUploadResult(res.data);
      toast.success(`Upload processed: ${res.data.created} students imported!`);
      fetchClasses();
      if (selectedClassId) fetchStudents(selectedClassId);
    } catch (err) {
      toast.error(err.response?.data?.message || "CSV processing failed.");
    } finally {
      setUploading(false);
    }
  };

  const columns = [
    { title: "Roll Number", key: "rollNo", render: (r) => <strong>{r}</strong> },
    { title: "Full Name", key: "name" },
    {
      title: "Class / Section",
      key: "className",
      render: (_, row) => `Class ${row.className} - ${row.section}`
    },
    {
      title: "Status",
      key: "active",
      render: (active) => <StatusBadge status={active ? "ACTIVE" : "INACTIVE"} />
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => handleOpenEdit(row)} className="btn btn-secondary btn-sm">
            ✏️ Edit
          </button>
          {row.active && (
            <button onClick={() => handleDisable(row.id)} className="btn btn-danger btn-sm">
              Deactivate
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>Student Directory</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            View and manage students per class, or bulk upload via spreadsheet.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={() => setUploadModalOpen(true)} className="btn btn-secondary">
            📥 Bulk CSV Upload
          </button>
          <button onClick={handleOpenAdd} className="btn btn-primary">
            + Add New Student
          </button>
        </div>
      </div>

      {/* Class Filter Bar */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <label style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>
          Filter by Class & Section:
        </label>
        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="form-select"
          style={{ maxWidth: "260px" }}
        >
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              Class {cls.name} ({cls.section})
            </option>
          ))}
        </select>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginLeft: "auto" }}>
          Showing {students.length} students enrolled
        </span>
      </div>

      <DataTable
        columns={columns}
        data={students}
        loading={loading}
        emptyText="No students registered in this class yet. Click '+ Add New Student' or use 'Bulk CSV Upload'."
      />

      {/* Add Student Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Enroll New Student">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Roll Number *</label>
            <input
              type="text"
              required
              placeholder="e.g. 101, A-12, or 2026001"
              value={formRollNo}
              onChange={(e) => setFormRollNo(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Student Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Assigned Class & Section *</label>
            <select
              required
              value={formClassId}
              onChange={(e) => setFormClassId(e.target.value)}
              className="form-select"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  Class {cls.name} - Section {cls.section}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={() => setAddModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Enroll Student
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Update Student Record">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Roll Number *</label>
            <input
              type="text"
              required
              value={formRollNo}
              onChange={(e) => setFormRollNo(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Student Full Name *</label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Class & Section *</label>
            <select
              required
              value={formClassId}
              onChange={(e) => setFormClassId(e.target.value)}
              className="form-select"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  Class {cls.name} - Section {cls.section}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={() => setEditModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* CSV Bulk Upload Modal */}
      <Modal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Bulk Upload Students via CSV" maxWidth="640px">
        <form onSubmit={handleUploadCsv}>
          <div style={{ marginBottom: "1.25rem", padding: "1rem", backgroundColor: "var(--surface-alt)", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}>
            <p style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Required CSV Header Format:</p>
            <code>rollNo,name,className,section</code>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Example row: <code>101,Aarav Sharma,10,A</code>
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Choose CSV File *</label>
            <input
              type="file"
              accept=".csv"
              required
              onChange={(e) => setCsvFile(e.target.files[0])}
              className="form-input"
              style={{ paddingTop: "0.6rem" }}
            />
          </div>

          {uploadResult && (
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "var(--surface-alt)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontWeight: 700, color: "var(--success)", marginBottom: "0.5rem" }}>
                ✓ {uploadResult.created} students imported successfully.
              </div>
              {uploadResult.errors && uploadResult.errors.length > 0 && (
                <div>
                  <p style={{ color: "var(--error)", fontWeight: 700, fontSize: "0.85rem" }}>
                    Errors encountered ({uploadResult.errors.length} rows):
                  </p>
                  <ul style={{ maxHeight: "150px", overflowY: "auto", fontSize: "0.8rem", color: "var(--error)", paddingLeft: "1.25rem" }}>
                    {uploadResult.errors.map((err, i) => (
                      <li key={i}>
                        Row {err.row}: {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={() => setUploadModalOpen(false)} className="btn btn-secondary">
              Close
            </button>
            <button type="submit" disabled={uploading} className="btn btn-primary">
              {uploading ? "Importing Data..." : "Upload & Process CSV"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


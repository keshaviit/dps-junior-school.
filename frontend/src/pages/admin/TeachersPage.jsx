import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import StatusBadge from "../../components/StatusBadge";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [selectedClassIds, setSelectedClassIds] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [teachersRes, classesRes] = await Promise.all([
        api.get("/api/admin/teachers"),
        api.get("/api/admin/classes")
      ]);
      setTeachers(teachersRes.data);
      setClasses(classesRes.data);
    } catch (err) {
      toast.error("Failed to load teachers or classes list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleOpenAdd = () => {
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setAddModalOpen(true);
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/admin/teachers", {
        name: formName,
        email: formEmail,
        password: formPassword
      });
      toast.success("Teacher account created successfully!");
      setAddModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create teacher.");
    }
  };

  const handleOpenEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setFormName(teacher.name);
    setFormEmail(teacher.email);
    setEditModalOpen(true);
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/teachers/${currentTeacher.id}`, {
        name: formName,
        email: formEmail
      });
      toast.success("Teacher details updated!");
      setEditModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update teacher.");
    }
  };

  const handleDisable = async (id) => {
    if (!window.confirm("Are you sure you want to disable this teacher account?")) return;
    try {
      await api.patch(`/api/admin/teachers/${id}/disable`);
      toast.success("Teacher account disabled.");
      fetchData();
    } catch (err) {
      toast.error("Failed to disable teacher.");
    }
  };

  const handleOpenReset = (teacher) => {
    setCurrentTeacher(teacher);
    setFormPassword("");
    setResetModalOpen(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/api/admin/teachers/${currentTeacher.id}/reset-password`, {
        newPassword: formPassword
      });
      toast.success(`Password updated for ${currentTeacher.name}!`);
      setResetModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    }
  };

  const handleOpenAssign = (teacher) => {
    setCurrentTeacher(teacher);
    setSelectedClassIds(teacher.classes ? teacher.classes.map((c) => c.id) : []);
    setAssignModalOpen(true);
  };

  const toggleClassSelect = (classId) => {
    if (selectedClassIds.includes(classId)) {
      setSelectedClassIds(selectedClassIds.filter((id) => id !== classId));
    } else {
      setSelectedClassIds([...selectedClassIds, classId]);
    }
  };

  const handleSaveAssignedClasses = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/teachers/${currentTeacher.id}/classes`, {
        classIds: selectedClassIds
      });
      toast.success("Assigned classes updated!");
      setAssignModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign classes.");
    }
  };

  const columns = [
    { title: "Teacher Name", key: "name", render: (name) => <strong>{name}</strong> },
    { title: "Email Address", key: "email" },
    {
      title: "Assigned Classes",
      key: "classes",
      render: (assignedClasses) => {
        if (!assignedClasses || assignedClasses.length === 0) {
          return <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>None</span>;
        }
        return (
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {assignedClasses.map((c) => (
              <span key={c.id} className="badge badge-active">
                {c.name} - {c.section}
              </span>
            ))}
          </div>
        );
      }
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
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button onClick={() => handleOpenEdit(row)} className="btn btn-secondary btn-sm" title="Edit Profile">
            ✏️ Edit
          </button>
          <button onClick={() => handleOpenAssign(row)} className="btn btn-secondary btn-sm" title="Assign Classes">
            🏫 Classes
          </button>
          <button onClick={() => handleOpenReset(row)} className="btn btn-secondary btn-sm" title="Reset Password">
            🔑 Reset
          </button>
          {row.active && (
            <button onClick={() => handleDisable(row.id)} className="btn btn-danger btn-sm" title="Disable Account">
              Disable
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
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>Faculty Management</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Create teachers, update information, reset passwords, and assign classes.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          + Add New Teacher
        </button>
      </div>

      <DataTable columns={columns} data={teachers} loading={loading} emptyText="No teachers registered yet." />

      {/* Add Teacher Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Register New Faculty Member">
        <form onSubmit={handleCreateTeacher}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Meenakshi Sundaram"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              placeholder="teacher@school.com"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Temporary Password (min 6 chars) *</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={() => setAddModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Teacher Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Faculty Profile">
        <form onSubmit={handleUpdateTeacher}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="form-input"
            />
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

      {/* Reset Password Modal */}
      <Modal isOpen={resetModalOpen} onClose={() => setResetModalOpen(false)} title={`Reset Password for ${currentTeacher?.name}`}>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label className="form-label">New Password (minimum 6 characters) *</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Enter new password..."
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={() => setResetModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </Modal>

      {/* Assign Classes Modal */}
      <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} title={`Assign Classes to ${currentTeacher?.name}`}>
        <form onSubmit={handleSaveAssignedClasses}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Select the classes and sections that this teacher is authorized to mark attendance for:
          </p>

          {classes.length === 0 ? (
            <p style={{ color: "var(--warning)" }}>No classes created yet. Please create classes first.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", maxHeight: "300px", overflowY: "auto", padding: "0.5rem" }}>
              {classes.map((cls) => {
                const isChecked = selectedClassIds.includes(cls.id);
                return (
                  <label
                    key={cls.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid",
                      borderColor: isChecked ? "var(--primary)" : "var(--border)",
                      backgroundColor: isChecked ? "var(--primary-soft)" : "var(--surface)",
                      cursor: "pointer"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleClassSelect(cls.id)}
                    />
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      Class {cls.name} ({cls.section})
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={() => setAssignModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Assignments
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


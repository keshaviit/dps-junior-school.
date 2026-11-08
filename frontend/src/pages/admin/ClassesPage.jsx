import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/client";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const [name, setName] = useState("");
  const [section, setSection] = useState("");

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/classes");
      setClasses(res.data);
    } catch (err) {
      toast.error("Failed to load classes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleOpenAdd = () => {
    setName("");
    setSection("");
    setAddModalOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/admin/classes", { name, section });
      toast.success("Class created successfully!");
      setAddModalOpen(false);
      fetchClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create class.");
    }
  };

  const handleOpenEdit = (cls) => {
    setCurrentClass(cls);
    setName(cls.name);
    setSection(cls.section);
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/classes/${currentClass.id}`, { name, section });
      toast.success("Class updated successfully!");
      setEditModalOpen(false);
      fetchClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update class.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class? This may remove student associations.")) return;
    try {
      await api.delete(`/api/admin/classes/${id}`);
      toast.success("Class removed.");
      fetchClasses();
    } catch (err) {
      toast.error("Failed to delete class.");
    }
  };

  const columns = [
    { title: "ID", key: "id", style: { width: "80px" } },
    {
      title: "Class / Grade",
      key: "name",
      render: (n) => <strong>Class {n}</strong>
    },
    {
      title: "Section",
      key: "section",
      render: (s) => <span className="badge badge-active">Section {s}</span>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => handleOpenEdit(row)} className="btn btn-secondary btn-sm">
            ✏️ Edit
          </button>
          <button onClick={() => handleDelete(row.id)} className="btn btn-danger btn-sm">
            🗑 Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>Classes & Sections</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Maintain the roster of grades and class divisions for your institution.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          + Add New Class
        </button>
      </div>

      <DataTable columns={columns} data={classes} loading={loading} emptyText="No classes created yet." />

      {/* Add Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Class & Section">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Grade / Class Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. 10 or 12-Science or Nursery"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Section *</label>
            <input
              type="text"
              required
              placeholder="e.g. A, B, or Rose"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="form-input"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="button" onClick={() => setAddModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Class
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Class & Section">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Grade / Class Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Section *</label>
            <input
              type="text"
              required
              value={section}
              onChange={(e) => setSection(e.target.value)}
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
    </div>
  );
}


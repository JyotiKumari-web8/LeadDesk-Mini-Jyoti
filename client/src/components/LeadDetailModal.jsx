import { useState } from "react";
import { addLeadNote, updateLead, deleteLead } from "../services/api";

function LeadDetailModal({ lead, onClose, onLeadUpdated, onLeadDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    company: lead.company || "",
    budget: lead.budget || "Not specified",
    priority: lead.priority || "Medium",
    status: lead.status || "New",
    message: lead.message || "",
  });

  const [noteText, setNoteText] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!lead) return null;

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await updateLead(lead._id, editData);
      onLeadUpdated(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update lead: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    try {
      setIsSubmittingNote(true);
      const res = await addLeadNote(lead._id, noteText);
      onLeadUpdated(res.data);
      setNoteText("");
    } catch (err) {
      alert("Failed to add note: " + err.message);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDeleteLead = async () => {
    if (window.confirm(`Are you sure you want to permanently delete lead: ${lead.fullName}?`)) {
      try {
        setIsDeleting(true);
        await deleteLead(lead._id);
        onLeadDeleted(lead._id);
        onClose();
      } catch (err) {
        alert("Failed to delete lead: " + err.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3>{lead.fullName}</h3>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              ID: {lead._id} • Added {formatDate(lead.createdAt)}
            </span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>&times;</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Action Buttons */}
          <div className="quick-contact-strip">
            <a href={`mailto:${lead.email}`} className="btn-quick-contact">
              ✉️ Email Lead
            </a>
            <a href={`tel:${lead.phone}`} className="btn-quick-contact">
              📞 Call Lead
            </a>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-quick-contact"
              style={{ color: "var(--primary)" }}
            >
              ✏️ {isEditing ? "Cancel Edit" : "Edit Details"}
            </button>
          </div>

          {/* Edit Form or Lead Overview */}
          {isEditing ? (
            <form onSubmit={handleSaveDetails} className="modern-form">
              <div className="form-row-double">
                <div className="form-group-modern">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={editData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group-modern">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row-double">
                <div className="form-group-modern">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group-modern">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={editData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row-double">
                <div className="form-group-modern">
                  <label>Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={editData.budget}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group-modern">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={editData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group-modern">
                <label>Status</label>
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleInputChange}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="form-group-modern">
                <label>Message / Notes</label>
                <textarea
                  name="message"
                  value={editData.message}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="btn-primary-action"
                style={{ alignSelf: "flex-end" }}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <div className="modal-lead-summary">
              <div className="summary-field">
                <label>Email Address</label>
                <p>{lead.email}</p>
              </div>
              <div className="summary-field">
                <label>Phone Number</label>
                <p>{lead.phone}</p>
              </div>
              <div className="summary-field">
                <label>Company</label>
                <p>{lead.company || "Not specified"}</p>
              </div>
              <div className="summary-field">
                <label>Budget Range</label>
                <p>{lead.budget || "Not specified"}</p>
              </div>
              <div className="summary-field">
                <label>Priority Level</label>
                <p>
                  <span className={`priority-chip priority-${(lead.priority || "medium").toLowerCase()}`}>
                    {lead.priority || "Medium"}
                  </span>
                </p>
              </div>
              <div className="summary-field">
                <label>Current Status</label>
                <p>
                  <span className={`status-badge status-${(lead.status || "new").toLowerCase()}`}>
                    {lead.status || "New"}
                  </span>
                </p>
              </div>
              <div className="summary-field" style={{ gridColumn: "span 2" }}>
                <label>Prospect Requirements / Message</label>
                <p style={{ fontWeight: 400, color: "var(--text-main)", marginTop: "0.4rem" }}>
                  {lead.message || "No initial message supplied."}
                </p>
              </div>
            </div>
          )}

          {/* Internal Notes Timeline */}
          <div className="notes-section">
            <h4>💬 Internal Collaboration & Activity Notes</h4>

            <div className="notes-timeline">
              {lead.notes && lead.notes.length > 0 ? (
                lead.notes.map((note, idx) => (
                  <div key={note._id || idx} className="note-bubble">
                    <div className="note-bubble-header">
                      <span>👤 {note.author || "Agent"}</span>
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                    <p style={{ color: "var(--text-headers)", fontWeight: 500 }}>{note.text}</p>
                  </div>
                ))
              ) : (
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>
                  No internal notes recorded yet. Add one below to track follow-up progress.
                </div>
              )}
            </div>

            {/* Add Note Input */}
            <form onSubmit={handleAddNote} className="add-note-box">
              <input
                type="text"
                placeholder="Log internal note (e.g. Called lead, scheduled product demo)..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                disabled={isSubmittingNote}
              />
              <button
                type="submit"
                className="btn-primary-action"
                disabled={isSubmittingNote || !noteText.trim()}
              >
                {isSubmittingNote ? "Adding..." : "Add Note"}
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            onClick={handleDeleteLead}
            className="btn-icon-action danger"
            style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.85rem", gap: "0.4rem" }}
            disabled={isDeleting}
          >
            🗑️ {isDeleting ? "Deleting..." : "Delete Lead"}
          </button>
          <button onClick={onClose} className="btn-secondary-action">
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetailModal;

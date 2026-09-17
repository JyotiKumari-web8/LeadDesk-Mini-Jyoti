import { useState } from "react";
import { createLead } from "../services/api";

function AddLeadModal({ onClose, onLeadCreated }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    budget: "$5,000 - $10,000",
    priority: "Medium",
    status: "New",
    source: "Admin Manual Entry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await createLead(formData);
      onLeadCreated(res.data);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>➕ Add New Lead Manually</h3>
          <button className="btn-close-modal" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modern-form" style={{ padding: "2rem" }}>
          {error && (
            <div className="status-toast error">
              <span className="toast-icon">⚠️</span>
              <div className="toast-body"><p>{error}</p></div>
            </div>
          )}

          <div className="form-row-double">
            <div className="form-group-modern">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Jordan Smith"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group-modern">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="jordan@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row-double">
            <div className="form-group-modern">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-1122"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group-modern">
              <label>Company / Organization</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Nexus Software"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row-double">
            <div className="form-group-modern">
              <label>Estimated Budget</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="< $1,000">&lt; $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000+">$25,000+</option>
              </select>
            </div>

            <div className="form-group-modern">
              <label>Priority Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-row-double">
            <div className="form-group-modern">
              <label>Initial Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div className="form-group-modern">
              <label>Lead Source</label>
              <input
                type="text"
                name="source"
                placeholder="e.g. Phone Inquiry, LinkedIn, Referral"
                value={formData.source}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label>Notes / Requirements</label>
            <textarea
              name="message"
              placeholder="Enter initial lead requirements or call summary..."
              value={formData.message}
              onChange={handleChange}
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-action"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-action"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Save New Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLeadModal;

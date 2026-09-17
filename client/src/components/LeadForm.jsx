import { useState } from "react";
import { createLead } from "../services/api";

function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    budget: "$5,000 - $10,000",
    priority: "Medium",
    message: "",
  });

  const [statusMsg, setStatusMsg] = useState({ type: "", title: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg({ type: "", title: "", text: "" });

    try {
      const response = await createLead(formData);
      setStatusMsg({
        type: "success",
        title: "Inquiry Dispatched Successfully! 🎉",
        text: response.message || "Thank you! Our dedicated account executive has received your inquiry and will follow up within 15 minutes.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        budget: "$5,000 - $10,000",
        priority: "Medium",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setStatusMsg({
        type: "error",
        title: "Submission Error",
        text: error.message || "Something went wrong! Please check your details and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="lead-form-section" id="contact-section">
      <div className="lead-form-card">
        <div className="form-header">
          <span className="section-tag">Instant Intake</span>
          <h2>Connect With Our Sales Specialists</h2>
          <p>
            Complete the form below to receive a personalized strategy session, live product demonstration, and customized pricing quote.
          </p>
        </div>

        {statusMsg.text && (
          <div className={`status-toast ${statusMsg.type}`}>
            <span className="toast-icon">
              {statusMsg.type === "success" ? "✨" : "⚠️"}
            </span>
            <div className="toast-body">
              <h4>{statusMsg.title}</h4>
              <p>{statusMsg.text}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modern-form">
          {/* Row 1: Name & Email */}
          <div className="form-row-double">
            <div className="form-group-modern">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="e.g. Alex Morgan"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="email">Work Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="form-row-double">
            <div className="form-group-modern">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+1 (555) 019-2834"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group-modern">
              <label htmlFor="company">Company / Organization</label>
              <input
                id="company"
                type="text"
                name="company"
                placeholder="e.g. Acme Innovations"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Row 3: Budget & Urgency */}
          <div className="form-row-double">
            <div className="form-group-modern">
              <label htmlFor="budget">Estimated Budget Range</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="< $1,000">&lt; $1,000 / month</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000 / month</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000 / month</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000 / month</option>
                <option value="$25,000+">$25,000+ Enterprise Tier</option>
              </select>
            </div>

            <div className="form-group-modern">
              <label htmlFor="priority">Implementation Urgency</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="Low">Low (Exploring for Future)</option>
                <option value="Medium">Medium (Within 1-3 Months)</option>
                <option value="High">High (Immediate Need)</option>
                <option value="Urgent">Urgent (Within 2 Weeks)</option>
              </select>
            </div>
          </div>

          {/* Row 4: Message */}
          <div className="form-group-modern">
            <label htmlFor="message">Project Scope & Requirements</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your team size, current lead management challenges, or required integrations..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" className="btn-submit-lead" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner btn-spinner"></span>
                <span>Transmitting Inquiry...</span>
              </>
            ) : (
              <span>🚀 Submit Lead Request</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LeadForm;
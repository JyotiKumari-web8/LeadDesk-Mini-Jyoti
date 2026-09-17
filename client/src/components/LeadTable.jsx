function LeadTable({ leads, onStatusUpdate, onSelectLead, onDeleteLead }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New":
        return "status-badge status-new";
      case "Contacted":
        return "status-badge status-contacted";
      case "Qualified":
        return "status-badge status-qualified";
      case "Lost":
        return "status-badge status-lost";
      default:
        return "status-badge";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Urgent":
        return "priority-chip priority-urgent";
      case "High":
        return "priority-chip priority-high";
      case "Medium":
        return "priority-chip priority-medium";
      default:
        return "priority-chip priority-low";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <h3>No Matching Leads Found</h3>
        <p>Try clearing your filters or search keyword to see all CRM records.</p>
      </div>
    );
  }

  return (
    <table className="modern-table">
      <thead>
        <tr>
          <th>Submitted</th>
          <th>Contact Info</th>
          <th>Company</th>
          <th>Budget & Priority</th>
          <th>Status</th>
          <th>Change Status</th>
          <th style={{ textAlign: "right" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead._id} onClick={() => onSelectLead(lead)}>
            {/* Date */}
            <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {formatDate(lead.createdAt)}
            </td>

            {/* Contact Info */}
            <td>
              <div className="table-lead-info">
                <span className="table-lead-name">{lead.fullName}</span>
                <span className="table-lead-contact">
                  <span>✉️ {lead.email}</span>
                  <span>📞 {lead.phone}</span>
                </span>
              </div>
            </td>

            {/* Company */}
            <td>
              <span style={{ fontWeight: 600, color: "var(--text-headers)", fontSize: "0.9rem" }}>
                {lead.company || <span style={{ color: "var(--text-muted)" }}>—</span>}
              </span>
            </td>

            {/* Budget & Priority */}
            <td>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "flex-start" }}>
                <span className="budget-chip">💰 {lead.budget || "Not set"}</span>
                <span className={getPriorityClass(lead.priority || "Medium")}>
                  {lead.priority || "Medium"}
                </span>
              </div>
            </td>

            {/* Status Badge */}
            <td>
              <span className={getStatusBadgeClass(lead.status)}>
                {lead.status}
              </span>
            </td>

            {/* Quick Status Select */}
            <td onClick={(e) => e.stopPropagation()}>
              <select
                className="filter-group"
                style={{ padding: "0.35rem 0.6rem", fontSize: "0.8rem", borderRadius: "6px" }}
                value={lead.status}
                onChange={(e) => onStatusUpdate(lead._id, e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </td>

            {/* Actions */}
            <td onClick={(e) => e.stopPropagation()}>
              <div className="table-actions-cell" style={{ justifyContent: "flex-end" }}>
                <button
                  className="btn-icon-action"
                  title="View / Edit Details"
                  onClick={() => onSelectLead(lead)}
                >
                  🔍
                </button>
                <button
                  className="btn-icon-action danger"
                  title="Delete Lead"
                  onClick={() => onDeleteLead(lead._id, lead.fullName)}
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeadTable;
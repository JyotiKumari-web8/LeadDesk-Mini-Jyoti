function KanbanBoard({ leads, onSelectLead, onStatusUpdate }) {
  const columns = [
    { key: "New", title: "New Inquiries", icon: "🌟", color: "var(--status-new)" },
    { key: "Contacted", title: "Contacted", icon: "📞", color: "var(--status-contacted)" },
    { key: "Qualified", title: "Qualified", icon: "✅", color: "var(--status-qualified)" },
    { key: "Lost", title: "Lost / Closed", icon: "❌", color: "var(--status-lost)" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
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

  return (
    <div className="kanban-grid">
      {columns.map((col) => {
        const columnLeads = leads.filter((lead) => lead.status === col.key);

        return (
          <div key={col.key} className="kanban-column">
            {/* Column Header */}
            <div className="kanban-col-header">
              <span className="kanban-col-title">
                <span>{col.icon}</span>
                <span>{col.title}</span>
              </span>
              <span className="kanban-count-badge">{columnLeads.length}</span>
            </div>

            {/* Cards List */}
            <div className="kanban-cards-list">
              {columnLeads.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  No leads in this stage
                </div>
              ) : (
                columnLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="kanban-card"
                    onClick={() => onSelectLead(lead)}
                  >
                    <div className="kanban-card-header">
                      <div>
                        <div className="kanban-card-title">{lead.fullName}</div>
                        <div className="kanban-card-company">{lead.company || "Individual Client"}</div>
                      </div>
                      <span className={getPriorityClass(lead.priority || "Medium")}>
                        {lead.priority || "Medium"}
                      </span>
                    </div>

                    {lead.message && (
                      <p className="kanban-card-message" title={lead.message}>
                        {lead.message}
                      </p>
                    )}

                    <div className="kanban-card-chips">
                      <span className="budget-chip">💰 {lead.budget || "Not set"}</span>
                      {lead.notes && lead.notes.length > 0 && (
                        <span className="budget-chip" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                          💬 {lead.notes.length} {lead.notes.length === 1 ? "note" : "notes"}
                        </span>
                      )}
                    </div>

                    <div className="kanban-card-footer">
                      <span>📅 {formatDate(lead.createdAt)}</span>
                      <div className="kanban-quick-move" onClick={(e) => e.stopPropagation()}>
                        {col.key === "New" && (
                          <button
                            className="btn-quick-advance"
                            title="Move to Contacted"
                            onClick={() => onStatusUpdate(lead._id, "Contacted")}
                          >
                            📞 Contact →
                          </button>
                        )}
                        {col.key === "Contacted" && (
                          <>
                            <button
                              className="btn-quick-advance"
                              title="Move to Qualified"
                              style={{ color: "var(--status-qualified)" }}
                              onClick={() => onStatusUpdate(lead._id, "Qualified")}
                            >
                              ✅ Qualify
                            </button>
                            <button
                              className="btn-quick-advance"
                              title="Move to Lost"
                              style={{ color: "var(--status-lost)" }}
                              onClick={() => onStatusUpdate(lead._id, "Lost")}
                            >
                              ❌
                            </button>
                          </>
                        )}
                        {col.key === "Qualified" && (
                          <button
                            className="btn-quick-advance"
                            title="Re-open to Contacted"
                            onClick={() => onStatusUpdate(lead._id, "Contacted")}
                          >
                            ↩ Contacted
                          </button>
                        )}
                        {col.key === "Lost" && (
                          <button
                            className="btn-quick-advance"
                            title="Restore to New"
                            onClick={() => onStatusUpdate(lead._id, "New")}
                          >
                            🔄 Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;

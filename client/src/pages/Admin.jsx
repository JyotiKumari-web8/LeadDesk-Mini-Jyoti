import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";
import KanbanBoard from "../components/KanbanBoard";
import LeadDetailModal from "../components/LeadDetailModal";
import AddLeadModal from "../components/AddLeadModal";
import { getLeads, updateLeadStatus, deleteLead } from "../services/api";

function Admin() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Views & Modals
  const [viewMode, setViewMode] = useState("kanban"); // "table" or "kanban"
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Search, Status, and Priority Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Fetch leads on mount
  const fetchLeadsData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getLeads();
      setLeads(response.data || []);
      setFilteredLeads(response.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load leads from database. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);

  // Handle Search and Filtering
  useEffect(() => {
    let result = leads;

    // Filter by status
    if (statusFilter !== "All") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== "All") {
      result = result.filter((lead) => (lead.priority || "Medium") === priorityFilter);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          (lead.company && lead.company.toLowerCase().includes(query)) ||
          (lead.message && lead.message.toLowerCase().includes(query)) ||
          lead.phone.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(result);
  }, [leads, searchQuery, statusFilter, priorityFilter]);

  // Handle Status Update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateLeadStatus(id, newStatus);
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        )
      );

      if (selectedLead && selectedLead._id === id) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  // Handle Delete Lead
  const handleDeleteLead = async (id, name) => {
    if (window.confirm(`Permanently delete lead "${name}"?`)) {
      try {
        await deleteLead(id);
        setLeads((prev) => prev.filter((lead) => lead._id !== id));
      } catch (err) {
        alert("Failed to delete lead: " + err.message);
      }
    }
  };

  // Lead Updated Callback from Modal
  const handleLeadUpdated = (updatedLead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead._id === updatedLead._id ? updatedLead : lead))
    );
    setSelectedLead(updatedLead);
  };

  // Lead Deleted Callback from Modal
  const handleLeadDeleted = (deletedId) => {
    setLeads((prev) => prev.filter((lead) => lead._id !== deletedId));
  };

  // Lead Created Callback from Add Modal
  const handleLeadCreated = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  // Export to CSV Function
  const exportToCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const headers = ["ID", "Full Name", "Email", "Phone", "Company", "Budget", "Priority", "Status", "Source", "Message", "Created Date"];
    
    const rows = filteredLeads.map((lead) => [
      `"${lead._id}"`,
      `"${(lead.fullName || "").replace(/"/g, '""')}"`,
      `"${(lead.email || "").replace(/"/g, '""')}"`,
      `"${(lead.phone || "").replace(/"/g, '""')}"`,
      `"${(lead.company || "").replace(/"/g, '""')}"`,
      `"${(lead.budget || "").replace(/"/g, '""')}"`,
      `"${lead.priority || "Medium"}"`,
      `"${lead.status || "New"}"`,
      `"${(lead.source || "").replace(/"/g, '""')}"`,
      `"${(lead.message || "").replace(/"/g, '""')}"`,
      `"${new Date(lead.createdAt).toISOString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leaddesk_crm_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computed Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length;
  const lostLeads = leads.filter((l) => l.status === "Lost").length;
  const conversionRate = totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) : "0.0";

  return (
    <>
      <Navbar />

      <div className="admin-container">
        {/* Dashboard Header */}
        <header className="admin-header">
          <div>
            <h1>CRM Pipeline & Lead Desk</h1>
            <p>Monitor real-time inbound inquiries, track conversion stages, and log team notes.</p>
          </div>

          <div className="admin-action-bar">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary-action"
            >
              ➕ Add Lead
            </button>

            <button
              onClick={exportToCSV}
              className="btn-secondary-action"
              title="Download CSV spreadsheet of current leads"
            >
              📥 Export CSV
            </button>

            <button
              onClick={fetchLeadsData}
              className="btn-secondary-action"
              title="Refresh leads from database"
            >
              🔄 Refresh
            </button>
          </div>
        </header>

        {/* Enhanced Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-details">
              <h3>Total Pipeline</h3>
              <p className="stat-number">{totalLeads}</p>
            </div>
          </div>

          <div className="stat-card new">
            <div className="stat-icon">🌟</div>
            <div className="stat-details">
              <h3>New Inquiries</h3>
              <p className="stat-number">{newLeads}</p>
            </div>
          </div>

          <div className="stat-card contacted">
            <div className="stat-icon">📞</div>
            <div className="stat-details">
              <h3>In Contact</h3>
              <p className="stat-number">{contactedLeads}</p>
            </div>
          </div>

          <div className="stat-card qualified">
            <div className="stat-icon">✅</div>
            <div className="stat-details">
              <h3>Qualified</h3>
              <p className="stat-number">{qualifiedLeads}</p>
            </div>
          </div>

          <div className="stat-card lost">
            <div className="stat-icon">❌</div>
            <div className="stat-details">
              <h3>Lost / Closed</h3>
              <p className="stat-number">{lostLeads}</p>
            </div>
          </div>

          <div className="stat-card conversion">
            <div className="stat-icon">🎯</div>
            <div className="stat-details">
              <h3>Qualify Rate</h3>
              <p className="stat-number">{conversionRate}%</p>
            </div>
          </div>
        </section>

        {/* Filters, Search & View Mode Switcher */}
        <section className="controls-bar">
          <div className="search-and-filters">
            {/* Search Box */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search leads by name, email, company, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="filter-group">
              <label htmlFor="status-filter">Stage:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Stages</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="filter-group">
              <label htmlFor="priority-filter">Priority:</label>
              <select
                id="priority-filter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* View Switcher: Table vs Kanban */}
          <div className="view-switcher">
            <button
              className={`view-btn ${viewMode === "kanban" ? "active" : ""}`}
              onClick={() => setViewMode("kanban")}
            >
              📋 Kanban Board
            </button>
            <button
              className={`view-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              📊 Table View
            </button>
          </div>
        </section>

        {/* Error Alert */}
        {error && (
          <div className="status-toast error">
            <span className="toast-icon">⚠️</span>
            <div className="toast-body">
              <h4>System Connection Alert</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Main Content Area: Kanban vs Table */}
        <div style={{ position: "relative" }}>
          {loading && (
            <div className="table-loading">
              <div className="spinner"></div>
              <p style={{ fontWeight: 600, color: "var(--text-headers)" }}>Synchronizing CRM pipeline...</p>
            </div>
          )}

          {viewMode === "kanban" ? (
            <KanbanBoard
              leads={filteredLeads}
              onSelectLead={(lead) => setSelectedLead(lead)}
              onStatusUpdate={handleStatusUpdate}
            />
          ) : (
            <div className="table-wrapper">
              <LeadTable
                leads={filteredLeads}
                onStatusUpdate={handleStatusUpdate}
                onSelectLead={(lead) => setSelectedLead(lead)}
                onDeleteLead={handleDeleteLead}
              />
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Slide-over / Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onLeadUpdated={handleLeadUpdated}
          onLeadDeleted={handleLeadDeleted}
        />
      )}

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <AddLeadModal
          onClose={() => setIsAddModalOpen(false)}
          onLeadCreated={handleLeadCreated}
        />
      )}
    </>
  );
}

export default Admin;
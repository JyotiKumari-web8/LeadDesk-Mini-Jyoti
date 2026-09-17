import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const scrollToForm = () => {
    const element = document.getElementById("contact-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="landing-hero">
      {/* Dynamic Pill Badge */}
      <div className="hero-pill-badge">
        <span className="hero-pill-dot"></span>
        <span>LeadDesk Intelligence CRM 2.0 • Live Pipeline Engine</span>
      </div>

      {/* Hero Headline */}
      <h1>
        Turn Cold Inquiries into <span className="hero-gradient-text">Closed Deals</span>, Effortlessly.
      </h1>

      {/* Subtitle */}
      <p>
        The all-in-one lead management and sales helpdesk built for agile revenue teams. Capture prospects instantly, triage priority with Kanban workflows, and collaborate on team notes in real time.
      </p>

      {/* Action Buttons */}
      <div className="hero-cta-group">
        <button onClick={scrollToForm} className="btn-primary-cta">
          <span>🚀 Request Demo / Submit Lead</span>
        </button>
        <button onClick={() => navigate("/login")} className="btn-secondary-cta">
          <span>⚡ Live Admin Demo</span>
        </button>
      </div>

      {/* Interactive Mock Pipeline Preview UI */}
      <div className="hero-preview-wrapper">
        <div className="preview-browser-bar">
          <div className="browser-dots">
            <span className="browser-dot dot-red"></span>
            <span className="browser-dot dot-yellow"></span>
            <span className="browser-dot dot-green"></span>
          </div>
          <div className="browser-url-pill">leaddesk.mini/admin/pipeline</div>
          <div className="browser-live-badge">
            <span className="hero-pill-dot"></span> Real-time Sync
          </div>
        </div>

        <div className="preview-grid-mock">
          {/* Mock Column 1 */}
          <div className="mock-column">
            <div className="mock-col-header">
              <span>🌟 New Leads</span>
              <span className="kanban-count-badge">2</span>
            </div>
            <div className="mock-lead-card">
              <div className="mock-card-title">Sarah Jenkins</div>
              <div className="mock-card-company">Acme Cloud Solutions</div>
              <div className="mock-card-meta">
                <span className="priority-chip priority-urgent">Urgent</span>
                <span className="budget-chip">$10k - $25k</span>
              </div>
            </div>
          </div>

          {/* Mock Column 2 */}
          <div className="mock-column">
            <div className="mock-col-header">
              <span>📞 Contacted</span>
              <span className="kanban-count-badge">1</span>
            </div>
            <div className="mock-lead-card">
              <div className="mock-card-title">Marcus Vance</div>
              <div className="mock-card-company">TechHorizon Media</div>
              <div className="mock-card-meta">
                <span className="priority-chip priority-high">High</span>
                <span className="budget-chip">$5k - $10k</span>
              </div>
            </div>
          </div>

          {/* Mock Column 3 */}
          <div className="mock-column">
            <div className="mock-col-header">
              <span>✅ Qualified</span>
              <span className="kanban-count-badge">1</span>
            </div>
            <div className="mock-lead-card">
              <div className="mock-card-title">Elena Rostova</div>
              <div className="mock-card-company">Nova UX Studio</div>
              <div className="mock-card-meta">
                <span className="priority-chip priority-urgent">Urgent</span>
                <span className="budget-chip">$25k+</span>
              </div>
            </div>
          </div>

          {/* Mock Column 4 */}
          <div className="mock-column">
            <div className="mock-col-header">
              <span>❌ Lost</span>
              <span className="kanban-count-badge">1</span>
            </div>
            <div className="mock-lead-card">
              <div className="mock-card-title">David Chen</div>
              <div className="mock-card-company">SoloBuild Ventures</div>
              <div className="mock-card-meta">
                <span className="priority-chip priority-low">Low</span>
                <span className="budget-chip">&lt; $1k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
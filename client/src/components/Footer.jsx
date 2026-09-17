import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="navbar-logo" style={{ display: "inline-flex" }}>
            <Link to="/">
              <div className="logo-icon-wrap" style={{ width: 28, height: 28, fontSize: "0.85rem" }}>⚡</div>
              <span><span className="logo-accent">Lead</span>Desk</span>
              <span className="logo-badge">Pro</span>
            </Link>
          </div>
          <p>
            An intelligent, high-velocity lead management and sales desk solution designed to streamline inbound inquiries and elevate deal conversion rates.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><a href="#features-section">Core Capabilities</a></li>
            <li><a href="#workflow-section">How It Works</a></li>
            <li><a href="#contact-section">Request Demo Form</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="footer-col">
          <h4>CRM Administration</h4>
          <ul className="footer-links">
            <li><Link to="/login">Admin Portal Login</Link></li>
            <li><Link to="/admin">Sales Pipeline Board</Link></li>
            <li><a href="#faq-section">Frequently Asked Questions</a></li>
            <li><a href="https://digitalheroesco.com" target="_blank" rel="noreferrer">Digital Heroes Project</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          &copy; {currentYear} LeadDesk Mini CRM. Crafted with high standards for professional lead management.
        </div>
        <div className="system-status-indicator">
          <span className="status-dot"></span>
          <span>Lead Ingestion System Operational</span>
        </div>
      </div>
    </footer>
  );
}
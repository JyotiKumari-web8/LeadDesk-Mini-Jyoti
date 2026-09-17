import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <div className="logo-icon-wrap">⚡</div>
          <span><span className="logo-accent">Lead</span>Desk</span>
          <span className="logo-badge">Pro CRM</span>
        </Link>
      </div>

      <div className="navbar-menu">
        <Link to="/" className="nav-link">Home</Link>
        <button 
          onClick={() => scrollToSection("features-section")} 
          className="nav-link" 
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection("workflow-section")} 
          className="nav-link" 
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          How It Works
        </button>
        <button 
          onClick={() => scrollToSection("contact-section")} 
          className="nav-link" 
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          Request Demo
        </button>

        {isAuthenticated ? (
          <div className="nav-auth-group">
            <Link to="/admin" className="nav-link admin-dash-link">
              📊 CRM Dashboard
            </Link>
            <span className="user-indicator" title={user?.email}>
              👤 {user?.email}
            </span>
            <button onClick={handleLogout} className="btn-logout">
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-login">
            Admin Login →
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
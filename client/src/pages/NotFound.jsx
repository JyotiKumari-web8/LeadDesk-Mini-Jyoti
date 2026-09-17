import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="not-found-page">
        <div className="not-found-code">404</div>
        <h2>Page Not Found</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 460 }}>
          The page or CRM record you are searching for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Link to="/" className="btn-primary-action">
            ← Return to Home
          </Link>
          <Link to="/admin" className="btn-secondary-action">
            Open Dashboard
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
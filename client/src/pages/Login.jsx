import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please check your email and password.");
    }
  };

  const handleDemoAutofill = async () => {
    const demoEmail = "admin@leaddesk.com";
    const demoPassword = "adminpassword123";
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");

    try {
      await login(demoEmail, demoPassword);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Could not auto-login to demo account. Please ensure server is running.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="navbar-logo" style={{ justifyContent: "center", marginBottom: "0.75rem" }}>
            <div className="logo-icon-wrap" style={{ width: 36, height: 36, fontSize: "1.1rem" }}>⚡</div>
            <span><span className="logo-accent">Lead</span>Desk</span>
            <span className="logo-badge">Pro</span>
          </div>
          <h2>Admin CRM Portal</h2>
          <p>Sign in to manage lead pipelines, team notes, and conversions.</p>
        </div>

        {/* Demo Account Box */}
        <div className="demo-login-box">
          <p><strong>Evaluation & Review Quick Access</strong></p>
          <button
            type="button"
            className="btn-demo-autofill"
            onClick={handleDemoAutofill}
            disabled={loading}
          >
            ⚡ 1-Click Demo Admin Sign In
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="status-toast error" style={{ margin: 0, padding: "0.75rem 1rem" }}>
            <span className="toast-icon" style={{ fontSize: "1.1rem" }}>⚠️</span>
            <div className="toast-body"><p>{error}</p></div>
          </div>
        )}

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group-modern">
            <label htmlFor="email">Admin Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="admin@leaddesk.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group-modern">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-primary-action"
            style={{ width: "100%", justifyContent: "center", padding: "0.85rem", marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner btn-spinner"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to CRM Dashboard →</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
          <Link to="/" style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
            ← Back to Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
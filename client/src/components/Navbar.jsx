function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 50px",
      background: "#2563eb",
      color: "white"
    }}>
      <h2>LeadDesk Mini</h2>

      <div>
        <a href="/" style={{ color: "white", marginRight: "20px" }}>Home</a>
        <a href="#contact" style={{ color: "white", marginRight: "20px" }}>Contact</a>
        <a href="/login" style={{ color: "white" }}>Admin</a>
      </div>
    </nav>
  );
}

export default Navbar;
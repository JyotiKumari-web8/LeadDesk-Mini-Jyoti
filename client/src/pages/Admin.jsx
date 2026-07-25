import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";

function Admin() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Admin Dashboard</h1>
        <p>Manage all submitted leads here.</p>

        <LeadTable />
      </div>
    </>
  );
}

export default Admin;
import { useEffect, useState } from "react";
import { getLeads } from "../services/api";

function LeadTable() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await getLeads();
      setLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Leads</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.fullName}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.company}</td>
              <td>{lead.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
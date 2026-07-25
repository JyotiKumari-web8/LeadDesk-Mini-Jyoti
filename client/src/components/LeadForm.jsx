import { useState } from "react";
import { createLead } from "../services/api";

function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createLead(formData);
      alert(response.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2>Lead Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Submit Lead</button>
      </form>
    </div>
  );
}

export default LeadForm;
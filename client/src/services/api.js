const API_URL = "https://leaddesk-mini-jyoti.onrender.com";

export const createLead = async (leadData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });

  return response.json();
};

export const getLeads = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
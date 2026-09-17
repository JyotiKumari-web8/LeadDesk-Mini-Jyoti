const BASE_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://leaddesk-mini-jyoti.onrender.com");

// Helper to get auth headers
const getHeaders = (contentType = "application/json") => {
  const token = localStorage.getItem("token");
  const headers = {};
  
  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
};

// --- AUTH API ---

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const registerAdmin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};

export const getMe = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to retrieve user details");
  }
  return data;
};

// --- LEADS API ---

// Public Lead Ingestion
export const createLead = async (leadData) => {
  const response = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to submit lead");
  }
  return data;
};

// Fetch Leads (Supports search, status filter, and priority query)
export const getLeads = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/api/leads${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch leads");
  }
  return data;
};

// Fetch Single Lead
export const getLeadById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/leads/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch lead details");
  }
  return data;
};

// Update Lead Status
export const updateLeadStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/leads/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update lead status");
  }
  return data;
};

// Update Full Lead Details
export const updateLead = async (id, leadData) => {
  const response = await fetch(`${BASE_URL}/api/leads/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(leadData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update lead");
  }
  return data;
};

// Add Team Note to Lead
export const addLeadNote = async (id, noteText, author = "Admin") => {
  const response = await fetch(`${BASE_URL}/api/leads/${id}/notes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ text: noteText, author }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add note");
  }
  return data;
};

// Delete Lead
export const deleteLead = async (id) => {
  const response = await fetch(`${BASE_URL}/api/leads/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete lead");
  }
  return data;
};

// Get Server-Computed Stats
export const getLeadStats = async () => {
  const response = await fetch(`${BASE_URL}/api/leads/stats/overview`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch stats overview");
  }
  return data;
};
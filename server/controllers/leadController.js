import Lead from "../models/Lead.js";

// Create a new lead
export const createLead = async (req, res) => {
  try {
    const { fullName, email, phone, company, message } = req.body;

    const lead = await Lead.create({
      fullName,
      email,
      phone,
      company,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
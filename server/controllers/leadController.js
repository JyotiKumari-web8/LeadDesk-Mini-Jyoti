import Lead from "../models/Lead.js";

// Create a new lead (Public intake or Admin creation)
export const createLead = async (req, res) => {
  try {
    const { fullName, email, phone, company, message, budget, priority, source, status } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and phone number are required.",
      });
    }

    const lead = await Lead.create({
      fullName,
      email,
      phone,
      company: company || "",
      message: message || "",
      budget: budget || "Not specified",
      priority: priority || "Medium",
      source: source || "Website Form",
      status: status || "New",
      notes: [],
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create lead",
    });
  }
};

// Get all leads (with optional status/search filters and sorting)
export const getLeads = async (req, res) => {
  try {
    const { status, priority, search, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (priority && priority !== "All") {
      filter.priority = priority;
    }

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { company: searchRegex },
        { message: searchRegex },
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const leads = await Lead.find(filter).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve leads",
    });
  }
};

// Get single lead by ID
export const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch lead",
    });
  }
};

// Update lead status
export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["New", "Contacted", "Qualified", "Lost"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update lead status",
    });
  }
};

// Update entire lead details
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, company, message, budget, priority, status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        phone,
        company,
        message,
        budget,
        priority,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update lead",
    });
  }
};

// Add internal team note to lead
export const addLeadNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Note text is required",
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.notes.push({
      text: text.trim(),
      author: author || req.user?.email || "Admin",
      createdAt: new Date(),
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Note added successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add note",
    });
  }
};

// Delete a lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete lead",
    });
  }
};

// Get stats & analytics overview
export const getLeadStats = async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const newCount = await Lead.countDocuments({ status: "New" });
    const contacted = await Lead.countDocuments({ status: "Contacted" });
    const qualified = await Lead.countDocuments({ status: "Qualified" });
    const lost = await Lead.countDocuments({ status: "Lost" });

    const conversionRate = total > 0 ? ((qualified / total) * 100).toFixed(1) : 0;

    res.status(200).json({
      success: true,
      data: {
        total,
        new: newCount,
        contacted,
        qualified,
        lost,
        conversionRate: `${conversionRate}%`,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to calculate stats",
    });
  }
};
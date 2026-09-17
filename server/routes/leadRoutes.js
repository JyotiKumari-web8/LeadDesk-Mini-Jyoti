import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  updateLead,
  addLeadNote,
  deleteLead,
  getLeadStats,
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route for landing page form submission
router.post("/", createLead);

// Protected routes for admin management
router.get("/stats/overview", protect, getLeadStats);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.patch("/:id/status", protect, updateLeadStatus);
router.patch("/:id", protect, updateLeadStatus);
router.put("/:id", protect, updateLead);
router.post("/:id/notes", protect, addLeadNote);
router.delete("/:id", protect, deleteLead);

export default router;
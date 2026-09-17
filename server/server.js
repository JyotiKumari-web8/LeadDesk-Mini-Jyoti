import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set Google DNS servers to resolve MongoDB SRV records reliably on Windows
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (err) {
  console.log("DNS setServers notice:", err.message);
}

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "LeadDesk Mini Backend is Running 🚀",
  });
});

// Serve Frontend in Unified Deployment
const clientDistPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // SPA fallback for all non-API routes
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(clientDistPath, "index.html"));
    }
    next();
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "LeadDesk Mini Backend is Running 🚀",
    });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
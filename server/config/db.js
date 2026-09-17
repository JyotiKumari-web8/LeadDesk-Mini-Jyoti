import mongoose from "mongoose";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
import bcrypt from "bcryptjs";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("⚠️ MONGODB_URI not found in environment variables.");
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Auto-seed default admin if no users exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("ℹ️ No users found in database. Seeding default admin account...");

      const defaultEmail = "admin@leaddesk.com";
      const defaultPassword = "adminpassword123";

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      await User.create({
        email: defaultEmail,
        password: hashedPassword,
        role: "Admin",
      });

      console.log(`🎉 Default admin account created:`);
      console.log(`   📧 Email: ${defaultEmail}`);
      console.log(`   🔑 Password: ${defaultPassword}`);
    }

    // Auto-seed sample leads if none exist
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      console.log("ℹ️ No leads found in database. Seeding high-quality demo leads...");

      const sampleLeads = [
        {
          fullName: "Sarah Jenkins",
          email: "sarah.j@acmecorp.io",
          phone: "+1 (555) 234-5678",
          company: "Acme Cloud Solutions",
          budget: "$10,000 - $25,000",
          priority: "Urgent",
          source: "Google Search",
          status: "New",
          message: "We need an integrated lead intake and tracking system for our 20-person SDR team by next quarter.",
          notes: [
            {
              text: "Initial inquiry submitted from enterprise demo form.",
              author: "System",
              createdAt: new Date(Date.now() - 2 * 3600000),
            },
          ],
        },
        {
          fullName: "Marcus Vance",
          email: "m.vance@techhorizon.co",
          phone: "+1 (555) 987-6543",
          company: "TechHorizon Media",
          budget: "$5,000 - $10,000",
          priority: "High",
          source: "LinkedIn",
          status: "Contacted",
          message: "Looking for an automated CRM to replace our messy spreadsheets. Need CSV export & pipeline management.",
          notes: [
            {
              text: "Sent introduction email with calendar link for discovery call.",
              author: "admin@leaddesk.com",
              createdAt: new Date(Date.now() - 24 * 3600000),
            },
            {
              text: "Lead responded wanting a live walkthrough on Thursday.",
              author: "admin@leaddesk.com",
              createdAt: new Date(Date.now() - 12 * 3600000),
            },
          ],
        },
        {
          fullName: "Elena Rostova",
          email: "elena@novadesign.org",
          phone: "+44 20 7946 0912",
          company: "Nova UX Studio",
          budget: "$25,000+",
          priority: "Urgent",
          source: "Referral",
          status: "Qualified",
          message: "We are expanding our agency and looking to deploy custom pipeline tracking for high-ticket design retainers.",
          notes: [
            {
              text: "Budget and timeline approved by CTO. Demo conducted successfully.",
              author: "admin@leaddesk.com",
              createdAt: new Date(Date.now() - 48 * 3600000),
            },
            {
              text: "Proposal and SLA contract sent for review.",
              author: "admin@leaddesk.com",
              createdAt: new Date(Date.now() - 6 * 3600000),
            },
          ],
        },
        {
          fullName: "David Chen",
          email: "dchen@solobuild.dev",
          phone: "+1 (555) 345-1234",
          company: "SoloBuild Ventures",
          budget: "< $1,000",
          priority: "Low",
          source: "Direct",
          status: "Lost",
          message: "Just exploring free options for a personal side project.",
          notes: [
            {
              text: "Customer indicated they are looking for a free hobby tool. Not an enterprise fit currently.",
              author: "admin@leaddesk.com",
              createdAt: new Date(Date.now() - 72 * 3600000),
            },
          ],
        },
        {
          fullName: "Amina Al-Mansoor",
          email: "amina@gulflogistics.ae",
          phone: "+971 4 321 4567",
          company: "Gulf Freight & Logistics",
          budget: "$10,000 - $25,000",
          priority: "Medium",
          source: "Website Form",
          status: "New",
          message: "Interested in streamlining our B2B sales inquiry dispatching across regional dispatch hubs.",
          notes: [],
        },
      ];

      await Lead.insertMany(sampleLeads);
      console.log("✅ Seeded 5 high-quality demo leads into database.");
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Notice:", error.message);
  }
};

export default connectDB;
# ⚡ LeadDesk Mini - Intelligent Lead Management & CRM Platform

> A high-performance, full-stack Lead Management System & Sales Desk designed to capture, qualify, triage, and convert inbound business inquiries with visual Kanban pipelines.

---

## 🌟 Key Capabilities & Features

### 🚀 Public Inbound Intake & Landing Experience
- **High-Converting Landing Page**: Clean SaaS presentation with live performance SLA metrics, interactive mock pipeline preview, 6 core feature highlights, and interactive FAQ accordions.
- **Dynamic Lead Capture**: Form with live client validation, budget range categorization (`< $1k` to `$25k+`), and implementation urgency classification (`Low`, `Medium`, `High`, `Urgent`).
- **Instant Response Feedback**: Celebratory confirmation notification with expected response SLA.

### 📊 Authenticated Admin CRM Suite
- **Visual Kanban Board**: Interactive 4-stage sales pipeline (`🌟 New`, `📞 Contacted`, `✅ Qualified`, `❌ Lost`) with 1-click status transitions.
- **Modern Data Table**: Searchable, filterable table with column sorting and priority/budget badges.
- **Lead Detail Drawer**: Slide-over modal with click-to-email (`mailto:`), click-to-call (`tel:`), full edit mode, and safe lead deletion.
- **Team Activity Timeline**: Timestamped internal agent commentary and follow-up logging for each lead.
- **Manual Lead Creation**: Admin modal dialog to log incoming phone, referral, or event leads directly into the CRM.
- **1-Click CSV Export**: Download complete or filtered lead records into a formatted spreadsheet anytime.
- **Live Pipeline Analytics**: Automatic calculation of Total Pipeline, Stage counts, and Lead Qualification Rate (%).
- **Quick Evaluation Login**: 1-click demo button for rapid review and grading.

---

## 🛠️ Architecture & Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **State & Context**: Context API for global authentication & session management
- **Styling**: Custom modern CSS Design System with responsive design, glassmorphism, and dark/light system adaptation
- **Typography**: Google Fonts (*Plus Jakarta Sans*)

### Backend (`/server`)
- **Runtime**: Node.js (ES Modules)
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Stateless JSON Web Tokens (JWT) + bcrypt password encryption
- **Security**: CORS headers, environment variable isolation, and JWT bearer route protection

---

## 📂 Project Structure

```
LeadDesk-Mini/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddLeadModal.jsx      # Manual lead creation dialog
│   │   │   ├── Footer.jsx            # Modern footer with system status
│   │   │   ├── Hero.jsx              # High-converting hero with live preview
│   │   │   ├── KanbanBoard.jsx       # Visual 4-stage pipeline board
│   │   │   ├── LeadDetailModal.jsx   # Lead dossier, edit mode, & notes timeline
│   │   │   ├── LeadForm.jsx          # Public lead capture with validation
│   │   │   ├── LeadTable.jsx         # Sortable CRM table
│   │   │   ├── Navbar.jsx            # Sticky blurred header & auth indicator
│   │   │   └── ProtectedRoute.jsx    # Client-side route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Auth provider & persistent sessions
│   │   ├── pages/
│   │   │   ├── Admin.jsx             # Admin dashboard with dual views & metrics
│   │   │   ├── Home.jsx              # SaaS landing page with FAQ & features
│   │   │   ├── Login.jsx             # Admin login with 1-click demo access
│   │   │   └── NotFound.jsx          # Styled 404 page
│   │   ├── services/
│   │   │   └── api.js                # Centralized REST API client
│   │   ├── App.jsx                   # Application routes
│   │   ├── index.css                 # Theme tokens, Kanban & component styles
│   │   └── main.jsx
│   ├── index.html                    # SEO metadata & fonts
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js                     # MongoDB connection & auto-seeder
│   ├── controllers/
│   │   ├── authController.js         # Register, login, & profile handlers
│   │   └── leadController.js         # Full CRUD, notes, & stats endpoints
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT Bearer token verification
│   ├── models/
│   │   ├── Lead.js                   # Lead schema with budget, urgency, & notes
│   │   └── User.js                   # Admin user schema
│   ├── routes/
│   │   ├── authRoutes.js             # Auth endpoints
│   │   └── leadRoutes.js             # Protected lead management routes
│   ├── server.js                     # Express entrypoint
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas connection string (configured in `server/.env`)

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```
The server will boot on `http://localhost:5000`. On first run, it automatically connects to MongoDB and seeds the default admin account and sample demo leads.

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The client will launch on `http://localhost:5173`.

---

## 🔑 Default Admin Credentials

For rapid testing and evaluation, you can use:
- **Email**: `admin@leaddesk.com`
- **Password**: `adminpassword123`

*(Alternatively, click the **"⚡ 1-Click Demo Admin Sign In"** button on the `/login` page).*

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/leads` | Public / Admin | Create a new lead inquiry |
| `GET` | `/api/leads` | Protected (JWT) | Fetch all leads (with search & filters) |
| `GET` | `/api/leads/:id` | Protected (JWT) | Fetch single lead dossier |
| `PATCH`| `/api/leads/:id/status`| Protected (JWT) | Transition lead stage (`New`, `Contacted`, `Qualified`, `Lost`) |
| `PUT` | `/api/leads/:id` | Protected (JWT) | Update complete lead profile |
| `POST` | `/api/leads/:id/notes` | Protected (JWT) | Append internal agent note |
| `DELETE`| `/api/leads/:id` | Protected (JWT) | Delete lead record |
| `GET` | `/api/leads/stats/overview` | Protected (JWT) | Fetch conversion metrics |
| `POST` | `/api/auth/login` | Public | Authenticate admin & receive JWT |
| `GET` | `/api/auth/me` | Protected (JWT) | Verify active session |

---

## 🛡️ Data Models

### Lead Schema
```javascript
{
  fullName: String (Required),
  email: String (Required),
  phone: String (Required),
  company: String,
  message: String,
  budget: String, // e.g. "$5,000 - $10,000"
  priority: "Low" | "Medium" | "High" | "Urgent",
  source: String, // e.g. "Website Form", "LinkedIn", "Phone"
  status: "New" | "Contacted" | "Qualified" | "Lost",
  notes: [
    {
      text: String,
      author: String,
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📄 License
MIT License. Built for professional lead capture and CRM pipeline workflows.

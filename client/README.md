# LeadDesk Mini

LeadDesk Mini is a lead management application where users can submit their details through a form and admins can manage leads through an authenticated dashboard.

## Tech Stack

Frontend:
- React
- JavaScript
- CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas

Authentication:
- JWT Authentication
- Password hashing with bcrypt

## Data Model

### User
- _id
- email
- password (hashed)
- role

### Lead
- _id
- name
- email
- budget
- message
- status
- createdAt

## Authentication Approach

- Admin passwords are stored securely using bcrypt hashing.
- JWT tokens are used for authentication.
- Protected routes are implemented for admin access.
- Sensitive information is stored using environment variables.

## Deployment

Frontend:
(Paste your Vercel URL here)

Backend:
(Paste your Render URL here)

## Admin Flow

1. Admin logs in using valid credentials.
2. Admin views submitted leads.
3. Admin updates lead status.
4. Changes are stored in the database.

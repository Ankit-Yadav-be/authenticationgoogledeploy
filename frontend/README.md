📒 Notes App with Authentication

A full-stack Notes Application built using MERN Stack with JWT Authentication and Google OAuth.
Users can Sign Up, Log In, Login via Google, Create Notes, and Delete Notes. Notes are private and only visible to logged-in users.

🚀 Features

🔑 User Authentication

Email/Password Signup & Login

Secure password hashing using bcrypt

JWT-based authentication

Google OAuth login

📝 Notes Management

Create new notes

View all personal notes

Delete notes

Notes are user-specific

🔒 Protected Routes

Only logged-in users can access /notes

Unauthorized access is blocked

🎨 Frontend

Built with React + Vite

Chakra UI for UI components

React Router for navigation

⚡ Backend

Node.js + Express

MongoDB with Mongoose

JWT-based authentication middleware

Google OAuth API

🛠️ Tech Stack

Frontend: React, Chakra UI, React Router, Axios
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT, Google OAuth 2.0
Other: bcrypt.js, dotenv, cors

📂 Project Structure
notes-app/
│── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   └── controllers/
│       ├── authController.js
│       └── noteController.js
│
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Notes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
│── README.md
│── package.json

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/notes-app.git
cd notes-app

2️⃣ Setup Backend
cd backend
npm install


Create a .env file in backend/ with:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
PORT=8000


Run backend:

npm start

3️⃣ Setup Frontend
cd frontend
npm install


Create .env file in frontend/ with:

VITE_BACKEND_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_client_id


Run frontend:

npm run dev

▶️ Usage

Open http://localhost:5173
 in browser

Signup/Login using Email & Password or Google

Navigate to Notes Page (/notes)

Create a new note ✏️

Delete notes 🗑️

Logout securely 🔒

📸 Screenshots

👉 Login / Signup
👉 Notes Page (Create & Delete)

🚀 Deployment

Backend: Deploy on Render / Railway / Heroku

Frontend: Deploy on Vercel / Netlify

Update your .env files with production URLs
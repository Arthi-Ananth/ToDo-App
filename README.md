# ToDo-App
Simple Todo app
# Minimal Efficient Todo - Full Stack Project

A modern, minimal, and efficient Todo application with a React + TypeScript frontend and Node.js + Express backend.

## 📋 Project Structure

```
.
├── backend/                    # Express.js backend server
│   ├── src/
│   │   ├── app.js             # Express app configuration
│   │   ├── db.js              # Database connection setup
│   │   ├── controllers/       # Business logic for auth & tasks
│   │   ├── middleware/        # Custom middleware (auth)
│   │   ├── models/            # Mongoose schemas (User, Task)
│   │   └── routes/            # API route definitions
│   ├── server.js              # Server entry point
│   ├── package.json
│   └── .env                   # Environment variables (create from .env.example)
│
├── Minimal-Efficient-ToDo/     # React + TypeScript frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── Pages/             # Page components (Home, Login, Signup)
│   │   ├── services/          # API service layer
│   │   ├── Utils/             # Utility functions (gamification, etc.)
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Vite entry point
│   ├── public/                # Static assets
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                  # This file
└── .gitignore                 # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+) and **npm** (v8+)
- **MongoDB** (local or cloud - MongoDB Atlas)
- **Git** (for version control)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (use `.env.example` as template):
   ```bash
   cp .env.example .env
   # Edit .env and add your MongoDB URI and other config
   ```

4. **Environment variables needed** (add to `.env`):
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tododb?retryWrites=true&w=majority
   PORT=3001
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

5. **Start backend server:**
   ```bash
   npm run dev       # Runs with nodemon (auto-reload)
   # or
   npm start         # Runs without nodemon
   ```

   ✅ Expected output:
   ```
   🚀 Server running on port 3001
   ✅ MongoDB connected
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd Minimal-Efficient-ToDo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   ✅ Expected output:
   ```
   VITE v5.4.8  ready in XXX ms
   ➜  Local:   http://localhost:5173/
   ```

4. **Open in browser:**
   - Frontend: http://localhost:5173/
   - Backend API: http://localhost:3001/api/

### Run Both Simultaneously

From the root directory, you can run both servers in separate terminals:

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Minimal-Efficient-ToDo && npm run dev
```

Then open http://localhost:5173/ in your browser.

---

## 📦 Tech Stack

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration
- **nodemon** - Auto-reload during development

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navigation (if configured)
- **Lucide React** - Icon library

---

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:
- Users sign up → password hashed with bcrypt → JWT issued
- Token stored in browser (localStorage/sessionStorage)
- Sent in `Authorization: Bearer <token>` header on protected routes
- Backend validates token before allowing access

---

## 📡 API Routes

### Auth Routes (`/api/auth`)
- `POST /register` - Create new user account
- `POST /login` - Sign in and get JWT

### Task Routes (`/api/tasks`)
- `GET /` - Get all tasks (protected)
- `POST /` - Create new task (protected)
- `PUT /:id` - Update task (protected)
- `DELETE /:id` - Delete task (protected)

---

## 🛠️ Available Scripts

### Backend
```bash
npm run dev       # Start with nodemon (auto-reload)
npm start         # Start production server
npm audit         # Check for vulnerabilities
```

### Frontend
```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # Check TypeScript types
```

---

## 🔧 Environment Configuration

### Backend `.env.example`
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/tododb
PORT=3001
JWT_SECRET=change-this-to-a-random-string
NODE_ENV=development
```

**Note:** Never commit actual `.env` file. Only commit `.env.example`.

env file code 

VITE_SUPABASE_URL=https://exsdvkmiyymeryjzcsrv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4c2R2a21peXltZXJ5anpjc3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDkwODksImV4cCI6MjA3NTU4NTA4OX0.BZ-6PzPJeYKEutv5gTomYXGNNPOBiEW9SAvk7rPLDgE

---


# Node.js & npm
node_modules/
npm-debug.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock

# Environment variables (NEVER commit secrets)
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.vite

# Frontend specific
.next/
out/

# IDE & Editor
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
.project
.settings/
*.sublime-workspace
*.sublime-project

# OS
.DS_Store
Thumbs.db
.directory

# Testing
coverage/
.nyc_output/

# Misc
.cache/
*.log
.eslintcache
.parcel-cache
.prettierignore
dist-ssr
*.local

# System files
*.pem
/home/arthi/Music/.gitignore

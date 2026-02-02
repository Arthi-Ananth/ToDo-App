# Backend - Express.js Todo API

A RESTful API backend for the Todo application built with Express.js, MongoDB, and JWT authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm v8+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your MongoDB URI and secrets
```

### Running the Server

```bash
# Development (with nodemon auto-reload)
npm run dev

# Production
npm start
```

Expected output:
```
🚀 Server running on port 3001
✅ MongoDB connected
```

---

## 📁 Project Structure

```
src/
├── app.js                 # Express app setup & middleware
├── db.js                  # Database connection
├── controllers/
│   ├── authController.js  # Auth logic (register, login)
│   └── taskController.js  # Task CRUD operations
├── middleware/
│   └── authMiddleware.js  # JWT verification middleware
├── models/
│   ├── User.js           # User schema & methods
│   └── Task.js           # Task schema & methods
└── routes/
    ├── auth.js           # Auth endpoints
    ├── tasks.js          # Task endpoints
    └── items.js          # (Legacy/alternate route)

server.js                 # Server entry point
.env                      # Environment variables (git-ignored)
.env.example              # Template for .env
package.json              # Dependencies & scripts
```

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for secure authentication:

1. User registers with email & password
2. Password is hashed using **bcrypt** (salt rounds: 10)
3. JWT token is issued and sent to client
4. Client includes token in `Authorization: Bearer <token>` header
5. Backend verifies token on protected routes

### Protected Routes

All task routes require valid JWT token:
```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 📡 API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "123abc...",
    "email": "user@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "123abc...",
    "email": "user@example.com"
  }
}
```

---

### Tasks (Protected)

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "task123",
    "title": "Buy groceries",
    "completed": false,
    "userId": "user123",
    "createdAt": "2026-02-02T10:00:00Z"
  }
]
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response (201 Created):**
```json
{
  "_id": "task123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "userId": "user123",
  "createdAt": "2026-02-02T10:00:00Z"
}
```

#### Update Task
```http
PUT /api/tasks/task123
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "_id": "task123",
  "title": "Buy groceries",
  "completed": true
}
```

#### Delete Task
```http
DELETE /api/tasks/task123
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## ⚙️ Environment Configuration

Create `.env` file in backend root:

```env
# MongoDB connection string
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tododb?retryWrites=true&w=majority

# Server port
PORT=3001

# JWT secret (use a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Environment
NODE_ENV=development

# CORS origin (frontend URL)
CORS_ORIGIN=http://localhost:5173
```

**Important:** Never commit `.env` to git! Only commit `.env.example`.

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "bcrypt": "^5.1.1",        // Password hashing
    "cors": "^2.8.5",          // Cross-origin requests
    "dotenv": "^16.4.5",       // Environment variables
    "express": "^4.19.2",      // Web framework
    "jsonwebtoken": "^9.0.2",  // JWT tokens
    "mongoose": "^8.19.1"      // MongoDB ODM
  },
  "devDependencies": {
    "nodemon": "^3.1.0"        // Auto-reload on changes
  }
}
```

---

## 🔧 Scripts

```bash
npm run dev       # Start with nodemon (watches files for changes)
npm start         # Start server (no watch)
npm audit         # Check for security vulnerabilities
npm audit fix     # Auto-fix vulnerabilities (use cautiously)
```

---

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Cloud) - Recommended
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string from "Connect" button
4. Add to `.env` as `MONGO_URI`
5. Add your IP to firewall (or allow 0.0.0.0/0 for testing)

### Option 2: Local MongoDB
```bash
# Install MongoDB Community (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connection string for local
MONGO_URI=mongodb://localhost:27017/tododb
```

---

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "pass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "pass123"}'
```

**Get Tasks (replace TOKEN with actual JWT):**
```bash
curl -X GET http://localhost:3001/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman
1. Import endpoints from API documentation above
2. Set `Authorization: Bearer <token>` in request headers
3. Test each endpoint

---

## 🐛 Troubleshooting

### MongoDB connection fails
- Check `MONGO_URI` in `.env`
- Verify MongoDB is running
- For Atlas, check firewall allows your IP

### Port 3001 already in use
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

### CORS errors
- Check frontend URL matches `origin` in `cors()` config
- Default is `http://localhost:5173`

### JWT errors
- Check token is sent in `Authorization: Bearer <token>` header
- Verify `JWT_SECRET` is set in `.env`

### Nodemon not restarting
```bash
# Ensure package.json has "type": "module"
# Restart nodemon manually: Ctrl+C then npm run dev
```

---

## 🔄 Database Models

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚨 Security Best Practices

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens signed with secret key
- ✅ CORS configured to specific origin
- ✅ Sensitive data in `.env` (never committed)
- ⚠️ TODO: Rate limiting (prevent brute-force)
- ⚠️ TODO: Input validation (sanitize user input)
- ⚠️ TODO: HTTPS enforced in production

---

## 📚 Useful Commands

```bash
# View server logs
npm run dev

# Check for outdated packages
npm outdated

# Update packages
npm update

# Clean install
rm -rf node_modules package-lock.json
npm install

# Check code for issues
npm audit
```

---

## 📝 Git Workflow

```bash
# Stage changes
git add .

# Commit
git commit -m "feat: add task endpoints"

# Push to GitHub
git push origin main
```

---

## 🔗 Related Documentation

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Info](https://jwt.io/)
- [bcrypt Docs](https://github.com/kelektiv/node.bcrypt.js)

---

## 📞 Support

For issues:
1. Check error message in console
2. Review troubleshooting section above
3. Check backend logs: `npm run dev`
4. Create GitHub issue with error details

---

**Created:** February 2, 2026  
**Version:** 1.0.0

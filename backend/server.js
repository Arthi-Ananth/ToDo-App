import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';
import taskRoutes from './src/routes/tasks.js';

dotenv.config();

const app = express();

// server.js
app.use(cors({
    origin: 'http://localhost:5173', // <-- frontend host
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.options('*', cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 3001; // change from 5000 to 3001
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

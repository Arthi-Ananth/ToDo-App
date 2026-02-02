import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, enum: ['work', 'personal', 'health', 'learning', 'other'], default: 'personal' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    due_date: Date,
    completed: { type: Boolean, default: false },
    completed_at: Date,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Task = mongoose.model('Task', taskSchema);
export default Task;

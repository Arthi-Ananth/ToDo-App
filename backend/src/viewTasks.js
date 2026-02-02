// viewTasks.js
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db.js';
import Task from './src/models/Task.js';

const viewTasks = async () => {
    await connectDB();

    try {
        const tasks = await Task.find().populate('user', 'name email'); // include user info if needed
        if (tasks.length === 0) {
            console.log('No tasks found in the database.');
        } else {
            tasks.forEach(task => {
                console.log(`Title: ${task.title}`);
                console.log(`Description: ${task.description || 'N/A'}`);
                console.log(`Category: ${task.category}`);
                console.log(`Priority: ${task.priority}`);
                console.log(`Completed: ${task.completed}`);
                console.log(`Due Date: ${task.due_date || 'N/A'}`);
                console.log(`Created At: ${task.created_at}`);
                console.log(`Completed At: ${task.completed_at || 'N/A'}`);
                console.log('---------------------------');
            });
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    } finally {
        mongoose.disconnect();
    }
};

viewTasks();

import Task from '../models/Task.js';

// GET all tasks for user
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ created_at: -1 });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// CREATE a task
export const createTask = async (req, res) => {
    try {
        const { title, description, category, priority, due_date, completed } = req.body;
        const task = await Task.create({
            user: req.user._id,
            title,
            description,
            category,
            priority,
            due_date,
            completed,
            completed_at: completed ? new Date() : null,
        });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// UPDATE a task
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        Object.keys(req.body).forEach(key => { task[key] = req.body[key]; });
        if ('completed' in req.body) {
            task.completed_at = req.body.completed ? new Date() : null;
        }

        if ('completed' in req.body) {
            task.completed_at = req.body.completed ? new Date() : null;
        }

        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE a task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

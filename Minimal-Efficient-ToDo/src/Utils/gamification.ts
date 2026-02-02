import type { Achievement, Task } from '../types';

export const calculatePoints = (task: Task): number => {
    let points = 10;

    if (task.priority === 'high') points += 15;
    else if (task.priority === 'medium') points += 10;
    else points += 5;

    if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const completedDate = task.completedAt ? new Date(task.completedAt) : new Date();
        if (completedDate <= dueDate) {
            points += 10;
        }
    }

    return points;
};

export const calculateLevel = (points: number): number => {
    return Math.floor(points / 100) + 1;
};

export const pointsToNextLevel = (points: number): number => {
    const currentLevel = calculateLevel(points);
    return currentLevel * 100 - points;
};

export const checkAchievements = (_tasks: Task[], completedTasks: Task[]): Achievement[] => {
    const achievements: Achievement[] = [
        {
            id: 'first-task',
            title: 'Getting Started',
            description: 'Complete your first task',
            icon: 'CheckCircle',
            unlocked: completedTasks.length >= 1,
            unlockedAt: completedTasks.length >= 1 ? completedTasks[0].completedAt : null,
        },
        {
            id: 'task-master-5',
            title: 'Task Master',
            description: 'Complete 5 tasks',
            icon: 'Trophy',
            unlocked: completedTasks.length >= 5,
            unlockedAt: completedTasks.length >= 5 ? completedTasks[4].completedAt : null,
        },
        {
            id: 'task-master-10',
            title: 'Productivity Pro',
            description: 'Complete 10 tasks',
            icon: 'Star',
            unlocked: completedTasks.length >= 10,
            unlockedAt: completedTasks.length >= 10 ? completedTasks[9].completedAt : null,
        },
        {
            id: 'task-master-25',
            title: 'Unstoppable',
            description: 'Complete 25 tasks',
            icon: 'Zap',
            unlocked: completedTasks.length >= 25,
            unlockedAt: completedTasks.length >= 25 ? completedTasks[24].completedAt : null,
        },
        {
            id: 'high-priority-warrior',
            title: 'Priority Warrior',
            description: 'Complete 5 high-priority tasks',
            icon: 'AlertCircle',
            unlocked: completedTasks.filter(t => t.priority === 'high').length >= 5,
            unlockedAt: completedTasks.filter(t => t.priority === 'high').length >= 5
                ? completedTasks.filter(t => t.priority === 'high')[4].completedAt
                : null,
        },
        {
            id: 'early-bird',
            title: 'Early Bird',
            description: 'Complete a task before its due date',
            icon: 'Sunrise',
            unlocked: completedTasks.some(t => {
                if (!t.dueDate || !t.completedAt) return false;
                return new Date(t.completedAt) <= new Date(t.dueDate);
            }),
            unlockedAt: completedTasks.find(t => {
                if (!t.dueDate || !t.completedAt) return false;
                return new Date(t.completedAt) <= new Date(t.dueDate);
            })?.completedAt || null,
        },
    ];

    return achievements;
};

export const calculateStreak = (completedTasks: Task[]): number => {
    if (completedTasks.length === 0) return 0;

    const sortedTasks = [...completedTasks]
        .filter(t => t.completedAt)
        .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

    if (sortedTasks.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const task of sortedTasks) {
        const taskDate = new Date(task.completedAt!);
        taskDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((currentDate.getTime() - taskDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === streak || diffDays === streak + 1) {
            if (diffDays === streak + 1) {
                streak++;
            }
        } else if (diffDays > streak + 1) {
            break;
        }
    }

    return streak;
};

export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'health' | 'learning' | 'other';

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: Priority;
    category: Category;
    dueDate: string | null;
    createdAt: string;
    completedAt: string | null;
}

export interface UserStats {
    totalTasks: number;
    completedTasks: number;
    points: number;
    streak: number;
    level: number;
    achievements: Achievement[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt: string | null;
}

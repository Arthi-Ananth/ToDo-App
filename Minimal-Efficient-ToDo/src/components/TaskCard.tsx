import { CheckCircle, Circle, Clock, Trash2, Edit, AlertCircle, Minus } from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

const priorityColors = {
    high: 'border-red-500 bg-red-50',
    medium: 'border-amber-500 bg-amber-50',
    low: 'border-emerald-500 bg-emerald-50',
};

const priorityIcons = {
    high: <AlertCircle className="w-4 h-4 text-red-500" />,
    medium: <Minus className="w-4 h-4 text-amber-500" />,
    low: <Circle className="w-4 h-4 text-emerald-500" />,
};

const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-violet-100 text-violet-800',
    health: 'bg-green-100 text-green-800',
    learning: 'bg-orange-100 text-orange-800',
    other: 'bg-gray-100 text-gray-800',
};

export default function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

    return (
        <div
            className={`relative border-l-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 p-4 ${priorityColors[task.priority]
                } ${task.completed ? 'opacity-60' : ''}`}
        >
            <div className="flex items-start gap-3">
                <button
                    onClick={() => onToggle(task.id)}
                    className="mt-1 flex-shrink-0 hover:scale-110 transition-transform"
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                    {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600 fill-green-100" />
                    ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-green-500" />
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3
                            className={`font-semibold text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''
                                }`}
                        >
                            {task.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {priorityIcons[task.priority]}
                            <button
                                onClick={() => onEdit(task)}
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                aria-label="Edit task"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                aria-label="Delete task"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {task.description && (
                        <p className={`text-sm text-gray-600 mb-3 ${task.completed ? 'line-through' : ''}`}>
                            {task.description}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[task.category]}`}>
                            {task.category}
                        </span>

                        {task.dueDate && (
                            <div
                                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${isOverdue
                                    ? 'bg-red-100 text-red-800'
                                    : task.completed
                                        ? 'bg-gray-100 text-gray-600'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                            >
                                <Clock className="w-3 h-3" />
                                {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

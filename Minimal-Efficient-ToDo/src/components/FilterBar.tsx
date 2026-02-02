import { Filter } from 'lucide-react';
import type { Category, Priority } from '../types';

interface FilterBarProps {
    selectedCategory: Category | 'all';
    selectedPriority: Priority | 'all';
    selectedStatus: 'all' | 'active' | 'completed';
    onCategoryChange: (category: Category | 'all') => void;
    onPriorityChange: (priority: Priority | 'all') => void;
    onStatusChange: (status: 'all' | 'active' | 'completed') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function FilterBar({
    selectedCategory,
    selectedPriority,
    selectedStatus,
    onCategoryChange,
    onPriorityChange,
    onStatusChange,
    searchQuery,
    onSearchChange,
}: FilterBarProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Search
                    </label>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search tasks..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        id="status"
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value as 'all' | 'active' | 'completed')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="all">All Tasks</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="all">All Categories</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="health">Health</option>
                        <option value="learning">Learning</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <select
                        id="priority"
                        value={selectedPriority}
                        onChange={(e) => onPriorityChange(e.target.value as Priority | 'all')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

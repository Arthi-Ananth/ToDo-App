import { type LucideIcon } from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    color: string;
    bgColor: string;
}

export default function StatsCard({ icon: Icon, label, value, color, bgColor }: StatsCardProps) {
    return (
        <div className={`${bgColor} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
                    <p className={`text-3xl font-bold ${color}`}>{value}</p>
                </div>
                <div className={`${color} opacity-20`}>
                    <Icon className="w-12 h-12" />
                </div>
            </div>
        </div>
    );
}

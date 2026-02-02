interface ProgressBarProps {
    current: number;
    total: number;
    label?: string;
    color?: string; // expect full Tailwind class like 'bg-blue-500'
}

export default function ProgressBar({ current, total, label, color = 'bg-blue-500' }: ProgressBarProps) {
    const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-semibold text-gray-900">
                        {current} / {total}
                    </span>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className={`h-full ${color} transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

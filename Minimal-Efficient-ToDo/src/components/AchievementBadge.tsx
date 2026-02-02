import { CheckCircle, Trophy, Star, Zap, AlertCircle, Sunrise, Lock } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementBadgeProps {
    achievement: Achievement;
}

const iconMap = {
    CheckCircle,
    Trophy,
    Star,
    Zap,
    AlertCircle,
    Sunrise,
};

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
    const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;

    return (
        <div
            className={`relative rounded-lg p-4 border-2 transition-all ${achievement.unlocked
                ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-md'
                : 'bg-gray-50 border-gray-300 opacity-60'
                }`}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}
                >
                    {achievement.unlocked ? (
                        <Icon className="w-6 h-6" />
                    ) : (
                        <Lock className="w-6 h-6" />
                    )}
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-xs text-amber-600 mt-2">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

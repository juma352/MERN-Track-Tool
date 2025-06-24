import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  value: string | number;
  progress: number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  progress,
  icon: Icon,
  color,
  subtitle
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color.replace('bg-', 'bg-').split(' ')[0]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-sm text-gray-600 mt-1">{progress}% Complete</div>
    </div>
  );
};
import React from 'react';
import { Database, Server, Zap, Code } from 'lucide-react';

interface CategoryProgressProps {
  categoryProgress: {
    mongodb: number;
    express: number;
    react: number;
    nodejs: number;
  };
}

export const CategoryProgress: React.FC<CategoryProgressProps> = ({ categoryProgress }) => {
  const categories = [
    { key: 'mongodb', name: 'MongoDB', icon: Database, color: 'bg-green-500', progress: categoryProgress.mongodb },
    { key: 'express', name: 'Express.js', icon: Server, color: 'bg-gray-800', progress: categoryProgress.express },
    { key: 'react', name: 'React.js', icon: Zap, color: 'bg-blue-500', progress: categoryProgress.react },
    { key: 'nodejs', name: 'Node.js', icon: Code, color: 'bg-green-600', progress: categoryProgress.nodejs }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">MERN Stack Progress</h3>
      
      <div className="space-y-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.key} className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-600">{category.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${category.color}`}
                    style={{ width: `${category.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
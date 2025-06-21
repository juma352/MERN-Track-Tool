import React, { useEffect, useState } from 'react';
import { BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';
import { ProgressCard } from './ProgressCard';
import { CategoryProgress } from './CategoryProgress';
import { topicsService } from '../../services/topicsService';
import { goalsService } from '../../services/goalsService';

interface Topic {
  _id: string;
  name: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  status: 'not-started' | 'learning' | 'completed';
  progress: number;
  notes: string;
  code_snippet: string;
}

interface Goal {
  _id: string;
  title: string;
  description: string;
  target_date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface ProgressStats {
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  overallProgress: number;
  categoryProgress: {
    mongodb: number;
    express: number;
    react: number;
    nodejs: number;
  };
}

export const Dashboard: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [topicsData, goalsData] = await Promise.all([
        topicsService.getTopics(),
        goalsService.getGoals()
      ]);
      
      setTopics(topicsData);
      setGoals(goalsData);
      setLoading(false);
    };

    loadData();
  }, []);

  const calculateStats = (): ProgressStats => {
    const totalTopics = topics.length;
    const completedTopics = topics.filter(t => t.status === 'completed').length;
    const inProgressTopics = topics.filter(t => t.status === 'learning').length;
    const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    
    const categoryProgress = {
      mongodb: Math.round(topics.filter(t => t.category === 'mongodb').reduce((avg, t) => avg + t.progress, 0) / topics.filter(t => t.category === 'mongodb').length) || 0,
      express: Math.round(topics.filter(t => t.category === 'express').reduce((avg, t) => avg + t.progress, 0) / topics.filter(t => t.category === 'express').length) || 0,
      react: Math.round(topics.filter(t => t.category === 'react').reduce((avg, t) => avg + t.progress, 0) / topics.filter(t => t.category === 'react').length) || 0,
      nodejs: Math.round(topics.filter(t => t.category === 'nodejs').reduce((avg, t) => avg + t.progress, 0) / topics.filter(t => t.category === 'nodejs').length) || 0
    };

    return {
      totalTopics,
      completedTopics,
      inProgressTopics,
      overallProgress,
      categoryProgress
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = calculateStats();
  const activeGoals = goals.filter(g => !g.completed).length;
  const upcomingDeadlines = goals.filter(g => !g.completed && new Date(g.target_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back to your MERN journey!</h2>
        <p className="text-blue-100 text-lg">Track your progress, take notes, and achieve your learning goals.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProgressCard
          title="Overall Progress"
          value={`${stats.completedTopics}/${stats.totalTopics}`}
          progress={stats.overallProgress}
          icon={TrendingUp}
          color="bg-blue-500"
          subtitle="topics completed"
        />
        <ProgressCard
          title="Learning Topics"
          value={stats.inProgressTopics}
          progress={stats.inProgressTopics > 0 ? 100 : 0}
          icon={BookOpen}
          color="bg-purple-500"
          subtitle="in progress"
        />
        <ProgressCard
          title="Active Goals"
          value={activeGoals}
          progress={goals.length > 0 ? (goals.filter(g => g.completed).length / goals.length) * 100 : 0}
          icon={Target}
          color="bg-green-500"
          subtitle="goals set"
        />
        <ProgressCard
          title="Upcoming Deadlines"
          value={upcomingDeadlines}
          progress={upcomingDeadlines > 0 ? 100 : 0}
          icon={Calendar}
          color="bg-red-500"
          subtitle="this week"
        />
      </div>

      {/* Category Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryProgress categoryProgress={stats.categoryProgress} />
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {topics.slice(-3).reverse().map((topic) => (
              <div key={topic._id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  topic.category === 'mongodb' ? 'bg-green-500' :
                  topic.category === 'express' ? 'bg-gray-800' :
                  topic.category === 'react' ? 'bg-blue-500' : 'bg-green-600'
                }`}>
                  <span className="text-white text-xs font-bold">
                    {topic.category.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{topic.name}</div>
                  <div className="text-sm text-gray-600">
                    {topic.status === 'completed' ? 'Completed' : `${topic.progress}% complete`}
                  </div>
                </div>
              </div>
            ))}
            {topics.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No topics yet. Start by adding your first learning topic!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
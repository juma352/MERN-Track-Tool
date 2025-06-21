import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Target, AlertCircle, Trash2 } from 'lucide-react';
import { goalsService } from '../../services/goalsService';

interface Goal {
  _id: string;
  title: string;
  description: string;
  target_date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const GoalsView: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_date: '',
    priority: 'medium' as Goal['priority']
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setLoading(true);
    const data = await goalsService.getGoals();
    setGoals(data);
    setLoading(false);
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title.trim() && newGoal.target_date) {
      const goalData = {
        title: newGoal.title,
        description: newGoal.description,
        target_date: newGoal.target_date,
        priority: newGoal.priority,
        completed: false
      };

      const createdGoal = await goalsService.createGoal(goalData);
      if (createdGoal) {
        setGoals(prev => [createdGoal, ...prev]);
        setNewGoal({
          title: '',
          description: '',
          target_date: '',
          priority: 'medium'
        });
        setIsAddingGoal(false);
      }
    }
  };

  const handleUpdateGoal = async (goal: Goal) => {
    const updatedGoal = await goalsService.updateGoal(goal._id, {
      completed: !goal.completed
    });
    
    if (updatedGoal) {
      setGoals(prev => prev.map(g => 
        g._id === goal._id ? updatedGoal : g
      ));
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      const success = await goalsService.deleteGoal(goalId);
      if (success) {
        setGoals(prev => prev.filter(goal => goal._id !== goalId));
      }
    }
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntilDeadline = (targetDate: string) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Learning Goals</h2>
          <p className="text-gray-600">Set and track your MERN learning objectives</p>
        </div>
        <button
          onClick={() => setIsAddingGoal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Add Goal Form */}
      {isAddingGoal && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h3>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Build a full-stack MERN app"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                <input
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe your learning goal..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as Goal['priority'] })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingGoal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Add Goal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.map((goal) => {
            const daysUntil = getDaysUntilDeadline(goal.target_date);
            const isOverdue = daysUntil < 0;
            const isUpcoming = daysUntil <= 7 && daysUntil >= 0;
            
            return (
              <div
                key={goal._id}
                className={`bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 ${
                  goal.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-xl font-semibold ${
                        goal.completed ? 'text-green-800 line-through' : 'text-gray-900'
                      }`}>
                        {goal.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                    </div>
                    {goal.description && (
                      <p className="text-gray-600 mb-3">{goal.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(goal.target_date).toLocaleDateString()}</span>
                      </div>
                      {!goal.completed && (
                        <div className={`flex items-center space-x-1 ${
                          isOverdue ? 'text-red-600' : isUpcoming ? 'text-yellow-600' : 'text-gray-500'
                        }`}>
                          <AlertCircle className="w-4 h-4" />
                          <span>
                            {isOverdue 
                              ? `${Math.abs(daysUntil)} days overdue`
                              : daysUntil === 0 
                                ? 'Due today'
                                : `${daysUntil} days remaining`
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateGoal(goal)}
                      className={`p-2 rounded-lg transition-colors ${
                        goal.completed
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Target className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {goal.completed && (
                  <div className="flex items-center space-x-2 text-green-600 text-sm">
                    <Target className="w-4 h-4" />
                    <span>Goal completed!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals set yet</h3>
          <p className="text-gray-600 mb-4">
            Set your first learning goal to stay motivated and track your progress!
          </p>
          <button
            onClick={() => setIsAddingGoal(true)}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
          >
            Set Your First Goal
          </button>
        </div>
      )}
    </div>
  );
};
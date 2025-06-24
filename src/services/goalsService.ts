import api from '../lib/api.js';
import toast from 'react-hot-toast';

interface Goal {
  _id: string;
  title: string;
  description: string;
  target_date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export const goalsService = {
  async getGoals(): Promise<Goal[]> {
    try {
      const response = await api.get('/goals');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load goals');
      return [];
    }
  },

  async createGoal(goalData: Omit<Goal, '_id' | 'createdAt' | 'updatedAt'>): Promise<Goal | null> {
    try {
      const response = await api.post('/goals', goalData);
      toast.success('Goal created successfully!');
      return response.data;
    } catch (error: any) {
      console.error('Error creating goal:', error);
      const message = error.response?.data?.message || 'Failed to create goal';
      toast.error(message);
      return null;
    }
  },

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | null> {
    try {
      const response = await api.put(`/goals/${id}`, updates);
      toast.success('Goal updated successfully!');
      return response.data;
    } catch (error: any) {
      console.error('Error updating goal:', error);
      const message = error.response?.data?.message || 'Failed to update goal';
      toast.error(message);
      return null;
    }
  },

  async deleteGoal(id: string): Promise<boolean> {
    try {
      await api.delete(`/goals/${id}`);
      toast.success('Goal deleted successfully!');
      return true;
    } catch (error: any) {
      console.error('Error deleting goal:', error);
      const message = error.response?.data?.message || 'Failed to delete goal';
      toast.error(message);
      return false;
    }
  },

  async getUpcomingGoals(): Promise<Goal[]> {
    try {
      const response = await api.get('/goals/upcoming');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching upcoming goals:', error);
      return [];
    }
  }
};
import api from '../lib/api.js';
import toast from 'react-hot-toast';

interface Topic {
  _id: string;
  name: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  status: 'not-started' | 'learning' | 'completed';
  progress: number;
  notes: string;
  code_snippet: string;
  createdAt: string;
  updatedAt: string;
}

export const topicsService = {
  async getTopics(): Promise<Topic[]> {
    try {
      const response = await api.get('/topics');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching topics:', error);
      toast.error('Failed to load topics');
      return [];
    }
  },

  async createTopic(topicData: Omit<Topic, '_id' | 'createdAt' | 'updatedAt'>): Promise<Topic | null> {
    try {
      const response = await api.post('/topics', topicData);
      toast.success('Topic created successfully!');
      return response.data;
    } catch (error: any) {
      console.error('Error creating topic:', error);
      const message = error.response?.data?.message || 'Failed to create topic';
      toast.error(message);
      return null;
    }
  },

  async updateTopic(id: string, updates: Partial<Topic>): Promise<Topic | null> {
    try {
      const response = await api.put(`/topics/${id}`, updates);
      toast.success('Topic updated successfully!');
      return response.data;
    } catch (error: any) {
      console.error('Error updating topic:', error);
      const message = error.response?.data?.message || 'Failed to update topic';
      toast.error(message);
      return null;
    }
  },

  async deleteTopic(id: string): Promise<boolean> {
    try {
      await api.delete(`/topics/${id}`);
      toast.success('Topic deleted successfully!');
      return true;
    } catch (error: any) {
      console.error('Error deleting topic:', error);
      const message = error.response?.data?.message || 'Failed to delete topic';
      toast.error(message);
      return false;
    }
  },

  async getTopicsByCategory(category: string): Promise<Topic[]> {
    try {
      const response = await api.get(`/topics/category/${category}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching topics by category:', error);
      return [];
    }
  }
};
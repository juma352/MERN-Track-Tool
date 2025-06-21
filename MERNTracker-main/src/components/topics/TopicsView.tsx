import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { TopicCard } from './TopicCard';
import { AddTopicModal } from './AddTopicModal';
import { topicsService } from '../../services/topicsService';

interface Topic {
  _id: string;
  name: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  status: 'not-started' | 'learning' | 'completed';
  progress: number;
  notes: string;
  code_snippet: string;
}

export const TopicsView: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Topic['status']>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Topic['category']>('all');

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    setLoading(true);
    const data = await topicsService.getTopics();
    setTopics(data);
    setLoading(false);
  };

  const handleAddTopic = async (topicData: Omit<Topic, '_id'>) => {
    const newTopic = await topicsService.createTopic(topicData);
    if (newTopic) {
      setTopics(prev => [newTopic, ...prev]);
    }
  };

  const handleUpdateTopic = async (updatedTopic: Topic) => {
    const result = await topicsService.updateTopic(updatedTopic._id, {
      name: updatedTopic.name,
      category: updatedTopic.category,
      status: updatedTopic.status,
      progress: updatedTopic.progress,
      notes: updatedTopic.notes,
      code_snippet: updatedTopic.code_snippet
    });
    
    if (result) {
      setTopics(prev => prev.map(topic => 
        topic._id === updatedTopic._id ? result : topic
      ));
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    const success = await topicsService.deleteTopic(topicId);
    if (success) {
      setTopics(prev => prev.filter(topic => topic._id !== topicId));
    }
  };

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || topic.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || topic.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

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
          <h2 className="text-2xl font-bold text-gray-900">Learning Topics</h2>
          <p className="text-gray-600">Track your MERN stack learning progress</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Topic</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | Topic['status'])}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="learning">Learning</option>
            <option value="completed">Completed</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as 'all' | Topic['category'])}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="mongodb">MongoDB</option>
            <option value="express">Express.js</option>
            <option value="react">React.js</option>
            <option value="nodejs">Node.js</option>
          </select>
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic._id}
              topic={topic}
              onUpdate={handleUpdateTopic}
              onDelete={handleDeleteTopic}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters or search terms.'
              : 'Get started by adding your first learning topic!'
            }
          </p>
          {(!searchTerm && statusFilter === 'all' && categoryFilter === 'all') && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              Add Your First Topic
            </button>
          )}
        </div>
      )}

      {/* Add Topic Modal */}
      <AddTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTopic}
      />
    </div>
  );
};
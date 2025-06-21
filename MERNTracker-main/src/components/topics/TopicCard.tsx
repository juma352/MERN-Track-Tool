import React, { useState } from 'react';
import { Edit, Save, X, Code, FileText, Trash2 } from 'lucide-react';

interface Topic {
  _id: string;
  name: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  status: 'not-started' | 'learning' | 'completed';
  progress: number;
  notes: string;
  code_snippet: string;
}

interface TopicCardProps {
  topic: Topic;
  onUpdate: (topic: Topic) => void;
  onDelete: (id: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTopic, setEditedTopic] = useState(topic);
  const [showCode, setShowCode] = useState(false);

  const handleSave = () => {
    onUpdate(editedTopic);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTopic(topic);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      onDelete(topic._id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mongodb': return 'bg-green-500';
      case 'express': return 'bg-gray-800';
      case 'react': return 'bg-blue-500';
      case 'nodejs': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(topic.category)}`}>
            <span className="text-white text-sm font-bold">
              {topic.category.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedTopic.name}
                onChange={(e) => setEditedTopic({ ...editedTopic, name: e.target.value })}
                className="text-xl font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <h3 className="text-xl font-semibold text-gray-900">{topic.name}</h3>
            )}
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(topic.status)}`}>
              {topic.status.replace('-', ' ')}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{topic.progress}%</span>
        </div>
        {isEditing ? (
          <input
            type="range"
            min="0"
            max="100"
            value={editedTopic.progress}
            onChange={(e) => setEditedTopic({ ...editedTopic, progress: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        ) : (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getCategoryColor(topic.category)}`}
              style={{ width: `${topic.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Status Selection */}
      {isEditing && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={editedTopic.status}
            onChange={(e) => setEditedTopic({ ...editedTopic, status: e.target.value as Topic['status'] })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="not-started">Not Started</option>
            <option value="learning">Learning</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      {/* Notes */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Notes</span>
        </div>
        {isEditing ? (
          <textarea
            value={editedTopic.notes}
            onChange={(e) => setEditedTopic({ ...editedTopic, notes: e.target.value })}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Add your notes here..."
          />
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed">{topic.notes}</p>
        )}
      </div>

      {/* Code Snippet */}
      {(topic.code_snippet || isEditing) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Code Snippet</span>
            </div>
            {!isEditing && topic.code_snippet && (
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {showCode ? 'Hide' : 'Show'}
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={editedTopic.code_snippet}
              onChange={(e) => setEditedTopic({ ...editedTopic, code_snippet: e.target.value })}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="Add code snippet here..."
            />
          ) : (
            showCode && (
              <pre className="bg-gray-50 p-3 rounded-lg overflow-x-auto text-sm font-mono text-gray-800">
                <code>{topic.code_snippet}</code>
              </pre>
            )
          )}
        </div>
      )}
    </div>
  );
};
import { Topic, Goal } from '../types';

export const initialTopics: Topic[] = [
  {
    id: '1',
    name: 'MongoDB Basics',
    category: 'mongodb',
    status: 'completed',
    progress: 100,
    notes: 'Understanding document-based databases, collections, and basic CRUD operations.',
    codeSnippet: `// Connect to MongoDB
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();`,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Express.js Routing',
    category: 'express',
    status: 'learning',
    progress: 65,
    notes: 'Learning about middleware, route handlers, and API development.',
    codeSnippet: `// Basic Express route
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});`,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'React Hooks',
    category: 'react',
    status: 'completed',
    progress: 100,
    notes: 'Mastered useState, useEffect, useContext, and custom hooks.',
    codeSnippet: `// Custom hook example
const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
};`,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '4',
    name: 'Node.js Fundamentals',
    category: 'nodejs',
    status: 'learning',
    progress: 40,
    notes: 'Learning about file system, streams, and event-driven architecture.',
    codeSnippet: `// Reading files asynchronously
const fs = require('fs').promises;
const data = await fs.readFile('file.txt', 'utf8');`,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-22')
  }
];

export const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Build Full-Stack MERN App',
    description: 'Create a complete MERN application with authentication and CRUD operations',
    targetDate: new Date('2024-03-01'),
    completed: false,
    priority: 'high',
    relatedTopics: ['1', '2', '3', '4']
  },
  {
    id: '2',
    title: 'Master MongoDB Aggregation',
    description: 'Learn advanced MongoDB queries and aggregation pipelines',
    targetDate: new Date('2024-02-15'),
    completed: false,
    priority: 'medium',
    relatedTopics: ['1']
  }
];
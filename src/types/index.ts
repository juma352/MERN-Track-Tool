export interface Topic {
  id: string;
  name: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  status: 'not-started' | 'learning' | 'completed';
  progress: number;
  notes: string;
  codeSnippet: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  relatedTopics: string[];
}

export interface ProgressStats {
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
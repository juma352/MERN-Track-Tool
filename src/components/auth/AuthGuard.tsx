import React from 'react';
import { BookOpen, Target, TrendingUp, Users, Code, Database, Server, Zap } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  isAuthenticated, 
  onAuthClick 
}) => {
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to MERN Buddy
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive learning platform for mastering the MERN stack. 
            Track progress, explore code examples, take notes, set goals, and build your skills systematically with hands-on tutorials.
          </p>
          <button
            onClick={onAuthClick}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Start Learning Now</span>
          </button>
        </div>

        {/* MERN Stack Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">MongoDB</h3>
            <p className="text-gray-600 text-sm">NoSQL database with flexible document storage</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Server className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Express.js</h3>
            <p className="text-gray-600 text-sm">Fast, minimalist web framework for Node.js</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">React.js</h3>
            <p className="text-gray-600 text-sm">Component-based UI library for building interfaces</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Node.js</h3>
            <p className="text-gray-600 text-sm">JavaScript runtime for server-side development</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Topics</h3>
            <p className="text-gray-600 text-sm">
              Organize and monitor your learning progress across all MERN technologies with detailed notes and code snippets
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Code className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Code Examples</h3>
            <p className="text-gray-600 text-sm">
              Learn with 20+ practical code examples covering beginner to advanced concepts with detailed explanations
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Goals</h3>
            <p className="text-gray-600 text-sm">
              Define learning objectives with deadlines and priorities to stay motivated and track achievements
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Analytics</h3>
            <p className="text-gray-600 text-sm">
              Visualize your learning journey with beautiful charts and progress indicators across all technologies
            </p>
          </div>
        </div>

        {/* Learning Path Preview */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Complete MERN Learning Path</h2>
          <p className="text-blue-100 mb-6 max-w-3xl mx-auto">
            From database fundamentals to full-stack applications - learn with structured examples, 
            practical exercises, and real-world code snippets that you can copy and experiment with.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="font-semibold mb-2">🚀 Beginner Friendly</div>
              <div className="text-blue-100">Start with basics and build confidence</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="font-semibold mb-2">💻 Hands-on Examples</div>
              <div className="text-blue-100">Copy, paste, and experiment with real code</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="font-semibold mb-2">📈 Track Progress</div>
              <div className="text-blue-100">See your growth across all technologies</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to become a MERN stack developer?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of developers who are systematically mastering the MERN stack 
            with structured learning, practical examples, and progress tracking.
          </p>
          <button
            onClick={onAuthClick}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <span>Begin Your Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
};
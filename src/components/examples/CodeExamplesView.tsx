import React, { useState } from 'react';
import { Code, BookOpen, Play, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { codeExamples } from '../../data/codeExamples';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  code: string;
  explanation: string;
  output?: string;
  tips: string[];
}

export const CodeExamplesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CodeExample['category']>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | CodeExample['difficulty']>('all');
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredExamples = codeExamples.filter(example => {
    const matchesCategory = selectedCategory === 'all' || example.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || example.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Code Examples & Tutorials</h2>
            <p className="text-blue-100 text-lg">Learn MERN stack with practical, hands-on examples</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{codeExamples.length}</div>
            <div className="text-sm text-blue-100">Examples</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-blue-100">Technologies</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-blue-100">Difficulty Levels</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">∞</div>
            <div className="text-sm text-blue-100">Learning</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Technology</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as 'all' | CodeExample['category'])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Technologies</option>
            <option value="mongodb">MongoDB</option>
            <option value="express">Express.js</option>
            <option value="react">React.js</option>
            <option value="nodejs">Node.js</option>
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as 'all' | CodeExample['difficulty'])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="space-y-6">
        {filteredExamples.map((example) => (
          <div key={example.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Example Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(example.category)}`}>
                    <span className="text-white text-sm font-bold">
                      {example.category.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                    <p className="text-gray-600">{example.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(example.difficulty)}`}>
                  {example.difficulty}
                </span>
              </div>
              
              <button
                onClick={() => setExpandedExample(expandedExample === example.id ? null : example.id)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                {expandedExample === example.id ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
                <span>{expandedExample === example.id ? 'Hide' : 'Show'} Code & Explanation</span>
              </button>
            </div>

            {/* Expanded Content */}
            {expandedExample === example.id && (
              <div className="p-6 space-y-6">
                {/* Code Block */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Code className="w-5 h-5" />
                      <span>Code Example</span>
                    </h4>
                    <button
                      onClick={() => handleCopyCode(example.code, example.id)}
                      className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copiedCode === example.id ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>

                {/* Explanation */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Explanation</span>
                  </h4>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">{example.explanation}</p>
                  </div>
                </div>

                {/* Output */}
                {example.output && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Expected Output</span>
                    </h4>
                    <pre className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{example.output}</code>
                    </pre>
                  </div>
                )}

                {/* Tips */}
                {example.tips.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips</h4>
                    <ul className="space-y-2">
                      {example.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredExamples.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No examples found</h3>
          <p className="text-gray-600">
            Try adjusting your filters to see more code examples.
          </p>
        </div>
      )}
    </div>
  );
};
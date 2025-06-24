import React from 'react';
import { BookOpen, Target, BarChart3, LogOut, User, Code } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAuthClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onAuthClick }) => {
  const { user, signOut, isAuthenticated } = useAuth();
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'topics', label: 'Topics', icon: BookOpen },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'examples', label: 'Code Examples', icon: Code }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MERN Buddy</h1>
              <p className="text-sm text-gray-600">Your Learning Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <nav className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}
            
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700 max-w-32 truncate">
                      {user?.email}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
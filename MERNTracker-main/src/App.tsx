import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/common/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { TopicsView } from './components/topics/TopicsView';
import { GoalsView } from './components/goals/GoalsView';
import { CodeExamplesView } from './components/examples/CodeExamplesView';
import { AuthModal } from './components/auth/AuthModal';
import { AuthGuard } from './components/auth/AuthGuard';
import { useAuth } from './hooks/useAuth';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'topics':
        return <TopicsView />;
      case 'goals':
        return <GoalsView />;
      case 'examples':
        return <CodeExamplesView />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onAuthClick={() => setIsAuthModalOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AuthGuard 
          isAuthenticated={isAuthenticated}
          onAuthClick={() => setIsAuthModalOpen(true)}
        >
          {renderContent()}
        </AuthGuard>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;
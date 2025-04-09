
import React, { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import SchemaViewer, { SchemaViewerHandle } from '@/components/SchemaViewer';
import { X } from 'lucide-react';

const Index = () => {
  const schemaViewerRef = useRef<SchemaViewerHandle>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  useEffect(() => {
    // Check if user has seen the welcome message before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);
  
  const handleNewSchema = () => {
    if (schemaViewerRef.current) {
      schemaViewerRef.current.handleCreateSchema();
    }
  };

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header title="Schema Explorer" onNewSchema={handleNewSchema} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {showWelcome && (
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Welcome to Schema Explorer! 👋
                </h2>
                <p className="text-blue-700 dark:text-blue-300">
                  This tool helps you create and preview different schema designs. Here's what you can do:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-blue-700 dark:text-blue-300">
                  <li>Browse through existing schemas</li>
                  <li>View details of each schema element</li>
                  <li>Create new schemas with the "Create New" button</li>
                  <li>Preview how schemas would look when implemented</li>
                  <li>View schema diagrams by clicking "View Picture"</li>
                </ul>
                <p className="mt-3 text-blue-700 dark:text-blue-300">
                  Click on any schema in the list to get started!
                </p>
              </div>
              <button 
                onClick={dismissWelcome}
                className="ml-4 p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        
        <SchemaViewer ref={schemaViewerRef} />
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Schema Explorer &copy; {new Date().getFullYear()} • Made with simplicity in mind
        </div>
      </footer>
    </div>
  );
};

export default Index;

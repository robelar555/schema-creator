
import React, { useRef } from 'react';
import Header from '@/components/Header';
import SchemaViewer, { SchemaViewerHandle } from '@/components/SchemaViewer';

const Index = () => {
  const schemaViewerRef = useRef<SchemaViewerHandle>(null);
  
  const handleNewSchema = () => {
    if (schemaViewerRef.current) {
      schemaViewerRef.current.handleCreateSchema();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header title="Schema Explorer" onNewSchema={handleNewSchema} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <SchemaViewer ref={schemaViewerRef} />
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Schema Explorer &copy; {new Date().getFullYear()} • Powered by Lovable
        </div>
      </footer>
    </div>
  );
};

export default Index;

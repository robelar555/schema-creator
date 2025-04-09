
import React, { useState, useEffect } from 'react';
import { schemaData } from '@/lib/schemaData';
import SchemaList from './SchemaList';
import SchemaDetails from './SchemaDetails';
import { Schema } from '@/types/schema';
import { Search, Database, ImageIcon } from 'lucide-react';

const SchemaViewer = () => {
  const [activeSchemaId, setActiveSchemaId] = useState<string>('');
  const [activeSchema, setActiveSchema] = useState<Schema | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isShowingDiagram, setIsShowingDiagram] = useState<boolean>(false);

  useEffect(() => {
    if (schemaData.length > 0 && !activeSchemaId) {
      setActiveSchemaId(schemaData[0].id);
    }
  }, []);

  useEffect(() => {
    if (activeSchemaId) {
      const schema = schemaData.find(s => s.id === activeSchemaId) || null;
      setActiveSchema(schema);
    } else {
      setActiveSchema(null);
    }
  }, [activeSchemaId]);

  const filteredSchemas = schemaData.filter(schema => 
    schema.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSchema = (schemaId: string) => {
    setActiveSchemaId(schemaId);
    setIsShowingDiagram(false);
  };

  const toggleDiagram = () => {
    setIsShowingDiagram(!isShowingDiagram);
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <SchemaList 
          schemas={filteredSchemas}
          activeSchema={activeSchemaId}
          onSelectSchema={handleSelectSchema}
        />

        <button 
          className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
          onClick={toggleDiagram}
        >
          <ImageIcon className="h-5 w-5" />
          {isShowingDiagram ? 'Hide Diagram' : 'View Schema Diagram'}
        </button>
      </div>
      
      <div className="md:col-span-2 lg:col-span-3 min-h-[500px]">
        {isShowingDiagram ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <h2 className="font-semibold text-xl flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Schema Diagram
              </h2>
            </div>
            <div className="p-4 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900/50 text-center">
              <img 
                src="/lovable-uploads/5b81a293-fa86-4c93-a04c-db040ed7ebae.png" 
                alt="Schema Diagram" 
                className="max-w-full h-auto mx-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
              />
            </div>
          </div>
        ) : (
          <SchemaDetails schema={activeSchema} />
        )}
      </div>
    </div>
  );
};

export default SchemaViewer;

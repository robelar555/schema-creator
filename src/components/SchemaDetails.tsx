
import React from 'react';
import { Schema } from '@/types/schema';
import { Table, FileType, FileSignature } from 'lucide-react';
import SchemaElementCard from './SchemaElementCard';

interface SchemaDetailsProps {
  schema: Schema | null;
}

const SchemaDetails = ({ schema }: SchemaDetailsProps) => {
  if (!schema) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500 dark:text-gray-400">
        <Table className="h-16 w-16 mb-3 opacity-50" />
        <h3 className="text-lg font-medium mb-1">No Schema Selected</h3>
        <p className="text-sm">Select a schema from the list to view its details</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="font-semibold text-xl flex items-center gap-2">
          <FileType className="h-5 w-5 text-blue-600" />
          Schema: {schema.name}
        </h2>
        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center">
          <FileSignature className="h-4 w-4 mr-1" />
          ID: {schema.id} • {schema.elements.length} Elements
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schema.elements.map((element) => (
            <SchemaElementCard key={element.id} element={element} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchemaDetails;

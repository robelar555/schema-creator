
import React from 'react';
import { Database, ChevronRight } from 'lucide-react';

interface SchemaListProps {
  schemas: { id: string; name: string }[];
  activeSchema: string;
  onSelectSchema: (schemaId: string) => void;
}

const SchemaList = ({ schemas, activeSchema, onSelectSchema }: SchemaListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          Available Schemas
        </h2>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {schemas.map((schema) => (
          <li key={schema.id}>
            <button
              className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                activeSchema === schema.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => onSelectSchema(schema.id)}
            >
              <span className={`font-medium ${
                activeSchema === schema.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {schema.name}
              </span>
              <ChevronRight className={`h-5 w-5 ${
                activeSchema === schema.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
              }`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemaList;


import React, { useState } from 'react';
import { Schema } from '@/types/schema';
import { Table, FileType, FileSignature, Eye } from 'lucide-react';
import SchemaElementCard from './SchemaElementCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SchemaPreview from './SchemaPreview';

interface SchemaDetailsProps {
  schema: Schema | null;
}

const SchemaDetails = ({ schema }: SchemaDetailsProps) => {
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState(false);
  
  if (!schema) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Table className="h-16 w-16 mb-3 opacity-50" />
        <h3 className="text-lg font-medium mb-1">No Schema Selected</h3>
        <p className="text-sm">Please select a schema from the list to view details</p>
      </div>
    );
  }

  const handleTogglePreviewMode = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      toast({
        title: "Preview Mode Activated",
        description: "See how your schema would look when implemented"
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <FileType className="h-5 w-5 text-blue-600" />
              Schema: {schema.name}
            </h2>
            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center">
              <FileSignature className="h-4 w-4 mr-1" />
              ID: {schema.id} • {schema.elements.length} Elements
            </div>
          </div>
          <Button 
            onClick={handleTogglePreviewMode}
            variant={previewMode ? "secondary" : "outline"}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? "Exit Preview" : "Preview Schema"}
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900/50">
        {previewMode ? (
          <SchemaPreview schema={schema} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schema.elements.map((element) => (
              <div key={element.id} className="relative">
                <SchemaElementCard element={element} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaDetails;

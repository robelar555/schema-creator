
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { schemaData } from '@/lib/schemaData';
import SchemaList from './SchemaList';
import SchemaDetails from './SchemaDetails';
import SchemaForm from './SchemaForm';
import { Schema } from '@/types/schema';
import { Search, Database, ImageIcon, PlusCircle, Edit2, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface SchemaViewerHandle {
  handleCreateSchema: () => void;
}

const SchemaViewer = forwardRef<SchemaViewerHandle, {}>(({}, ref) => {
  const { toast } = useToast();
  const [schemas, setSchemas] = useState<Schema[]>(schemaData);
  const [activeSchemaId, setActiveSchemaId] = useState<string>('');
  const [activeSchema, setActiveSchema] = useState<Schema | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isShowingDiagram, setIsShowingDiagram] = useState<boolean>(false);
  const [isEditingSchema, setIsEditingSchema] = useState<boolean>(false);
  const [isCreatingSchema, setIsCreatingSchema] = useState<boolean>(false);

  useEffect(() => {
    if (schemas.length > 0 && !activeSchemaId) {
      setActiveSchemaId(schemas[0].id);
    }
  }, [schemas]);

  useEffect(() => {
    if (activeSchemaId) {
      const schema = schemas.find(s => s.id === activeSchemaId) || null;
      setActiveSchema(schema);
    } else {
      setActiveSchema(null);
    }
  }, [activeSchemaId, schemas]);

  const filteredSchemas = schemas.filter(schema => 
    schema.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSchema = (schemaId: string) => {
    setActiveSchemaId(schemaId);
    setIsShowingDiagram(false);
    setIsEditingSchema(false);
    setIsCreatingSchema(false);
  };

  const toggleDiagram = () => {
    setIsShowingDiagram(!isShowingDiagram);
    setIsEditingSchema(false);
    setIsCreatingSchema(false);
  };

  const handleCreateSchema = () => {
    setIsCreatingSchema(true);
    setIsEditingSchema(false);
    setIsShowingDiagram(false);
  };

  // Expose the createSchema function to the parent component
  useImperativeHandle(ref, () => ({
    handleCreateSchema
  }));

  const handleEditSchema = () => {
    if (activeSchema) {
      setIsEditingSchema(true);
      setIsShowingDiagram(false);
      setIsCreatingSchema(false);
    } else {
      toast({
        title: "No Schema Selected",
        description: "Please select a schema to edit",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSchema = () => {
    if (activeSchema) {
      if (confirm(`Are you sure you want to delete "${activeSchema.name}"?`)) {
        const newSchemas = schemas.filter(s => s.id !== activeSchema.id);
        setSchemas(newSchemas);
        
        if (newSchemas.length > 0) {
          setActiveSchemaId(newSchemas[0].id);
        } else {
          setActiveSchemaId('');
          setActiveSchema(null);
        }
        
        toast({
          title: "Schema Deleted",
          description: `"${activeSchema.name}" has been deleted`
        });
      }
    } else {
      toast({
        title: "No Schema Selected",
        description: "Please select a schema to delete",
        variant: "destructive"
      });
    }
  };

  const handleSaveSchema = (schema: Schema) => {
    if (isCreatingSchema) {
      setSchemas([...schemas, schema]);
      setActiveSchemaId(schema.id);
      toast({
        title: "Schema Created",
        description: `"${schema.name}" has been created`
      });
    } else {
      // Editing existing schema
      setSchemas(schemas.map(s => s.id === schema.id ? schema : s));
      toast({
        title: "Schema Updated",
        description: `"${schema.name}" has been updated`
      });
    }
    
    setIsCreatingSchema(false);
    setIsEditingSchema(false);
  };

  const handleCancelForm = () => {
    setIsCreatingSchema(false);
    setIsEditingSchema(false);
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

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleCreateSchema}
          >
            <PlusCircle className="h-4 w-4" />
            Create Schema
          </Button>
          
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleEditSchema}
            disabled={!activeSchema}
          >
            <Edit2 className="h-4 w-4" />
            Edit Schema
          </Button>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Button 
            className="w-full flex items-center justify-center gap-2"
            variant="destructive"
            onClick={handleDeleteSchema}
            disabled={!activeSchema}
          >
            <Trash className="h-4 w-4" />
            Delete Schema
          </Button>
          
          <Button 
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
            onClick={toggleDiagram}
          >
            <ImageIcon className="h-4 w-4" />
            {isShowingDiagram ? 'Hide Diagram' : 'View Diagram'}
          </Button>
        </div>
      </div>
      
      <div className="md:col-span-2 lg:col-span-3 min-h-[500px]">
        {isCreatingSchema ? (
          <SchemaForm onSave={handleSaveSchema} onCancel={handleCancelForm} />
        ) : isEditingSchema && activeSchema ? (
          <SchemaForm existingSchema={activeSchema} onSave={handleSaveSchema} onCancel={handleCancelForm} />
        ) : isShowingDiagram ? (
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
});

SchemaViewer.displayName = 'SchemaViewer';

export default SchemaViewer;

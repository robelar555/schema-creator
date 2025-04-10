
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { schemaData } from '@/lib/schemaData';
import SchemaList from './SchemaList';
import SchemaDetails from './SchemaDetails';
import SchemaForm from './SchemaForm';
import SchemaPreview from './SchemaPreview';
import ElementToolbar from './ElementToolbar';
import { Schema, SchemaElement } from '@/types/schema';
import { Search, Database, ImageIcon, PlusCircle, Edit2, Trash, Info, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

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
  const [isInteractivePreview, setIsInteractivePreview] = useState<boolean>(false);
  const [showHelperText, setShowHelperText] = useState(true);

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
    setShowHelperText(false);
  };

  const toggleDiagram = () => {
    setIsShowingDiagram(!isShowingDiagram);
    setIsEditingSchema(false);
    setIsCreatingSchema(false);
    setIsInteractivePreview(false);
  };

  const toggleInteractivePreview = () => {
    setIsInteractivePreview(!isInteractivePreview);
    setIsShowingDiagram(false);
    setIsEditingSchema(false);
    setIsCreatingSchema(false);
  };

  const handleCreateSchema = () => {
    setIsCreatingSchema(true);
    setIsEditingSchema(false);
    setIsShowingDiagram(false);
    setIsInteractivePreview(false);
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
      setIsInteractivePreview(false);
    } else {
      toast({
        title: "No Schema Selected",
        description: "Please select a schema to edit"
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
        description: "Please select a schema to delete"
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

  const handleAddElementFromToolbar = (element: Partial<SchemaElement>) => {
    if (activeSchema) {
      const newElement: SchemaElement = {
        ...element as SchemaElement,
        id: `elem${Date.now()}`
      };
      
      const updatedSchema: Schema = {
        ...activeSchema,
        elements: [...activeSchema.elements, newElement]
      };
      
      setSchemas(schemas.map(s => s.id === activeSchema.id ? updatedSchema : s));
      setActiveSchema(updatedSchema);
      
      toast({
        title: "Element Added",
        description: `Added ${newElement.html_tag || 'element'} to schema`
      });
    }
  };

  const handleUpdateElements = (updatedElements: SchemaElement[]) => {
    if (!activeSchema) return;
    
    const updatedSchema: Schema = {
      ...activeSchema,
      elements: updatedElements
    };
    
    setSchemas(schemas.map(s => s.id === activeSchema.id ? updatedSchema : s));
    setActiveSchema(updatedSchema);
  };
  
  const handleRemoveElement = (elementId: string) => {
    if (!activeSchema) return;
    
    const updatedElements = activeSchema.elements.filter(element => element.id !== elementId);
    const updatedSchema: Schema = {
      ...activeSchema,
      elements: updatedElements
    };
    
    setSchemas(schemas.map(s => s.id === activeSchema.id ? updatedSchema : s));
    setActiveSchema(updatedSchema);
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="md:col-span-1">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h2 className="font-semibold text-lg mb-3 flex items-center">
            <Database className="mr-2 h-5 w-5 text-blue-500" />
            My Schemas
          </h2>
          
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Find a schema..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredSchemas.length > 0 ? (
            <SchemaList 
              schemas={filteredSchemas}
              activeSchema={activeSchemaId}
              onSelectSchema={handleSelectSchema}
            />
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>No schemas found</p>
              <p className="text-sm mt-1">Try a different search or create a new schema</p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-sm mb-3 text-gray-500 uppercase">Actions</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleCreateSchema}
                >
                  <PlusCircle className="h-4 w-4" />
                  Create New
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Create a brand new schema</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleEditSchema}
                  disabled={!activeSchema}
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Edit the selected schema</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  variant="destructive"
                  onClick={handleDeleteSchema}
                  disabled={!activeSchema}
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Delete the selected schema</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-white rounded-lg shadow transition-colors ${
                    isInteractivePreview ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  onClick={isShowingDiagram ? toggleDiagram : toggleInteractivePreview}
                >
                  {isShowingDiagram ? (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      Hide Picture
                    </>
                  ) : isInteractivePreview ? (
                    <>
                      <Eye className="h-4 w-4" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Interactive Preview
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{isInteractivePreview ? "Hide the interactive preview" : "See and edit schema in interactive preview"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="mt-2 grid grid-cols-1 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors`}
                  onClick={toggleDiagram}
                  disabled={isInteractivePreview}
                >
                  <ImageIcon className="h-4 w-4" />
                  {isShowingDiagram ? 'Hide Picture' : 'View Picture'}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>See a visual diagram of the schema</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {showHelperText && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Select a schema to view elements or preview how it would look when implemented
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
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
                Schema Picture
              </h2>
              <p className="text-sm text-gray-500 mt-1">Visual representation of your schema design</p>
            </div>
            <div className="p-4 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900/50 text-center">
              <img 
                src="/lovable-uploads/5b81a293-fa86-4c93-a04c-db040ed7ebae.png" 
                alt="Schema Diagram" 
                className="max-w-full h-auto mx-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
              />
            </div>
          </div>
        ) : isInteractivePreview && activeSchema ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <h2 className="font-semibold text-xl flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                Interactive Preview
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Add elements to your schema using the toolbar and see changes instantly. Right-click elements to reposition or remove them.
              </p>
            </div>
            <div className="p-4">
              <ElementToolbar 
                schema={activeSchema} 
                onAddElement={handleAddElementFromToolbar} 
              />
              <SchemaPreview 
                schema={activeSchema} 
                isInteractive={true}
                onElementUpdate={handleUpdateElements}
                onElementRemove={handleRemoveElement}
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

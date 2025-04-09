
import React, { useState } from 'react';
import { Schema, SchemaElement } from '@/types/schema';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash2, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SchemaFormProps {
  existingSchema?: Schema;
  onSave: (schema: Schema) => void;
  onCancel: () => void;
}

const SchemaForm = ({ existingSchema, onSave, onCancel }: SchemaFormProps) => {
  const { toast } = useToast();
  const [schema, setSchema] = useState<Schema>(
    existingSchema || {
      id: `schema${Date.now()}`,
      name: '',
      elements: [],
      color: '#6366F1',
      category: 'General',
      description: ''
    }
  );

  const [newElement, setNewElement] = useState<Partial<SchemaElement>>({
    html_tag: 'input',
    type: 'text',
    class: 'form-control'
  });

  const colorOptions = [
    { name: 'Blue', value: '#6366F1' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Indigo', value: '#4F46E5' },
    { name: 'Teal', value: '#14B8A6' },
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchema({ ...schema, name: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchema({ ...schema, category: e.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSchema({ ...schema, color: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchema({ ...schema, description: e.target.value });
  };

  const handleAddElement = () => {
    if (!newElement.html_name && !newElement.html_id) {
      toast({
        title: "Missing Information",
        description: "Element needs either a name or ID",
        variant: "destructive"
      });
      return;
    }

    const element: SchemaElement = {
      id: `elem${Date.now()}`,
      element_nr: (schema.elements.length + 1).toString(),
      schema_id: schema.id,
      ...newElement as any
    };

    setSchema({
      ...schema,
      elements: [...schema.elements, element]
    });

    setNewElement({
      html_tag: 'input',
      type: 'text',
      class: 'form-control'
    });

    toast({
      title: "Element Added",
      description: `Added element ${element.html_name || element.html_id}`
    });
  };

  const handleRemoveElement = (id: string) => {
    setSchema({
      ...schema,
      elements: schema.elements.filter(elem => elem.id !== id)
    });
    
    toast({
      title: "Element Removed",
      description: "Element has been removed"
    });
  };

  const handleElementChange = (id: string, field: keyof SchemaElement, value: any) => {
    setSchema({
      ...schema,
      elements: schema.elements.map(elem => {
        if (elem.id === id) {
          return { ...elem, [field]: value };
        }
        return elem;
      })
    });
  };

  const handleSave = () => {
    if (!schema.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a schema name",
        variant: "destructive"
      });
      return;
    }

    if (schema.elements.length === 0) {
      toast({
        title: "No Elements",
        description: "Add at least one element to your schema",
        variant: "destructive"
      });
      return;
    }

    onSave(schema);
    toast({
      title: "Schema Saved",
      description: `Schema "${schema.name}" has been saved`
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="font-semibold text-xl">
          {existingSchema ? 'Edit Schema' : 'Create New Schema'}
        </h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="schemaName">Schema Name</Label>
            <Input 
              id="schemaName"
              value={schema.name}
              onChange={handleNameChange}
              placeholder="Enter schema name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="schemaCategory">Category</Label>
            <Input 
              id="schemaCategory"
              value={schema.category || ''}
              onChange={handleCategoryChange}
              placeholder="E.g., Form, Data Table, User Interface"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="schemaColor">Color</Label>
            <select 
              id="schemaColor"
              value={schema.color || '#6366F1'}
              onChange={handleColorChange}
              className="w-full mt-1 border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800"
            >
              {colorOptions.map(color => (
                <option key={color.value} value={color.value}>{color.name}</option>
              ))}
            </select>
            <div className="mt-2 flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border border-gray-300" 
                style={{backgroundColor: schema.color || '#6366F1'}}
              ></div>
              <span className="text-xs text-gray-500">Selected color</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="schemaDescription">Description (Optional)</Label>
            <Input 
              id="schemaDescription"
              value={schema.description || ''}
              onChange={handleDescriptionChange}
              placeholder="Brief description of this schema"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-2">Elements</h3>
          
          <div className="space-y-4">
            {schema.elements.map((element) => (
              <div 
                key={element.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Element {element.element_nr}</span>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveElement(element.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`elem-tag-${element.id}`}>HTML Tag</Label>
                    <Input 
                      id={`elem-tag-${element.id}`}
                      value={element.html_tag || ''}
                      onChange={(e) => handleElementChange(element.id, 'html_tag', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`elem-name-${element.id}`}>Name</Label>
                    <Input 
                      id={`elem-name-${element.id}`}
                      value={element.html_name || ''}
                      onChange={(e) => handleElementChange(element.id, 'html_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`elem-id-${element.id}`}>ID</Label>
                    <Input 
                      id={`elem-id-${element.id}`}
                      value={element.html_id || ''}
                      onChange={(e) => handleElementChange(element.id, 'html_id', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`elem-type-${element.id}`}>Type</Label>
                    <Input 
                      id={`elem-type-${element.id}`}
                      value={element.type || ''}
                      onChange={(e) => handleElementChange(element.id, 'type', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`elem-class-${element.id}`}>Class</Label>
                    <Input 
                      id={`elem-class-${element.id}`}
                      value={element.class || ''}
                      onChange={(e) => handleElementChange(element.id, 'class', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`elem-value-${element.id}`}>Value</Label>
                    <Input 
                      id={`elem-value-${element.id}`}
                      value={element.value || ''}
                      onChange={(e) => handleElementChange(element.id, 'value', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`elem-label-${element.id}`} className="flex items-center gap-1">
                      <Tag className="h-4 w-4" /> Label
                    </Label>
                    <Input 
                      id={`elem-label-${element.id}`}
                      value={element.label || ''}
                      onChange={(e) => handleElementChange(element.id, 'label', e.target.value)}
                      placeholder="Optional label"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`elem-label-color-${element.id}`}>Label Color</Label>
                    <select 
                      id={`elem-label-color-${element.id}`}
                      value={element.labelColor || '#6366F1'}
                      onChange={(e) => handleElementChange(element.id, 'labelColor', e.target.value)}
                      className="w-full mt-1 border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800"
                    >
                      {colorOptions.map(color => (
                        <option key={color.value} value={color.value}>{color.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-md p-3">
          <h3 className="font-medium mb-2">Add New Element</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="new-tag">HTML Tag</Label>
              <Input 
                id="new-tag"
                value={newElement.html_tag || ''}
                onChange={(e) => setNewElement({...newElement, html_tag: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="new-name">Name</Label>
              <Input 
                id="new-name"
                value={newElement.html_name || ''}
                onChange={(e) => setNewElement({...newElement, html_name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="new-id">ID</Label>
              <Input 
                id="new-id"
                value={newElement.html_id || ''}
                onChange={(e) => setNewElement({...newElement, html_id: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="new-type">Type</Label>
              <Input 
                id="new-type"
                value={newElement.type || ''}
                onChange={(e) => setNewElement({...newElement, type: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="new-class">Class</Label>
              <Input 
                id="new-class"
                value={newElement.class || ''}
                onChange={(e) => setNewElement({...newElement, class: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="new-value">Value</Label>
              <Input 
                id="new-value"
                value={newElement.value || ''}
                onChange={(e) => setNewElement({...newElement, value: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="new-label" className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> Label
              </Label>
              <Input 
                id="new-label"
                value={newElement.label || ''}
                onChange={(e) => setNewElement({...newElement, label: e.target.value})}
                placeholder="Optional label"
              />
            </div>
            <div>
              <Label htmlFor="new-label-color">Label Color</Label>
              <select 
                id="new-label-color"
                value={newElement.labelColor || '#6366F1'}
                onChange={(e) => setNewElement({...newElement, labelColor: e.target.value})}
                className="w-full mt-1 border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800"
              >
                {colorOptions.map(color => (
                  <option key={color.value} value={color.value}>{color.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <Button 
            className="mt-3 w-full" 
            variant="outline"
            onClick={handleAddElement}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Element
          </Button>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save Schema
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchemaForm;

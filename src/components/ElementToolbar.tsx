
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Schema, SchemaElement } from '@/types/schema';
import {
  Table,
  ListOrdered,
  Check,
  RadioButton,
  Tag,
  Type,
  TextSelection,
  Square,
  FileInput,
  AlignLeft
} from 'lucide-react';

interface ElementToolbarProps {
  schema: Schema;
  onAddElement: (element: Partial<SchemaElement>) => void;
}

const ElementToolbar = ({ schema, onAddElement }: ElementToolbarProps) => {
  const addElement = (type: string) => {
    const elementNr = (schema.elements.length + 1).toString();
    let element: Partial<SchemaElement> = {
      html_tag: 'input',
      type: 'text',
      element_nr: elementNr,
      schema_id: schema.id,
      html_name: `element${elementNr}`,
      html_id: `element${elementNr}`,
      class: 'form-control',
    };

    switch (type) {
      case 'text':
        element = {
          ...element,
          type: 'text',
          value: 'Text input',
          label: 'Text field',
          labelColor: '#6366F1',
        };
        break;
      case 'textarea':
        element = {
          ...element,
          html_tag: 'textarea',
          value: 'Textarea content',
          label: 'Text area',
          labelColor: '#10B981',
        };
        break;
      case 'checkbox':
        element = {
          ...element,
          type: 'checkbox',
          value: 'checkbox value',
          label: 'Checkbox',
          labelColor: '#F59E0B',
        };
        break;
      case 'radio':
        element = {
          ...element,
          type: 'radio',
          value: 'radio value',
          label: 'Radio button',
          labelColor: '#8B5CF6',
        };
        break;
      case 'select':
        element = {
          ...element,
          html_tag: 'select',
          value: 'Select option',
          label: 'Dropdown',
          labelColor: '#EF4444',
        };
        break;
      case 'button':
        element = {
          ...element,
          html_tag: 'button',
          type: 'button',
          value: 'Button',
          class: 'btn btn-primary',
          label: 'Button',
          labelColor: '#4F46E5',
        };
        break;
      case 'heading':
        element = {
          ...element,
          html_tag: 'h2',
          value: 'Heading',
          label: 'Heading',
          labelColor: '#EC4899',
        };
        break;
      case 'paragraph':
        element = {
          ...element,
          html_tag: 'p',
          value: 'Paragraph text goes here',
          label: 'Paragraph',
          labelColor: '#14B8A6',
        };
        break;
      case 'label':
        element = {
          ...element,
          html_tag: 'label',
          value: 'Label text',
          label: 'Label',
          labelColor: '#6366F1',
        };
        break;
      case 'file':
        element = {
          ...element,
          type: 'file',
          label: 'File input',
          labelColor: '#10B981',
        };
        break;
    }

    onAddElement(element);
  };

  const tools = [
    { icon: Type, name: 'Text Input', type: 'text', description: 'Add a text input field' },
    { icon: AlignLeft, name: 'Textarea', type: 'textarea', description: 'Add a multi-line text area' },
    { icon: Check, name: 'Checkbox', type: 'checkbox', description: 'Add a checkbox' },
    { icon: RadioButton, name: 'Radio', type: 'radio', description: 'Add a radio button' },
    { icon: Square, name: 'Select', type: 'select', description: 'Add a dropdown select' },
    { icon: TextSelection, name: 'Button', type: 'button', description: 'Add a button' },
    { icon: Table, name: 'Heading', type: 'heading', description: 'Add a heading' },
    { icon: ListOrdered, name: 'Paragraph', type: 'paragraph', description: 'Add a paragraph' },
    { icon: Tag, name: 'Label', type: 'label', description: 'Add a label' },
    { icon: FileInput, name: 'File Input', type: 'file', description: 'Add a file input' },
  ];

  return (
    <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm mb-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {tools.map((tool) => (
          <Tooltip key={tool.type}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10"
                onClick={() => addElement(tool.type)}
              >
                <tool.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{tool.name} - {tool.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ElementToolbar;

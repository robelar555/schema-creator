
import React from 'react';
import { Schema, SchemaElement } from '@/types/schema';
import { Tag } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SchemaPreviewProps {
  schema: Schema;
  isInteractive?: boolean;
}

const SchemaPreview = ({ schema, isInteractive = false }: SchemaPreviewProps) => {
  const renderElement = (element: SchemaElement) => {
    const { html_tag, html_id, html_name, type, value, class: className } = element;
    
    const commonProps: any = {
      id: html_id,
      name: html_name,
      className: className,
      style: {
        padding: element.padding ? `${element.padding.top || 0} ${element.padding.right || 0} ${element.padding.bottom || 0} ${element.padding.left || 0}` : undefined,
        margin: element.margin ? `${element.margin.top || 0} ${element.margin.right || 0} ${element.margin.bottom || 0} ${element.margin.left || 0}` : undefined,
      },
    };

    // For input elements
    if (html_tag === 'input') {
      // Special handling for checkbox and radio
      if (type === 'checkbox') {
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={html_id} disabled={!isInteractive} />
            <Label htmlFor={html_id}>{value || 'Checkbox'}</Label>
          </div>
        );
      }
      
      if (type === 'radio') {
        return (
          <RadioGroup disabled={!isInteractive} defaultValue={value}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={value || 'option'} id={html_id} />
              <Label htmlFor={html_id}>{value || 'Radio Option'}</Label>
            </div>
          </RadioGroup>
        );
      }
      
      return (
        <input 
          {...commonProps}
          type={type || 'text'} 
          value={value || ''} 
          placeholder={value || ''} 
          readOnly={!isInteractive}
          maxLength={element.maxlength}
          size={element.size}
          pattern={element.pattern}
          className={`border border-gray-300 rounded px-3 py-2 ${className || ''}`}
        />
      );
    }

    // For button elements
    if (html_tag === 'button' || type === 'submit') {
      return (
        <button 
          {...commonProps}
          type={type as 'button' | 'submit' | 'reset' || 'button'} 
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className || ''}`}
          disabled={!isInteractive}
        >
          {value || 'Button'}
        </button>
      );
    }

    // For select elements
    if (html_tag === 'select') {
      return (
        <select 
          {...commonProps}
          className={`border border-gray-300 rounded px-3 py-2 ${className || ''}`}
          disabled={!isInteractive}
        >
          <option>{value || 'Select an option'}</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      );
    }

    // For textarea elements
    if (html_tag === 'textarea') {
      return (
        <textarea 
          {...commonProps}
          placeholder={value || ''} 
          className={`border border-gray-300 rounded px-3 py-2 ${className || ''}`}
          rows={5}
          readOnly={!isInteractive}
        >
          {value || ''}
        </textarea>
      );
    }

    // For label elements
    if (html_tag === 'label') {
      return (
        <label {...commonProps}>
          {value || 'Label'}
        </label>
      );
    }

    // For heading elements
    if (html_tag?.match(/^h[1-6]$/)) {
      const Tag = html_tag as keyof JSX.IntrinsicElements;
      return <Tag {...commonProps}>{value || 'Heading'}</Tag>;
    }

    // For paragraph elements
    if (html_tag === 'p') {
      return <p {...commonProps}>{value || 'Paragraph'}</p>;
    }

    // Default to div for any other elements
    return (
      <div {...commonProps}>
        {value || `Element ${element.element_nr}`}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-8 shadow-inner">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800">Preview: {schema.name}</h2>
          {schema.category && (
            <span 
              className="px-2 py-0.5 text-xs font-medium rounded-full text-white" 
              style={{ backgroundColor: schema.color || '#6366F1' }}
            >
              {schema.category}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {schema.description || 'This is how your schema would look when implemented'}
        </p>
      </div>
      
      <div className="space-y-4">
        {schema.elements.map((element) => (
          <div key={element.id} className="py-2 relative">
            {renderElement(element)}
            {element.label && (
              <div 
                className="absolute -top-3 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm"
                style={{ backgroundColor: element.labelColor || '#6366F1', color: 'white' }}
              >
                <Tag className="h-3 w-3" />
                {element.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemaPreview;


import React from 'react';
import { Schema, SchemaElement } from '@/types/schema';

interface SchemaPreviewProps {
  schema: Schema;
}

const SchemaPreview = ({ schema }: SchemaPreviewProps) => {
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
      return (
        <input 
          {...commonProps}
          type={type || 'text'} 
          value={value || ''} 
          placeholder={value || ''} 
          readOnly
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
        <h2 className="text-xl font-bold text-gray-800">Preview: {schema.name}</h2>
        <p className="text-sm text-gray-500">This is how your schema would look when implemented</p>
      </div>
      
      <div className="space-y-4">
        {schema.elements.map((element) => (
          <div key={element.id} className="py-2">
            {renderElement(element)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemaPreview;

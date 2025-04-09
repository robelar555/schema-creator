
import React from 'react';
import { SchemaElement } from '@/types/schema';
import { FileCode, Tag, Type, Hash, Layers } from 'lucide-react';

interface SchemaElementCardProps {
  element: SchemaElement;
}

const SchemaElementCard = ({ element }: SchemaElementCardProps) => {
  const getBadgeColor = (type?: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'password': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'email': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'submit': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 w-7 h-7 rounded-full text-sm font-medium">
              {element.element_nr}
            </span>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {element.html_name || element.html_id || `Element ${element.element_nr}`}
            </h3>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(element.type)}`}>
            {element.type || 'Element'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
          {element.html_tag && (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{element.html_tag}</span>
            </div>
          )}
          
          {element.html_id && (
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{element.html_id}</span>
            </div>
          )}
          
          {element.class && (
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{element.class}</span>
            </div>
          )}
          
          {element.value && (
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{element.value}</span>
            </div>
          )}
        </div>

        {(element.padding || element.margin) && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 font-medium mb-1">STYLING</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
              {element.padding?.top && <div>Padding Top: {element.padding.top}</div>}
              {element.padding?.right && <div>Padding Right: {element.padding.right}</div>}
              {element.padding?.bottom && <div>Padding Bottom: {element.padding.bottom}</div>}
              {element.padding?.left && <div>Padding Left: {element.padding.left}</div>}
              {element.margin?.top && <div>Margin Top: {element.margin.top}</div>}
              {element.margin?.right && <div>Margin Right: {element.margin.right}</div>}
              {element.margin?.bottom && <div>Margin Bottom: {element.margin.bottom}</div>}
              {element.margin?.left && <div>Margin Left: {element.margin.left}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaElementCard;

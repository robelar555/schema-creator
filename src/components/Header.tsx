
import React from 'react';
import { Database, LayoutTemplate, HelpCircle, Tag, Eye } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface HeaderProps {
  title: string;
  onNewSchema?: () => void;
}

const Header = ({ title, onNewSchema }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-blue-100">Easy Schema Builder with Labels & Interactive Preview</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-all px-3 py-2 rounded-md"
                onClick={onNewSchema}
              >
                <LayoutTemplate className="h-5 w-5 mr-2" />
                <span>Create New</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Click here to create a new schema</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-all px-3 py-2 rounded-md">
                <HelpCircle className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p>Welcome to Schema Explorer! This tool helps you view, create, and preview schemas.</p>
              <ul className="mt-2 list-disc pl-4 text-xs">
                <li>Click "Create New" to make a new schema</li>
                <li>Select a schema from the list to view it</li>
                <li>Add color labels to elements for better organization</li>
                <li>Click "Interactive Preview" to add elements with a toolbar</li>
                <li>Use the buttons below the list to manage schemas</li>
                <li>Click "View Picture" to see a visual representation</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;

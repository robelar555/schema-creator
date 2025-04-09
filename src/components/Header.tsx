
import React from 'react';
import { Database, LayoutTemplate } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-blue-100">Schema Designer</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-all px-3 py-2 rounded-md">
            <LayoutTemplate className="h-5 w-5 mr-2" />
            <span>New Schema</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Code, Database } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} SDS Data Extractor
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Chemical Data Processing Tool
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400">
              <Code className="h-4 w-4 mr-2" />
              <span className="text-sm">Built with React</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Database className="h-4 w-4 mr-2" />
              <span className="text-sm">Flask Backend</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
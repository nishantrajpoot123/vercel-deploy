import React from 'react';
import { FlaskConical } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FlaskConical className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">SDS Data Extractor</h1>
              <p className="text-primary-100 text-sm">Chemical Data Processing Tool</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="bg-primary-700 bg-opacity-50 py-1 px-3 rounded-full text-sm flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              API Connected
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
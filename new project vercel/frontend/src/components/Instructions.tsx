import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, Database, AlertTriangle } from 'lucide-react';

const Instructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl mb-8 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
      >
        <div className="flex items-center">
          <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">How It Works</h2>
        </div>
        
        <div className="text-blue-600">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 border-t border-blue-200 animate-fadeIn">
          <div className="text-gray-700 space-y-4">
            <p>
              This tool helps you extract chemical data from Safety Data Sheet (SDS) PDFs and append it to your existing Excel spreadsheet.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">Step 1: Upload Files</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Upload your SDS PDF files and select your existing Excel file. You can drag and drop multiple PDFs at once!
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <Database className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">Step 2: Processing</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Our system extracts chemical data (CAS Numbers, Flash Points, Density, etc.) from each PDF.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">Step 3: Download</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Download your updated Excel file with the newly extracted chemical data.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mt-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Note</h4>
                  <p className="text-sm text-yellow-700">
                    The data extraction process uses pattern matching and may not capture all information 
                    perfectly. Always verify the extracted data for critical applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
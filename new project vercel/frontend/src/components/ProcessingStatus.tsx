import React from 'react';

const ProcessingStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-pulse">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        
        <h3 className="text-xl font-medium text-gray-800 mb-2">Processing Your Files</h3>
        <p className="text-gray-600 text-center max-w-md">
          We're extracting chemical data from your SDS PDFs and updating your Excel file.
          This may take a few moments depending on the number of files.
        </p>
        
        <div className="mt-6 w-full max-w-md">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-100">
              <div className="animate-progress w-full h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;
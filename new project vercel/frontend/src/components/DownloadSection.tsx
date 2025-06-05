import React from 'react';
import { Download, CheckCircle, RefreshCcw } from 'lucide-react';

interface DownloadSectionProps {
  filename: string;
  sessionId: string;
  message: string;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ filename, sessionId, message }) => {
  const downloadUrl = `/api/download/${sessionId}/${filename}`;
  
  const handleDownload = () => {
    window.location.href = downloadUrl;
  };
  
  const handleReset = () => {
    window.location.reload();
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Processing Complete!</h2>
        
        <p className="text-gray-600 mb-6 max-w-lg">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={handleDownload}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Excel
          </button>
          
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Process More Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
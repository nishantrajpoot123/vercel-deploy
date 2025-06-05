import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ProcessingStatus from './components/ProcessingStatus';
import DownloadSection from './components/DownloadSection';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResults, setProcessingResults] = useState<{
    success: boolean;
    message: string;
    outputFile?: string;
    sessionId?: string;
    error?: string;
  } | null>(null);

  const handleProcessingComplete = (results: {
    success: boolean;
    message: string;
    outputFile?: string;
    sessionId?: string;
    error?: string;
  }) => {
    setProcessingResults(results);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Instructions />
          
          {!processingResults?.success && (
            <FileUpload 
              onProcessingStart={() => setIsProcessing(true)}
              onProcessingComplete={handleProcessingComplete}
            />
          )}
          
          {isProcessing && <ProcessingStatus />}
          
          {processingResults?.success && processingResults.outputFile && (
            <DownloadSection 
              filename={processingResults.outputFile}
              sessionId={processingResults.sessionId || ''}
              message={processingResults.message}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
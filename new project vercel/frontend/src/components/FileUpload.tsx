import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, FileText } from 'lucide-react';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';


interface FileUploadProps {
  onProcessingStart: () => void;
  onProcessingComplete: (results: {
    success: boolean;
    message: string;
    outputFile?: string;
    sessionId?: string;
    error?: string;
  }) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onProcessingStart, onProcessingComplete }) => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDropPdf = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    if (validFiles.length > 0) {
      setPdfFiles(prev => [...prev, ...validFiles]);
      setError(null);
    } else {
      setError('Please upload valid PDF files');
    }
  }, []);

  const onDropExcel = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.name.endsWith('.xlsx')) {
      setExcelFile(file);
      setError(null);
    } else {
      setError('Please upload a valid Excel file (.xlsx)');
    }
  }, []);

  const removePdfFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
  };

  const pdfDropzone = useDropzone({
    onDrop: onDropPdf,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  const excelDropzone = useDropzone({
    onDrop: onDropExcel,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pdfFiles.length === 0 || !excelFile) {
      setError('Please upload both PDF files and an Excel file');
      return;
    }
    
    setError(null);
    onProcessingStart();
    
    const formData = new FormData();
    pdfFiles.forEach(file => {
      formData.append('pdfFiles', file);
    });
    formData.append('excelFile', excelFile);
    
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: import('axios').AxiosProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded ? progressEvent.loaded * 100 : 0) / (progressEvent.total || 100)
          );
          setUploadProgress(percentCompleted);
        },
      };

      const response = await axios.post('/api/upload', formData, config);
      
      const data = response.data as {
        message: string;
        outputFile?: string;
        sessionId?: string;
      };

      onProcessingComplete({
        success: true,
        message: data.message,
        outputFile: data.outputFile,
        sessionId: data.sessionId,
      });
    } catch (err) {
      let errorMessage = 'An error occurred during processing';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error || errorMessage;
      }

      setError(errorMessage);
      onProcessingComplete({
        success: false,
        message: 'Processing failed',
        error: errorMessage,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Files</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* PDF Files Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SDS PDF Files
            </label>
            <div 
              {...pdfDropzone.getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                pdfDropzone.isDragActive 
                  ? 'border-primary-500 bg-primary-50' 
                  : pdfFiles.length > 0 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
              }`}
            >
              <input {...pdfDropzone.getInputProps()} />
              
              <div className="flex flex-col items-center">
                <FileText className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {pdfDropzone.isDragActive
                    ? "Drop the PDF files here"
                    : "Drag & drop or click to select PDFs"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You can select multiple PDF files
                </p>
              </div>
            </div>
            
            {/* PDF Files List */}
            {pdfFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {pdfFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-primary-500 mr-2" />
                      <span className="text-sm text-gray-600">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePdfFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Excel File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excel Spreadsheet (.xlsx)
            </label>
            <div 
              {...excelDropzone.getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                excelDropzone.isDragActive 
                  ? 'border-primary-500 bg-primary-50' 
                  : excelFile 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
              }`}
            >
              <input {...excelDropzone.getInputProps()} />
              
              <div className="flex flex-col items-center">
                {excelFile ? (
                  <>
                    <FileSpreadsheet className="h-10 w-10 text-primary-500 mb-2" />
                    <p className="text-sm font-medium text-gray-900">{excelFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(excelFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      {excelDropzone.isDragActive
                        ? "Drop the Excel file here"
                        : "Drag & drop or click to select"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Existing Excel file to update
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {(pdfFiles.length > 0 || excelFile) && uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}>
            </div>
          </div>
        )}

        
        <button
          type="submit"
          disabled={pdfFiles.length === 0 || !excelFile}
          className={`w-full py-3 px-4 flex items-center justify-center text-white rounded-md transition-colors duration-200 ${
            pdfFiles.length === 0 || !excelFile
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          <Upload className="mr-2 h-5 w-5" />
          Process Files
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
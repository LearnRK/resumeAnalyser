'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react'
import { AnalysisData } from '@/types'

interface ResumeUploadProps {
  onAnalysisComplete: (data: AnalysisData) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function ResumeUpload({ onAnalysisComplete, isLoading, setIsLoading }: ResumeUploadProps) {
  const [error, setError] = useState<string>('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success && result.data) {
        onAnalysisComplete(result.data)
      } else {
        setError(result.error || 'Failed to analyze resume')
      }
    } catch (err) {
      setError('An error occurred while analyzing your resume')
      console.error('Upload error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [onAnalysisComplete, setIsLoading])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isLoading
  })

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">Get instant AI-powered feedback and suggestions</p>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-700">Analyzing your resume...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {isDragActive ? (
              <Upload className="w-12 h-12 text-primary-600 mb-4" />
            ) : (
              <FileText className="w-12 h-12 text-gray-400 mb-4" />
            )}
            
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
            </p>
            
            <p className="text-gray-500 mb-4">or click to browse files</p>
            
            <div className="text-sm text-gray-400">
              <p>Supports PDF files up to 5MB</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Your resume will be analyzed using AI to provide personalized feedback and suggestions.
        </p>
      </div>
    </div>
  )
} 
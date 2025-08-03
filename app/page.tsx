'use client'

import { useState } from 'react'
import { Upload, FileText, Star, TrendingUp, MessageSquare } from 'lucide-react'
import ResumeUpload from '@/components/ResumeUpload'
import AnalysisResults from '@/components/AnalysisResults'
import { AnalysisData } from '@/types'

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Smart Resume Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your resume and get AI-powered feedback, scores, and personalized suggestions to improve your job prospects.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <Upload className="w-12 h-12 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Easy Upload</h3>
          <p className="text-gray-600">Simply drag and drop your PDF resume or click to browse</p>
        </div>
        
        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <Star className="w-12 h-12 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
          <p className="text-gray-600">Get detailed feedback and scoring from advanced AI</p>
        </div>
        
        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <TrendingUp className="w-12 h-12 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Smart Suggestions</h3>
          <p className="text-gray-600">Receive actionable tips to enhance your resume</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {!analysisData ? (
          <ResumeUpload 
            onAnalysisComplete={setAnalysisData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <AnalysisResults 
            data={analysisData}
            onReset={() => setAnalysisData(null)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500">
        <p>Powered by Google Gemini • Built with Next.js & Tailwind CSS</p>
      </div>
    </div>
  )
} 
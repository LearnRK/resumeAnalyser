'use client'

import { Star, CheckCircle, AlertCircle, ArrowLeft, TrendingUp, MessageSquare } from 'lucide-react'
import { AnalysisData } from '@/types'

interface AnalysisResultsProps {
  data: AnalysisData
  onReset: () => void
}

export default function AnalysisResults({ data, onReset }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const renderStars = (score: number) => {
    const filledStars = Math.floor(score / 20)
    const stars = []
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i < filledStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      )
    }
    
    return stars
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Analyze Another Resume
        </button>
      </div>

      {/* Overall Score */}
      <div className="card text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Resume Score</h2>
        <div className="flex justify-center items-center mb-4">
          <div className={`text-6xl font-bold ${getScoreColor(data.overallScore)}`}>
            {data.overallScore}
          </div>
          <span className="text-2xl text-gray-400 ml-2">/100</span>
        </div>
        <div className="flex justify-center mb-4">
          {renderStars(data.overallScore)}
        </div>
        <p className="text-gray-600">
          {data.overallScore >= 80 ? 'Excellent!' : 
           data.overallScore >= 60 ? 'Good, but room for improvement' : 
           'Needs significant improvement'}
        </p>
      </div>

      {/* Section Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Contact Information
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Score:</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(data.sections.contact.score)} ${getScoreColor(data.sections.contact.score)}`}>
              {data.sections.contact.score}/100
            </div>
          </div>
          <p className="text-sm text-gray-700">{data.sections.contact.feedback}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
            Professional Summary
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Score:</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(data.sections.summary.score)} ${getScoreColor(data.sections.summary.score)}`}>
              {data.sections.summary.score}/100
            </div>
          </div>
          <p className="text-sm text-gray-700">{data.sections.summary.feedback}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
            Work Experience
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Score:</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(data.sections.experience.score)} ${getScoreColor(data.sections.experience.score)}`}>
              {data.sections.experience.score}/100
            </div>
          </div>
          <p className="text-sm text-gray-700">{data.sections.experience.feedback}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-600 mr-2" />
            Education
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Score:</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(data.sections.education.score)} ${getScoreColor(data.sections.education.score)}`}>
              {data.sections.education.score}/100
            </div>
          </div>
          <p className="text-sm text-gray-700">{data.sections.education.feedback}</p>
        </div>

        <div className="card md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-indigo-600 mr-2" />
            Skills
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Score:</span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBg(data.sections.skills.score)} ${getScoreColor(data.sections.skills.score)}`}>
              {data.sections.skills.score}/100
            </div>
          </div>
          <p className="text-sm text-gray-700">{data.sections.skills.feedback}</p>
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {data.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-orange-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {data.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
          <TrendingUp className="w-5 h-5 mr-2" />
          Actionable Suggestions
        </h3>
        <div className="space-y-3">
          {data.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
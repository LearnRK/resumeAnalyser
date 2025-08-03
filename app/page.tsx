'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, Star, TrendingUp, MessageSquare, Sparkles, Award, Target } from 'lucide-react'
import ResumeUpload from '@/components/ResumeUpload'
import AnalysisResults from '@/components/AnalysisResults'
import { AnalysisData } from '@/types'

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Upload,
      title: "Smart Upload",
      description: "Drag & drop or click to upload your PDF resume with instant validation",
      gradient: "from-blue-500 to-cyan-500",
      delay: "stagger-1"
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Advanced AI powered by Google Gemini analyzes every section of your resume",
      gradient: "from-purple-500 to-pink-500", 
      delay: "stagger-2"
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "Get actionable feedback with detailed scores and personalized suggestions",
      gradient: "from-emerald-500 to-teal-500",
      delay: "stagger-3"
    }
  ]

  const stats = [
    { icon: Award, value: "95%", label: "Accuracy Rate", delay: "stagger-1" },
    { icon: Target, value: "10K+", label: "Resumes Analyzed", delay: "stagger-2" },
    { icon: Star, value: "4.9/5", label: "User Rating", delay: "stagger-3" },
  ]

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card py-3 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">ResumeAI</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">How it Works</a>
                <a 
                  href="https://rakshitsingh.dev" 
                  className="btn-primary"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm font-medium mb-4 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Google Gemini AI
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="block text-gray-900 mb-2">Smart Resume</span>
            <span className="block text-gradient">Analyzer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Upload your resume and get instant AI-powered feedback, detailed scores, and personalized suggestions to land your dream job.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-12 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center animate-fade-in-up ${stat.delay}`}>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-primary-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Why Choose Our AI Analyzer?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Advanced features designed to give you the competitive edge in your job search
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`card-interactive group animate-fade-in-up ${feature.delay}`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Upload/Results Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
        </div>

        {/* How it Works */}
        <div id="how-it-works" className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get professional resume feedback in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload", description: "Upload your PDF resume securely" },
              { step: "02", title: "Analyze", description: "AI analyzes content, structure & formatting" },
              { step: "03", title: "Improve", description: "Get detailed feedback & actionable tips" }
            ].map((item, index) => (
              <div key={index} className={`text-center animate-fade-in-up stagger-${index + 1}`}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-gray-200/50">
          <div className="glass-card inline-block py-6 px-8">
            <p className="text-gray-600 mb-4">
              Powered by <span className="font-semibold text-gradient">Google Gemini AI</span> • 
              Built with <span className="font-semibold">Next.js</span> & <span className="font-semibold">Tailwind CSS</span>
            </p>
            <p className="text-sm text-gray-500">
              © 2024 ResumeAI. Crafted with ❤️ for job seekers worldwide.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
} 
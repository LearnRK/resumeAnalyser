import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Resume Analyzer - AI-Powered Resume Feedback',
  description: 'Upload your resume and get AI-powered feedback, scores, and personalized suggestions to improve your job prospects',
  keywords: 'resume analyzer, AI feedback, job search, career development, resume optimization',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Smart Resume Analyzer',
    description: 'Get AI-powered feedback on your resume',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen relative overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
            
            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 bg-mesh opacity-60" />
            
            {/* Floating orbs */}
            <div className="floating-orb floating-orb-1" />
            <div className="floating-orb floating-orb-2" />
            <div className="floating-orb floating-orb-3" />
            
            {/* Animated gradient shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-primary-200/40 to-transparent rounded-full blur-3xl animate-pulse-gentle" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-secondary-200/40 to-transparent rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-accent-200/40 to-transparent rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '2s' }} />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Noise texture overlay for premium feel */}
          <div 
            className="fixed inset-0 opacity-[0.015] pointer-events-none z-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        </div>
      </body>
    </html>
  )
} 
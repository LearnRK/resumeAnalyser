export interface AnalysisData {
  overallScore: number
  sections: {
    contact: { score: number; feedback: string }
    summary: { score: number; feedback: string }
    experience: { score: number; feedback: string }
    education: { score: number; feedback: string }
    skills: { score: number; feedback: string }
  }
  suggestions: string[]
  strengths: string[]
  improvements: string[]
  extractedText: string
}

export interface UploadResponse {
  success: boolean
  data?: AnalysisData
  error?: string
} 
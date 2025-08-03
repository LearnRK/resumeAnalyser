import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { AnalysisData } from '@/types'

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('resume') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are supported' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extract text from PDF
    const pdfData = await pdf(buffer)
    const extractedText = pdfData.text

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Could not extract text from PDF' },
        { status: 400 }
      )
    }

    // Analyze with OpenAI
    const analysis = await analyzeResumeWithAI(extractedText)

    return NextResponse.json({
      success: true,
      data: analysis
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}

async function analyzeResumeWithAI(resumeText: string): Promise<AnalysisData> {
  const prompt = `
Analyze the following resume and provide detailed feedback. Return your response as a JSON object with the following structure:

{
  "overallScore": number (0-100),
  "sections": {
    "contact": { "score": number (0-100), "feedback": "string" },
    "summary": { "score": number (0-100), "feedback": "string" },
    "experience": { "score": number (0-100), "feedback": "string" },
    "education": { "score": number (0-100), "feedback": "string" },
    "skills": { "score": number (0-100), "feedback": "string" }
  },
  "strengths": ["string array"],
  "improvements": ["string array"],
  "suggestions": ["string array"]
}

Guidelines for scoring:
- Contact: Check for complete contact info (name, email, phone, location)
- Summary: Evaluate clarity, impact, and professional tone
- Experience: Assess job descriptions, achievements, and relevance
- Education: Check for degrees, institutions, and dates
- Skills: Evaluate technical skills, soft skills, and relevance

Provide 3-5 items for strengths, improvements, and suggestions each.

Resume text:
${resumeText.substring(0, 4000)} // Limit to first 4000 characters
`

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  
  const result = await model.generateContent([
    "You are a professional resume analyst. Provide detailed, constructive feedback in JSON format.",
    prompt
  ])

  const response = result.response.text()

  if (!response) {
    throw new Error('No response from Gemini')
  }

  try {
    // Extract JSON from response (in case there's extra text)
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid JSON response')
    }

    const analysis = JSON.parse(jsonMatch[0]) as AnalysisData

    // Validate and ensure all required fields exist
    return {
      overallScore: analysis.overallScore || 0,
      sections: {
        contact: analysis.sections?.contact || { score: 0, feedback: 'No contact information found' },
        summary: analysis.sections?.summary || { score: 0, feedback: 'No summary found' },
        experience: analysis.sections?.experience || { score: 0, feedback: 'No experience found' },
        education: analysis.sections?.education || { score: 0, feedback: 'No education found' },
        skills: analysis.sections?.skills || { score: 0, feedback: 'No skills found' },
      },
      strengths: analysis.strengths || ['No strengths identified'],
      improvements: analysis.improvements || ['No improvements identified'],
      suggestions: analysis.suggestions || ['No suggestions provided'],
      extractedText: resumeText.substring(0, 1000), // Store first 1000 chars for reference
    }
  } catch (parseError) {
    console.error('JSON parse error:', parseError)
    console.error('Raw response:', response)
    
    // Return a fallback analysis
    return {
      overallScore: 50,
      sections: {
        contact: { score: 50, feedback: 'Unable to analyze contact information' },
        summary: { score: 50, feedback: 'Unable to analyze summary' },
        experience: { score: 50, feedback: 'Unable to analyze experience' },
        education: { score: 50, feedback: 'Unable to analyze education' },
        skills: { score: 50, feedback: 'Unable to analyze skills' },
      },
      strengths: ['Resume uploaded successfully'],
      improvements: ['AI analysis encountered an error'],
      suggestions: ['Please try uploading again or contact support'],
      extractedText: resumeText.substring(0, 1000),
    }
  }
} 
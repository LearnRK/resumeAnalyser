# Smart Resume Analyzer

A modern web application that uses AI to analyze resumes and provide detailed feedback, scores, and suggestions for improvement.

## ✨ Features

- **PDF Upload**: Drag and drop or click to upload PDF resumes
- **AI Analysis**: Powered by OpenAI GPT-3.5-turbo for intelligent feedback
- **Comprehensive Scoring**: Individual scores for different resume sections
- **Detailed Feedback**: Specific feedback for each section (Contact, Summary, Experience, Education, Skills)
- **Actionable Suggestions**: Practical tips to improve your resume
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **No Database Required**: Simple file processing with immediate results

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd smart-resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **File Upload**: react-dropzone
- **PDF Processing**: pdf-parse
- **AI**: Google Gemini 1.5 Flash
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📊 Analysis Features

### Section Scoring
- **Contact Information**: Evaluates completeness of contact details
- **Professional Summary**: Assesses clarity and impact
- **Work Experience**: Reviews job descriptions and achievements
- **Education**: Checks degree information and institutions
- **Skills**: Evaluates technical and soft skills relevance

### Feedback Categories
- **Overall Score**: 0-100 rating with star visualization
- **Strengths**: What's working well in your resume
- **Areas for Improvement**: Specific issues to address
- **Actionable Suggestions**: Step-by-step improvement tips

## 💰 Cost Analysis

### Google Gemini API Costs
- **Model**: Gemini 1.5 Flash
- **Cost**: FREE tier available
- **Free Tier**: 15 requests per minute, 1500 requests per day
- **Typical Analysis**: ~1 request per resume
- **Cost per Analysis**: FREE within limits

### Free Tier Limits
- Google Gemini offers generous free tier
- This allows ~1500 resume analyses per day for free

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variable: `GEMINI_API_KEY`
   - Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### File Upload Limits

- **File Type**: PDF only
- **File Size**: Maximum 5MB
- **Text Limit**: First 4000 characters analyzed

## 📁 Project Structure

```
smart-resume-analyzer/
├── app/
│   ├── api/analyze/route.ts    # API endpoint for resume analysis
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page component
├── components/
│   ├── ResumeUpload.tsx        # File upload component
│   └── AnalysisResults.tsx     # Results display component
├── types/
│   └── index.ts                # TypeScript type definitions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google for providing the Gemini API
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Lucide for the beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/smart-resume-analyzer/issues) page
2. Create a new issue with detailed information
3. Include your resume format and any error messages

---

**Built with ❤️ using Next.js, Google Gemini, and Tailwind CSS** 
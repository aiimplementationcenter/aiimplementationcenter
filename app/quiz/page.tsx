import QuizWrapper from '@/components/quiz/QuizWrapper'

export const metadata = {
  title: 'AI Readiness Quiz — Get Your Free Personalized Report',
  description: 'Answer 4 quick questions about your business and get a personalized AI readiness report in minutes.',
}

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <QuizWrapper />
    </div>
  )
}

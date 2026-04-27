import { CalendarDays, CheckCircle } from 'lucide-react'

const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME ?? ''

export const metadata = {
  title: 'Book a Free Strategy Call',
  description: 'Schedule your free 30-minute AI strategy call. No pitch — just a clear roadmap for your business.',
}

export default function BookPage() {
  const calUrl = calUsername
    ? `https://cal.com/${calUsername}`
    : null

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CalendarDays size={40} className="text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Book a Free Strategy Call</h1>
          <p className="text-slate-300 text-xl max-w-xl mx-auto">
            Let&apos;s walk through your AI roadmap together. 30 minutes. No pressure. Just clarity.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* What to expect */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-slate-900 mb-5">What to expect</h2>
            <ul className="space-y-4">
              {[
                'We&apos;ll review your AI Readiness Report together',
                'Identify the highest-value starting point for your business',
                'Give you a clear, no-fluff action plan',
                'Answer any questions about the Command Center',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-blue-800 text-sm font-medium">
                📅 30 minutes · Free · No sales pressure
              </p>
              <p className="text-blue-600 text-xs mt-1">
                Haven&apos;t taken the quiz yet? <a href="/quiz" className="underline font-semibold">Get your free report first →</a>
              </p>
            </div>
          </div>

          {/* Cal.com embed or placeholder */}
          <div className="md:col-span-2">
            {calUrl ? (
              <iframe
                src={calUrl}
                className="w-full rounded-2xl border border-slate-200 shadow-sm"
                style={{ height: '600px' }}
                frameBorder="0"
              />
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <CalendarDays size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">Calendar Coming Soon</h3>
                <p className="text-slate-500 mb-6">
                  To enable booking, add your Cal.com username to your environment variables.
                </p>
                <code className="text-sm bg-slate-100 px-3 py-2 rounded-lg text-slate-600">
                  NEXT_PUBLIC_CAL_USERNAME=your_username
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

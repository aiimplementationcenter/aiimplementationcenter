import Link from 'next/link'
import { ArrowRight, Bot, BarChart3, Zap, CheckCircle, Clock, TrendingUp, Users } from 'lucide-react'

const PREVIEW_USE_CASES = [
  {
    icon: <Clock className="text-blue-500" size={24} />,
    industry: 'Professional Services',
    title: 'Proposal Generation',
    description: 'AI drafts client proposals from a few inputs in minutes — what used to take 3 hours takes 10 minutes.',
    roi: 'Saves 5 hrs/week',
  },
  {
    icon: <TrendingUp className="text-emerald-500" size={24} />,
    industry: 'Retail',
    title: 'AI Customer Follow-Up',
    description: 'Automated, personalized follow-up messages sent at the perfect time — zero manual effort.',
    roi: '30% higher retention',
  },
  {
    icon: <Bot className="text-purple-500" size={24} />,
    industry: 'All Industries',
    title: 'AI Customer Support',
    description: 'An AI assistant handles 60% of common questions 24/7, so your team focuses on what matters.',
    roi: 'Saves 8 hrs/week',
  },
  {
    icon: <BarChart3 className="text-orange-500" size={24} />,
    industry: 'Finance',
    title: 'Financial Reporting',
    description: 'Auto-generate P&L summaries and cash flow forecasts from your data in plain English.',
    roi: 'Real-time clarity',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Take the 5-Minute Quiz',
    description: 'Tell us about your business, your current AI knowledge, and what challenges keep you up at night.',
  },
  {
    step: '02',
    title: 'Get Your Personalized Report',
    description: 'Our AI analyzes your website and industry to build a report with use cases specific to your business.',
  },
  {
    step: '03',
    title: 'See Your AI Roadmap',
    description: 'Walk away with a clear 90-day plan and an understanding of what AI can realistically do for you.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Zap size={14} />
              Free AI Readiness Report — No credit card required
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Find out exactly how AI can{' '}
              <span className="text-blue-400">transform your business</span>
              {' '}— in 5 minutes
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-10 max-w-2xl">
              Answer a few questions about your business and get a personalized AI readiness report
              with real use cases, estimated ROI, and a 90-day roadmap built specifically for your company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Get My Free Report <ArrowRight size={20} />
              </Link>
              <Link
                href="/use-cases"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Browse AI Use Cases
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-400" /> 100% free</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-400" /> Personalized to your business</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-400" /> Ready in under 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              From quiz to actionable report in under 5 minutes — no fluff, no generic advice.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 font-bold text-xl mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Start My Assessment <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Use Case Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">AI that works for real businesses</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Not theory. Not white papers. These are use cases businesses are implementing right now.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PREVIEW_USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{uc.icon}</div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{uc.industry}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{uc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{uc.description}</p>
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {uc.roi}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/use-cases" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              View all AI use cases <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Command Center */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
                Included with every engagement
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Command Center — Your AI Pulse on the Business
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Every client gets access to their own AI Command Center. It connects all your existing
                software — CRM, accounting, email, scheduling — and pulls everything into one place.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Then you can simply <strong className="text-white">ask it anything</strong> about your business.
                &ldquo;What&apos;s my revenue trend this month?&rdquo; &ldquo;Which customers haven&apos;t ordered in 90 days?&rdquo;
                Get answers in seconds, not hours.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Connects all your existing tools — no rip and replace',
                  'One dashboard view of your entire business',
                  'AI chat: ask questions in plain English, get real answers',
                  'Real-time alerts on what matters most',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                See what it could look like for you <ArrowRight size={18} />
              </Link>
            </div>

            {/* Command Center visual mockup */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 text-sm ml-2">Command Center</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Revenue MTD', value: '$48,200', trend: '+12%', color: 'text-emerald-400' },
                  { label: 'Open Leads', value: '34', trend: '+5 this week', color: 'text-blue-400' },
                  { label: 'Pending Invoices', value: '$12,800', trend: '8 overdue', color: 'text-orange-400' },
                  { label: 'At-Risk Customers', value: '7', trend: 'Need follow-up', color: 'text-red-400' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-slate-500 text-xs mt-1">{stat.trend}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-700 rounded-xl p-4">
                <p className="text-slate-400 text-xs mb-3">Ask your AI anything...</p>
                <div className="space-y-2">
                  <div className="bg-blue-500/20 text-blue-300 text-sm rounded-lg px-3 py-2 inline-block">
                    Which customers haven&apos;t ordered in 60 days?
                  </div>
                  <div className="bg-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2">
                    Found 7 customers. Top priority: Acme Corp ($4,200 avg order). Want me to draft a re-engagement email?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / About */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-3 mb-6">
            <Users className="text-blue-500" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Built for businesses at every stage of AI
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">
            Whether you&apos;ve never used AI or you&apos;re already experimenting — there&apos;s a next step that makes sense for your business.
            Our quiz meets you exactly where you are.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { label: 'Just getting started', desc: "We'll show you where to begin with quick wins that don't require a tech team." },
              { label: 'Already exploring', desc: "We'll help you go deeper and get more value from the tools you already use." },
              { label: 'Ready to scale', desc: "We'll map out a full AI strategy that grows with your business." },
            ].map((item) => (
              <div key={item.label} className="text-left p-6 bg-slate-50 rounded-2xl">
                <h3 className="font-bold text-slate-900 mb-2">{item.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to see what AI can do for your business?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Your personalized AI report is free, takes 5 minutes, and might just change how you run your business.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Take the Free Quiz <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

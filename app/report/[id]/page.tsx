import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, Zap, TrendingUp, Clock,
  BarChart3, Bot, CalendarDays, UserCheck
} from 'lucide-react'

const MATURITY_STAGES = [
  null,
  {
    label: 'Foundation Builder',
    color: 'bg-slate-100 text-slate-700',
    barColor: 'bg-slate-400',
    description: "You're laying the groundwork. This is exactly where transformation begins — and you're making the right move by starting now.",
  },
  {
    label: 'Early Adopter',
    color: 'bg-blue-100 text-blue-700',
    barColor: 'bg-blue-500',
    description: "You're ahead of most businesses. Now it's time to go deeper and turn curiosity into competitive advantage.",
  },
  {
    label: 'AI Integrator',
    color: 'bg-purple-100 text-purple-700',
    barColor: 'bg-purple-500',
    description: "You're already using AI — let's make it work significantly harder for your business.",
  },
  {
    label: 'AI-Powered Business',
    color: 'bg-emerald-100 text-emerald-700',
    barColor: 'bg-emerald-500',
    description: "You're ahead of the curve. Let's build your next layer of competitive advantage.",
  },
]

interface OrchestrationFlow {
  trigger: string
  title: string
  actions: string[]
  businessImpact: string
}

interface ReportContent {
  companyName?: string
  maturityStage: number
  maturityLabel: string
  maturityDescription: string
  websiteObservations: string[]
  orchestrationFlows: OrchestrationFlow[]
  aiRoleOpportunities: { role: string; whatAICanDo: string; availability: string; estimatedSavings: string }[]
  roadmap: { phase1: string[]; phase2: string[]; phase3: string[] }
  totalRoleSavings?: string
  commandCenterNote: string
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase
    .from('leads')
    .select('report_content, company_name, industry, maturity_stage, created_at, contact_name')
    .eq('report_id', id)
    .single()

  if (error || !data) notFound()

  const report = data.report_content as ReportContent
  const stage = MATURITY_STAGES[report.maturityStage] ?? MATURITY_STAGES[1]!
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'AI Implementation Center'
  const bookUrl = process.env.NEXT_PUBLIC_CAL_USERNAME
    ? `https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME}`
    : '/book'

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Sticky CTA Bar */}
      <div className="sticky top-0 z-50 bg-blue-600 text-white py-2.5 px-4 text-center shadow-lg">
        <span className="text-sm font-medium mr-3 hidden sm:inline">Ready to put this into action?</span>
        <Link
          href={bookUrl}
          className="inline-flex items-center gap-1.5 bg-white text-blue-600 font-bold px-4 py-1.5 rounded-lg text-sm hover:bg-blue-50 transition-colors"
        >
          Book Your Free Strategy Call <ArrowRight size={14} />
        </Link>
      </div>

      {/* Report Header */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-400 text-sm mb-2">
            Prepared by {companyName} · {new Date(data.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {data.company_name}&apos;s AI Readiness Report
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            A personalized analysis of where you are today and where AI can take you.
          </p>
          <Link
            href={bookUrl}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Book Your Free Strategy Call <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Maturity Stage */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
            <BarChart3 size={22} className="text-blue-500" /> Your AI Maturity Stage
          </h2>
          <div className="flex items-center gap-4 mb-5">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${stage.color}`}>
              Stage {report.maturityStage} of 4 — {stage.label}
            </span>
          </div>
          <div className="flex gap-1 mb-5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2.5 flex-1 rounded-full ${s <= report.maturityStage ? stage.barColor : 'bg-slate-100'}`}
              />
            ))}
          </div>
          <p className="text-slate-600 leading-relaxed">{report.maturityDescription || stage.description}</p>
        </div>

        {/* Website Observations */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
            <Bot size={22} className="text-purple-500" /> What We Found on Your Website
          </h2>
          <p className="text-slate-500 text-sm mb-5">
            Our AI reviewed {data.company_name}&apos;s website and identified these specific opportunities:
          </p>
          <ul className="space-y-4">
            {(report.websiteObservations ?? []).map((obs, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <span className="text-slate-700 leading-relaxed">{obs}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Orchestration Flows */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <TrendingUp size={22} className="text-emerald-500" /> How Your Business Runs as One System
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            These are the automated workflows we build for you — each triggered by a single event, each setting off a chain of coordinated actions across your business.
          </p>
          <div className="space-y-6">
            {(report.orchestrationFlows ?? []).map((flow, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Trigger header */}
                <div className="bg-slate-900 px-5 py-3.5 flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">Trigger</span>
                  <span className="text-white font-semibold text-sm">{flow.trigger}</span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-4">{flow.title}</h3>

                  {/* Action chain */}
                  <div className="space-y-0">
                    {(flow.actions ?? []).map((action, j) => (
                      <div key={j} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {j + 1}
                          </div>
                          {j < (flow.actions.length - 1) && (
                            <div className="w-0.5 bg-blue-200 flex-1 my-1" />
                          )}
                        </div>
                        <div className={`pb-4 ${j < flow.actions.length - 1 ? '' : 'pb-0'}`}>
                          <p className="text-slate-700 text-sm leading-relaxed">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Business impact */}
                  <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 flex items-start gap-2">
                    <CheckCircle size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-emerald-800 text-sm font-medium leading-relaxed">{flow.businessImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mid-report CTA */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Seeing opportunities for your business?</p>
            <p className="text-blue-100 text-sm">Book a free 30-minute call — we&apos;ll walk through this report together and show you exactly where to start.</p>
          </div>
          <Link
            href={bookUrl}
            className="shrink-0 inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Book a Free Call <ArrowRight size={16} />
          </Link>
        </div>

        {/* AI Role Opportunities */}
        {report.aiRoleOpportunities?.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <UserCheck size={22} className="text-blue-500" /> AI as a Team Member — 24/7/365
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Based on roles you&apos;ve considered hiring for, here&apos;s how AI could fill them — without sick days, turnover, or benefits costs.
            </p>
            <div className="space-y-5">
              {report.aiRoleOpportunities.map((opp, i) => (
                <div key={i} className="border-2 border-blue-100 bg-blue-50/40 rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-bold text-slate-900 text-lg">{opp.role}</h3>
                    <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full whitespace-nowrap">
                      💰 {opp.estimatedSavings}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-3">{opp.whatAICanDo}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold bg-slate-900 text-white px-3 py-1.5 rounded-full">
                    <Bot size={12} /> {opp.availability}
                  </div>
                </div>
              ))}
            </div>
            {report.totalRoleSavings && (
              <div className="mt-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl px-6 py-4 flex items-center justify-between gap-4">
                <p className="text-emerald-800 font-semibold text-sm">Total estimated annual savings vs. hiring these roles:</p>
                <p className="text-emerald-700 font-bold text-xl shrink-0">{report.totalRoleSavings}</p>
              </div>
            )}
          </div>
        )}

        {/* Roadmap */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CalendarDays size={22} className="text-orange-500" /> Your 90-Day AI Roadmap
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { label: 'Phase 1', sub: '0–30 days', color: 'border-blue-200 bg-blue-50', titleColor: 'text-blue-700', items: report.roadmap?.phase1 ?? [] },
              { label: 'Phase 2', sub: '30–90 days', color: 'border-purple-200 bg-purple-50', titleColor: 'text-purple-700', items: report.roadmap?.phase2 ?? [] },
              { label: 'Phase 3', sub: '90+ days', color: 'border-emerald-200 bg-emerald-50', titleColor: 'text-emerald-700', items: report.roadmap?.phase3 ?? [] },
            ].map((phase) => (
              <div key={phase.label} className={`rounded-xl border-2 p-5 ${phase.color}`}>
                <p className={`font-bold text-sm mb-0.5 ${phase.titleColor}`}>{phase.label}</p>
                <p className="text-xs text-slate-500 mb-4">{phase.sub}</p>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Command Center — Always Present */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            Included with every engagement
          </div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-blue-400" size={24} /> The Command Center — The Foundation of Your AI Strategy
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Every client gets their own Command Center — a unified hub that connects all your existing software
            (CRM, accounting, email, scheduling, and more) and puts everything in one place. Then you can simply
            ask AI questions about your entire business in plain English.
          </p>
          <p className="text-slate-300 leading-relaxed mb-6 italic">&ldquo;{report.commandCenterNote}&rdquo;</p>

          {/* Mini dashboard mockup */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'New Leads This Week', value: '18', color: 'text-blue-400' },
                { label: 'Jobs Scheduled', value: '12', color: 'text-emerald-400' },
                { label: 'Follow-ups Due', value: '9', color: 'text-orange-400' },
                { label: 'Warranty Expiring Soon', value: '4', color: 'text-red-400' },
              ].map((s) => (
                <div key={s.label} className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">{s.label}</p>
                  <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-700 rounded-lg p-3 text-sm">
              <p className="text-slate-400 text-xs mb-2">Ask your AI anything...</p>
              <p className="text-blue-300">&ldquo;Which leads haven&apos;t been followed up with in 3 days?&rdquo;</p>
              <p className="text-slate-300 mt-1 text-xs">Found 6 leads. Want me to draft follow-up messages for each?</p>
            </div>
          </div>

          <ul className="space-y-2 mb-6">
            {[
              'Connects your existing tools — no rip-and-replace required',
              'One dashboard for real-time business intelligence',
              'AI chat: ask anything about your business, get real answers',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-10 text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Your next step</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Let&apos;s build this together.</h2>
          <p className="text-slate-300 mb-3 text-lg max-w-lg mx-auto">
            This report is just the beginning. On a free 30-minute strategy call, we&apos;ll pick the highest-ROI opportunity from your report and show you exactly what implementation looks like.
          </p>
          <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
            Most clients see their first AI win within 2 weeks of our first session.
          </p>
          <Link
            href={bookUrl}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors mb-4"
          >
            Book Your Free Strategy Call <ArrowRight size={20} />
          </Link>
          <p className="text-slate-500 text-sm">No pitch. No pressure. Just your roadmap and a clear next step.</p>
        </div>

      </div>
    </div>
  )
}

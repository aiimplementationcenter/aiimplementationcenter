'use client'

import { useState } from 'react'
import { Clock, TrendingUp, Zap, ChevronDown } from 'lucide-react'
import { USE_CASES_SEED } from '@/lib/use-cases-data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const INDUSTRIES = ['All', 'Retail', 'Healthcare', 'Finance', 'Professional Services', 'Manufacturing', 'Real Estate', 'Restaurant/Hospitality', 'Marketing/Agency']
const FUNCTIONS = ['All', 'Sales', 'Marketing', 'Operations', 'Customer Service', 'Finance', 'HR']

const COMPLEXITY_COLOR: Record<string, string> = {
  low: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-red-50 text-red-700',
}

const COMPLEXITY_LABEL: Record<string, string> = {
  low: 'Low lift',
  medium: 'Medium lift',
  high: 'High lift',
}

export default function UseCasesPage() {
  const [industry, setIndustry] = useState('All')
  const [fn, setFn] = useState('All')

  const filtered = USE_CASES_SEED.filter((uc) => {
    const matchIndustry = industry === 'All' || uc.industries.includes('All') || uc.industries.includes(industry)
    const matchFn = fn === 'All' || uc.functions.includes(fn)
    return matchIndustry && matchFn
  })

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Use Cases for Real Businesses</h1>
          <p className="text-slate-300 text-xl max-w-2xl">
            Not white papers — actual AI applications that businesses are implementing today, with real results.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-slate-600 whitespace-nowrap">Industry:</label>
            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-slate-600 whitespace-nowrap">Function:</label>
            <div className="relative">
              <select
                value={fn}
                onChange={(e) => setFn(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {FUNCTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <span className="text-sm text-slate-400 ml-auto">{filtered.length} use cases</span>
        </div>
      </section>

      {/* Use case grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No use cases match your filters. Try a different combination.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((uc) => (
                <div key={uc.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {uc.industries.slice(0, 2).map((ind) => (
                      <span key={ind} className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{ind}</span>
                    ))}
                    {uc.functions.map((f) => (
                      <span key={f} className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{uc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{uc.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
                    {uc.time_savings && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                        <Clock size={11} /> {uc.time_savings}
                      </span>
                    )}
                    {uc.estimated_roi && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                        <TrendingUp size={11} /> {uc.estimated_roi}
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ml-auto ${COMPLEXITY_COLOR[uc.complexity]}`}>
                      <Zap size={11} /> {COMPLEXITY_LABEL[uc.complexity]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to know which of these apply to your business?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Take the free AI Readiness Quiz and get a personalized report with use cases specific to your company.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Get My Personalized Report <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

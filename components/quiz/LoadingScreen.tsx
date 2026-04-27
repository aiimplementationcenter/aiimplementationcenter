'use client'

import { useEffect, useState } from 'react'
import { Globe, Search, Brain, FileText } from 'lucide-react'

const STEPS = [
  { icon: <Globe className="text-blue-400" size={22} />, label: 'Reviewing your website...' },
  { icon: <Search className="text-purple-400" size={22} />, label: 'Researching your industry...' },
  { icon: <Brain className="text-emerald-400" size={22} />, label: 'Identifying your top AI opportunities...' },
  { icon: <FileText className="text-orange-400" size={22} />, label: 'Building your personalized report...' },
]

export default function LoadingScreen() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timings = [3000, 8000, 15000]
    const timers = timings.map((t, i) =>
      setTimeout(() => setCurrent(i + 1), t)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing your business...</h2>
        <p className="text-slate-500 mb-10">Our AI is building your personalized report. This takes about 20–30 seconds.</p>

        <div className="text-left space-y-4">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                i <= current
                  ? 'bg-slate-50 opacity-100'
                  : 'opacity-30'
              }`}
            >
              {step.icon}
              <span className={`text-sm font-medium ${i <= current ? 'text-slate-800' : 'text-slate-400'}`}>
                {step.label}
              </span>
              {i < current && (
                <span className="ml-auto text-xs text-emerald-600 font-semibold">✓ Done</span>
              )}
              {i === current && (
                <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-8">Please don&apos;t close this tab while we build your report.</p>
      </div>
    </div>
  )
}

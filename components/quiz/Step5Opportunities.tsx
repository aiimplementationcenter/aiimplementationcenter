'use client'

import { useState } from 'react'
import type { QuizData } from './QuizWrapper'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ROLE_SUGGESTIONS = [
  'Receptionist / appointment scheduler',
  'Customer support agent',
  'Sales development rep (SDR)',
  'Social media manager',
  'Data entry / admin assistant',
  'Bookkeeper / invoicing',
  'Marketing content creator',
  'HR onboarding coordinator',
]

interface Props {
  data: Partial<QuizData>
  onNext: (partial: Partial<QuizData>) => void
  onBack: () => void
}

export default function Step5Opportunities({ data, onNext, onBack }: Props) {
  const [goals90Day, setGoals90Day] = useState(data.goals90Day ?? '')
  const [aiRoles, setAiRoles] = useState<string[]>(data.aiRoles ?? [])
  const [customRole, setCustomRole] = useState(data.customRole ?? '')
  const [error, setError] = useState('')

  function toggle(val: string) {
    setAiRoles((p) => p.includes(val) ? p.filter((v) => v !== val) : [...p, val])
  }

  function handleNext() {
    if (!goals90Day.trim()) { setError('Please share at least one goal — even a rough one.'); return }
    onNext({ goals90Day, aiRoles, customRole })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Let&apos;s get specific about your business</h2>
      <p className="text-slate-700 mb-8">
        This is where your report gets really personal. The more specific you are, the more useful your results.
      </p>

      {/* 90-day goals */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-800 mb-1">
          What are your top business goals for the next 90 days?
        </label>
        <p className="text-sm text-slate-700 mb-3">
          Be as specific as you like. Examples: "Close 10 new clients," "Reduce response time to under 2 hours," "Launch a second location," "Stop losing leads that don't respond the first time."
        </p>
        <textarea
          value={goals90Day}
          onChange={(e) => { setGoals90Day(e.target.value); setError('') }}
          rows={4}
          placeholder="Write out your goals here..."
          className="w-full border-2 border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none placeholder-slate-400"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {/* AI role replacement */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Is there a role you&apos;ve been thinking about hiring for?
        </label>
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-4">
          <p className="text-blue-900 text-sm font-medium leading-relaxed">
            💡 <strong>What if AI could fill that role instead?</strong> Unlike a traditional hire, an AI works{' '}
            <strong>24 hours a day, 365 days a year</strong> — no sick days, no turnover, no benefits cost.
            Many roles that used to require a full-time employee can now be handled entirely by AI at a fraction of the cost,
            while actually <em>increasing</em> response speed and consistency.
          </p>
        </div>
        <p className="text-sm text-slate-700 mb-3">Select any roles you&apos;ve considered hiring for (or are currently handling yourself):</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {ROLE_SUGGESTIONS.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => toggle(role)}
              className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                aiRoles.includes(role)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-300 text-slate-800 hover:border-slate-400'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Something else in mind?</label>
          <input
            type="text"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            placeholder="e.g. Follow-up coordinator, proposal writer..."
            className="w-full border-2 border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 border-2 border-slate-300 text-slate-800 hover:border-slate-400 font-semibold px-5 py-3.5 rounded-xl transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl transition-colors"
        >
          Almost There <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

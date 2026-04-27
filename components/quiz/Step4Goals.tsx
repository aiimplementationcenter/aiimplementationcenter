'use client'

import { useState } from 'react'
import type { QuizData } from './QuizWrapper'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

const GOALS = [
  'Save time on repetitive tasks',
  'Grow revenue',
  'Improve customer experience',
  'Make better decisions with data',
  'Reduce costs',
  'Scale without hiring more people',
  'Improve team productivity',
  'Stay ahead of competitors',
]

const TIMELINES = [
  { value: 'exploring', label: 'Just exploring — no rush' },
  { value: '3-6months', label: 'Ready to act in 3–6 months' },
  { value: 'asap', label: 'ASAP — I want to move fast' },
  { value: 'started', label: 'I&apos;ve already started — I want to go further' },
]

interface Props {
  data: Partial<QuizData>
  onSubmit: (partial: Partial<QuizData>) => void
  onBack: () => void
  asStep?: boolean
}

function toggle(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
}

export default function Step4Goals({ data, onSubmit, onBack, asStep }: Props) {
  const [goals, setGoals] = useState<string[]>(data.goals ?? [])
  const [timeline, setTimeline] = useState(data.timeline ?? '')
  const [error, setError] = useState('')

  function handleSubmit() {
    if (goals.length === 0) { setError('Please select at least one goal'); return }
    if (!timeline) { setError('Please select your timeline'); return }
    onSubmit({ goals, timeline })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">What matters most to you?</h2>
      <p className="text-slate-700 mb-8">Your report will prioritize AI opportunities that align with what you&apos;re trying to achieve.</p>

      <div className="mb-7">
        <p className="text-sm font-semibold text-slate-700 mb-1">If AI could help with one thing, what would it be? <span className="font-normal text-slate-800">(pick up to 3)</span></p>
        <div className="flex flex-wrap gap-2 mt-3">
          {GOALS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                if (!goals.includes(g) && goals.length >= 3) return
                setGoals((p) => toggle(p, g))
                setError('')
              }}
              className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                goals.includes(g)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-300 text-slate-800 hover:border-slate-400'
              } ${!goals.includes(g) && goals.length >= 3 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <p className="text-sm font-semibold text-slate-700 mb-3">What&apos;s your timeline for implementing AI?</p>
        <div className="space-y-2">
          {TIMELINES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setTimeline(opt.value); setError('') }}
              className={`w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${
                timeline === opt.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-300 text-slate-800 hover:border-slate-400'
              }`}
              dangerouslySetInnerHTML={{ __html: opt.label }}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl transition-colors text-base"
        >
          {asStep ? <><ArrowRight size={18} /> Almost There</> : <><Sparkles size={18} /> Build My Report</>}
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import type { QuizData } from './QuizWrapper'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const USAGE_STATUS = [
  { value: 'yes', label: '✅ Yes — we use AI tools today' },
  { value: 'exploring', label: '🔍 We&apos;re exploring and testing a few things' },
  { value: 'no', label: '🚫 Not yet — we haven&apos;t started' },
]

const AI_TOOLS = [
  'ChatGPT', 'Microsoft Copilot', 'Google Gemini', 'Jasper', 'HubSpot AI',
  'Zapier AI', 'Grammarly AI', 'Canva AI', 'Other',
]

const CHALLENGES = [
  'Too much admin and manual work',
  'Customer follow-up and retention',
  'Finding and converting new leads',
  'Managing and understanding my data',
  'Keeping up with competitors',
  'Team productivity and coordination',
  'Cash flow and financial visibility',
  'Marketing and content creation',
]

interface Props {
  data: Partial<QuizData>
  onNext: (partial: Partial<QuizData>) => void
  onBack: () => void
}

function toggle(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
}

export default function Step3Usage({ data, onNext, onBack }: Props) {
  const [usageStatus, setUsageStatus] = useState(data.aiUsageStatus ?? '')
  const [aiTools, setAiTools] = useState<string[]>(data.aiTools ?? [])
  const [challenges, setChallenges] = useState<string[]>(data.challenges ?? [])
  const [error, setError] = useState('')

  function handleNext() {
    if (!usageStatus) { setError('Please select your current AI usage'); return }
    if (challenges.length === 0) { setError('Please select at least one challenge'); return }
    onNext({ aiUsageStatus: usageStatus, aiTools, challenges })
  }

  const showTools = usageStatus === 'yes' || usageStatus === 'exploring'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">How are you using AI today?</h2>
      <p className="text-slate-700 mb-8">No judgment here — this is just about where you&apos;re starting from.</p>

      <div className="mb-7">
        <p className="text-sm font-semibold text-slate-700 mb-3">Are you currently using any AI tools in your business?</p>
        <div className="space-y-2">
          {USAGE_STATUS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setUsageStatus(opt.value); setError('') }}
              className={`w-full text-left px-5 py-3.5 rounded-xl border-2 font-medium text-sm transition-all ${
                usageStatus === opt.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-300 text-slate-800 hover:border-slate-400'
              }`}
              dangerouslySetInnerHTML={{ __html: opt.label }}
            />
          ))}
        </div>
      </div>

      {showTools && (
        <div className="mb-7">
          <p className="text-sm font-semibold text-slate-700 mb-3">Which tools are you using? (select all that apply)</p>
          <div className="flex flex-wrap gap-2">
            {AI_TOOLS.map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() => setAiTools((p) => toggle(p, tool))}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                  aiTools.includes(tool)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-800 hover:border-slate-400'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">What&apos;s your biggest challenge right now? <span className="font-normal text-slate-800">(pick up to 3)</span></p>
        <p className="text-xs text-slate-800 mb-3">Be honest — this is what shapes your report the most.</p>
        <div className="flex flex-wrap gap-2">
          {CHALLENGES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                if (!challenges.includes(c) && challenges.length >= 3) return
                setChallenges((p) => toggle(p, c))
                setError('')
              }}
              className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                challenges.includes(c)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-300 text-slate-800 hover:border-slate-400'
              } ${!challenges.includes(c) && challenges.length >= 3 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {c}
            </button>
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
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

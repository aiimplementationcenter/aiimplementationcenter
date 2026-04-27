'use client'

import { useState } from 'react'
import type { QuizData } from './QuizWrapper'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const KNOWLEDGE_OPTIONS = [
  {
    value: 'beginner',
    emoji: '🔰',
    label: 'Just getting started',
    description: "I've heard of ChatGPT but haven't really dug in yet.",
    encouragement: "You're in exactly the right place. Most business owners are right where you are — and the ones who move now are the ones who win.",
  },
  {
    value: 'curious',
    emoji: '🌱',
    label: 'Curious explorer',
    description: "I've tried a few AI tools casually but haven't gone deep.",
    encouragement: "Great — you already have a foundation to build on. This report will show you where to go deeper.",
  },
  {
    value: 'active',
    emoji: '🔧',
    label: 'Active user',
    description: 'I use AI tools regularly in my personal or work life.',
    encouragement: "You're ahead of most. Now let's figure out how to make AI work harder for your business specifically.",
  },
  {
    value: 'advanced',
    emoji: '🚀',
    label: 'Building with AI',
    description: "I'm integrating AI into my business systems and workflows.",
    encouragement: "You're ahead of the curve. Let's identify the next level of competitive advantage.",
  },
]

interface Props {
  data: Partial<QuizData>
  onNext: (partial: Partial<QuizData>) => void
  onBack: () => void
  hideBack?: boolean
}

export default function Step2Knowledge({ data, onNext, onBack, hideBack }: Props) {
  const [selected, setSelected] = useState(data.aiKnowledge ?? '')

  const option = KNOWLEDGE_OPTIONS.find((o) => o.value === selected)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">How would you describe your AI knowledge?</h2>
      <p className="text-slate-700 mb-8">There are no wrong answers — this helps us calibrate your report.</p>

      <div className="space-y-3 mb-6">
        {KNOWLEDGE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSelected(opt.value)}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
              selected === opt.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{opt.emoji}</span>
              <div>
                <p className="font-semibold text-slate-900">{opt.label}</p>
                <p className="text-slate-700 text-sm mt-0.5">{opt.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Encouragement message */}
      {option && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 mb-6">
          <p className="text-emerald-800 text-sm font-medium">✅ {option.encouragement}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!hideBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 border-2 border-slate-300 text-slate-800 hover:border-slate-400 font-semibold px-5 py-3.5 rounded-xl transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <button
          type="button"
          disabled={!selected}
          onClick={() => onNext({ aiKnowledge: selected })}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

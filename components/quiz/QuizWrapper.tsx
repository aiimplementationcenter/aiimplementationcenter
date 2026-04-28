'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ContactStep from './ContactStep'
import LoadingScreen from './LoadingScreen'

export type QuizData = {
  contactName: string
  contactEmail: string
  contactPhone: string
  websiteUrl: string
  biggestTimeDrain: string
  toolCount: string
  leadResponse: string
  biggestImpact: string
  timeline: string
}

type Option = {
  label: string
  emoji: string
  flash: string
}

type Question = {
  id: keyof Pick<QuizData, 'biggestTimeDrain' | 'toolCount' | 'leadResponse' | 'biggestImpact' | 'timeline'>
  headline: string
  context?: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    id: 'biggestTimeDrain',
    headline: "What's stealing the most time in your business right now?",
    options: [
      {
        label: 'Answering the same customer questions repeatedly',
        emoji: '📞',
        flash: 'AI handles 80% of those instantly — 24/7, no staff required.',
      },
      {
        label: 'Admin work, data entry, and paperwork',
        emoji: '📋',
        flash: 'Most admin tasks can be fully automated — your team never touches them again.',
      },
      {
        label: 'Finding new leads and following up',
        emoji: '🔍',
        flash: 'AI never forgets a follow-up. Every lead, every time, automatically.',
      },
      {
        label: 'Coordinating my team and operations',
        emoji: '👥',
        flash: 'AI keeps everyone aligned and operations running — without you in the middle.',
      },
    ],
  },
  {
    id: 'toolCount',
    headline: 'How many separate tools or software does your business run on?',
    context:
      'Most businesses run on 5–10 disconnected tools. Each one holds a piece of your business story — but none of them talk to each other. That gap is costing you more than you realize.',
    options: [
      {
        label: '2–3 tools (pretty simple setup)',
        emoji: '🟢',
        flash: "Even a simple stack has untapped potential — we'll find it.",
      },
      {
        label: '4–6 tools (a few moving parts)',
        emoji: '🟡',
        flash: "There's real efficiency waiting to be unlocked across those systems.",
      },
      {
        label: '7–10 tools (it\'s getting complex)',
        emoji: '🟠',
        flash: "This is exactly where a unified AI layer pays off most — we'll connect them.",
      },
      {
        label: '10+ tools (honestly, it\'s a lot)',
        emoji: '🔴',
        flash: 'A Command Center that ties all of this together would transform how your business operates.',
      },
    ],
  },
  {
    id: 'leadResponse',
    headline: 'When a new lead reaches out — what usually happens?',
    context:
      'Responding within 5 minutes makes you 10× more likely to close the deal than waiting an hour. Most businesses lose leads not because of price — but because of response time.',
    options: [
      {
        label: "We're on it — response within minutes",
        emoji: '⚡',
        flash: 'AI makes that even faster and more consistent — and handles it while you sleep.',
      },
      {
        label: 'We aim for same-day, but it slips sometimes',
        emoji: '🕐',
        flash: 'AI closes that gap permanently — every lead gets an instant, intelligent response.',
      },
      {
        label: 'Depends on who sees it first',
        emoji: '🎲',
        flash: 'AI removes the "who saw it" problem. Every lead routed, responded, and tracked — automatically.',
      },
      {
        label: 'Leads sometimes fall through the cracks',
        emoji: '😬',
        flash: "This is costing you real revenue. AI catches every single one — we'll fix this first.",
      },
    ],
  },
  {
    id: 'biggestImpact',
    headline: 'What would make the biggest difference in your business in the next 90 days?',
    context:
      "You're about to get a personalized AI roadmap. Tell us where you want to feel the impact first — we'll build your plan around it.",
    options: [
      {
        label: 'More leads and more closed deals',
        emoji: '💰',
        flash: 'AI-powered sales workflows consistently drive 20–40% more pipeline with less effort.',
      },
      {
        label: 'Getting hours back every week',
        emoji: '⏱️',
        flash: 'Most clients reclaim 8–15 hours in their first month. That time goes back to what matters.',
      },
      {
        label: 'A better experience for my customers',
        emoji: '😊',
        flash: 'AI makes every customer feel like a priority — instant responses, personalized follow-up.',
      },
      {
        label: 'Actually knowing what\'s happening in my business',
        emoji: '📊',
        flash: 'Real-time visibility into your entire business — sales, ops, customers — in one place.',
      },
    ],
  },
  {
    id: 'timeline',
    headline: "What's your timeline for making a change?",
    context:
      "No pressure — there's no wrong answer here. This helps us prioritize what goes in your 90-day roadmap.",
    options: [
      {
        label: 'Just exploring for now',
        emoji: '👀',
        flash: "Perfect. Your report will show you exactly what's possible when you're ready.",
      },
      {
        label: 'Open to moving in the next 3–6 months',
        emoji: '📅',
        flash: "We'll map out the highest-impact wins so you know exactly where to start.",
      },
      {
        label: 'Ready to move in the next 30 days',
        emoji: '🚀',
        flash: "Let's build your roadmap right now — your report will be ready in under a minute.",
      },
      {
        label: 'We should have started yesterday',
        emoji: '🔥',
        flash: "We'll fast-track the highest-impact wins. Your competitors aren't waiting.",
      },
    ],
  },
]

const TOTAL_STEPS = QUESTIONS.length + 1

export default function QuizWrapper() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [flash, setFlash] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [data, setData] = useState<Partial<QuizData>>({})

  const progress = ((step + 1) / TOTAL_STEPS) * 100
  const currentQuestion = step < QUESTIONS.length ? QUESTIONS[step] : null

  function selectOption(questionId: string, value: string, flashMsg: string) {
    setSelected(value)
    setData((prev) => ({ ...prev, [questionId]: value }))
    setFlash(flashMsg)
    setTimeout(() => {
      setFlash(null)
      setSelected(null)
      setStep((s) => s + 1)
    }, 3200)
  }

  function goBack() {
    setFlash(null)
    setSelected(null)
    setStep((s) => s - 1)
  }

  async function submit(contactData: Pick<QuizData, 'contactName' | 'contactEmail' | 'contactPhone' | 'websiteUrl'>) {
    const finalData = { ...data, ...contactData } as QuizData
    setLoading(true)
    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || json.error || 'Failed to generate report')
      router.push(`/report/${json.reportId}`)
    } catch (err) {
      setLoading(false)
      alert(`Something went wrong: ${err instanceof Error ? err.message : 'Please try again.'}`)
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>
            {step < QUESTIONS.length ? `Question ${step + 1} of ${QUESTIONS.length}` : 'Last step'}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question step */}
      {currentQuestion && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {currentQuestion.context && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
              <p className="text-blue-800 text-sm leading-relaxed">{currentQuestion.context}</p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-900 mb-6">{currentQuestion.headline}</h2>

          {flash && (
            <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3.5">
              <p className="text-emerald-800 text-sm font-semibold leading-relaxed">✓ {flash}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => selectOption(currentQuestion.id, opt.label, opt.flash)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 flex items-center gap-3 ${
                  selected === opt.label
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : selected !== null
                    ? 'border-slate-200 text-slate-300 bg-slate-50'
                    : 'border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-slate-50 cursor-pointer'
                }`}
              >
                <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {step > 0 && !selected && (
            <button
              onClick={goBack}
              className="mt-6 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {/* Contact step */}
      {step === QUESTIONS.length && (
        <ContactStep onSubmit={submit} onBack={goBack} />
      )}
    </div>
  )
}

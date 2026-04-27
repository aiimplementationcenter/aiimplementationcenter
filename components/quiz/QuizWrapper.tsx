'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Step1Business from './Step1Business'
import Step2Knowledge from './Step2Knowledge'
import Step3Usage from './Step3Usage'
import Step4Goals from './Step4Goals'
import Step5Opportunities from './Step5Opportunities'
import LoadingScreen from './LoadingScreen'

export type QuizData = {
  // Step 1 (shown last)
  companyName: string
  industry: string
  companySize: string
  websiteUrl: string
  contactName: string
  contactEmail: string
  // Step 1 (shown first): AI knowledge
  aiKnowledge: string
  // Step 2: usage + challenges
  aiUsageStatus: string
  aiTools: string[]
  challenges: string[]
  // Step 3: goals + timeline
  goals: string[]
  timeline: string
  // Step 4: 90-day goals + AI roles
  goals90Day: string
  aiRoles: string[]
  customRole: string
}

const TOTAL_STEPS = 5

export default function QuizWrapper() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<QuizData>>({
    aiTools: [],
    challenges: [],
    goals: [],
    aiRoles: [],
  })

  const progress = (step / TOTAL_STEPS) * 100

  function update(partial: Partial<QuizData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  async function submit(finalData: QuizData) {
    setLoading(true)
    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
      if (!res.ok) throw new Error('Failed to generate report')
      const { reportId } = await res.json()
      router.push(`/report/${reportId}`)
    } catch {
      setLoading(false)
      alert('Something went wrong generating your report. Please try again.')
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-700 mb-2">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 1: AI Knowledge */}
      {step === 1 && (
        <Step2Knowledge
          data={data}
          onNext={(partial) => { update(partial); setStep(2) }}
          onBack={() => {}}
          hideBack
        />
      )}
      {/* Step 2: Current Usage + Challenges */}
      {step === 2 && (
        <Step3Usage
          data={data}
          onNext={(partial) => { update(partial); setStep(3) }}
          onBack={() => setStep(1)}
        />
      )}
      {/* Step 3: Goals + Timeline */}
      {step === 3 && (
        <Step4Goals
          data={data}
          onSubmit={(partial) => { update(partial); setStep(4) }}
          onBack={() => setStep(2)}
          asStep
        />
      )}
      {/* Step 4: 90-day goals + AI role opportunities */}
      {step === 4 && (
        <Step5Opportunities
          data={data}
          onNext={(partial) => { update(partial); setStep(5) }}
          onBack={() => setStep(3)}
        />
      )}
      {/* Step 5: Business Info (last — they're invested now) */}
      {step === 5 && (
        <Step1Business
          data={data}
          onNext={(partial) => {
            const final = { ...data, ...partial } as QuizData
            submit(final)
          }}
          onBack={() => setStep(4)}
          isLast
        />
      )}
    </div>
  )
}

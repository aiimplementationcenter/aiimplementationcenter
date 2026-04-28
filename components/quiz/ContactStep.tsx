'use client'

import { useState } from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import type { QuizData } from './QuizWrapper'

interface Props {
  onSubmit: (data: Pick<QuizData, 'contactName' | 'contactEmail' | 'contactPhone' | 'websiteUrl'>) => void
  onBack: () => void
}

export default function ContactStep({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    websiteUrl: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.contactName.trim()) e.contactName = 'Required'
    if (!form.contactEmail.trim()) e.contactEmail = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) e.contactEmail = 'Please enter a valid email'
    if (!form.contactPhone.trim()) e.contactPhone = 'Required'
    if (!form.websiteUrl.trim()) e.websiteUrl = 'Required — we use this to personalize your report'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit(form)
  }

  function set(key: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: '' }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 mb-6">
        <p className="text-emerald-800 text-sm font-medium leading-relaxed">
          🎯 <strong>You&apos;re almost there.</strong> Our AI is ready to scan your website, research your industry,
          and build a personalized report with real opportunities for your business.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-1">Where should we send your report?</h2>
      <p className="text-slate-500 text-sm mb-6">
        Your website is how our AI personalizes everything — not a generic template.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => set('contactName', e.target.value)}
            placeholder="Jane Smith"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
          <input
            type="tel"
            value={form.contactPhone}
            onChange={(e) => set('contactPhone', e.target.value)}
            placeholder="(555) 000-0000"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <input
            type="email"
            value={form.contactEmail}
            onChange={(e) => set('contactEmail', e.target.value)}
            placeholder="jane@yourbusiness.com"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Your Website{' '}
            <span className="text-blue-500 font-normal text-xs ml-1">← our AI scans this</span>
          </label>
          <input
            type="text"
            value={form.websiteUrl}
            onChange={(e) => set('websiteUrl', e.target.value)}
            onBlur={(e) => {
              const val = e.target.value.trim()
              if (val && !/^https?:\/\//i.test(val)) {
                set('websiteUrl', 'https://' + val)
              }
            }}
            placeholder="yourcompany.com"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.websiteUrl && <p className="text-red-500 text-xs mt-1">{errors.websiteUrl}</p>}
        </div>

        <p className="text-xs text-slate-500 bg-slate-50 rounded-lg px-4 py-3">
          🔒 We only use this to generate your report. No spam, ever. No selling your data.
        </p>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 border-2 border-slate-300 text-slate-700 hover:border-slate-400 font-semibold px-5 py-3.5 rounded-xl transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-4 rounded-xl transition-colors text-base"
          >
            <Sparkles size={18} /> Build My Report
          </button>
        </div>
      </form>
    </div>
  )
}

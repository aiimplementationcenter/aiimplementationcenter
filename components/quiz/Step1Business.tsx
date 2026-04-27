'use client'

import { useState } from 'react'
import type { QuizData } from './QuizWrapper'
import { ArrowLeft, Sparkles } from 'lucide-react'

const INDUSTRIES = [
  'Retail', 'Healthcare', 'Finance', 'Professional Services',
  'Manufacturing', 'Real Estate', 'Restaurant/Hospitality', 'Marketing/Agency', 'Other',
]

const SIZES = ['1–5 employees', '6–20 employees', '21–100 employees', '100+ employees']

interface Props {
  data: Partial<QuizData>
  onNext: (partial: Partial<QuizData>) => void
  onBack?: () => void
  isLast?: boolean
}

export default function Step1Business({ data, onNext, onBack, isLast }: Props) {
  const [form, setForm] = useState({
    companyName: data.companyName ?? '',
    industry: data.industry ?? '',
    companySize: data.companySize ?? '',
    websiteUrl: data.websiteUrl ?? '',
    contactName: data.contactName ?? '',
    contactEmail: data.contactEmail ?? '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.companyName.trim()) e.companyName = 'Required'
    if (!form.industry) e.industry = 'Please select your industry'
    if (!form.companySize) e.companySize = 'Please select your company size'
    if (!form.websiteUrl.trim()) e.websiteUrl = 'Required — we use this to personalize your report'
    else if (!/^https?:\/\/.+/.test(form.websiteUrl.trim())) e.websiteUrl = 'Please enter a full URL (starting with https://)'
    if (!form.contactName.trim()) e.contactName = 'Required'
    if (!form.contactEmail.trim()) e.contactEmail = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) e.contactEmail = 'Please enter a valid email'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onNext(form)
  }

  function field(key: keyof typeof form, label: string, type = 'text', placeholder = '') {
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
          placeholder={placeholder}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        {isLast ? "Last step — let's personalize your report" : 'Tell us about your business'}
      </h2>
      <p className="text-slate-700 mb-5">
        {isLast
          ? "You're almost there. We need a few details so our AI can analyze your online presence and build a report that's specific to your business — not a generic template."
          : "We use this to build a report that's actually relevant to you."}
      </p>

      {isLast && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6">
          <p className="text-blue-800 text-sm font-medium leading-relaxed">
            🤖 <strong>Here&apos;s what our AI will do with this:</strong> Once you submit, we&apos;ll use your website URL to scan your online presence — your services, messaging, and positioning — and combine it with everything you just shared to generate a report with real, specific opportunities for <em>your</em> business. Not generic advice. Actual findings based on what we find.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {field('companyName', 'Company Name', 'text', 'Acme Corp')}
        {field('contactName', 'Your Name', 'text', 'Jane Smith')}
        {field('contactEmail', 'Your Email', 'email', 'jane@acmecorp.com')}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Company Website <span className="text-blue-500 font-normal text-xs ml-1">← our AI will scan this</span>
          </label>
          <input
            type="text"
            value={form.websiteUrl}
            onChange={(e) => setForm((p) => ({ ...p, websiteUrl: e.target.value }))}
            onBlur={(e) => {
              const val = e.target.value.trim()
              if (val && !/^https?:\/\//i.test(val)) {
                setForm((p) => ({ ...p, websiteUrl: 'https://' + val }))
              }
            }}
            placeholder="yourcompany.com"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.websiteUrl && <p className="text-red-500 text-xs mt-1">{errors.websiteUrl}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Industry</label>
          <select
            value={form.industry}
            onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select your industry...</option>
            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Size</label>
          <div className="grid grid-cols-2 gap-3">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm((p) => ({ ...p, companySize: s }))}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors text-left ${
                  form.companySize === s
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-300 text-slate-800 hover:border-slate-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.companySize && <p className="text-red-500 text-xs mt-1">{errors.companySize}</p>}
        </div>

        <p className="text-xs text-slate-800 bg-slate-50 rounded-lg px-4 py-3">
          🔒 Your info is only used to generate your report. We will never spam you or sell your data.
        </p>

        <div className="flex gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 border-2 border-slate-300 text-slate-800 hover:border-slate-400 font-semibold px-5 py-3.5 rounded-xl transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl transition-colors"
          >
            <Sparkles size={18} /> Build My Report
          </button>
        </div>
      </form>
    </div>
  )
}

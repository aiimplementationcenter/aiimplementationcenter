'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

export type IntakeData = {
  // Step 1 — Business basics
  business_name: string
  industry: string
  phone: string
  email: string
  website: string
  google_review_url: string
  business_hours: string
  tone: string

  // Step 2 — Software stack
  phone_system: string
  email_provider: string
  crm: string
  scheduling_tool: string
  invoicing_tool: string
  sms_tool: string
  website_platform: string

  // Step 3 — Lead sources
  lead_sources: string[]
  has_facebook_page: boolean
  has_google_my_business: boolean
  runs_google_ads: boolean
  runs_facebook_ads: boolean

  // Step 4 — Communication preferences
  followup_channel: string
  auto_response_timing: string
  followup_delay: string
  nurture_touches: string
  review_request_timing: string

  // Step 5 — Customer journey
  journey_new_lead: string
  journey_job_booked: string
  journey_post_service: string
  journey_reengagement: string

  // Step 6 — Existing messages
  existing_voicemail: string
  existing_email_template: string
  existing_sms_template: string
  additional_notes: string
}

const TOTAL_STEPS = 6

const INDUSTRIES = ['Pest Control', 'HVAC', 'Plumbing', 'Electrical', 'Cleaning', 'Landscaping', 'Roofing', 'Construction', 'Healthcare', 'Legal', 'Accounting', 'Real Estate', 'Restaurant', 'Retail', 'Other']
const PHONE_SYSTEMS = ['Google Voice', 'RingCentral', 'Grasshopper', 'Twilio', 'OpenPhone', 'Vonage', 'Landline/Traditional', 'Cell phone only', 'Other']
const EMAIL_PROVIDERS = ['Gmail / Google Workspace', 'Outlook / Microsoft 365', 'Yahoo', 'Custom SMTP', 'Other']
const CRMS = ['None', 'HubSpot', 'Pipedrive', 'Zoho', 'Salesforce', 'ServiceTitan', 'Jobber', 'Housecall Pro', 'FieldEdge', 'Other']
const SCHEDULING = ['None / manual', 'Google Calendar', 'Calendly', 'Acuity', 'Built into CRM', 'ServiceTitan', 'Jobber', 'Other']
const INVOICING = ['None / paper', 'QuickBooks', 'FreshBooks', 'Xero', 'Stripe', 'Square', 'Wave', 'Built into CRM', 'Other']
const WEBSITE_PLATFORMS = ['WordPress', 'Wix', 'Squarespace', 'Webflow', 'GoDaddy', 'Custom / developer built', 'No website', 'Other']
const LEAD_SOURCE_OPTIONS = [
  { value: 'call', label: 'Phone calls (missed or answered)' },
  { value: 'form', label: 'Website contact form' },
  { value: 'email', label: 'Email inquiries' },
  { value: 'facebook', label: 'Facebook messages / Lead Ads' },
  { value: 'google', label: 'Google My Business calls / messages' },
  { value: 'referral', label: 'Referrals from existing customers' },
  { value: 'walkin', label: 'Walk-ins / in-person' },
]

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-700 mb-1.5">{children}</label>
}

function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  )
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function Textarea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
    />
  )
}

function ToneCard({ value, selected, onClick, description }: { value: string; selected: boolean; onClick: () => void; description: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors ${selected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
    >
      <p className="font-semibold text-sm">{value}</p>
      <p className="text-xs mt-0.5 opacity-70">{description}</p>
    </button>
  )
}

export default function IntakeForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IntakeData>({
    business_name: '', industry: '', phone: '', email: '', website: '', google_review_url: '', business_hours: '', tone: 'Friendly',
    phone_system: '', email_provider: '', crm: '', scheduling_tool: '', invoicing_tool: '', sms_tool: '', website_platform: '',
    lead_sources: [], has_facebook_page: false, has_google_my_business: false, runs_google_ads: false, runs_facebook_ads: false,
    followup_channel: 'both', auto_response_timing: 'immediately', followup_delay: '2hours', nurture_touches: '3', review_request_timing: '7days',
    journey_new_lead: '', journey_job_booked: '', journey_post_service: '', journey_reengagement: '',
    existing_voicemail: '', existing_email_template: '', existing_sms_template: '', additional_notes: '',
  })

  function set<K extends keyof IntakeData>(key: K, value: IntakeData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function toggleLeadSource(value: string) {
    setData((prev) => ({
      ...prev,
      lead_sources: prev.lead_sources.includes(value)
        ? prev.lead_sources.filter((s) => s !== value)
        : [...prev.lead_sources, value],
    }))
  }

  async function submit() {
    setLoading(true)
    try {
      const res = await fetch('/api/save-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to save')
      router.push('/intake/success')
    } catch (err) {
      alert(`Something went wrong: ${err instanceof Error ? err.message : 'Please try again.'}`)
      setLoading(false)
    }
  }

  const progress = (step / TOTAL_STEPS) * 100

  const STEP_LABELS = ['Business Info', 'Software Stack', 'Lead Sources', 'Preferences', 'Customer Journey', 'Messages']

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span className="font-medium">{STEP_LABELS[step - 1]}</span>
          <span>Step {step} of {TOTAL_STEPS}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">

        {/* ── Step 1: Business Basics ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Business Information</h2>
              <p className="text-slate-500 text-sm">The basics we need to build everything around your brand.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><Label>Business Name *</Label><Input value={data.business_name} onChange={(v) => set('business_name', v)} placeholder="Midwest Bed Bug Services" /></div>
              <div><Label>Industry *</Label><Select value={data.industry} onChange={(v) => set('industry', v)} options={INDUSTRIES} placeholder="Select industry..." /></div>
              <div><Label>Business Phone</Label><Input value={data.phone} onChange={(v) => set('phone', v)} placeholder="(555) 000-0000" type="tel" /></div>
              <div><Label>Business Email</Label><Input value={data.email} onChange={(v) => set('email', v)} placeholder="info@yourbusiness.com" type="email" /></div>
              <div><Label>Website</Label><Input value={data.website} onChange={(v) => set('website', v)} placeholder="yoursite.com" /></div>
              <div className="col-span-2"><Label>Google Review Link</Label><Input value={data.google_review_url} onChange={(v) => set('google_review_url', v)} placeholder="https://g.page/r/..." /></div>
              <div className="col-span-2"><Label>Business Hours</Label><Input value={data.business_hours} onChange={(v) => set('business_hours', v)} placeholder="Mon–Fri 8am–6pm, Sat 9am–2pm" /></div>
            </div>
            <div>
              <Label>Message Tone</Label>
              <div className="grid grid-cols-3 gap-3 mt-1">
                <ToneCard value="Professional" selected={data.tone === 'Professional'} onClick={() => set('tone', 'Professional')} description="Formal, polished, corporate feel" />
                <ToneCard value="Friendly" selected={data.tone === 'Friendly'} onClick={() => set('tone', 'Friendly')} description="Warm, approachable, conversational" />
                <ToneCard value="Casual" selected={data.tone === 'Casual'} onClick={() => set('tone', 'Casual')} description="Relaxed, like texting a neighbor" />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Software Stack ── */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Software Stack</h2>
              <p className="text-slate-500 text-sm">Every tool your business runs on. If you're not sure, just pick the closest match.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Phone System</Label><Select value={data.phone_system} onChange={(v) => set('phone_system', v)} options={PHONE_SYSTEMS} placeholder="Select..." /></div>
              <div><Label>Email Provider</Label><Select value={data.email_provider} onChange={(v) => set('email_provider', v)} options={EMAIL_PROVIDERS} placeholder="Select..." /></div>
              <div><Label>CRM</Label><Select value={data.crm} onChange={(v) => set('crm', v)} options={CRMS} placeholder="Select..." /></div>
              <div><Label>Scheduling Tool</Label><Select value={data.scheduling_tool} onChange={(v) => set('scheduling_tool', v)} options={SCHEDULING} placeholder="Select..." /></div>
              <div><Label>Invoicing / Payments</Label><Select value={data.invoicing_tool} onChange={(v) => set('invoicing_tool', v)} options={INVOICING} placeholder="Select..." /></div>
              <div><Label>SMS Tool</Label><Select value={data.sms_tool} onChange={(v) => set('sms_tool', v)} options={['Same as phone system', 'Twilio', 'SimpleTexting', 'EZTexting', 'SlickText', 'Other']} placeholder="Select..." /></div>
              <div className="col-span-2"><Label>Website Platform</Label><Select value={data.website_platform} onChange={(v) => set('website_platform', v)} options={WEBSITE_PLATFORMS} placeholder="Select..." /></div>
            </div>
          </div>
        )}

        {/* ── Step 3: Lead Sources ── */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">How Leads Find You</h2>
              <p className="text-slate-500 text-sm">Select every channel leads currently come through — we'll build automations for each one.</p>
            </div>
            <div>
              <Label>Lead Sources (select all that apply)</Label>
              <div className="space-y-2 mt-1">
                {LEAD_SOURCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleLeadSource(opt.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-colors ${
                      data.lead_sources.includes(opt.value)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${data.lead_sources.includes(opt.value) ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                      {data.lead_sources.includes(opt.value) && <CheckCircle size={13} className="text-white" />}
                    </div>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Social & Advertising Presence</Label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                {[
                  { key: 'has_facebook_page' as const, label: 'Facebook Page' },
                  { key: 'has_google_my_business' as const, label: 'Google My Business' },
                  { key: 'runs_google_ads' as const, label: 'Running Google Ads' },
                  { key: 'runs_facebook_ads' as const, label: 'Running Facebook Ads' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => set(key, !data[key])}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                      data[key] ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${data[key] ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                      {data[key] && <CheckCircle size={13} className="text-white" />}
                    </div>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Communication Preferences ── */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Communication Preferences</h2>
              <p className="text-slate-500 text-sm">How fast and how often your automations should reach out to leads and customers.</p>
            </div>

            {[
              {
                label: 'Preferred follow-up channel',
                key: 'followup_channel' as const,
                options: [{ value: 'text', label: 'Text only' }, { value: 'email', label: 'Email only' }, { value: 'both', label: 'Both text and email' }],
              },
              {
                label: 'Auto-response timing (how fast after a lead comes in)',
                key: 'auto_response_timing' as const,
                options: [{ value: 'immediately', label: 'Immediately (within 60 seconds)' }, { value: '5min', label: 'Within 5 minutes' }, { value: '1hour', label: 'Within 1 hour' }],
              },
              {
                label: 'Follow-up delay if no response',
                key: 'followup_delay' as const,
                options: [{ value: '2hours', label: '2 hours' }, { value: '4hours', label: '4 hours' }, { value: 'same_day', label: 'Same day (evening)' }, { value: 'next_day', label: 'Next business day' }],
              },
              {
                label: 'Nurture sequence — how many touches before stopping',
                key: 'nurture_touches' as const,
                options: [{ value: '2', label: '2 touches' }, { value: '3', label: '3 touches' }, { value: '5', label: '5 touches' }],
              },
              {
                label: 'When to send review request after service',
                key: 'review_request_timing' as const,
                options: [{ value: '3days', label: '3 days after' }, { value: '7days', label: '7 days after' }, { value: '14days', label: '14 days after' }],
              },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <Label>{label}</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set(key, opt.value)}
                      className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                        data[key] === opt.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Step 5: Customer Journey ── */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Your Customer Journey</h2>
              <p className="text-slate-500 text-sm">Describe what you want to happen at each stage. Write it like you&apos;re explaining it to a new employee — we&apos;ll turn it into automated workflows.</p>
            </div>
            <div>
              <Label>When a new lead calls or messages — what should happen?</Label>
              <Textarea value={data.journey_new_lead} onChange={(v) => set('journey_new_lead', v)} placeholder="e.g. We want them to get a text within a minute saying we'll call back, then someone should call within the hour. If they don't answer, text again the next day..." rows={4} />
            </div>
            <div>
              <Label>When a job is booked — what should the customer receive?</Label>
              <Textarea value={data.journey_job_booked} onChange={(v) => set('journey_job_booked', v)} placeholder="e.g. Confirmation text right away, email with prep instructions, reminder the day before..." rows={4} />
            </div>
            <div>
              <Label>After a job is completed — what&apos;s your ideal follow-up?</Label>
              <Textarea value={data.journey_post_service} onChange={(v) => set('journey_post_service', v)} placeholder="e.g. Thank you text same day, follow-up email 3 days later with tips, review request after a week..." rows={4} />
            </div>
            <div>
              <Label>What about customers you haven&apos;t heard from in a while?</Label>
              <Textarea value={data.journey_reengagement} onChange={(v) => set('journey_reengagement', v)} placeholder="e.g. Check in every 6 months, remind them about seasonal treatments, see if they need anything..." rows={3} />
            </div>
          </div>
        )}

        {/* ── Step 6: Existing Messages ── */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Existing Messages & Notes</h2>
              <p className="text-slate-500 text-sm">Paste anything you currently use — voicemails, email templates, texts. We&apos;ll match your voice and improve from there. Leave blank if you don&apos;t have anything yet.</p>
            </div>
            <div>
              <Label>Current voicemail or phone greeting (if any)</Label>
              <Textarea value={data.existing_voicemail} onChange={(v) => set('existing_voicemail', v)} placeholder="e.g. 'You've reached Midwest Bed Bug Services. We're unable to take your call right now...'" rows={3} />
            </div>
            <div>
              <Label>Any email templates you currently use</Label>
              <Textarea value={data.existing_email_template} onChange={(v) => set('existing_email_template', v)} placeholder="Paste any emails you send to customers..." rows={4} />
            </div>
            <div>
              <Label>Any text messages you currently send</Label>
              <Textarea value={data.existing_sms_template} onChange={(v) => set('existing_sms_template', v)} placeholder="Paste any texts you send to leads or customers..." rows={3} />
            </div>
            <div>
              <Label>Anything else we should know</Label>
              <Textarea value={data.additional_notes} onChange={(v) => set('additional_notes', v)} placeholder="Special situations, exceptions, things that are important to your business..." rows={3} />
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p className="text-blue-800 text-sm">
                <strong>What happens next:</strong> Your consultant will review this, generate your complete automation workflow, and schedule a setup call to connect everything and go live.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 border-2 border-slate-300 text-slate-700 hover:border-slate-400 font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && (!data.business_name.trim() || !data.industry)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-6 py-4 rounded-xl transition-colors text-base"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
              {loading ? 'Submitting...' : 'Submit — Build My Workflows'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

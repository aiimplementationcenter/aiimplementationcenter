import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Gauge,
  MessageSquare,
  PhoneCall,
  Repeat,
  ShieldCheck,
  Target,
  Workflow,
  Zap,
} from 'lucide-react'

const QUICK_WINS = [
  {
    icon: PhoneCall,
    title: 'Missed call recovery',
    problem: 'A lead calls while your team is busy and never gets a fast response.',
    system: 'Instant text-back, staff alert, pipeline update, and follow-up until they book or say no.',
  },
  {
    icon: MessageSquare,
    title: 'Website lead response',
    problem: 'Form leads land in an inbox and wait for whoever sees them first.',
    system: 'SMS, email, lead routing, CRM record, and owner notification in the first minute.',
  },
  {
    icon: Repeat,
    title: 'Quote follow-up',
    problem: 'Quotes go out, then the deal depends on memory and manual chasing.',
    system: 'A timed follow-up sequence with reminders, objection handling, and reply alerts.',
  },
  {
    icon: ClipboardCheck,
    title: 'Review request engine',
    problem: 'Happy customers finish the job but never get asked at the right time.',
    system: 'Post-job review requests, private feedback capture, and team alerts when something needs attention.',
  },
]

const SYSTEM_STEPS = [
  'Trigger',
  'Rules',
  'AI action',
  'Human handoff',
  'Tracking',
]

const OFFERS = [
  {
    name: 'AI Follow-Up Fix',
    bestFor: 'Businesses losing leads after calls, forms, quotes, or consultations.',
    includes: ['Missed-call text-back', 'Form lead response', 'Quote follow-up', 'Pipeline and staff alerts'],
  },
  {
    name: 'AI Front Office System',
    bestFor: 'Teams buried in intake, scheduling, FAQs, reminders, and customer handoff.',
    includes: ['AI receptionist flow', 'Appointment reminders', 'FAQ handling', 'Escalation rules'],
  },
  {
    name: 'AI Growth Operations System',
    bestFor: 'Companies that need follow-up, reviews, reactivation, content, and reporting connected.',
    includes: ['Lead reactivation', 'Review engine', 'Owner summary', 'Content workflow'],
  },
]

const DIFFERENTIATORS = [
  'We start with the business leak, not the tool.',
  'We build repeatable workflows with rules, prompts, triggers, handoffs, and reporting.',
  'We use AI where it can act inside the process, not where it adds noise.',
  'We install the system, train the team, and keep improving it after launch.',
]

export default function HomePage() {
  return (
    <div className="bg-[#08090a] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(113,112,255,0.22),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(94,106,210,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-medium text-slate-300">
              <Zap size={15} className="text-[#828fff]" />
              Built for companies tired of AI hype
            </div>

            <h1 className="max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.06em] text-[#f7f8f8] sm:text-6xl lg:text-7xl">
              AI systems that fix the work your team keeps chasing.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              AI Implementation Center builds the workflows, rules, triggers, handoffs, and AI actions that help businesses respond faster, follow up cleaner, and stop letting money leak through manual processes.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5e6ad2] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#7170ff]"
              >
                Request an AI Quick Win <ArrowRight size={18} />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-6 py-4 text-base font-semibold text-slate-200 transition hover:bg-white/[0.06]"
              >
                Book a strategy call
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> No generic AI audit</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Systems before tools</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Built around ROI leaks</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-3 shadow-2xl shadow-black/40">
              <div className="rounded-[22px] border border-white/[0.08] bg-[#0f1011] p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-white/[0.07] pb-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Lead response system</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#f7f8f8]">When a lead calls after hours</h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">Active</div>
                </div>

                <div className="space-y-3">
                  {[
                    ['1', 'Missed call detected', 'System captures caller, source, time, and location.'],
                    ['2', 'AI-assisted text sent', 'Prospect gets a fast reply with the right next question.'],
                    ['3', 'Staff alerted', 'Team gets a summary and recommended next action.'],
                    ['4', 'Follow-up runs', 'Sequence continues until they book, reply, or opt out.'],
                  ].map(([number, title, text]) => (
                    <div key={number} className="grid grid-cols-[36px_1fr] gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5e6ad2]/20 text-sm font-semibold text-[#aeb6ff]">{number}</div>
                      <div>
                        <p className="font-medium text-slate-100">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Owner summary</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    3 missed calls recovered today. 2 booked. 1 waiting on staff callback. Highest value lead came from Google Business Profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08] bg-[#0f1011] py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-slate-400 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#828fff]" /> Built from real operating experience</span>
          <span className="hidden h-4 w-px bg-white/[0.12] sm:block" />
          <span className="flex items-center gap-2"><Workflow size={16} className="text-[#828fff]" /> GoHighLevel-ready systems</span>
          <span className="hidden h-4 w-px bg-white/[0.12] sm:block" />
          <span className="flex items-center gap-2"><Gauge size={16} className="text-[#828fff]" /> Fast first workflow, then deeper buildout</span>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#828fff]">The point of view</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] text-[#f7f8f8] sm:text-5xl">
              ChatGPT is not a business system.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Most systems fail because the process was never defined. AI only works when it has direction, rules, context, and a clear handoff. We build that sequence so the system can act on your behalf while your team focuses on higher-value work.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-5">
            {SYSTEM_STEPS.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="font-mono text-xs text-slate-500">0{index + 1}</p>
                <p className="mt-4 text-lg font-medium tracking-[-0.03em] text-slate-100">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0f1011] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#828fff]">Salted pretzel offer</p>
              <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] text-[#f7f8f8] sm:text-5xl">
                Start with one AI Quick Win.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-300">
              We do not start by selling a giant AI project. We find one leak, map the system, and show the workflow your business should be using. If the value is clear, we install the managed system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {QUICK_WINS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:bg-white/[0.05]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#5e6ad2]/15 text-[#aeb6ff]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-100">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-400"><span className="text-slate-200">Leak:</span> {item.problem}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400"><span className="text-slate-200">System:</span> {item.system}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#828fff]">Managed systems</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] text-[#f7f8f8] sm:text-5xl">
              Install the workflow. Keep it running.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              We build in GoHighLevel and connect outside tools only when they create a better result. The client gets the outcome: faster response, cleaner handoff, better follow-up, and less manual chasing.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {OFFERS.map((offer) => (
              <div key={offer.name} className="rounded-3xl border border-white/[0.08] bg-[#0f1011] p-7">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-100">{offer.name}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{offer.bestFor}</p>
                <ul className="mt-6 space-y-3">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0f1011] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#828fff]">Why this works</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] text-[#f7f8f8] sm:text-5xl">
              The tool is not the moat. The process is.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Your business does not need another login. It needs a system that knows what to do when a lead arrives, when a customer goes quiet, when a quote stalls, or when staff needs a clean handoff.
            </p>
          </div>

          <div className="space-y-4">
            {DIFFERENTIATORS.map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <Target size={20} className="mt-1 shrink-0 text-[#828fff]" />
                <p className="leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/[0.08] bg-[radial-gradient(circle_at_top,rgba(113,112,255,0.24),rgba(255,255,255,0.03)_36%,rgba(255,255,255,0.02))] p-8 text-center sm:p-12">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05] text-[#aeb6ff]">
            <Bot size={28} />
          </div>
          <h2 className="text-4xl font-medium leading-tight tracking-[-0.05em] text-[#f7f8f8] sm:text-5xl">
            Want to see the first workflow your business should automate?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Send us one business process that feels messy: calls, forms, quotes, reviews, reminders, or office tasks. We will show you the AI-assisted system that should run behind it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/intake"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5e6ad2] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#7170ff]"
            >
              Request My AI Quick Win <ArrowRight size={18} />
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-6 py-4 text-base font-semibold text-slate-200 transition hover:bg-white/[0.06]"
            >
              View system examples
            </Link>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Clock size={15} /> No generic audit. One practical workflow first.
          </p>
        </div>
      </section>
    </div>
  )
}

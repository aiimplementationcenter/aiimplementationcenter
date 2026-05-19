import Link from 'next/link'
import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  CheckCircle,
  ClipboardCheck,
  Clock,
  FileText,
  MapPin,
  MessageSquare,
  PhoneCall,
  Repeat,
  Star,
  UserRoundCheck,
  Wrench,
} from 'lucide-react'

const WHAT_WE_BUILD = [
  {
    icon: PhoneCall,
    title: 'Missed call text-back',
    copy: 'When someone calls and your team cannot answer, the system texts them back, alerts your staff, and starts follow-up.',
  },
  {
    icon: MessageSquare,
    title: 'Website lead follow-up',
    copy: 'When a form comes in, the lead gets a fast reply, the team gets notified, and the opportunity lands in a pipeline.',
  },
  {
    icon: Repeat,
    title: 'Quote and estimate follow-up',
    copy: 'When an estimate goes out, the system checks back, handles common objections, and reminds your team what needs attention.',
  },
  {
    icon: Star,
    title: 'Review request system',
    copy: 'After a job or appointment, happy customers get asked for a review and unhappy customers get routed back to your team.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment reminders',
    copy: 'Customers get confirmations, reminders, and reschedule options so your staff spends less time chasing no-shows.',
  },
  {
    icon: FileText,
    title: 'Office workflow automation',
    copy: 'We clean up repetitive intake, reminders, handoffs, summaries, and admin tasks that slow the business down.',
  },
]

const LOCAL_BUSINESSES = [
  'HVAC, plumbing, roofing, pest control, and home services',
  'Dental offices, med spas, clinics, and professional practices',
  'Law firms, insurance agencies, real estate teams, and local sales teams',
]

const PROCESS = [
  {
    step: '1',
    title: 'Find the leak',
    copy: 'We look at where calls, forms, quotes, appointments, reviews, or admin work are falling through the cracks.',
  },
  {
    step: '2',
    title: 'Map the system',
    copy: 'We decide what should happen first, what AI should handle, what rules it must follow, and when a person takes over.',
  },
  {
    step: '3',
    title: 'Build and connect it',
    copy: 'We install the workflows in GoHighLevel or your current tools, connect phone, SMS, email, forms, calendars, and CRM.',
  },
  {
    step: '4',
    title: 'Keep it running',
    copy: 'We monitor, adjust messages, fix handoffs, and improve the system as the business uses it.',
  },
]

const QUICK_WIN_OPTIONS = [
  'A missed-call text-back flow',
  'A website form response flow',
  'A quote follow-up sequence',
  'A review request workflow',
]

export default function HomePage() {
  return (
    <div className="bg-[#f6f1e8] text-[#201713]">
      <section className="relative overflow-hidden border-b border-[#dfd1bf] bg-[#fffaf1]">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#b46a32]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#dfd1bf] bg-white px-4 py-2 text-sm font-semibold text-[#7b4c2e] shadow-sm">
              <MapPin size={15} />
              Built for local businesses and professional offices
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-[#201713] sm:text-6xl lg:text-7xl">
              We install AI-powered follow-up systems for local businesses.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5147] sm:text-xl">
              AI Implementation Center helps service businesses and offices answer faster, follow up better, book more opportunities, and reduce repetitive admin work. We do the setup, connect the tools, write the workflows, and keep the system running.
            </p>

            <div className="mt-7 rounded-2xl border border-[#dfd1bf] bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#b46a32]">Plain English version</p>
              <p className="mt-2 text-lg leading-8 text-[#3b3029]">
                When someone calls, fills out a form, asks for a quote, misses an appointment, or finishes a job, the system knows what to send, who to notify, when to follow up, and when a real person needs to step in.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b46a32] px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#965322]"
              >
                Request an AI Quick Win <ArrowRight size={18} />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cdb9a5] bg-white px-6 py-4 text-base font-bold text-[#201713] transition hover:bg-[#fbf2e6]"
              >
                Book a local strategy call
              </Link>
            </div>

            <div className="mt-7 grid gap-3 text-sm font-medium text-[#6b5c50] sm:grid-cols-3">
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#2f7d4f]" /> Phone, SMS, email, CRM</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#2f7d4f]" /> GoHighLevel setup</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#2f7d4f]" /> No tech team needed</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#dfd1bf] bg-white p-5 shadow-xl shadow-[#6b3d1f]/10 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#eadfce] pb-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">Example system</p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#201713]">Missed lead recovery</h2>
                <p className="mt-2 text-sm leading-6 text-[#6b5c50]">For a contractor, office, clinic, or service business that cannot answer every call immediately.</p>
              </div>
              <div className="rounded-full border border-[#cfe6d7] bg-[#edf8f1] px-3 py-1 text-xs font-bold text-[#2f7d4f]">Running</div>
            </div>

            <div className="space-y-3">
              {[
                ['Lead calls or fills out a form', 'The system captures the contact and source.'],
                ['Customer gets a fast reply', 'SMS and email go out with the next question or booking link.'],
                ['Team gets notified', 'Staff sees who to call, what happened, and how urgent it is.'],
                ['Follow-up keeps going', 'The system follows up until the lead books, replies, or opts out.'],
              ].map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl border border-[#eadfce] bg-[#fffaf1] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#201713] text-sm font-bold text-white">{index + 1}</div>
                  <div>
                    <p className="font-bold text-[#201713]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#6b5c50]">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#201713] p-5 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#f3c892]"><BellRing size={16} /> Owner summary</div>
              <p className="mt-3 text-sm leading-6 text-[#eadfce]">
                Today: 4 leads came in, 3 got instant replies, 2 booked, 1 needs a staff callback. Google Business Profile produced the highest-value lead.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dfd1bf] bg-[#201713] py-5 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm sm:px-6 lg:px-8">
          <span className="flex items-center gap-2"><Wrench size={16} className="text-[#f3c892]" /> We build the system for you</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2"><PhoneCall size={16} className="text-[#f3c892]" /> Calls, forms, quotes, reviews, reminders</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2"><UserRoundCheck size={16} className="text-[#f3c892]" /> AI helps, your team stays in control</span>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">What we actually do</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              We connect your lead, customer, and office follow-up so less work depends on memory.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5147]">
              A lot of local businesses already have a website, phone number, CRM, email, and maybe GoHighLevel. The problem is that those pieces do not always talk to each other. We set up the process between them.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {WHAT_WE_BUILD.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-[#dfd1bf] bg-white p-5 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5e2ce] text-[#965322]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold tracking-[-0.03em] text-[#201713]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6b5c50]">{item.copy}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfd1bf] bg-white px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">Local business fit</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Built for owners who still answer the phone, chase quotes, and check the schedule themselves.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5147]">
              We are not selling a SaaS dashboard for someone else to figure out. We install practical systems for businesses where missed follow-up turns into missed revenue.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#dfd1bf] bg-[#fffaf1] p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">Good first clients</p>
            <ul className="mt-5 space-y-4">
              {LOCAL_BUSINESSES.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-[#eadfce] bg-white p-4 text-[#3b3029]">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#2f7d4f]" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">AI belongs inside the process</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              ChatGPT alone will not fix a broken follow-up process.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5147]">
              AI helps when it has a job, rules, context, and a handoff. We build the repeatable sequence around it: when to send, what to say, who to notify, what to track, and when a person takes over.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {PROCESS.map((item) => (
              <div key={item.step} className="rounded-2xl border border-[#dfd1bf] bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b46a32] text-sm font-bold text-white">{item.step}</div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6b5c50]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfd1bf] bg-[#201713] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c892]">Start small</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Request one AI Quick Win before you commit to a full buildout.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#eadfce]">
              Send us one area where leads or office work are slipping. We will show the workflow your business should be using. If it makes sense, we can install and manage it for you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f3c892] px-6 py-4 text-base font-bold text-[#201713] transition hover:bg-[#ffd9a4]"
              >
                Request My AI Quick Win <ArrowRight size={18} />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                Talk through the first system
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/5 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c892]">Common quick wins</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {QUICK_WIN_OPTIONS.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4">
                  <ClipboardCheck size={18} className="mt-0.5 shrink-0 text-[#f3c892]" />
                  <span className="text-sm leading-6 text-[#fffaf1]">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-white/15 bg-black/20 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#f3c892]"><Clock size={16} /> The goal</div>
              <p className="mt-3 text-sm leading-6 text-[#eadfce]">
                Give the owner one useful system they can understand right away. No generic audit. No AI lecture. A clear workflow that saves time or recovers missed opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

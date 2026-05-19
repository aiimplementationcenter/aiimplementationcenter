import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  CheckCircle,
  ClipboardCheck,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  PhoneCall,
  Repeat,
  Star,
  UserRoundCheck,
  Wrench,
} from 'lucide-react'

const TEXT_NUMBER_DISPLAY = '816-509-5368'
const TEXT_NUMBER_LINK = '+18165095368'
const TEXT_MESSAGE = 'I am interested in one of your quick fixes to see if it will help my business.'
const SMS_LINK = `sms:${TEXT_NUMBER_LINK}?&body=${encodeURIComponent(TEXT_MESSAGE)}`
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvzyzark'

const PAIN_POINTS = [
  {
    icon: PhoneCall,
    title: 'Missed calls turn into missed jobs',
    pain: 'Your team is busy, the customer calls someone else, and nobody knows what was lost.',
    fix: 'We install missed-call text-back, staff alerts, follow-up, and a simple lead pipeline.',
  },
  {
    icon: MessageSquare,
    title: 'Website leads sit too long',
    pain: 'Form fills land in an inbox and wait for whoever checks email first.',
    fix: 'We connect the form to instant SMS/email response, staff notification, and follow-up.',
  },
  {
    icon: Repeat,
    title: 'Quotes stop getting followed up',
    pain: 'Estimates go out, then the deal depends on memory, sticky notes, or manual callbacks.',
    fix: 'We build a quote follow-up sequence with reminders, reply alerts, and next-step messages.',
  },
  {
    icon: Star,
    title: 'Happy customers do not leave reviews',
    pain: 'The job goes well, but nobody asks at the right time or routes unhappy feedback privately.',
    fix: 'We install review requests, private feedback capture, and alerts when a customer needs attention.',
  },
  {
    icon: CalendarCheck,
    title: 'No-shows waste the schedule',
    pain: 'Appointments get forgotten, moved, or missed, and your staff has to chase confirmations.',
    fix: 'We build confirmation texts, reminders, reschedule links, and no-show recovery messages.',
  },
  {
    icon: FileText,
    title: 'Office work keeps pulling you back in',
    pain: 'Intake, reminders, summaries, handoffs, and repetitive admin work keep landing on people.',
    fix: 'We map one repeatable office task and build the workflow that handles it with rules and AI support.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Pick the pain',
    copy: 'Choose one problem from the list or tell us the process that keeps costing time, leads, or attention.',
  },
  {
    step: '2',
    title: 'We map the quick fix',
    copy: 'We show the workflow that should happen: trigger, message, staff alert, follow-up, handoff, and tracking.',
  },
  {
    step: '3',
    title: 'We install the first system',
    copy: 'If the fix makes sense, we connect it in GoHighLevel or your current tools and make it work in the business.',
  },
  {
    step: '4',
    title: 'Then we talk bigger',
    copy: 'Once the first pain is solved, we look at the next bottleneck and decide whether a broader system is worth it.',
  },
]

const LOCAL_BUSINESSES = [
  'HVAC, plumbing, roofing, pest control, and home services',
  'Dental offices, med spas, clinics, and professional practices',
  'Law firms, insurance agencies, real estate teams, and local sales teams',
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
              Local-business systems built around one real problem first
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-[#201713] sm:text-6xl lg:text-7xl">
              Pick a business pain. We will build the first quick fix.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5147] sm:text-xl">
              AI Implementation Center helps local businesses fix the follow-up, lead response, review, scheduling, and office workflows that keep costing time and money. We solve one painful process first. If it helps, then we talk about the bigger system.
            </p>

            <div className="mt-7 rounded-2xl border border-[#dfd1bf] bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#b46a32]">What we do</p>
              <p className="mt-2 text-lg leading-8 text-[#3b3029]">
                We connect your phone, forms, SMS, email, CRM, calendar, and staff handoffs so the business knows what to do when a lead comes in, a quote goes quiet, a customer misses an appointment, or an office task needs to happen again.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={SMS_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b46a32] px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#965322]"
              >
                Text {TEXT_NUMBER_DISPLAY} <ArrowRight size={18} />
              </a>
              <a
                href="#quick-fix-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cdb9a5] bg-white px-6 py-4 text-base font-bold text-[#201713] transition hover:bg-[#fbf2e6]"
              >
                Email us your pain point
              </a>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#6b5c50]">
              Text message is prefilled: “{TEXT_MESSAGE}”
            </p>
          </div>

          <div className="rounded-[28px] border border-[#dfd1bf] bg-white p-5 shadow-xl shadow-[#6b3d1f]/10 sm:p-6">
            <div className="mb-5 border-b border-[#eadfce] pb-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">Example quick fix</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#201713]">Your missed-call problem</h2>
              <p className="mt-2 text-sm leading-6 text-[#6b5c50]">A customer calls. Your team is busy. The lead can go cold before anyone knows it happened.</p>
            </div>

            <div className="space-y-3">
              {[
                ['Call gets missed', 'The system catches the caller and creates or updates the contact.'],
                ['Customer gets a text', 'They get a fast reply asking how you can help or offering the next step.'],
                ['Staff gets the summary', 'Your team sees who called, when they called, and what needs to happen.'],
                ['Follow-up keeps moving', 'The system follows up until the customer books, replies, or opts out.'],
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
              <div className="flex items-center gap-2 text-sm font-semibold text-[#f3c892]"><BellRing size={16} /> Why this matters</div>
              <p className="mt-3 text-sm leading-6 text-[#eadfce]">
                The owner gets one fix they can understand. No AI lecture. No giant project. One painful leak handled by a repeatable system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dfd1bf] bg-[#201713] py-5 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm sm:px-6 lg:px-8">
          <span className="flex items-center gap-2"><Wrench size={16} className="text-[#f3c892]" /> Pick one problem</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2"><ClipboardCheck size={16} className="text-[#f3c892]" /> Let us solve it first</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2"><UserRoundCheck size={16} className="text-[#f3c892]" /> Then decide if we should help more</span>
        </div>
      </section>

      <section id="quick-fixes" className="px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">Choose your quick fix</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Which of these pains is costing your business time, money, or attention?
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5147]">
              Start with the one that feels familiar. Text us the number or send the form below. We will look at the pain and show you the first system we would build around it.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PAIN_POINTS.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-[#dfd1bf] bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5e2ce] text-[#965322]">
                      <Icon size={22} />
                    </div>
                    <div className="rounded-full bg-[#201713] px-3 py-1 text-xs font-bold text-white">#{index + 1}</div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-[#201713]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6b5c50]"><span className="font-bold text-[#201713]">Pain:</span> {item.pain}</p>
                  <p className="mt-3 text-sm leading-6 text-[#6b5c50]"><span className="font-bold text-[#201713]">Quick fix:</span> {item.fix}</p>
                  <a href={SMS_LINK} className="mt-5 inline-flex text-sm font-bold text-[#b46a32] hover:text-[#965322]">
                    Text us about fix #{index + 1}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfd1bf] bg-white px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">How we sell it</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              We do not ask you to buy a full AI system before we fix something real.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5147]">
              Most owners have been pitched enough software, ads, websites, and AI tools. We keep the first step simple: pick a pain, let us solve the first version, then decide whether more help makes sense.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="rounded-2xl border border-[#dfd1bf] bg-[#fffaf1] p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b46a32] text-sm font-bold text-white">{item.step}</div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6b5c50]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
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

          <div className="rounded-[28px] border border-[#dfd1bf] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b46a32]">Good first clients</p>
            <ul className="mt-5 space-y-4">
              {LOCAL_BUSINESSES.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-[#eadfce] bg-[#fffaf1] p-4 text-[#3b3029]">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#2f7d4f]" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfd1bf] bg-[#fffaf1] px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
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
        </div>
      </section>

      <section id="quick-fix-form" className="bg-[#201713] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f3c892]">Send the pain point</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Text us or email the problem you want fixed first.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#eadfce]">
              You do not need a perfect brief. Tell us what keeps slipping through the cracks. We will point you toward the first quick fix and, if it makes sense, install it for you.
            </p>
            <a
              href={SMS_LINK}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#f3c892] px-6 py-4 text-base font-bold text-[#201713] transition hover:bg-[#ffd9a4]"
            >
              Text {TEXT_NUMBER_DISPLAY} <ArrowRight size={18} />
            </a>
          </div>

          <form action={FORMSPREE_ENDPOINT} method="POST" className="rounded-[28px] border border-white/15 bg-white/5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-[#f3c892]">
                Name
                <input name="name" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-[#201713] outline-none ring-[#f3c892] focus:ring-2" placeholder="Your name" required />
              </label>
              <label className="block text-sm font-bold text-[#f3c892]">
                Business
                <input name="business" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-[#201713] outline-none ring-[#f3c892] focus:ring-2" placeholder="Business name" />
              </label>
              <label className="block text-sm font-bold text-[#f3c892]">
                Email
                <input name="email" type="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-[#201713] outline-none ring-[#f3c892] focus:ring-2" placeholder="you@business.com" required />
              </label>
              <label className="block text-sm font-bold text-[#f3c892]">
                Phone
                <input name="phone" type="tel" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-[#201713] outline-none ring-[#f3c892] focus:ring-2" placeholder="Best number" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold text-[#f3c892]">
              Which pain should we quick-fix first?
              <select name="quick_fix" className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-[#201713] outline-none ring-[#f3c892] focus:ring-2" required>
                <option value="">Choose one</option>
                {PAIN_POINTS.map((item, index) => (
                  <option key={item.title} value={`${index + 1}. ${item.title}`}>{index + 1}. {item.title}</option>
                ))}
                <option value="Other">Other pain point</option>
              </select>
            </label>
            <label className="mt-4 block text-sm font-bold text-[#f3c892]">
              What is happening now?
              <textarea name="message" rows={5} className="mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-[#201713] outline-none ring-[#f3c892] focus:ring-2" placeholder="Example: We miss calls during jobs and nobody follows up until the next day." required />
            </label>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f3c892] px-6 py-4 text-base font-bold text-[#201713] transition hover:bg-[#ffd9a4]">
              Email us my pain point <Mail size={18} />
            </button>
            <p className="mt-4 text-sm leading-6 text-[#eadfce]">
              Prefer texting? Send “{TEXT_MESSAGE}” to {TEXT_NUMBER_DISPLAY}.
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

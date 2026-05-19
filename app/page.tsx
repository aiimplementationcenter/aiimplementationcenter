import {
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  ClipboardCheck,
  FileText,
  Mail,
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

function smsLinkForPain(pain: string) {
  return `sms:${TEXT_NUMBER_LINK}?&body=${encodeURIComponent(`I am interested in your ${pain} quick fix to see if it will help my business.`)}`
}

const PAIN_POINTS = [
  {
    icon: PhoneCall,
    title: 'Missed calls',
    pain: 'You miss the call, the customer keeps searching, and the job may be gone before anyone calls back.',
    fix: 'Missed-call text-back, staff alert, contact capture, and follow-up until the person books or replies.',
  },
  {
    icon: MessageSquare,
    title: 'Slow website replies',
    pain: 'A form lead lands in an inbox. Nobody knows whether it was answered, followed up, or booked.',
    fix: 'Instant text/email response, team notification, pipeline entry, and follow-up sequence.',
  },
  {
    icon: Repeat,
    title: 'Quotes that go quiet',
    pain: 'You send the estimate. Then the sale depends on memory, sticky notes, or somebody remembering to check back.',
    fix: 'Quote follow-up texts, reply alerts, reminders, and next-step messages that keep the deal moving.',
  },
  {
    icon: Star,
    title: 'Not enough reviews',
    pain: 'Good customers leave happy, but nobody asks at the right time. Bad feedback reaches you too late.',
    fix: 'Review request workflow, private feedback capture, and alerts when a customer needs a call.',
  },
  {
    icon: CalendarCheck,
    title: 'No-shows and reschedules',
    pain: 'Your calendar gets holes because reminders, confirmations, and reschedule steps are handled by hand.',
    fix: 'Confirmation texts, reminder sequence, reschedule link, and no-show recovery follow-up.',
  },
  {
    icon: FileText,
    title: 'Repeating office tasks',
    pain: 'You or your staff keep doing the same intake, reminder, summary, or handoff work every week.',
    fix: 'A rules-based workflow that handles one repeatable admin process and flags a person when needed.',
  },
]

const PROCESS_STEPS = [
  ['Pick one pain', 'You tell us which leak you want fixed first.'],
  ['We map the quick fix', 'We lay out the trigger, message, follow-up, alert, and handoff.'],
  ['You see the path', 'You can tell whether the fix is worth using before you spend money on it.'],
  ['Then we build if it fits', 'If the quick fix makes sense, we install and manage the system.'],
]

const LOCAL_BUSINESSES = [
  'Home services: HVAC, plumbing, roofing, pest control, remodeling',
  'Local offices: dental, med spas, clinics, law firms, insurance',
  'Sales teams: real estate, contractors, agencies, service companies',
]

function ProcessVisual() {
  return (
    <div className="hf-stage rounded-[30px] border border-[#b8dce2] bg-[#071f2b] p-5 shadow-2xl shadow-[#00bcd4]/20 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6ff8ff]">Quick fix flow</p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Missed call example</h2>
        </div>
        <div className="rounded-full border border-[#7ff7ff]/40 bg-[#7ff7ff]/10 px-3 py-1 text-xs font-bold text-[#b9fbff]">No upfront cost</div>
      </div>

      <div className="relative space-y-3">
        <div className="hf-line" />
        {[
          ['Lead calls', 'Your team is busy.'],
          ['Text goes out', '“Sorry we missed you. What can we help with?”'],
          ['Staff gets context', 'Name, number, source, and next step are logged.'],
          ['Follow-up continues', 'The lead gets followed up until they book or opt out.'],
        ].map(([title, text], index) => (
          <div key={title} className="hf-frame relative grid grid-cols-[44px_1fr] gap-3 rounded-2xl border border-[#7ff7ff]/25 bg-white/8 p-4 backdrop-blur" style={{ animationDelay: `${index * 180}ms` }}>
            <div className="hf-dot flex h-11 w-11 items-center justify-center rounded-full border border-[#7ff7ff]/50 bg-[#0d3443] text-sm font-bold text-[#7ff7ff]">{index + 1}</div>
            <div>
              <p className="font-bold text-white">{title}</p>
              <p className="mt-1 text-sm leading-6 text-[#c9e6eb]">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[#ef1d2b]/35 bg-[#ef1d2b]/10 p-4">
        <p className="text-sm font-bold text-white">The point</p>
        <p className="mt-2 text-sm leading-6 text-[#d8eef2]">You do not buy a whole platform first. You see whether one fix can save time, recover leads, or protect revenue.</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="bg-[#eef7f8] text-[#09242f]">
      <section className="relative overflow-hidden border-b border-[#8fcfd8] bg-[#ffffff]">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[#a90f16]" />
        <div className="absolute right-0 top-0 hidden h-full w-[42%] bg-[#e0fbff] lg:block" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <div className="relative flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#0aaec0]/35 bg-[#e0fbff] px-4 py-2 text-sm font-black text-[#071f2b] shadow-sm">
              <Wrench size={15} />
              No upfront cost to look at one quick fix
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#071f2b] sm:text-6xl lg:text-7xl">
              Pick one problem. Let us show you the first fix.
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-[#183641] sm:text-2xl sm:leading-10">
              Missed calls. Slow lead response. Quotes that go quiet. Review requests. No-shows. Repeating office work. Send us the pain point. We will show you the first workflow to fix before you spend money on a bigger system.
            </p>

            <div className="mt-7 rounded-2xl border border-[#071f2b] bg-[#071f2b] p-5 shadow-xl shadow-[#071f2b]/15">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#7ff7ff]">Plain version</p>
              <p className="mt-2 text-lg leading-8 text-white">
                You choose one leak in the business. We map the text, email, CRM, calendar, staff alert, and follow-up sequence that should handle it. If that quick fix looks like it can save time or bring back revenue, we can install it.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={SMS_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0aaec0] px-6 py-4 text-base font-black text-white shadow-lg shadow-[#0aaec0]/25 transition hover:bg-[#087f90]"
              >
                Text {TEXT_NUMBER_DISPLAY} <ArrowRight size={18} />
              </a>
              <a
                href="#quick-fix-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#9fdbe2] bg-white px-6 py-4 text-base font-black text-[#09242f] transition hover:bg-[#e0fbff]"
              >
                Email the pain point
              </a>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#183641]">
              Text message is prefilled: “{TEXT_MESSAGE}”
            </p>
          </div>

          <ProcessVisual />
        </div>
      </section>

      <section className="border-b border-[#b8dce2] bg-[#071f2b] py-5 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm sm:px-6 lg:px-8">
          <span className="flex items-center gap-2"><ClipboardCheck size={16} className="text-[#7ff7ff]" /> Pick a pain</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2"><UserRoundCheck size={16} className="text-[#7ff7ff]" /> See the quick fix</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-[#7ff7ff]" /> Spend money only if it makes sense</span>
        </div>
      </section>

      <section id="quick-fixes" className="px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a90f16]">Choose the problem</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.045em] text-[#071f2b] sm:text-5xl">
              Start with the pain you already know is costing you.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365661]">
              Text the number beside the one that fits, or send the form below. Keep it simple. “We miss calls.” “Quotes do not get followed up.” “Nobody asks for reviews.” That is enough to start.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PAIN_POINTS.map((item, index) => {
              const Icon = item.icon
              const painSmsLink = smsLinkForPain(item.title.toLowerCase())
              return (
                <div key={item.title} className="group rounded-2xl border border-[#b8dce2] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#0aaec0] hover:shadow-xl hover:shadow-[#0aaec0]/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9fbff] text-[#087f90]">
                      <Icon size={22} />
                    </div>
                    <div className="rounded-full border border-[#ef1d2b]/30 bg-[#fff4f5] px-3 py-1 text-xs font-black text-[#a90f16]">#{index + 1}</div>
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#071f2b]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#48646c]"><span className="font-black text-[#071f2b]">Pain:</span> {item.pain}</p>
                  <p className="mt-3 text-sm leading-6 text-[#48646c]"><span className="font-black text-[#071f2b]">First fix:</span> {item.fix}</p>
                  <a href={painSmsLink} className="mt-5 inline-flex text-sm font-black text-[#0d5263] hover:text-[#a90f16]">
                    Text us about #{index + 1}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#b8dce2] bg-white px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a90f16]">How this works</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.045em] text-[#071f2b] sm:text-5xl">
              No big pitch first. No software homework.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365661]">
              You should not have to buy a full buildout just to find out whether automation will help. We start with one pain and one fix. If it can increase revenue, recover leads, or save staff time, then we talk about installing the full version.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PROCESS_STEPS.map(([title, copy], index) => (
              <div key={title} className="relative overflow-hidden rounded-2xl border border-[#b8dce2] bg-[#f8feff] p-6 shadow-sm">
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[40px] bg-[#d9fbff]" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#071f2b] text-sm font-black text-[#7ff7ff]">{index + 1}</div>
                <h3 className="relative mt-5 text-xl font-black tracking-[-0.03em] text-[#071f2b]">{title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-[#48646c]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a90f16]">Local business fit</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.045em] text-[#071f2b] sm:text-5xl">
              Built for businesses where one missed lead can matter.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365661]">
              This is for service businesses and offices that already get calls, forms, quote requests, appointments, or repeat admin work. We fix the handoff between the people, the software, and the follow-up.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#b8dce2] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a90f16]">Good fit</p>
            <ul className="mt-5 space-y-4">
              {LOCAL_BUSINESSES.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-[#b8dce2] bg-[#f8feff] p-4 text-[#183641]">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#0aaec0]" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-[#b8dce2] bg-[#071f2b] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7ff7ff]">AI belongs in the workflow</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
              ChatGPT is not a business system.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#c9e6eb]">
              AI helps after the process is clear. It needs a trigger, rules, context, a message, a handoff, and a way to track what happened. We build that sequence first. AI works inside it.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#7ff7ff]/25 bg-white/8 p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {['Trigger', 'Rules', 'AI assist', 'Human handoff', 'Follow-up', 'Tracking'].map((item) => (
                <div key={item} className="rounded-2xl border border-[#7ff7ff]/20 bg-white/8 p-4 text-sm font-bold text-[#d8fbff]">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quick-fix-form" className="bg-[#f8feff] px-4 py-18 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a90f16]">Send the pain point</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.045em] text-[#071f2b] sm:text-5xl">
              Text or email the one problem you want fixed first.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365661]">
              No upfront cost to ask. No need to explain your whole business. Pick the pain point. We will tell you what the first quick fix should look like and whether it is worth taking further.
            </p>
            <a
              href={SMS_LINK}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0aaec0] px-6 py-4 text-base font-black text-white shadow-lg shadow-[#0aaec0]/25 transition hover:bg-[#087f90]"
            >
              Text {TEXT_NUMBER_DISPLAY} <ArrowRight size={18} />
            </a>
          </div>

          <form action={FORMSPREE_ENDPOINT} method="POST" className="rounded-[28px] border border-[#b8dce2] bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-black text-[#071f2b]">
                Name
                <input name="name" className="mt-2 w-full rounded-xl border border-[#b8dce2] bg-[#f8feff] px-4 py-3 text-[#071f2b] outline-none ring-[#0aaec0] focus:ring-2" placeholder="Your name" required />
              </label>
              <label className="block text-sm font-black text-[#071f2b]">
                Business
                <input name="business" className="mt-2 w-full rounded-xl border border-[#b8dce2] bg-[#f8feff] px-4 py-3 text-[#071f2b] outline-none ring-[#0aaec0] focus:ring-2" placeholder="Business name" />
              </label>
              <label className="block text-sm font-black text-[#071f2b]">
                Email
                <input name="email" type="email" className="mt-2 w-full rounded-xl border border-[#b8dce2] bg-[#f8feff] px-4 py-3 text-[#071f2b] outline-none ring-[#0aaec0] focus:ring-2" placeholder="you@business.com" required />
              </label>
              <label className="block text-sm font-black text-[#071f2b]">
                Phone
                <input name="phone" type="tel" className="mt-2 w-full rounded-xl border border-[#b8dce2] bg-[#f8feff] px-4 py-3 text-[#071f2b] outline-none ring-[#0aaec0] focus:ring-2" placeholder="Best number" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-black text-[#071f2b]">
              Which quick fix should we look at first?
              <select name="quick_fix" className="mt-2 w-full rounded-xl border border-[#b8dce2] bg-[#f8feff] px-4 py-3 text-[#071f2b] outline-none ring-[#0aaec0] focus:ring-2" required>
                <option value="">Choose one</option>
                {PAIN_POINTS.map((item, index) => (
                  <option key={item.title} value={`${index + 1}. ${item.title}`}>{index + 1}. {item.title}</option>
                ))}
                <option value="Other">Other pain point</option>
              </select>
            </label>
            <label className="mt-4 block text-sm font-black text-[#071f2b]">
              What is happening now?
              <textarea name="message" rows={5} className="mt-2 w-full rounded-xl border border-[#b8dce2] bg-[#f8feff] px-4 py-3 text-[#071f2b] outline-none ring-[#0aaec0] focus:ring-2" placeholder="Example: We miss calls during jobs and follow up the next day, if we remember." required />
            </label>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0aaec0] px-6 py-4 text-base font-black text-white transition hover:bg-[#087f90]">
              Email my pain point <Mail size={18} />
            </button>
            <p className="mt-4 text-sm leading-6 text-[#55727a]">
              Prefer texting? Send “{TEXT_MESSAGE}” to {TEXT_NUMBER_DISPLAY}.
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

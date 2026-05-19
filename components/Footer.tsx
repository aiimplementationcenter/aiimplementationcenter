import Link from 'next/link'
import Image from 'next/image'

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'AI Implementation Center'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.08] bg-[#08090a] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Link href="/" className="mb-4 flex items-center">
              <Image
                src="/logo.png"
                alt="AI Implementation Center"
                width={300}
                height={65}
                className="h-14 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="max-w-sm text-sm leading-6">
              We build AI-assisted business systems with workflows, rules, handoffs, and reporting. AI is the tool inside the process, not the whole solution.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Company</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/use-cases" className="transition-colors hover:text-white">Systems</Link></li>
                <li><Link href="/quiz" className="transition-colors hover:text-white">AI Readiness</Link></li>
                <li><Link href="/book" className="transition-colors hover:text-white">Book a Call</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Start</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/intake" className="transition-colors hover:text-white">Request AI Quick Win</Link></li>
                <li><Link href="/book" className="transition-colors hover:text-white">Strategy Call</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/[0.08] pt-6 text-center text-sm">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

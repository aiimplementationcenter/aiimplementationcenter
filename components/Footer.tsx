import Link from 'next/link'
import Image from 'next/image'

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'AI Implementation Center'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#dfd1bf] bg-[#fffaf1] text-[#6b5c50]">
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
            <p className="max-w-md text-sm leading-6">
              AI Implementation Center installs practical AI-powered follow-up and office systems for local businesses and professional offices. We connect the calls, forms, quotes, appointments, reviews, CRM, and staff handoffs that keep work moving.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold text-[#201713]">Company</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/use-cases" className="transition-colors hover:text-[#201713]">What We Build</Link></li>
                <li><Link href="/quiz" className="transition-colors hover:text-[#201713]">Find Your First System</Link></li>
                <li><Link href="/book" className="transition-colors hover:text-[#201713]">Book a Call</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold text-[#201713]">Start</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/intake" className="transition-colors hover:text-[#201713]">Request AI Quick Win</Link></li>
                <li><Link href="/book" className="transition-colors hover:text-[#201713]">Strategy Call</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#dfd1bf] pt-6 text-center text-sm">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

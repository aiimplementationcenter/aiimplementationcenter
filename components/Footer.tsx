import Link from 'next/link'
import Image from 'next/image'

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'AI Implementation Center'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link href="/" className="flex items-center mb-3">
              <Image
                src="/logo.png"
                alt="AI Implementation Center"
                width={300}
                height={65}
                className="h-16 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm max-w-xs">
              Helping businesses at every stage discover and implement AI that actually works.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-white font-semibold text-sm mb-3">Product</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/use-cases" className="hover:text-white transition-colors">Use Cases</Link></li>
                <li><Link href="/quiz" className="hover:text-white transition-colors">AI Readiness Quiz</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Book a Call</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 text-sm text-center">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

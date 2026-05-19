'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-white/[0.08] bg-[#08090a] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="AI Implementation Center"
              width={360}
              height={72}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link href="/use-cases" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              Systems
            </Link>
            <Link href="/quiz" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              AI Readiness
            </Link>
            <Link href="/book" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              Book a Call
            </Link>
            <Link href="/intake" className="rounded-lg bg-[#5e6ad2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7170ff]">
              Request Quick Win
            </Link>
          </div>

          <button
            className="text-slate-300 hover:text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-3 pb-5 md:hidden">
            <Link href="/use-cases" className="py-2 text-sm font-medium text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              Systems
            </Link>
            <Link href="/quiz" className="py-2 text-sm font-medium text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              AI Readiness
            </Link>
            <Link href="/book" className="py-2 text-sm font-medium text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              Book a Call
            </Link>
            <Link href="/intake" className="rounded-lg bg-[#5e6ad2] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#7170ff]" onClick={() => setOpen(false)}>
              Request Quick Win
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

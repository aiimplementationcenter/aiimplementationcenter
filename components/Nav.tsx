'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-[#dfd1bf] bg-[#fffaf1] text-[#201713]">
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
            <Link href="/use-cases" className="text-sm font-semibold text-[#5f5147] transition-colors hover:text-[#201713]">
              What We Build
            </Link>
            <Link href="/quiz" className="text-sm font-semibold text-[#5f5147] transition-colors hover:text-[#201713]">
              Find Your First System
            </Link>
            <Link href="/book" className="text-sm font-semibold text-[#5f5147] transition-colors hover:text-[#201713]">
              Book a Call
            </Link>
            <Link href="/intake" className="rounded-xl bg-[#b46a32] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#965322]">
              Request Quick Win
            </Link>
          </div>

          <button
            className="text-[#5f5147] hover:text-[#201713] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-3 pb-5 md:hidden">
            <Link href="/use-cases" className="py-2 text-sm font-semibold text-[#5f5147] hover:text-[#201713]" onClick={() => setOpen(false)}>
              What We Build
            </Link>
            <Link href="/quiz" className="py-2 text-sm font-semibold text-[#5f5147] hover:text-[#201713]" onClick={() => setOpen(false)}>
              Find Your First System
            </Link>
            <Link href="/book" className="py-2 text-sm font-semibold text-[#5f5147] hover:text-[#201713]" onClick={() => setOpen(false)}>
              Book a Call
            </Link>
            <Link href="/intake" className="rounded-xl bg-[#b46a32] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#965322]" onClick={() => setOpen(false)}>
              Request Quick Win
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

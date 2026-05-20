'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const TEXT_NUMBER_LINK = '+18165095368'
const TEXT_MESSAGE = 'I am interested in one of your quick fixes to see if it will help my business.'
const SMS_LINK = `sms:${TEXT_NUMBER_LINK}?&body=${encodeURIComponent(TEXT_MESSAGE)}`

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-[#b8dce2] bg-[#f8feff] text-[#09242f]">
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
            <Link href="/#quick-fixes" className="text-sm font-bold text-[#365661] transition-colors hover:text-[#071f2b]">
              Systems
            </Link>
            <Link href="/#quick-fix-form" className="text-sm font-bold text-[#365661] transition-colors hover:text-[#071f2b]">
              Send a Pain Point
            </Link>
            <Link href="/book" className="text-sm font-bold text-[#365661] transition-colors hover:text-[#071f2b]">
              Book a Call
            </Link>
            <a href={SMS_LINK} className="rounded-xl bg-[#0aaec0] px-5 py-2.5 text-sm font-black text-white shadow-sm transition-colors hover:bg-[#087f90]">
              Text 816-509-5368
            </a>
          </div>

          <button
            className="text-[#365661] hover:text-[#071f2b] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-3 pb-5 md:hidden">
            <Link href="/#quick-fixes" className="py-2 text-sm font-bold text-[#365661] hover:text-[#071f2b]" onClick={() => setOpen(false)}>
              Systems
            </Link>
            <Link href="/#quick-fix-form" className="py-2 text-sm font-bold text-[#365661] hover:text-[#071f2b]" onClick={() => setOpen(false)}>
              Send a Pain Point
            </Link>
            <Link href="/book" className="py-2 text-sm font-bold text-[#365661] hover:text-[#071f2b]" onClick={() => setOpen(false)}>
              Book a Call
            </Link>
            <a href={SMS_LINK} className="rounded-xl bg-[#0aaec0] px-5 py-3 text-center text-sm font-black text-white transition-colors hover:bg-[#087f90]" onClick={() => setOpen(false)}>
              Text 816-509-5368
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

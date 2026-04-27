'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="AI Implementation Center"
              width={560}
              height={112}
              className="h-28 w-auto object-contain"
priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/use-cases" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Use Cases
            </Link>
            <Link href="/quiz" className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
              Take the Quiz
            </Link>
            <Link href="/book" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Book a Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/use-cases" className="text-slate-300 hover:text-white py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              Use Cases
            </Link>
            <Link href="/quiz" className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg text-center transition-colors" onClick={() => setOpen(false)}>
              Take the Quiz
            </Link>
            <Link href="/book" className="text-slate-300 hover:text-white py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              Book a Call
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

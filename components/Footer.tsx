import Link from 'next/link'
import Image from 'next/image'

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'AI Implementation Center'
const textMessage = 'I am interested in one of your quick fixes to see if it will help my business.'
const smsLink = `sms:+18165095368?&body=${encodeURIComponent(textMessage)}`

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#b8dce2] bg-[#f8feff] text-[#48646c]">
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
              S.Y.S.T.E.M means Save Yourself Time, Energy, Money. We build AI-integrated systems inside current workflows so companies can save all three. Start with one no-upfront-cost quick fix, then build deeper if it makes sense.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-black text-[#071f2b]">AI systems</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#quick-fixes" className="transition-colors hover:text-[#071f2b]">View Starting Points</Link></li>
                <li><Link href="/#quick-fix-form" className="transition-colors hover:text-[#071f2b]">Email a Pain Point</Link></li>
                <li><Link href="/book" className="transition-colors hover:text-[#071f2b]">Book a Call</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-black text-[#071f2b]">Text us</p>
              <ul className="space-y-2 text-sm">
                <li><a href={smsLink} className="font-black text-[#0d5263] transition-colors hover:text-[#a90f16]">816-509-5368</a></li>
                <li className="max-w-52">Ask which quick fix can help your business first.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#b8dce2] pt-6 text-center text-sm">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Intake Submitted | AI Implementation Center',
}

export default function IntakeSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-emerald-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          You're all set!
        </h1>

        <p className="text-slate-600 mb-2">
          We've received everything we need to build your custom automation workflows.
        </p>

        <p className="text-slate-600 mb-8">
          We'll have your Command Center configured and reach out within 1–2 business days to walk you through it.
        </p>

        <div className="bg-slate-50 rounded-xl p-5 text-left mb-8">
          <p className="text-sm font-semibold text-slate-700 mb-2">What happens next:</p>
          <ol className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="font-semibold text-slate-800 shrink-0">1.</span>
              We review your intake and map out your automation flows
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-slate-800 shrink-0">2.</span>
              We build and test your workflows against your actual tools
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-slate-800 shrink-0">3.</span>
              We schedule a 30-min walkthrough to connect everything live
            </li>
          </ol>
        </div>

        <Link
          href="/"
          className="inline-block bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

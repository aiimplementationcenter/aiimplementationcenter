import IntakeForm from '@/components/intake/IntakeForm'

export const metadata = {
  title: 'Client Intake | AI Implementation Center',
  description: 'Tell us about your business so we can build your custom automation workflows.',
}

export default function IntakePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <IntakeForm />
    </div>
  )
}

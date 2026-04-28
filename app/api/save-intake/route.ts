import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('client_intakes')
      .insert([body])
      .select('id')
      .single()

    if (error) {
      console.error('Intake save error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Intake route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

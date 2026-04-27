import { supabase } from '@/lib/supabase'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase
    .from('leads')
    .select('report_content, company_name, industry, maturity_stage, created_at')
    .eq('report_id', id)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Report not found' }, { status: 404 })
  }

  return Response.json(data)
}

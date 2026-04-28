import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

export const maxDuration = 60

function getOpenAI() {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY!,
    defaultHeaders: {
      'HTTP-Referer': process.env.NEXT_PUBLIC_COMPANY_URL ?? 'https://localhost:3000',
      'X-Title': process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'AI Implementation Center',
    },
  })
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

async function scrapeWebsite(url: string): Promise<string> {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`
    const res = await fetch(jinaUrl, {
      headers: { Accept: 'text/plain' },
      signal: AbortSignal.timeout(7000),
    })
    if (!res.ok) return ''
    const text = await res.text()
    return text.slice(0, 2500)
  } catch {
    return ''
  }
}

async function searchInternet(query: string): Promise<string> {
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        max_results: 2,
        include_answer: true,
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return ''
    const data = await res.json()
    const snippets = (data.results ?? [])
      .map((r: { title: string; content: string }) => `${r.title}: ${r.content.slice(0, 300)}`)
      .join('\n\n')
    return (data.answer ? `Summary: ${data.answer}\n\n` : '') + snippets
  } catch {
    return ''
  }
}

const REPORT_SCHEMA = `{
  "companyName": <string — the real business name extracted from the website content>,
  "maturityStage": <number 1-4>,
  "maturityLabel": <string>,
  "maturityDescription": <string — 1 sentence, specific to this company, names a real competitive risk of waiting>,
  "websiteObservations": [<string>, <string>, <string>],
  "orchestrationFlows": [
    {
      "trigger": <string — the single event that sets this flow in motion, e.g. "A potential customer calls after hours">,
      "title": <string — name of this automated workflow, specific to this company's business>,
      "actions": [<string — one specific automated action, max 20 words>, <string>, <string>, <string>],
      "businessImpact": <string — 1 sentence on the concrete outcome this flow creates for this specific business>
    }
  ],
  "aiRoleOpportunities": [
    {
      "role": <string — the role title, e.g. "After-Hours Receptionist" or "Follow-Up Coordinator">,
      "whatAICanDo": <string — 2-3 sentences on exactly how AI handles this role for THIS company, referencing their actual services and customer journey>,
      "availability": "24/7/365 — no sick days, no turnover, no benefits",
      "estimatedSavings": <string — estimated annual cost savings vs. hiring a person>
    }
  ],
  "roadmap": {
    "phase1": [<string — specific integration or automation to build first, framed as "Connect X to Y so that Z">, <string>],
    "phase2": [<string — deeper flow to add once phase 1 is running>, <string>],
    "phase3": [<string — advanced orchestration or intelligence layer>, <string>]
  },
  "totalRoleSavings": <string — total estimated annual savings across ALL AI roles combined, e.g. "$90,000–$130,000/year">,
  "commandCenterNote": <string — 2 sentences naming the specific data sources this company has scattered (phone leads, CRM, email, invoicing, etc.) and what becomes possible when they're unified>
}`

function extractCompanyName(websiteUrl: string): string {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, '')
    const domain = hostname.split('.')[0]
    return domain
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  } catch {
    return 'Your Company'
  }
}

export async function POST(req: NextRequest) {
  const quizData = await req.json()
  const {
    contactName, contactEmail, contactPhone, websiteUrl,
    biggestTimeDrain, toolCount, leadResponse, biggestImpact, timeline,
  } = quizData

  const companyName = extractCompanyName(websiteUrl)

  const [websiteContent, searchResults] = await Promise.all([
    scrapeWebsite(websiteUrl),
    searchInternet(`${companyName} OR site:${websiteUrl} business AI automation ROI`),
  ])

  const systemPrompt = `You are an expert AI business systems architect who builds highly personalized AI readiness reports for small and mid-market businesses.

Your job is NOT to list AI tools. Your job is to show how this business can operate as a single, unified, intelligent system — where every customer touchpoint, every lead, and every operational event triggers a cascade of coordinated actions automatically.

CRITICAL RULES:
1. Extract the real business name from the website content — never use the URL.
2. orchestrationFlows are the heart of this report. Each flow must describe a CHAIN OF EVENTS — what happens automatically across multiple systems when a single trigger occurs. Think: a missed call doesn't just get logged — it triggers a text, a CRM entry, a rep notification, and a nurture sequence.
3. Actions in each flow must be specific to this company's actual business model, customer journey, and the channels they use (calls, texts, emails, forms). Name the timing, the channel, and the outcome.
4. Flows must feel like watching a machine work — not a list of features. Use specific language: "Within 90 seconds...", "If no response in 2 hours...", "After service is completed...".
5. Include 3–5 orchestration flows covering the full customer lifecycle: lead capture, lead nurture, booking/conversion, service delivery, post-service follow-up, and repeat/referral generation.
6. aiRoleOpportunities: 2–3 roles this specific company would typically hire — explain exactly how AI handles each role's actual tasks in their industry.
7. roadmap items must be framed as integrations: "Connect X to Y so that Z happens automatically" — not generic steps.
8. commandCenterNote must name specific data silos this company likely has and what unified visibility enables.
9. maturityDescription must name a specific competitor advantage gained by those who move first in this industry.
10. All content must be grounded in the actual website content — do not fabricate services or details not found there.

Return ONLY valid JSON matching this exact schema — no markdown, no extra text:
${REPORT_SCHEMA}

Schema rules:
- maturityStage: 1=no AI, 2=exploring, 3=using some tools, 4=actively integrating.
- websiteObservations: exactly 3 items.
- orchestrationFlows: exactly 3 flows — keep each action under 20 words.
- aiRoleOpportunities: exactly 2 roles.
- roadmap: exactly 2 items per phase.
- Be concise. Total output must fit in 2200 tokens.`

  const userPrompt = `COMPANY WEBSITE: ${websiteUrl}
CONTACT: ${contactName} (${contactEmail}) — Phone: ${contactPhone ?? 'not provided'}

WHAT THEY TOLD US:
- Biggest time drain: ${biggestTimeDrain}
- Number of tools/software they run: ${toolCount}
- Lead response speed: ${leadResponse}
- What would make the biggest 90-day impact: ${biggestImpact}
- Timeline: ${timeline}

WEBSITE CONTENT (use this to make everything specific — infer company name, industry, services, size):
${websiteContent || 'Could not retrieve — rely on the URL and stated answers.'}

INDUSTRY RESEARCH:
${searchResults || 'Not available.'}`

  let reportContent: Record<string, unknown>

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: process.env.OPENROUTER_MODEL ?? 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2200,
    })

    const raw = completion.choices[0]?.message?.content ?? '{}'
    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    reportContent = JSON.parse(cleaned)
  } catch (err) {
    console.error('LLM or parse error:', err)
    return Response.json({ error: 'Failed to generate report', detail: String(err) }, { status: 500 })
  }

  const resolvedCompanyName = (reportContent.companyName as string | undefined) || companyName

  // Save to Supabase
  const { data: lead, error: dbError } = await supabase
    .from('leads')
    .insert({
      company_name: resolvedCompanyName,
      website_url: websiteUrl,
      contact_name: contactName,
      contact_email: contactEmail,
      quiz_responses: quizData,
      report_content: reportContent,
      maturity_stage: reportContent.maturityStage,
    })
    .select('report_id')
    .single()

  if (dbError || !lead) {
    console.error('DB error:', dbError)
    return Response.json({ error: 'Failed to save report', detail: dbError?.message }, { status: 500 })
  }

  const reportId = lead.report_id
  const reportUrl = `${process.env.NEXT_PUBLIC_COMPANY_URL ?? 'http://localhost:3000'}/report/${reportId}`

  const bookUrl = process.env.NEXT_PUBLIC_CAL_USERNAME
    ? `https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME}`
    : `${process.env.NEXT_PUBLIC_COMPANY_URL ?? 'https://aiimplementationcenter.com'}/book`

  getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'info@aiimplementationcenter.com',
    to: contactEmail,
    subject: `Your AI Readiness Report — ${resolvedCompanyName}`,
    ...(process.env.RESEND_REPLY_TO ? { replyTo: process.env.RESEND_REPLY_TO } : {}),
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;">
  <tr><td style="background:#0F172A;padding:32px 40px;text-align:center;">
    <p style="margin:0 0 6px;color:#94A3B8;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">AI Implementation Center</p>
    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Your AI Readiness Report</h1>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#0F172A;font-size:16px;font-weight:600;">Hi ${contactName},</p>
    <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.7;">
      Your personalized AI readiness report for <strong style="color:#0F172A;">${resolvedCompanyName}</strong> is ready.
      Our AI analyzed your website and industry to surface real use cases, ROI estimates, and a 90-day roadmap built specifically for your business.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 36px;">
      <tr><td style="background:#3B82F6;border-radius:12px;">
        <a href="${reportUrl}" style="display:inline-block;padding:16px 40px;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none;">View Your Report &rarr;</a>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:24px;">
        <p style="margin:0 0 14px;color:#0F172A;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">What&rsquo;s inside</p>
        <p style="margin:0 0 10px;color:#475569;font-size:14px;">&#10003;&nbsp; Your AI Maturity Stage (1&ndash;4) with a personalized description</p>
        <p style="margin:0 0 10px;color:#475569;font-size:14px;">&#10003;&nbsp; What our AI found on your website &amp; how to improve it</p>
        <p style="margin:0 0 10px;color:#475569;font-size:14px;">&#10003;&nbsp; Your top AI use cases with estimated ROI</p>
        <p style="margin:0 0 10px;color:#475569;font-size:14px;">&#10003;&nbsp; A personalized 90-day AI roadmap</p>
        <p style="margin:0;color:#475569;font-size:14px;">&#10003;&nbsp; The Command Center &mdash; your AI business intelligence hub</p>
      </td></tr>
    </table>
    <p style="margin:0 0 8px;color:#64748B;font-size:13px;">This link is shareable &mdash; feel free to send it to your team.</p>
    <p style="margin:0 0 28px;color:#64748B;font-size:13px;">Questions? Reply to this email or <a href="${bookUrl}" style="color:#3B82F6;text-decoration:none;font-weight:600;">book a free 30-minute strategy call</a>.</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      <tr><td style="background:#0F172A;border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 6px;color:#ffffff;font-weight:700;font-size:14px;">Ready to put your report into action?</p>
        <p style="margin:0 0 14px;color:#94A3B8;font-size:13px;line-height:1.5;">Book a free strategy call. We&rsquo;ll walk through your report together and map out exactly where to start.</p>
        <a href="${bookUrl}" style="display:inline-block;background:#3B82F6;color:#ffffff;font-weight:700;font-size:13px;padding:10px 24px;border-radius:8px;text-decoration:none;">Book Your Free Call</a>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="background:#F8FAFC;padding:20px 40px;text-align:center;border-top:1px solid #E2E8F0;">
    <p style="margin:0;color:#94A3B8;font-size:12px;">AI Implementation Center &bull; aiimplementationcenter.com</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`,
  }).then((result) => {
    if ('error' in result && result.error) {
      console.error('Resend error:', JSON.stringify(result.error))
    } else {
      console.log('Email sent, id:', (result as { data?: { id?: string } }).data?.id)
    }
  }).catch((err) => console.error('Resend exception:', err))

  return Response.json({ reportId })
}

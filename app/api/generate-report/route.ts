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
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return ''
    const text = await res.text()
    return text.slice(0, 4000)
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
        max_results: 4,
        include_answer: true,
      }),
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return ''
    const data = await res.json()
    const snippets = (data.results ?? [])
      .map((r: { title: string; content: string }) => `${r.title}: ${r.content}`)
      .join('\n\n')
    return (data.answer ? `Summary: ${data.answer}\n\n` : '') + snippets
  } catch {
    return ''
  }
}

const REPORT_SCHEMA = `{
  "maturityStage": <number 1-4>,
  "maturityLabel": <string>,
  "maturityDescription": <string — 1 sentence, encouraging, specific to this company>,
  "websiteObservations": [<string>, <string>, <string>],
  "useCases": [
    {
      "title": <string — specific to this company, not a generic category>,
      "description": <string — 2 sentences, referencing their actual business activities>,
      "estimatedROI": <string — quantified where possible, e.g. "Saves ~6 hrs/week" or "30–40% faster response time">,
      "firstStep": <string — a concrete, specific first action they can take this week>
    }
  ],
  "aiRoleOpportunities": [
    {
      "role": <string — the role title>,
      "whatAICanDo": <string — 2-3 sentences on exactly how AI replaces or augments this role for this company>,
      "availability": "24/7/365 — no sick days, no turnover, no benefits",
      "estimatedSavings": <string — estimated annual cost savings vs. hiring>
    }
  ],
  "roadmap": {
    "phase1": [<string tied to their 90-day goals>, <string>],
    "phase2": [<string>, <string>],
    "phase3": [<string>, <string>]
  },
  "commandCenterNote": <string — 2 sentences, specific to this company's tools/challenges>
}`

export async function POST(req: NextRequest) {
  const quizData = await req.json()
  const {
    companyName, industry, companySize, websiteUrl,
    contactName, contactEmail, aiKnowledge, aiUsageStatus,
    aiTools, challenges, goals, timeline,
    goals90Day, aiRoles, customRole,
  } = quizData

  // Run scraping and search in parallel — search includes company name for specificity
  const [websiteContent, searchResults] = await Promise.all([
    scrapeWebsite(websiteUrl),
    searchInternet(`"${companyName}" OR ${industry} business AI automation ROI case study`),
  ])

  const allRoles = [...(aiRoles ?? []), ...(customRole ? [customRole] : [])].join(', ')

  const systemPrompt = `You are an expert AI business strategist who builds highly personalized AI readiness reports for small and mid-market businesses.

CRITICAL RULES — violating these makes the report worthless:
1. NEVER produce generic use cases. Every use case must reference specific details from this company's website, industry, size, challenges, and stated goals.
2. DO NOT suggest use cases from a pre-built list. Invent use cases that are specific to what THIS company actually does based on the website content.
3. The roadmap phases must directly address the company's stated 90-day goals — not generic AI adoption steps.
4. AI role opportunities must explain exactly how AI replaces the role for THIS company's context, not generically.
5. Use a warm, direct, non-jargon tone. Write like a smart advisor, not a consultant.
6. All observations must come from the actual website content provided — do not fabricate details.

Return ONLY valid JSON matching this exact schema — no markdown, no extra text:
${REPORT_SCHEMA}

Schema rules:
- maturityStage: 1=never used AI, 2=heard of it/exploring, 3=using tools regularly, 4=integrating AI into systems.
- websiteObservations: 3 specific things you noticed on their website + exactly how AI could improve each one.
- useCases: 4-6 opportunities, each tied to their actual services/products, challenges, and 90-day goals.
- aiRoleOpportunities: for each role they mentioned, explain how AI handles it for this specific company.
- roadmap: phase 1 items must map directly to their 90-day goals.
- commandCenterNote: name 2-3 of their specific software/data silos that the Command Center would unify.`

  const userPrompt = `COMPANY PROFILE:
Name: ${companyName}
Industry: ${industry}
Size: ${companySize}
Website: ${websiteUrl}

CONTACT: ${contactName} (${contactEmail})

AI READINESS:
- Knowledge level: ${aiKnowledge}
- Currently using AI: ${aiUsageStatus}
- Tools in use: ${aiTools?.join(', ') || 'None yet'}

CHALLENGES (most important — prioritize use cases around these):
${challenges?.join('\n')}

HIGH-LEVEL GOALS:
${goals?.join('\n')}

TIMELINE: ${timeline}

90-DAY SPECIFIC GOALS (build the roadmap around these):
${goals90Day || 'Not specified'}

ROLES THEY WANT AI TO REPLACE OR AUGMENT:
${allRoles || 'None selected'}

WEBSITE CONTENT (use this to make observations and use cases specific):
${websiteContent || 'Could not retrieve — rely on industry and stated goals.'}

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
      max_tokens: 3000,
    })

    const raw = completion.choices[0]?.message?.content ?? '{}'
    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    reportContent = JSON.parse(cleaned)
  } catch (err) {
    console.error('LLM or parse error:', err)
    return Response.json({ error: 'Failed to generate report', detail: String(err) }, { status: 500 })
  }

  // Save to Supabase
  const { data: lead, error: dbError } = await supabase
    .from('leads')
    .insert({
      company_name: companyName,
      industry,
      company_size: companySize,
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
    replyTo: process.env.RESEND_REPLY_TO,
    to: contactEmail,
    subject: `Your AI Readiness Report — ${companyName}`,
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
      Your personalized AI readiness report for <strong style="color:#0F172A;">${companyName}</strong> is ready.
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
  }).catch(console.error)

  return Response.json({ reportId })
}

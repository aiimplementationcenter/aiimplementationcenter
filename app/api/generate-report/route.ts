import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_COMPANY_URL ?? 'https://localhost:3000',
    'X-Title': process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'AI Implementation Center',
  },
})

const resend = new Resend(process.env.RESEND_API_KEY!)

async function scrapeWebsite(url: string): Promise<string> {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`
    const res = await fetch(jinaUrl, {
      headers: { Accept: 'text/plain' },
      signal: AbortSignal.timeout(15000),
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
      signal: AbortSignal.timeout(10000),
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
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL ?? 'google/gemini-flash-1.5',
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
    return Response.json({ error: 'Failed to generate report' }, { status: 500 })
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
    return Response.json({ error: 'Failed to save report' }, { status: 500 })
  }

  const reportId = lead.report_id
  const reportUrl = `${process.env.NEXT_PUBLIC_COMPANY_URL ?? 'http://localhost:3000'}/report/${reportId}`

  // Send email (non-blocking)
  resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'reports@yourdomain.com',
    replyTo: process.env.RESEND_REPLY_TO,
    to: contactEmail,
    subject: `Your AI Readiness Report — ${companyName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
        <h2 style="color:#0F172A;">Hi ${contactName},</h2>
        <p style="color:#475569;">Your personalized AI readiness report for <strong>${companyName}</strong> is ready.</p>
        <a href="${reportUrl}" style="display:inline-block;background:#3B82F6;color:white;font-weight:bold;padding:14px 28px;border-radius:10px;text-decoration:none;margin:16px 0;">
          View Your Report →
        </a>
        <p style="color:#64748B;font-size:14px;">This link is shareable — feel free to send it to your team.</p>
        <p style="color:#64748B;font-size:14px;">Questions? Reply to this email or <a href="${process.env.NEXT_PUBLIC_COMPANY_URL}/book">book a free strategy call</a>.</p>
      </div>
    `,
  }).catch(console.error)

  return Response.json({ reportId })
}

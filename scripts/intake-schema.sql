-- Run this in your Supabase SQL editor (same project as your leads table)

create table if not exists client_intakes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Business basics
  business_name text not null,
  industry text,
  phone text,
  email text,
  website text,
  google_review_url text,
  business_hours text,
  tone text, -- professional | friendly | casual

  -- Software stack
  phone_system text,
  email_provider text,
  crm text,
  scheduling_tool text,
  invoicing_tool text,
  sms_tool text,
  website_platform text,

  -- Lead sources
  lead_sources text[],      -- call | form | email | facebook | google | referral | walkin
  has_facebook_page boolean default false,
  has_google_my_business boolean default false,
  runs_google_ads boolean default false,
  runs_facebook_ads boolean default false,

  -- Communication preferences
  followup_channel text,           -- text | email | both
  auto_response_timing text,       -- immediately | 5min | 1hour
  followup_delay text,             -- 2hours | 4hours | same_day | next_day
  nurture_touches text,            -- 2 | 3 | 5
  review_request_timing text,      -- 3days | 7days | 14days

  -- Customer journey (free text)
  journey_new_lead text,
  journey_job_booked text,
  journey_post_service text,
  journey_reengagement text,

  -- Existing messages
  existing_voicemail text,
  existing_email_template text,
  existing_sms_template text,
  additional_notes text,

  -- Workflow status
  workflow_generated boolean default false,
  workflow_generated_at timestamptz
);

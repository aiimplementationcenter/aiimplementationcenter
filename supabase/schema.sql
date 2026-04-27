-- Run this in your Supabase SQL editor

create table if not exists leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  company_name    text,
  industry        text,
  company_size    text,
  website_url     text,
  contact_name    text,
  contact_email   text,
  quiz_responses  jsonb,
  report_id       uuid unique default gen_random_uuid(),
  report_content  jsonb,
  maturity_stage  int
);

create table if not exists use_cases (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text not null,
  detail        text,
  industries    text[],
  functions     text[],
  estimated_roi text,
  time_savings  text,
  complexity    text check (complexity in ('low', 'medium', 'high'))
);

-- Enable row level security
alter table leads enable row level security;
alter table use_cases enable row level security;

-- Allow anonymous inserts to leads (quiz submissions)
create policy "Allow anon insert leads" on leads
  for insert to anon with check (true);

-- Allow reading leads by report_id (for report page)
create policy "Allow anon read leads by report_id" on leads
  for select to anon using (true);

-- Allow reading all use_cases
create policy "Allow anon read use_cases" on use_cases
  for select to anon using (true);

-- Allow service role to insert use_cases (for seeding)
create policy "Allow service role insert use_cases" on use_cases
  for insert to service_role with check (true);

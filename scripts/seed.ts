import { createClient } from '@supabase/supabase-js'
import { USE_CASES_SEED } from '../lib/use-cases-data'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('Seeding use_cases table...')
  const { error } = await supabase.from('use_cases').insert(USE_CASES_SEED)
  if (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
  console.log(`Seeded ${USE_CASES_SEED.length} use cases successfully.`)
}

seed()

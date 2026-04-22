
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

async function test() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { count, error } = await supabase
    .from('wallpapers')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Total Wallpapers in DB:', count)
  }

  const { count: catCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
  
  console.log('Total Categories in DB:', catCount)
}

test()

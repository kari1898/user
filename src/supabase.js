import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hlceyxmnhltetpfhmmpn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsY2V5eG1uaGx0ZXRwZmhtbXBuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTY2MCwiZXhwIjoyMDQxNDk3NjYwfQ.oBkpGXdbe83lxLGLC8Zp1G4XN3hvbmYaTEwVdxXoxKE'
export const supabase = createClient(supabaseUrl, supabaseKey)
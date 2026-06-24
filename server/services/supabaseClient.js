import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    '[supabaseClient] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing — check server/.env'
  );
}

// Server-side client uses the SERVICE ROLE key so it can bypass RLS.
// Never expose this key to the frontend.
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

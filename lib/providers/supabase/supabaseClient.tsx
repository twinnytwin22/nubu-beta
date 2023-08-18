import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from './supabase-server';



const options = {
  auth: {
    isSingleton: true,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
}
export const supabaseApi = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  options
);
const supabaseUrl = process.env.SUPABASE_URL! || process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey,
    options
  );


export const supabaseUserApi = (cookies: any) => createRouteHandlerClient({ cookies })
export const supaServerSession = (cookies: any) => createServerComponentClient({ cookies })
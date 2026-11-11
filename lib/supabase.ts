/**
 * Supabase Client Configuration & Adapter
 * AARADHYA DIVINE MIST - Luxury Indian Spiritual Fragrance
 * 
 * Provides connection to Supabase PostgreSQL database when environment variables are supplied.
 * Falls back seamlessly to our file-locked ACID persistence engine (lib/db.ts) for local execution.
 */

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  isConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
};

export function getSupabaseHeaders(serviceRole = false) {
  const key = serviceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseConfig.anonKey
    : supabaseConfig.anonKey;

  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

export default supabaseConfig;

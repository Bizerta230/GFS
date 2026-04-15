import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — only created when SUPABASE_URL is present.
// Avoids crashing at module load time when env vars are absent.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } },
    );
  }
  return _client;
}

// Convenience proxy: returns the client or throws with a clear message
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) {
      throw new Error(
        `Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local`,
      );
    }
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});

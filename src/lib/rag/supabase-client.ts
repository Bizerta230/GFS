import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // Allow the module to load without crashing in dev when env vars are absent.
  // Actual DB calls will fail gracefully when RAG is invoked.
}

// Singleton — reused across requests in a single Node.js process.
// NEVER expose this client to the browser bundle (service role key is secret).
export const supabase = createClient(
  supabaseUrl ?? "http://localhost:54321",
  supabaseServiceKey ?? "placeholder",
  {
    auth: { persistSession: false },
  },
);

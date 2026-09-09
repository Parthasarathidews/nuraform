import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Anon Key provided:", Boolean(supabaseAnonKey) ? "YES" : " NO");
if (supabaseAnonKey) {
  console.log("Key starts with:", supabaseAnonKey.substring(0, 20) + "...");
  console.log("Key is JWT format:", supabaseAnonKey.startsWith("eyJ"));
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(" CRITICAL: Missing Supabase credentials!");
  console.error("Required in .env file:");
  console.error("  VITE_SUPABASE_URL=https://your-project.supabase.co");
  console.error("  VITE_SUPABASE_ANON_KEY=eyJhbGci...");
  console.error("");
  console.error(" Remember to restart the dev server after changing .env!");
  throw new Error("Missing required Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

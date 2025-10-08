// lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Menggunakan variabel dari .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Pastikan nilai sudah ada sebelum inisialisasi
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables!");
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
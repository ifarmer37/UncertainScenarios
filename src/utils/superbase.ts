// src/utils/supabase.ts
// This file initializes the Supabase client for database interactions

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials are missing! Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example function to fetch players
export async function fetchPlayers() {
  const { data, error } = await supabase.from('players').select('*');
  if (error) {
    console.error("Error fetching players:", error);
    return null;
  }
  return data;
}

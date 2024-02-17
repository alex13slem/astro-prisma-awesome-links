import { createClient } from '@supabase/supabase-js';

declare global {
  var supabase: undefined | ReturnType<typeof createClient>;
}

const url = 'https://tpljrqjurldcezuxlhva.supabase.co';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbGpycWp1cmxkY2V6dXhsaHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczOTIzOTksImV4cCI6MjAyMjk2ODM5OX0.gOfymusU4niF67vbQqbIeTdE99kfh6_MY41euSjhQZk';

const supabase = globalThis.supabase || createClient(url, key);

if (process.env.NODE_ENV !== 'production') globalThis.supabase = supabase;

export default supabase;

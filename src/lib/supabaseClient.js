import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.');
}

// Ensure error-free initialization even without env vars (for UI building purposes)
export const supabase = createClient(supabaseUrl || 'https://example.supabase.co', supabaseKey || 'placeholder');

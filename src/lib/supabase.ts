import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://asrdzzlklscoqzyyuvnp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcmR6emxrbHNjb3F6eXl1dm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzIzODMsImV4cCI6MjA5MjYwODM4M30.wmx2M0i0q-I-GE2zRwW1Yos14eou2t6KVRvhrljfKHY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseStorageUrl = 'https://asrdzzlklscoqzyyuvnp.supabase.co/storage/v1/object/public/produtos/';
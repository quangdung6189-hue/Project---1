import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient = null;

if (supabaseUrl && supabaseAnonKey && 
    !supabaseUrl.includes('YOUR_SUPABASE_URL') && 
    !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;

export const isSupabaseConfigured = () => {
  return supabaseClient !== null;
};

export const saveScheduleToSupabase = async (schedule) => {
  if (!supabaseClient) {
    console.log('Supabase not configured. Running in offline demo mode.');
    return { data: schedule, error: null };
  }
  try {
    return await supabaseClient.from('collection_schedules').insert([schedule]);
  } catch (e) {
    console.warn('Supabase insert failed, using offline mode:', e);
    return { data: schedule, error: null };
  }
};

export const sendAdminWebhook = async (message) => {
  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.includes('YOUR_DISCORD_WEBHOOK_URL')) {
    console.log('Discord webhook is not configured.');
    return;
  }
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
  } catch (error) {
    console.warn('Không gửi được thông báo Discord:', error);
  }
};


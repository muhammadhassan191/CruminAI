import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const leadService = {
  async getLeads(filters = {}) {
    let query = supabase
      .from('leads')
      .select(`
        *,
        companies (*)
      `);

    if (filters.industry) query = query.eq('companies.industry', filters.industry);
    if (filters.title) query = query.ilike('title', `%${filters.title}%`);
    if (filters.country) query = query.eq('country', filters.country);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async enrichLead(leadId) {
    // Simulated enrichment - in real world would call Apollo/Hunter/etc.
    const { data, error } = await supabase
      .from('leads')
      .update({ verified_status: true })
      .eq('id', leadId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async addToCRM(userId, leadId) {
    const { data, error } = await supabase
      .from('crm_leads')
      .insert([{ user_id: userId, lead_id: leadId, status: 'New' }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

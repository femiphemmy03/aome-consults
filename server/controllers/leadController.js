import { supabase } from '../services/supabaseClient.js';
import { sendEmail } from '../services/resendClient.js';
import { vaLeadNotification } from '../services/emailTemplates.js';

export async function createLead(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email, phone }])
      .select()
      .single();

    if (error) throw error;

    const vaEmail = process.env.VA_EMAIL;
    if (vaEmail) {
      await sendEmail({
        to: vaEmail,
        subject: 'New lead captured — Aome Consults',
        html: vaLeadNotification({
          name,
          email,
          phone,
          createdAt: new Date().toLocaleString()
        })
      }).catch((e) => console.error('[createLead] VA notification failed:', e.message));
    }

    res.status(201).json({ lead: data });
  } catch (err) {
    next(err);
  }
}

export async function listLeads(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ leads: data });
  } catch (err) {
    next(err);
  }
}

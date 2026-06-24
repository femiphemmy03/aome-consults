import { supabase } from '../services/supabaseClient.js';

// Settings returned to the public site (whatsapp number, social links, fees, etc.)
export async function getPublicSettings(req, res, next) {
  try {
    const { data, error } = await supabase.from('site_settings').select('key, value');
    if (error) throw error;

    const settings = Object.fromEntries((data || []).map((row) => [row.key, row.value]));
    res.json({ settings });
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req, res, next) {
  try {
    const updates = req.body; // { key: value, key2: value2, ... }

    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'Request body must be a key/value object' });
    }

    const rows = Object.entries(updates).map(([key, value]) => ({
      key,
      value: String(value),
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
    if (error) throw error;

    res.json({ message: 'Settings updated' });
  } catch (err) {
    next(err);
  }
}

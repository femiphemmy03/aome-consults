import { supabase } from '../services/supabaseClient.js';

export async function submitSurvey(req, res, next) {
  try {
    const { bookingId, rating, feedback, wouldRecommend } = req.body;

    if (!rating) return res.status(400).json({ error: 'A rating is required' });

    const { data, error } = await supabase
      .from('surveys')
      .insert([
        {
          booking_id: bookingId || null,
          rating,
          feedback,
          would_recommend: wouldRecommend
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ survey: data });
  } catch (err) {
    next(err);
  }
}

export async function listSurveysAdmin(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ surveys: data });
  } catch (err) {
    next(err);
  }
}

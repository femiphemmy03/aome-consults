import { supabase } from '../services/supabaseClient.js';

const BUCKET = 'media';

export async function handleImageUpload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    const ext = req.file.originalname.split('.').pop().toLowerCase();
    const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

    res.status(201).json({ url: data.publicUrl });
  } catch (err) {
    next(err);
  }
}
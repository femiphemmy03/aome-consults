import { supabase } from '../services/supabaseClient.js';

export async function listPublishedBooks(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json({ books: data });
  } catch (err) {
    next(err);
  }
}

export async function listAllBooksAdmin(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json({ books: data });
  } catch (err) {
    next(err);
  }
}

export async function createBook(req, res, next) {
  try {
    const { title, coverImageUrl, shortDescription, selarUrl, priceNgn, priceUsd, displayOrder, published } = req.body;

    if (!title || !selarUrl) {
      return res.status(400).json({ error: 'Title and Selar URL are required' });
    }

    const { data, error } = await supabase
      .from('books')
      .insert([
        {
          title,
          cover_image_url: coverImageUrl,
          short_description: shortDescription,
          selar_url: selarUrl,
          price_ngn: priceNgn || null,
          price_usd: priceUsd || null,
          display_order: displayOrder || 0,
          published: published !== false
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ book: data });
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const { title, coverImageUrl, shortDescription, selarUrl, priceNgn, priceUsd, displayOrder, published } = req.body;

    const { data, error } = await supabase
      .from('books')
      .update({
        title,
        cover_image_url: coverImageUrl,
        short_description: shortDescription,
        selar_url: selarUrl,
        price_ngn: priceNgn,
        price_usd: priceUsd,
        display_order: displayOrder,
        published
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) return res.status(404).json({ error: 'Book not found' });
    res.json({ book: data });
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
}

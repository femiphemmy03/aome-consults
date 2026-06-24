import { supabase } from '../services/supabaseClient.js';

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function listPublishedPosts(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, cta_text, cta_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ posts: data });
  } catch (err) {
    next(err);
  }
}

export async function getPostBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Post not found' });
    res.json({ post: data });
  } catch (err) {
    next(err);
  }
}

export async function listAllPostsAdmin(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ posts: data });
  } catch (err) {
    next(err);
  }
}

export async function createPost(req, res, next) {
  try {
    const { title, excerpt, content, coverImageUrl, ctaText, ctaUrl, published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const slug = `${slugify(title)}-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title,
          slug,
          excerpt,
          content,
          cover_image_url: coverImageUrl,
          cta_text: ctaText || 'Read More',
          cta_url: ctaUrl,
          published: !!published
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ post: data });
  } catch (err) {
    next(err);
  }
}

export async function updatePost(req, res, next) {
  try {
    const { id } = req.params;
    const { title, excerpt, content, coverImageUrl, ctaText, ctaUrl, published } = req.body;

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title,
        excerpt,
        content,
        cover_image_url: coverImageUrl,
        cta_text: ctaText,
        cta_url: ctaUrl,
        published,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) return res.status(404).json({ error: 'Post not found' });
    res.json({ post: data });
  } catch (err) {
    next(err);
  }
}

export async function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
}

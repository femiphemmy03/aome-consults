// ============================================================
// AOME CONSULTS — SITEMAP GENERATOR
// Runs automatically before every `npm run build` (see package.json
// "prebuild" script). Writes client/public/sitemap.xml, which Vite
// then copies into dist/ as part of the normal build — so it ends up
// at https://aomeconsults.com/sitemap.xml with zero manual steps.
//
// Includes every static page PLUS every published blog post and book,
// fetched live from the API — so new content becomes crawlable the
// moment the site is next deployed, no manual sitemap editing ever.
// ============================================================

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = process.env.PUBLIC_APP_URL || 'https://aomeconsults.com';
const API_URL = process.env.VITE_API_BASE_URL || 'http://localhost:4000';

const today = new Date().toISOString().split('T')[0];

// Static pages — priority reflects how central each page is to the site.
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/books', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' }
];

function urlEntry({ loc, priority, changefreq, lastmod }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod || today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function fetchJsonSafe(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[generate-sitemap] Could not fetch ${url}: ${err.message}`);
    console.warn('[generate-sitemap] Continuing with static pages only — this does not fail the build.');
    return null;
  }
}

async function generateSitemap() {
  const entries = staticPages.map((p) =>
    urlEntry({ loc: `${SITE_URL}${p.path}`, priority: p.priority, changefreq: p.changefreq })
  );

  // Blog posts — each gets its own URL, dated by when it was last updated.
  const blogData = await fetchJsonSafe(`${API_URL}/api/blog`);
  if (blogData?.posts?.length) {
    blogData.posts.forEach((post) => {
      entries.push(
        urlEntry({
          loc: `${SITE_URL}/blog/${post.slug}`,
          priority: '0.7',
          changefreq: 'monthly',
          lastmod: post.updated_at ? post.updated_at.split('T')[0] : today
        })
      );
    });
    console.log(`[generate-sitemap] Included ${blogData.posts.length} blog post(s).`);
  }

  // Books don't have individual pages (each links straight to Selar), so
  // only /books itself needs to be in the sitemap — already covered above.

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  const outPath = join(__dirname, '..', 'public', 'sitemap.xml');
  writeFileSync(outPath, xml, 'utf-8');
  console.log(`[generate-sitemap] Wrote ${outPath} with ${entries.length} URL(s).`);
}

generateSitemap();

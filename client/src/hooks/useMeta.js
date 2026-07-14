import { useEffect } from 'react';

const SITE_NAME = 'Aome Consults';
const SITE_URL = 'https://aomeconsults.com';
const DEFAULT_DESCRIPTION =
  'Healing Minds. Strengthening Relationships. Transforming Lives. — Aome Consults with Barr. Dr. Maria Esele Abraham, Counselling Psychologist.';

function setMetaTag(attr, key, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(path) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', `${SITE_URL}${path}`);
}

/**
 * Sets this page's <title>, meta description, canonical URL, and
 * Open Graph/Twitter title+description to match — so every page is
 * distinguishable to search engines and browser tabs, not just the
 * one generic title baked into index.html.
 *
 * @param {Object} options
 * @param {string} options.title - Page-specific title (site name is appended automatically)
 * @param {string} [options.description] - Falls back to the site-wide default if omitted
 * @param {string} [options.path] - Route path for the canonical tag, e.g. '/services'
 * @param {boolean} [options.noindex] - Set true for pages that shouldn't be indexed (e.g. 404)
 */
export default function useMeta({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Barr. Dr. Maria Esele Abraham`;
    const desc = description || DEFAULT_DESCRIPTION;

    document.title = fullTitle;

    setMetaTag('name', 'description', desc);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:url', `${SITE_URL}${path}`);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', desc);

    setCanonical(path);

    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // No cleanup needed — the next page that mounts will simply overwrite
    // these same tags with its own values.
  }, [title, description, path, noindex]);
}

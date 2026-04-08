import { TMDB_IMAGE_BASE_URL } from '@env';

/**
 * Builds an absolute image URL from a TMDB file path (e.g. poster_path).
 */
export function buildTmdbImageUrl(path: string | null | undefined): string | null {
  if (!path) {
    return null;
  }
  const base = TMDB_IMAGE_BASE_URL.replace(/\/$/, '');
  const segment = path.startsWith('/') ? path : `/${path}`;
  return `${base}${segment}`;
}

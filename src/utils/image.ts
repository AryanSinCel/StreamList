import { TMDB_IMAGE_BASE_URL } from '@env';

/** TMDB poster/backdrop size segments (path prefix after `/t/p/`). */
export type TmdbImageSize = 'w185' | 'w342' | 'w780';

/**
 * Builds `https://image.tmdb.org/t/p/{size}{path}` or returns `null` when path is missing.
 */
export function buildImageUrl(
  path: string | null | undefined,
  size: TmdbImageSize,
): string | null {
  if (path == null || path === '') {
    return null;
  }
  const base = TMDB_IMAGE_BASE_URL.replace(/\/$/, '');
  const segment = path.startsWith('/') ? path : `/${path}`;
  return `${base}/${size}${segment}`;
}

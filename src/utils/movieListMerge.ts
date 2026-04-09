import type { MovieListItem } from '../api/types';

/**
 * Appends paginated TMDB rows while skipping ids already present (stale overlap / retries).
 */
export function mergeUniqueMovieListById(
  existing: MovieListItem[],
  incoming: MovieListItem[],
): MovieListItem[] {
  const seen = new Set(existing.map((m) => m.id));
  const out = [...existing];
  for (const m of incoming) {
    if (!seen.has(m.id)) {
      seen.add(m.id);
      out.push(m);
    }
  }
  return out;
}

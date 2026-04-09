import type { Genre, MovieDetails, MovieListItem } from '../api/types';

import { buildImageUrl } from './image';

import type { PosterItem } from '../types/poster';
import type { SearchGridItem } from '../types/searchGrid';

export function extractYear(releaseDate: string | undefined): string {
  if (!releaseDate || releaseDate.length < 4) {
    return '—';
  }
  return releaseDate.slice(0, 4);
}

export function formatRuntimeMinutes(runtime: number | null | undefined): string | null {
  if (runtime == null || runtime <= 0) {
    return null;
  }
  const h = Math.floor(runtime / 60);
  const m = runtime % 60;
  if (h <= 0) {
    return `${m}m`;
  }
  if (m === 0) {
    return `${h}h`;
  }
  return `${h}h ${m}m`;
}

export function genreNamesFromIds(
  genreIds: readonly number[],
  genreMap: ReadonlyMap<number, string>,
): string {
  const names = genreIds
    .map((id) => genreMap.get(id))
    .filter((n): n is string => typeof n === 'string' && n.length > 0);
  if (names.length === 0) {
    return '—';
  }
  return names.slice(0, 2).join(' • ');
}

export function formatGenreLineFromDetails(movie: MovieDetails): string {
  if (movie.genres.length === 0) {
    return '—';
  }
  return movie.genres
    .map((g: Genre) => g.name)
    .slice(0, 2)
    .join(' • ');
}

/** Maps TMDB list rows to search/watchlist grid cells (posters + meta). */
export function movieListItemToSearchGridItem(
  movie: MovieListItem,
  genreMap: ReadonlyMap<number, string>,
): SearchGridItem {
  return {
    id: movie.id,
    posterUri: buildImageUrl(movie.poster_path, 'w342') ?? '',
    title: movie.title || movie.original_title || 'Untitled',
    genre: genreNamesFromIds(movie.genre_ids, genreMap),
    ratingLabel: ratingLabelFromVote(movie.vote_average),
  };
}

export function movieListItemToPosterItem(
  movie: MovieListItem,
  genreMap: ReadonlyMap<number, string>,
): PosterItem {
  const posterUri = buildImageUrl(movie.poster_path, 'w342') ?? '';
  const year = extractYear(movie.release_date);
  const subtitle = `${year} • ${genreNamesFromIds(movie.genre_ids, genreMap)}`;
  return {
    id: String(movie.id),
    numericId: movie.id,
    posterUri,
    title: movie.title || movie.original_title || 'Untitled',
    subtitle,
  };
}

export function ratingLabelFromVote(voteAverage: number): string | null {
  if (voteAverage <= 0) {
    return null;
  }
  return `${voteAverage.toFixed(1)} ★`;
}

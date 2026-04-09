import { useCallback, useEffect, useMemo, useState } from 'react';

import { getGenres, getSimilarMovies, getTrendingMovies } from '../api/movies';
import type { Genre, MovieListItem } from '../api/types';
import { getErrorMessage } from '../utils/error';

export interface WatchlistFeedData {
  genres: Genre[];
  emptyTrending: MovieListItem[];
  emptyTrendingLoading: boolean;
  emptyTrendingError: string | null;
  refetchEmptyTrending: () => void;
  becauseSimilar: MovieListItem[];
  becauseLoading: boolean;
  becauseError: string | null;
  refetchBecause: () => void;
}

/**
 * Watchlist screen: trending for empty state + “similar” for the most recently saved item.
 */
export function useWatchlistFeed(becauseMovieId: number | null): {
  data: WatchlistFeedData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [emptyTrending, setEmptyTrending] = useState<MovieListItem[]>([]);
  const [emptyTrendingLoading, setEmptyTrendingLoading] = useState(true);
  const [emptyTrendingError, setEmptyTrendingError] = useState<string | null>(
    null,
  );

  const [becauseSimilar, setBecauseSimilar] = useState<MovieListItem[]>([]);
  const [becauseLoading, setBecauseLoading] = useState(false);
  const [becauseError, setBecauseError] = useState<string | null>(null);

  const fetchEmptyTrending = useCallback(async () => {
    setEmptyTrendingLoading(true);
    setEmptyTrendingError(null);
    try {
      const [g, t] = await Promise.all([getGenres(), getTrendingMovies({ page: 1 })]);
      setGenres(g.genres ?? []);
      setEmptyTrending(t.results);
    } catch (e) {
      setEmptyTrendingError(getErrorMessage(e));
      setEmptyTrending([]);
    } finally {
      setEmptyTrendingLoading(false);
    }
  }, []);

  const fetchBecause = useCallback(async () => {
    if (becauseMovieId == null || becauseMovieId <= 0) {
      setBecauseSimilar([]);
      setBecauseError(null);
      setBecauseLoading(false);
      return;
    }
    setBecauseLoading(true);
    setBecauseError(null);
    try {
      const res = await getSimilarMovies(becauseMovieId, { page: 1 });
      setBecauseSimilar(res.results);
    } catch (e) {
      setBecauseError(getErrorMessage(e));
      setBecauseSimilar([]);
    } finally {
      setBecauseLoading(false);
    }
  }, [becauseMovieId]);

  useEffect(() => {
    fetchEmptyTrending().catch(() => {});
  }, [fetchEmptyTrending]);

  useEffect(() => {
    fetchBecause().catch(() => {});
  }, [fetchBecause]);

  const refetch = useCallback(() => {
    fetchEmptyTrending().catch(() => {});
    fetchBecause().catch(() => {});
  }, [fetchEmptyTrending, fetchBecause]);

  const data = useMemo<WatchlistFeedData | null>(
    () => ({
      genres,
      emptyTrending,
      emptyTrendingLoading,
      emptyTrendingError,
      refetchEmptyTrending: fetchEmptyTrending,
      becauseSimilar,
      becauseLoading,
      becauseError,
      refetchBecause: fetchBecause,
    }),
    [
      genres,
      emptyTrending,
      emptyTrendingLoading,
      emptyTrendingError,
      fetchEmptyTrending,
      becauseSimilar,
      becauseLoading,
      becauseError,
      fetchBecause,
    ],
  );

  const loading = emptyTrendingLoading;
  const error = emptyTrendingError;

  return { data, loading, error, refetch };
}

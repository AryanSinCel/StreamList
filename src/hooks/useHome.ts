import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  getGenres,
  getMoviesByGenre,
  getTopRatedMovies,
  getTrendingMovies,
} from '../api/movies';
import type { Genre, MovieListItem } from '../api/types';
import { getErrorMessage } from '../utils/error';

export interface HomeRowState {
  items: MovieListItem[];
  page: number;
  totalPages: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}

export interface HomeData {
  genres: Genre[];
  heroMovie: MovieListItem | null;
  trending: HomeRowState;
  topRated: HomeRowState;
  /** Present only when a genre chip other than All is selected. */
  genreRow: HomeRowState | null;
  loadMoreTrending: () => void;
  loadMoreTopRated: () => void;
  loadMoreGenre: () => void;
  retryTrending: () => void;
  retryTopRated: () => void;
  retryGenre: () => void;
}

const emptyRow = (loading: boolean): HomeRowState => ({
  items: [],
  page: 1,
  totalPages: 1,
  loading,
  loadingMore: false,
  error: null,
});

/**
 * @param selectedGenreChipIndex `0` = All; `1..n` = nth genre from TMDB `/genre/movie/list` (same order as `data.genres`).
 */
export function useHome(selectedGenreChipIndex: number): {
  data: HomeData;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [genres, setGenres] = useState<Genre[]>([]);
  const selectedGenreId =
    selectedGenreChipIndex === 0
      ? null
      : genres[selectedGenreChipIndex - 1]?.id ?? null;
  const [genresLoading, setGenresLoading] = useState(true);
  const [genresError, setGenresError] = useState<string | null>(null);

  const [trending, setTrending] = useState<HomeRowState>(() => emptyRow(true));
  const [topRated, setTopRated] = useState<HomeRowState>(() => emptyRow(true));
  const [genreRow, setGenreRow] = useState<HomeRowState | null>(null);

  const genreRequestGen = useRef(0);
  const trendingMoreLock = useRef(false);
  const topRatedMoreLock = useRef(false);
  const genreMoreLock = useRef(false);

  const trendingRef = useRef(trending);
  const topRatedRef = useRef(topRated);
  const genreRowRef = useRef(genreRow);
  trendingRef.current = trending;
  topRatedRef.current = topRated;
  genreRowRef.current = genreRow;

  const fetchGenres = useCallback(async () => {
    setGenresLoading(true);
    setGenresError(null);
    try {
      const res = await getGenres();
      setGenres(res.genres ?? []);
    } catch (e) {
      setGenresError(getErrorMessage(e));
      setGenres([]);
    } finally {
      setGenresLoading(false);
    }
  }, []);

  const fetchTrendingPage = useCallback(
    async (page: number, mode: 'replace' | 'append') => {
      if (mode === 'replace') {
        setTrending((s) => ({ ...s, loading: true, error: null }));
      } else {
        setTrending((s) => ({ ...s, loadingMore: true, error: null }));
      }
      try {
        const res = await getTrendingMovies({ page });
        setTrending((prev) => ({
          items:
            mode === 'append' ? [...prev.items, ...res.results] : res.results,
          page: res.page,
          totalPages: res.total_pages,
          loading: false,
          loadingMore: false,
          error: null,
        }));
      } catch (e) {
        const msg = getErrorMessage(e);
        setTrending((prev) => ({
          ...prev,
          loading: false,
          loadingMore: false,
          error: mode === 'replace' ? msg : prev.error,
        }));
      }
    },
    [],
  );

  const fetchTopRatedPage = useCallback(
    async (page: number, mode: 'replace' | 'append') => {
      if (mode === 'replace') {
        setTopRated((s) => ({ ...s, loading: true, error: null }));
      } else {
        setTopRated((s) => ({ ...s, loadingMore: true, error: null }));
      }
      try {
        const res = await getTopRatedMovies({ page });
        setTopRated((prev) => ({
          items:
            mode === 'append' ? [...prev.items, ...res.results] : res.results,
          page: res.page,
          totalPages: res.total_pages,
          loading: false,
          loadingMore: false,
          error: null,
        }));
      } catch (e) {
        const msg = getErrorMessage(e);
        setTopRated((prev) => ({
          ...prev,
          loading: false,
          loadingMore: false,
          error: mode === 'replace' ? msg : prev.error,
        }));
      }
    },
    [],
  );

  const fetchGenrePage = useCallback(
    async (genreId: number, page: number, mode: 'replace' | 'append') => {
      const gen = ++genreRequestGen.current;
      if (mode === 'replace') {
        setGenreRow((s) =>
          s
            ? { ...s, loading: true, error: null }
            : { ...emptyRow(true), loading: true },
        );
      } else {
        setGenreRow((s) =>
          s ? { ...s, loadingMore: true, error: null } : s,
        );
      }
      try {
        const res = await getMoviesByGenre(genreId, { page });
        if (gen !== genreRequestGen.current) {
          return;
        }
        setGenreRow((prev) => {
          const base = prev ?? emptyRow(false);
          return {
            items:
              mode === 'append' ? [...base.items, ...res.results] : res.results,
            page: res.page,
            totalPages: res.total_pages,
            loading: false,
            loadingMore: false,
            error: null,
          };
        });
      } catch (e) {
        if (gen !== genreRequestGen.current) {
          return;
        }
        const msg = getErrorMessage(e);
        setGenreRow((prev) => {
          const base = prev ?? emptyRow(false);
          return {
            ...base,
            loading: false,
            loadingMore: false,
            error: mode === 'replace' ? msg : base.error,
          };
        });
      }
    },
    [],
  );

  const runInitial = useCallback(async () => {
    await Promise.all([
      fetchGenres(),
      fetchTrendingPage(1, 'replace'),
      fetchTopRatedPage(1, 'replace'),
    ]);
  }, [fetchGenres, fetchTrendingPage, fetchTopRatedPage]);

  useEffect(() => {
    runInitial().catch(() => {});
  }, [runInitial]);

  useEffect(() => {
    if (selectedGenreId == null) {
      genreRequestGen.current += 1;
      setGenreRow(null);
      return;
    }
    fetchGenrePage(selectedGenreId, 1, 'replace').catch(() => {});
  }, [selectedGenreId, fetchGenrePage]);

  const loadMoreTrending = useCallback(async () => {
    if (trendingMoreLock.current) {
      return;
    }
    const t = trendingRef.current;
    if (t.loading || t.loadingMore) {
      return;
    }
    if (t.page >= t.totalPages) {
      return;
    }
    trendingMoreLock.current = true;
    try {
      await fetchTrendingPage(t.page + 1, 'append');
    } finally {
      trendingMoreLock.current = false;
    }
  }, [fetchTrendingPage]);

  const loadMoreTopRated = useCallback(async () => {
    if (topRatedMoreLock.current) {
      return;
    }
    const r = topRatedRef.current;
    if (r.loading || r.loadingMore) {
      return;
    }
    if (r.page >= r.totalPages) {
      return;
    }
    topRatedMoreLock.current = true;
    try {
      await fetchTopRatedPage(r.page + 1, 'append');
    } finally {
      topRatedMoreLock.current = false;
    }
  }, [fetchTopRatedPage]);

  const loadMoreGenre = useCallback(async () => {
    if (selectedGenreId == null) {
      return;
    }
    const g = genreRowRef.current;
    if (g == null) {
      return;
    }
    if (genreMoreLock.current) {
      return;
    }
    if (g.loading || g.loadingMore) {
      return;
    }
    if (g.page >= g.totalPages) {
      return;
    }
    genreMoreLock.current = true;
    try {
      await fetchGenrePage(selectedGenreId, g.page + 1, 'append');
    } finally {
      genreMoreLock.current = false;
    }
  }, [selectedGenreId, fetchGenrePage]);

  const refetch = useCallback(() => {
    fetchGenres().catch(() => {});
    fetchTrendingPage(1, 'replace').catch(() => {});
    fetchTopRatedPage(1, 'replace').catch(() => {});
    if (selectedGenreId != null) {
      fetchGenrePage(selectedGenreId, 1, 'replace').catch(() => {});
    }
  }, [
    fetchGenres,
    fetchTrendingPage,
    fetchTopRatedPage,
    fetchGenrePage,
    selectedGenreId,
  ]);

  const retryTrending = useCallback(() => {
    fetchTrendingPage(1, 'replace').catch(() => {});
  }, [fetchTrendingPage]);

  const retryTopRated = useCallback(() => {
    fetchTopRatedPage(1, 'replace').catch(() => {});
  }, [fetchTopRatedPage]);

  const retryGenre = useCallback(() => {
    if (selectedGenreId != null) {
      fetchGenrePage(selectedGenreId, 1, 'replace').catch(() => {});
    }
  }, [selectedGenreId, fetchGenrePage]);

  const heroMovie = trending.items[0] ?? null;

  const data = useMemo<HomeData>(() => {
    return {
      genres,
      heroMovie,
      trending,
      topRated,
      genreRow: selectedGenreId != null ? genreRow : null,
      loadMoreTrending,
      loadMoreTopRated,
      loadMoreGenre,
      retryTrending,
      retryTopRated,
      retryGenre,
    };
  }, [
    genres,
    heroMovie,
    trending,
    topRated,
    genreRow,
    selectedGenreId,
    loadMoreTrending,
    loadMoreTopRated,
    loadMoreGenre,
    retryTrending,
    retryTopRated,
    retryGenre,
  ]);

  const loading =
    genresLoading ||
    (trending.loading && trending.items.length === 0) ||
    (topRated.loading && topRated.items.length === 0);

  const fatal =
    Boolean(genresError) &&
    Boolean(trending.error) &&
    Boolean(topRated.error) &&
    (selectedGenreId == null || Boolean(genreRow?.error));

  const error = fatal ? 'Unable to load the home screen. Try again.' : null;

  return {
    data,
    loading,
    error,
    refetch,
  };
}

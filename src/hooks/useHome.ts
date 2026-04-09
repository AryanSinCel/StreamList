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
  /** Discover rows keyed by TMDB genre id (filled lazily when “All” + rail visible). */
  genreRows: Record<number, HomeRowState>;
  loadMoreTrending: () => void;
  loadMoreTopRated: () => void;
  /** First page for a genre rail (viewport lazy-load or chip selection). */
  ensureGenreRowLoaded: (genreId: number) => void;
  loadMoreGenre: (genreId: number) => void;
  retryTrending: () => void;
  retryTopRated: () => void;
  retryGenre: (genreId: number) => void;
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
  const [genreRows, setGenreRows] = useState<Record<number, HomeRowState>>({});

  const genreRequestGenById = useRef(new Map<number, number>());
  const trendingMoreLock = useRef(false);
  const topRatedMoreLock = useRef(false);
  const genreMoreLocks = useRef(new Map<number, boolean>());

  const trendingRef = useRef(trending);
  const topRatedRef = useRef(topRated);
  const genreRowsRef = useRef(genreRows);
  trendingRef.current = trending;
  topRatedRef.current = topRated;
  genreRowsRef.current = genreRows;

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
      const map = genreRequestGenById.current;
      const nextGen = (map.get(genreId) ?? 0) + 1;
      map.set(genreId, nextGen);
      const requestAtStart = nextGen;

      if (mode === 'replace') {
        setGenreRows((prev) => ({
          ...prev,
          [genreId]: {
            ...(prev[genreId] ?? emptyRow(false)),
            loading: true,
            loadingMore: false,
            error: null,
          },
        }));
      } else {
        setGenreRows((prev) => {
          const base = prev[genreId];
          if (!base) {
            return prev;
          }
          return {
            ...prev,
            [genreId]: { ...base, loadingMore: true, error: null },
          };
        });
      }
      try {
        const res = await getMoviesByGenre(genreId, { page });
        if (map.get(genreId) !== requestAtStart) {
          return;
        }
        setGenreRows((prev) => {
          const base = prev[genreId] ?? emptyRow(false);
          return {
            ...prev,
            [genreId]: {
              items:
                mode === 'append' ? [...base.items, ...res.results] : res.results,
              page: res.page,
              totalPages: res.total_pages,
              loading: false,
              loadingMore: false,
              error: null,
            },
          };
        });
      } catch (e) {
        if (map.get(genreId) !== requestAtStart) {
          return;
        }
        const msg = getErrorMessage(e);
        setGenreRows((prev) => {
          const base = prev[genreId] ?? emptyRow(false);
          return {
            ...prev,
            [genreId]: {
              ...base,
              loading: false,
              loadingMore: false,
              error: mode === 'replace' ? msg : base.error,
            },
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
      return;
    }
    fetchGenrePage(selectedGenreId, 1, 'replace').catch(() => {});
  }, [selectedGenreId, fetchGenrePage]);

  const ensureGenreRowLoaded = useCallback(
    (genreId: number) => {
      const row = genreRowsRef.current[genreId];
      if (row?.loading || row?.loadingMore) {
        return;
      }
      if (row && row.items.length > 0) {
        return;
      }
      if (row?.error) {
        return;
      }
      fetchGenrePage(genreId, 1, 'replace').catch(() => {});
    },
    [fetchGenrePage],
  );

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

  const loadMoreGenre = useCallback(
    async (genreId: number) => {
      if (genreMoreLocks.current.get(genreId)) {
        return;
      }
      const g = genreRowsRef.current[genreId];
      if (g == null) {
        return;
      }
      if (g.loading || g.loadingMore) {
        return;
      }
      if (g.page >= g.totalPages) {
        return;
      }
      genreMoreLocks.current.set(genreId, true);
      try {
        await fetchGenrePage(genreId, g.page + 1, 'append');
      } finally {
        genreMoreLocks.current.set(genreId, false);
      }
    },
    [fetchGenrePage],
  );

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

  const retryGenre = useCallback(
    (genreId: number) => {
      fetchGenrePage(genreId, 1, 'replace').catch(() => {});
    },
    [fetchGenrePage],
  );

  const heroMovie = trending.items[0] ?? null;

  const data = useMemo<HomeData>(() => {
    return {
      genres,
      heroMovie,
      trending,
      topRated,
      genreRows,
      loadMoreTrending,
      loadMoreTopRated,
      ensureGenreRowLoaded,
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
    genreRows,
    loadMoreTrending,
    loadMoreTopRated,
    ensureGenreRowLoaded,
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
    Boolean(topRated.error);

  const error = fatal ? 'Unable to load the home screen. Try again.' : null;

  return {
    data,
    loading,
    error,
    refetch,
  };
}

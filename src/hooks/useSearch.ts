import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getGenres, getTrendingMovies, searchMovies } from '../api/movies';
import type { Genre, MovieListItem } from '../api/types';
import {
  clearRecentSearches,
  loadRecentSearches,
  pushRecentSearch,
  removeRecentSearch,
} from '../utils/recentSearchesStorage';
import { getErrorMessage, isAbortError } from '../utils/error';

const DEBOUNCE_MS = 400;

export interface SearchData {
  results: MovieListItem[];
  page: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  query: string;
  fetchNextPage: () => Promise<void>;
  /** Trending for default (empty query) search screen — featured + grid. */
  defaultTrending: MovieListItem[];
  genres: Genre[];
  defaultTrendingLoading: boolean;
  defaultTrendingError: string | null;
  refetchDefaultTrending: () => void;
  recentSearches: string[];
  clearAllRecentSearches: () => Promise<void>;
  removeRecentSearchTerm: (term: string) => Promise<void>;
}

/**
 * TMDB movie search: debounced query, cancellation, pagination, recent terms.
 */
export function useSearch(rawQuery: string): {
  data: SearchData;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current != null) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      setDebouncedQuery(rawQuery.trim());
    }, DEBOUNCE_MS);
    return () => {
      if (debounceTimerRef.current != null) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [rawQuery]);

  const [results, setResults] = useState<MovieListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const activeQueryRef = useRef('');
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const fetchingMoreRef = useRef(false);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [defaultTrending, setDefaultTrending] = useState<MovieListItem[]>([]);
  const [defaultTrendingLoading, setDefaultTrendingLoading] = useState(true);
  const [defaultTrendingError, setDefaultTrendingError] = useState<string | null>(
    null,
  );

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    loadRecentSearches().then(setRecentSearches).catch(() => {});
  }, []);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  const fetchDefaultTrending = useCallback(async () => {
    setDefaultTrendingLoading(true);
    setDefaultTrendingError(null);
    try {
      const [g, t] = await Promise.all([getGenres(), getTrendingMovies({ page: 1 })]);
      setGenres(g.genres ?? []);
      setDefaultTrending(t.results);
    } catch (e) {
      setDefaultTrendingError(getErrorMessage(e));
      setDefaultTrending([]);
    } finally {
      setDefaultTrendingLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDefaultTrending().catch(() => {});
  }, [fetchDefaultTrending]);

  const runSearch = useCallback(
    async (pageNum: number, mode: 'replace' | 'append') => {
      const q = debouncedQuery;
      if (!q) {
        return;
      }
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = ++requestIdRef.current;
      if (mode === 'replace') {
        setLoading(true);
      }
      setError(null);
      activeQueryRef.current = q;

      try {
        const res = await searchMovies(q, {
          page: pageNum,
          signal: controller.signal,
        });
        if (requestId !== requestIdRef.current) {
          return;
        }
        setPage(res.page);
        setTotalPages(res.total_pages);
        setTotalResults(res.total_results);
        setResults((prev) =>
          mode === 'append' ? [...prev, ...res.results] : res.results,
        );
        if (mode === 'replace' && res.total_results > 0) {
          const next = await pushRecentSearch(q);
          setRecentSearches(next);
        }
      } catch (e) {
        if (isAbortError(e)) {
          return;
        }
        if (requestId !== requestIdRef.current) {
          return;
        }
        setError(getErrorMessage(e));
        if (mode === 'replace') {
          setResults([]);
          setPage(1);
          setTotalPages(1);
          setTotalResults(0);
        }
      } finally {
        if (requestId === requestIdRef.current && mode === 'replace') {
          setLoading(false);
        }
      }
    },
    [debouncedQuery],
  );

  useEffect(() => {
    if (!debouncedQuery) {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      requestIdRef.current += 1;
      activeQueryRef.current = '';
      setResults([]);
      setPage(1);
      setTotalPages(1);
      setTotalResults(0);
      setError(null);
      setLoading(false);
      return;
    }
    runSearch(1, 'replace').catch(() => {});
  }, [debouncedQuery, runSearch]);

  const refetch = useCallback(() => {
    if (debouncedQuery) {
      runSearch(1, 'replace').catch(() => {});
    } else {
      fetchDefaultTrending().catch(() => {});
    }
  }, [debouncedQuery, runSearch, fetchDefaultTrending]);

  const fetchNextPage = useCallback(async () => {
    const q = debouncedQuery;
    if (!q || activeQueryRef.current !== q) {
      return;
    }
    if (fetchingMoreRef.current) {
      return;
    }
    if (pageRef.current >= totalPagesRef.current) {
      return;
    }
    fetchingMoreRef.current = true;
    try {
      await runSearch(pageRef.current + 1, 'append');
    } finally {
      fetchingMoreRef.current = false;
    }
  }, [debouncedQuery, runSearch]);

  const clearRecent = useCallback(async () => {
    await clearRecentSearches();
    setRecentSearches([]);
  }, []);

  const dismissRecent = useCallback(async (term: string) => {
    const next = await removeRecentSearch(term);
    setRecentSearches(next);
  }, []);

  const data = useMemo<SearchData>(() => {
    const hasQuery = debouncedQuery.length > 0;
    if (!hasQuery) {
      return {
        results: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
        hasMore: false,
        query: '',
        fetchNextPage,
        defaultTrending,
        genres,
        defaultTrendingLoading,
        defaultTrendingError,
        refetchDefaultTrending: fetchDefaultTrending,
        recentSearches,
        clearAllRecentSearches: clearRecent,
        removeRecentSearchTerm: dismissRecent,
      };
    }
    const hasMore = page < totalPages;
    return {
      results,
      page,
      totalPages,
      totalResults,
      hasMore,
      query: debouncedQuery,
      fetchNextPage,
      defaultTrending,
      genres,
      defaultTrendingLoading,
      defaultTrendingError,
      refetchDefaultTrending: fetchDefaultTrending,
      recentSearches,
      clearAllRecentSearches: clearRecent,
      removeRecentSearchTerm: dismissRecent,
    };
  }, [
    debouncedQuery,
    results,
    page,
    totalPages,
    totalResults,
    fetchNextPage,
    defaultTrending,
    genres,
    defaultTrendingLoading,
    defaultTrendingError,
    fetchDefaultTrending,
    recentSearches,
    clearRecent,
    dismissRecent,
  ]);

  const topLoading =
    debouncedQuery.length > 0 ? loading : defaultTrendingLoading;

  return { data, loading: topLoading, error, refetch };
}

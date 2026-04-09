import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { searchMovies } from '../api/movies';
import type { MovieListItem } from '../api/types';
import { getErrorMessage } from '../utils/error';

export interface SearchData {
  results: MovieListItem[];
  page: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  query: string;
  fetchNextPage: () => Promise<void>;
}

/**
 * TMDB movie search with append pagination. Pass the current query string;
 * debouncing / trimming for UX belongs in the screen.
 */
export function useSearch(query: string): {
  data: SearchData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const trimmed = query.trim();
  const [results, setResults] = useState<MovieListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const activeQueryRef = useRef('');
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const fetchingMoreRef = useRef(false);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  const runSearch = useCallback(
    async (pageNum: number, mode: 'replace' | 'append') => {
      const q = trimmed;
      if (!q) {
        return;
      }
      const requestId = ++requestIdRef.current;
      if (mode === 'replace') {
        setLoading(true);
      }
      setError(null);
      activeQueryRef.current = q;

      try {
        const res = await searchMovies(q, { page: pageNum });
        if (requestId !== requestIdRef.current) {
          return;
        }
        setPage(res.page);
        setTotalPages(res.total_pages);
        setTotalResults(res.total_results);
        setResults((prev) =>
          mode === 'append' ? [...prev, ...res.results] : res.results,
        );
      } catch (e) {
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
    [trimmed],
  );

  useEffect(() => {
    if (!trimmed) {
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
  }, [trimmed, runSearch]);

  const refetch = useCallback(() => {
    if (!trimmed) {
      return;
    }
    runSearch(1, 'replace').catch(() => {});
  }, [trimmed, runSearch]);

  const fetchNextPage = useCallback(async () => {
    if (!trimmed || activeQueryRef.current !== trimmed) {
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
  }, [trimmed, runSearch]);

  const data = useMemo<SearchData | null>(() => {
    if (!trimmed) {
      return null;
    }
    const hasMore = page < totalPages;
    return {
      results,
      page,
      totalPages,
      totalResults,
      hasMore,
      query: trimmed,
      fetchNextPage,
    };
  }, [
    trimmed,
    results,
    page,
    totalPages,
    totalResults,
    fetchNextPage,
  ]);

  return { data, loading, error, refetch };
}

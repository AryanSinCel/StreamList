import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  getGenres,
  getMoviesByGenre,
  getSimilarMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from '../api/movies';
import type { Genre, MovieListItem } from '../api/types';
import type { SeeAllParams } from '../navigation/types';
import type { UseQueryResult } from '../types/query';
import { getErrorMessage } from '../utils/error';
import { mergeUniqueMovieListById } from '../utils/movieListMerge';

export type UseSeeAllParams = Pick<
  SeeAllParams,
  'type' | 'genreId' | 'movieId'
>;

export type UseSeeAllResult = UseQueryResult<MovieListItem[]> & {
  loadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
  genreMap: ReadonlyMap<number, string>;
};

export function useSeeAll(params: UseSeeAllParams): UseSeeAllResult {
  const { type, genreId, movieId } = params;

  const [items, setItems] = useState<MovieListItem[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  const loadMoreLock = useRef(false);
  const pageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const abortRef = useRef<AbortController | null>(null);
  const requestEpochRef = useRef(0);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  const genreMap = useMemo(() => {
    const m = new Map<number, string>();
    for (const g of genres) {
      m.set(g.id, g.name);
    }
    return m;
  }, [genres]);

  const fetchListPage = useCallback(
    async (pageNum: number, signal?: AbortSignal) => {
      switch (type) {
        case 'trending':
          return getTrendingMovies({ page: pageNum, signal });
        case 'top_rated':
          return getTopRatedMovies({ page: pageNum, signal });
        case 'genre': {
          if (genreId == null) {
            throw new Error('Missing genre');
          }
          return getMoviesByGenre(genreId, { page: pageNum, signal });
        }
        case 'similar': {
          if (movieId == null) {
            throw new Error('Missing movie');
          }
          return getSimilarMovies(movieId, { page: pageNum, signal });
        }
      }
    },
    [type, genreId, movieId],
  );

  const runInitialLoad = useCallback(async () => {
    if (type === 'genre' && genreId == null) {
      setError('This list could not be loaded.');
      setItems([]);
      setLoading(false);
      return;
    }

    if (type === 'similar' && movieId == null) {
      setError('This list could not be loaded.');
      setItems([]);
      setLoading(false);
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;
    const epoch = ++requestEpochRef.current;

    setLoading(true);
    setError(null);
    setItems(null);
    setPage(1);
    setTotalPages(1);
    pageRef.current = 1;
    totalPagesRef.current = 1;

    try {
      const [gRes, lRes] = await Promise.allSettled([
        getGenres({ signal: controller.signal }),
        fetchListPage(1, controller.signal),
      ]);
      if (epoch !== requestEpochRef.current) {
        return;
      }
      if (gRes.status === 'fulfilled') {
        setGenres(gRes.value.genres ?? []);
      } else {
        setGenres([]);
      }
      if (lRes.status === 'rejected') {
        throw lRes.reason;
      }
      const listRes = lRes.value;
      setItems(listRes.results);
      setPage(listRes.page);
      setTotalPages(listRes.total_pages);
      pageRef.current = listRes.page;
      totalPagesRef.current = listRes.total_pages;
      setError(null);
    } catch (e) {
      if (epoch !== requestEpochRef.current) {
        return;
      }
      setError(getErrorMessage(e));
      setItems([]);
    } finally {
      if (epoch === requestEpochRef.current) {
        setLoading(false);
      }
    }
  }, [type, genreId, movieId, fetchListPage]);

  useEffect(() => {
    runInitialLoad().catch(() => {});
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [runInitialLoad]);

  const refetch = useCallback(() => {
    runInitialLoad().catch(() => {});
  }, [runInitialLoad]);

  const loadMore = useCallback(() => {
    if (type === 'genre' && genreId == null) {
      return;
    }
    if (type === 'similar' && movieId == null) {
      return;
    }
    if (loadMoreLock.current) {
      return;
    }
    if (items == null) {
      return;
    }
    if (pageRef.current >= totalPagesRef.current) {
      return;
    }
    const nextPage = pageRef.current + 1;
    loadMoreLock.current = true;
    setLoadingMore(true);
    (async () => {
      try {
        const res = await fetchListPage(nextPage);
        setItems((prev) => {
          if (prev == null) {
            return res.results;
          }
          return mergeUniqueMovieListById(prev, res.results);
        });
        setPage(res.page);
        setTotalPages(res.total_pages);
        pageRef.current = res.page;
        totalPagesRef.current = res.total_pages;
      } catch {
        /* Keep visible list; user can pull refetch via screen retry if needed. */
      } finally {
        loadMoreLock.current = false;
        setLoadingMore(false);
      }
    })().catch(() => {});
  }, [type, genreId, movieId, items, fetchListPage]);

  const hasMore = page < totalPages;

  return {
    data: items,
    loading,
    error,
    refetch,
    loadMore,
    hasMore,
    loadingMore,
    genreMap,
  };
}

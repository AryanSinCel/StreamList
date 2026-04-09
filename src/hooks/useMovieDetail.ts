import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  getMovieCredits,
  getMovieDetails,
  getSimilarMovies,
} from '../api/movies';
import type {
  MovieCreditsResponse,
  MovieDetails,
  MovieListItem,
} from '../api/types';
import { getErrorMessage } from '../utils/error';

export interface MovieDetailSectionErrors {
  movie: string | null;
  credits: string | null;
  similar: string | null;
}

export interface SimilarPagination {
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface MovieDetailData {
  movie: MovieDetails | null;
  credits: MovieCreditsResponse | null;
  similar: MovieListItem[];
  sectionErrors: MovieDetailSectionErrors;
  similarPagination: SimilarPagination;
  fetchMoreSimilar: () => Promise<void>;
}

const emptySectionErrors = (): MovieDetailSectionErrors => ({
  movie: null,
  credits: null,
  similar: null,
});

/**
 * Movie detail: loads details, credits, and similar in parallel (`Promise.allSettled`).
 * Similar movies support append pagination via `fetchMoreSimilar`.
 */
export function useMovieDetail(movieId: number): {
  data: MovieDetailData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCreditsResponse | null>(null);
  const [similar, setSimilar] = useState<MovieListItem[]>([]);
  const [sectionErrors, setSectionErrors] = useState<MovieDetailSectionErrors>(
    emptySectionErrors,
  );
  const [similarPagination, setSimilarPagination] = useState<SimilarPagination>(
    { page: 1, totalPages: 1, hasMore: false },
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const movieIdRef = useRef(movieId);
  const similarPageRef = useRef(1);
  const similarTotalPagesRef = useRef(1);
  const fetchingMoreSimilarRef = useRef(false);

  useEffect(() => {
    similarPageRef.current = similarPagination.page;
  }, [similarPagination.page]);

  useEffect(() => {
    similarTotalPagesRef.current = similarPagination.totalPages;
  }, [similarPagination.totalPages]);

  const runLoad = useCallback(async () => {
    if (movieId <= 0 || !Number.isFinite(movieId)) {
      setMovie(null);
      setCredits(null);
      setSimilar([]);
      setSectionErrors(emptySectionErrors());
      setSimilarPagination({ page: 1, totalPages: 1, hasMore: false });
      setError('Invalid movie');
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    movieIdRef.current = movieId;
    setLoading(true);
    setError(null);
    setSectionErrors(emptySectionErrors());

    const settled = await Promise.allSettled([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getSimilarMovies(movieId, { page: 1 }),
    ]);

    if (requestId !== requestIdRef.current) {
      return;
    }

    const [movieRes, creditsRes, similarRes] = settled;

    let nextMovie: MovieDetails | null = null;
    let nextCredits: MovieCreditsResponse | null = null;
    let nextSimilar: MovieListItem[] = [];
    const nextErrors = emptySectionErrors();

    if (movieRes.status === 'fulfilled') {
      nextMovie = movieRes.value;
    } else {
      nextErrors.movie = getErrorMessage(movieRes.reason);
    }

    if (creditsRes.status === 'fulfilled') {
      nextCredits = creditsRes.value;
    } else {
      nextErrors.credits = getErrorMessage(creditsRes.reason);
    }

    if (similarRes.status === 'fulfilled') {
      nextSimilar = similarRes.value.results;
      setSimilarPagination({
        page: similarRes.value.page,
        totalPages: similarRes.value.total_pages,
        hasMore: similarRes.value.page < similarRes.value.total_pages,
      });
    } else {
      nextErrors.similar = getErrorMessage(similarRes.reason);
      setSimilarPagination({ page: 1, totalPages: 1, hasMore: false });
    }

    setMovie(nextMovie);
    setCredits(nextCredits);
    setSimilar(nextSimilar);
    setSectionErrors(nextErrors);

    if (nextErrors.movie) {
      setError(nextErrors.movie);
    } else {
      setError(null);
    }
    setLoading(false);
  }, [movieId]);

  useEffect(() => {
    runLoad().catch(() => {});
  }, [runLoad]);

  const refetch = useCallback(() => {
    runLoad().catch(() => {});
  }, [runLoad]);

  const fetchMoreSimilar = useCallback(async () => {
    const id = movieIdRef.current;
    if (id <= 0 || fetchingMoreSimilarRef.current) {
      return;
    }
    if (similarPageRef.current >= similarTotalPagesRef.current) {
      return;
    }
    fetchingMoreSimilarRef.current = true;
    const requestId = requestIdRef.current;
    try {
      const nextPage = similarPageRef.current + 1;
      const res = await getSimilarMovies(id, { page: nextPage });
      if (requestId !== requestIdRef.current) {
        return;
      }
      setSimilar((prev) => [...prev, ...res.results]);
      setSimilarPagination({
        page: res.page,
        totalPages: res.total_pages,
        hasMore: res.page < res.total_pages,
      });
    } catch (e) {
      if (requestId !== requestIdRef.current) {
        return;
      }
      setSectionErrors((prev) => ({
        ...prev,
        similar: getErrorMessage(e),
      }));
    } finally {
      fetchingMoreSimilarRef.current = false;
    }
  }, []);

  const data = useMemo<MovieDetailData | null>(() => {
    if (movieId <= 0 || !Number.isFinite(movieId)) {
      return null;
    }
    return {
      movie,
      credits,
      similar,
      sectionErrors,
      similarPagination,
      fetchMoreSimilar,
    };
  }, [
    movieId,
    movie,
    credits,
    similar,
    sectionErrors,
    similarPagination,
    fetchMoreSimilar,
  ]);

  return { data, loading, error, refetch };
}

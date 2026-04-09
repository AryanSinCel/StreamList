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
  SimilarMoviesResponse,
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
  loading: {
    movie: boolean;
    credits: boolean;
    similar: boolean;
  };
  sectionErrors: MovieDetailSectionErrors;
  similarPagination: SimilarPagination;
  fetchMoreSimilar: () => Promise<void>;
  retryMovie: () => void;
  retryCredits: () => void;
  retrySimilar: () => void;
}

const emptyErrors = (): MovieDetailSectionErrors => ({
  movie: null,
  credits: null,
  similar: null,
});

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
    emptyErrors,
  );
  const [loading, setLoading] = useState({
    movie: true,
    credits: true,
    similar: true,
  });
  const [similarPagination, setSimilarPagination] = useState<SimilarPagination>(
    { page: 1, totalPages: 1, hasMore: false },
  );
  const [topError, setTopError] = useState<string | null>(null);

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

  const applySettled = useCallback(
    (
      settled: [
        PromiseSettledResult<MovieDetails>,
        PromiseSettledResult<MovieCreditsResponse>,
        PromiseSettledResult<SimilarMoviesResponse>,
      ],
    ) => {
      const [movieRes, creditsRes, similarRes] = settled;
      const nextErrors = emptyErrors();

      if (movieRes.status === 'fulfilled') {
        setMovie(movieRes.value);
      } else {
        nextErrors.movie = getErrorMessage(movieRes.reason);
        setMovie(null);
      }

      if (creditsRes.status === 'fulfilled') {
        setCredits(creditsRes.value);
      } else {
        nextErrors.credits = getErrorMessage(creditsRes.reason);
        setCredits(null);
      }

      if (similarRes.status === 'fulfilled') {
        setSimilar(similarRes.value.results);
        setSimilarPagination({
          page: similarRes.value.page,
          totalPages: similarRes.value.total_pages,
          hasMore: similarRes.value.page < similarRes.value.total_pages,
        });
      } else {
        nextErrors.similar = getErrorMessage(similarRes.reason);
        setSimilar([]);
        setSimilarPagination({ page: 1, totalPages: 1, hasMore: false });
      }

      setSectionErrors(nextErrors);
      setLoading({
        movie: false,
        credits: false,
        similar: false,
      });
      setTopError(nextErrors.movie);
    },
    [],
  );

  const runParallelLoad = useCallback(async () => {
    if (movieId <= 0 || !Number.isFinite(movieId)) {
      setMovie(null);
      setCredits(null);
      setSimilar([]);
      setSectionErrors(emptyErrors());
      setSimilarPagination({ page: 1, totalPages: 1, hasMore: false });
      setTopError('Invalid movie');
      setLoading({ movie: false, credits: false, similar: false });
      return;
    }

    const requestId = ++requestIdRef.current;
    movieIdRef.current = movieId;
    setTopError(null);
    setSectionErrors(emptyErrors());
    setLoading({ movie: true, credits: true, similar: true });

    const settled = await Promise.allSettled([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getSimilarMovies(movieId, { page: 1 }),
    ]);

    if (requestId !== requestIdRef.current) {
      return;
    }

    applySettled(
      settled as [
        PromiseSettledResult<MovieDetails>,
        PromiseSettledResult<MovieCreditsResponse>,
        PromiseSettledResult<SimilarMoviesResponse>,
      ],
    );
  }, [movieId, applySettled]);

  useEffect(() => {
    runParallelLoad().catch(() => {});
  }, [runParallelLoad]);

  const retryMovie = useCallback(async () => {
    if (movieId <= 0) {
      return;
    }
    setLoading((l) => ({ ...l, movie: true }));
    setSectionErrors((e) => ({ ...e, movie: null }));
    try {
      const m = await getMovieDetails(movieId);
      setMovie(m);
      setSectionErrors((e) => ({ ...e, movie: null }));
      setTopError(null);
    } catch (e) {
      const msg = getErrorMessage(e);
      setSectionErrors((prev) => ({ ...prev, movie: msg }));
      setTopError(msg);
    } finally {
      setLoading((l) => ({ ...l, movie: false }));
    }
  }, [movieId]);

  const retryCredits = useCallback(async () => {
    if (movieId <= 0) {
      return;
    }
    setLoading((l) => ({ ...l, credits: true }));
    setSectionErrors((e) => ({ ...e, credits: null }));
    try {
      const c = await getMovieCredits(movieId);
      setCredits(c);
      setSectionErrors((e) => ({ ...e, credits: null }));
    } catch (e) {
      setSectionErrors((prev) => ({
        ...prev,
        credits: getErrorMessage(e),
      }));
    } finally {
      setLoading((l) => ({ ...l, credits: false }));
    }
  }, [movieId]);

  const retrySimilar = useCallback(async () => {
    if (movieId <= 0) {
      return;
    }
    setLoading((l) => ({ ...l, similar: true }));
    setSectionErrors((e) => ({ ...e, similar: null }));
    try {
      const res = await getSimilarMovies(movieId, { page: 1 });
      setSimilar(res.results);
      setSimilarPagination({
        page: res.page,
        totalPages: res.total_pages,
        hasMore: res.page < res.total_pages,
      });
      setSectionErrors((e) => ({ ...e, similar: null }));
    } catch (e) {
      setSectionErrors((prev) => ({
        ...prev,
        similar: getErrorMessage(e),
      }));
      setSimilar([]);
    } finally {
      setLoading((l) => ({ ...l, similar: false }));
    }
  }, [movieId]);

  const refetch = useCallback(() => {
    runParallelLoad().catch(() => {});
  }, [runParallelLoad]);

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
      loading,
      sectionErrors,
      similarPagination,
      fetchMoreSimilar,
      retryMovie,
      retryCredits,
      retrySimilar,
    };
  }, [
    movieId,
    movie,
    credits,
    similar,
    loading,
    sectionErrors,
    similarPagination,
    fetchMoreSimilar,
    retryMovie,
    retryCredits,
    retrySimilar,
  ]);

  const hookLoading = movieId > 0 && loading.movie && movie === null;

  return { data, loading: hookLoading, error: topError, refetch };
}

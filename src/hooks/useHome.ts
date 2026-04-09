import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  getGenres,
  getMoviesByGenre,
  getTopRatedMovies,
  getTrendingMovies,
} from '../api/movies';
import type { DiscoverMoviesResponse, Genre, MovieListItem } from '../api/types';
import { getErrorMessage } from '../utils/error';

export interface HomeSectionErrors {
  trending: string | null;
  topRated: string | null;
  genres: string | null;
  genreMovies: string | null;
}

export interface HomeData {
  trending: MovieListItem[];
  topRated: MovieListItem[];
  genres: Genre[];
  genreMovies: MovieListItem[];
  sectionErrors: HomeSectionErrors;
}

interface HomeFetchState {
  trending: MovieListItem[];
  topRated: MovieListItem[];
  genres: Genre[];
  genreMovies: MovieListItem[];
  sectionErrors: HomeSectionErrors;
}

const emptySectionErrors = (): HomeSectionErrors => ({
  trending: null,
  topRated: null,
  genres: null,
  genreMovies: null,
});

const emptyDiscover: DiscoverMoviesResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

/**
 * Home feed: trending, top rated, genres, and discover-by-genre for `selectedGenreId`.
 * Sections load in parallel; failures are isolated in `sectionErrors`.
 */
export function useHome(selectedGenreId: number | null): {
  data: HomeData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [bundle, setBundle] = useState<HomeFetchState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const runFetch = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    const [
      trendingResult,
      topRatedResult,
      genresResult,
      genreResult,
    ] = await Promise.allSettled([
      getTrendingMovies({ page: 1 }),
      getTopRatedMovies({ page: 1 }),
      getGenres(),
      selectedGenreId != null
        ? getMoviesByGenre(selectedGenreId, { page: 1 })
        : Promise.resolve(emptyDiscover),
    ]);

    if (requestId !== requestIdRef.current) {
      return;
    }

    const nextErrors = emptySectionErrors();
    let trending: MovieListItem[] = [];
    let topRated: MovieListItem[] = [];
    let genres: Genre[] = [];
    let genreMovies: MovieListItem[] = [];

    if (trendingResult.status === 'fulfilled') {
      trending = trendingResult.value.results;
    } else {
      nextErrors.trending = getErrorMessage(trendingResult.reason);
    }

    if (topRatedResult.status === 'fulfilled') {
      topRated = topRatedResult.value.results;
    } else {
      nextErrors.topRated = getErrorMessage(topRatedResult.reason);
    }

    if (genresResult.status === 'fulfilled') {
      genres = genresResult.value.genres ?? [];
    } else {
      nextErrors.genres = getErrorMessage(genresResult.reason);
    }

    if (selectedGenreId != null) {
      if (genreResult.status === 'fulfilled') {
        genreMovies = genreResult.value.results;
      } else {
        nextErrors.genreMovies = getErrorMessage(genreResult.reason);
      }
    }

    const allFailed =
      nextErrors.trending &&
      nextErrors.topRated &&
      nextErrors.genres &&
      (selectedGenreId == null || nextErrors.genreMovies);

    setBundle({
      trending,
      topRated,
      genres,
      genreMovies,
      sectionErrors: nextErrors,
    });
    setError(allFailed ? 'Unable to load the home screen. Try again.' : null);
    setLoading(false);
  }, [selectedGenreId]);

  useEffect(() => {
    runFetch().catch(() => {});
  }, [runFetch]);

  const data = useMemo<HomeData | null>(() => {
    if (!bundle) {
      return null;
    }
    return {
      trending: bundle.trending,
      topRated: bundle.topRated,
      genres: bundle.genres,
      genreMovies: bundle.genreMovies,
      sectionErrors: bundle.sectionErrors,
    };
  }, [bundle]);

  const refetch = useCallback(() => {
    runFetch().catch(() => {});
  }, [runFetch]);

  return { data, loading, error, refetch };
}

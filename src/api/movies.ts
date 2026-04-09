import apiClient from './client';
import type {
  DiscoverMoviesResponse,
  GenresListResponse,
  MovieCreditsResponse,
  MovieDetails,
  MovieListRequestParams,
  SearchMoviesResponse,
  SimilarMoviesResponse,
  TopRatedMoviesResponse,
  TrendingMoviesResponse,
} from './types';

function splitParams(
  params?: MovieListRequestParams,
): { page?: number; signal?: AbortSignal } {
  if (params == null) {
    return {};
  }
  const { signal, page } = params;
  return { page, signal };
}

/**
 * GET /trending/movie/week
 * @see https://developer.themoviedb.org/reference/trending-movies
 */
export async function getTrendingMovies(
  params?: MovieListRequestParams,
): Promise<TrendingMoviesResponse> {
  const { signal, page } = splitParams(params);
  const { data } = await apiClient.get<TrendingMoviesResponse>(
    '/trending/movie/week',
    { params: page != null ? { page } : undefined, signal },
  );
  return data;
}

/**
 * GET /movie/top_rated
 * @see https://developer.themoviedb.org/reference/movie-top-rated-list
 */
export async function getTopRatedMovies(
  params?: MovieListRequestParams,
): Promise<TopRatedMoviesResponse> {
  const { signal, page } = splitParams(params);
  const { data } = await apiClient.get<TopRatedMoviesResponse>('/movie/top_rated', {
    params: page != null ? { page } : undefined,
    signal,
  });
  return data;
}

/**
 * GET /genre/movie/list
 * @see https://developer.themoviedb.org/reference/genre-movie-list
 */
export async function getGenres(config?: {
  signal?: AbortSignal;
}): Promise<GenresListResponse> {
  const { data } = await apiClient.get<GenresListResponse>('/genre/movie/list', {
    signal: config?.signal,
  });
  return data;
}

/**
 * GET /discover/movie — filter by genre
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export async function getMoviesByGenre(
  genreId: number,
  params?: MovieListRequestParams,
): Promise<DiscoverMoviesResponse> {
  const { signal, page } = splitParams(params);
  const { data } = await apiClient.get<DiscoverMoviesResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
      ...(page != null ? { page } : {}),
    },
    signal,
  });
  return data;
}

/**
 * GET /search/movie
 * @see https://developer.themoviedb.org/reference/search-movie
 */
export async function searchMovies(
  query: string,
  params?: MovieListRequestParams,
): Promise<SearchMoviesResponse> {
  const { signal, page } = splitParams(params);
  const { data } = await apiClient.get<SearchMoviesResponse>('/search/movie', {
    params: {
      query,
      ...(page != null ? { page } : {}),
    },
    signal,
  });
  return data;
}

/**
 * GET /movie/{movie_id}
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export async function getMovieDetails(
  movieId: number,
  config?: { signal?: AbortSignal },
): Promise<MovieDetails> {
  const { data } = await apiClient.get<MovieDetails>(`/movie/${movieId}`, {
    signal: config?.signal,
  });
  return data;
}

/**
 * GET /movie/{movie_id}/credits
 * @see https://developer.themoviedb.org/reference/movie-credits
 */
export async function getMovieCredits(
  movieId: number,
  config?: { signal?: AbortSignal },
): Promise<MovieCreditsResponse> {
  const { data } = await apiClient.get<MovieCreditsResponse>(
    `/movie/${movieId}/credits`,
    { signal: config?.signal },
  );
  return data;
}

/**
 * GET /movie/{movie_id}/similar
 * @see https://developer.themoviedb.org/reference/movie-similar-movies
 */
export async function getSimilarMovies(
  movieId: number,
  params?: MovieListRequestParams,
): Promise<SimilarMoviesResponse> {
  const { signal, page } = splitParams(params);
  const { data } = await apiClient.get<SimilarMoviesResponse>(
    `/movie/${movieId}/similar`,
    { params: page != null ? { page } : undefined, signal },
  );
  return data;
}

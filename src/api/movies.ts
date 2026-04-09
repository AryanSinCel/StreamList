import apiClient from './client';
import type {
  DiscoverMoviesResponse,
  GenresListResponse,
  MovieCreditsResponse,
  MovieDetails,
  PaginationParams,
  SearchMoviesResponse,
  SimilarMoviesResponse,
  TopRatedMoviesResponse,
  TrendingMoviesResponse,
} from './types';

/**
 * GET /trending/movie/week
 * @see https://developer.themoviedb.org/reference/trending-movies
 */
export async function getTrendingMovies(
  params?: PaginationParams,
): Promise<TrendingMoviesResponse> {
  const { data } = await apiClient.get<TrendingMoviesResponse>(
    '/trending/movie/week',
    { params },
  );
  return data;
}

/**
 * GET /movie/top_rated
 * @see https://developer.themoviedb.org/reference/movie-top-rated-list
 */
export async function getTopRatedMovies(
  params?: PaginationParams,
): Promise<TopRatedMoviesResponse> {
  const { data } = await apiClient.get<TopRatedMoviesResponse>(
    '/movie/top_rated',
    {
      params,
    },
  );
  return data;
}

/**
 * GET /genre/movie/list
 * @see https://developer.themoviedb.org/reference/genre-movie-list
 */
export async function getGenres(): Promise<GenresListResponse> {
  const { data } = await apiClient.get<GenresListResponse>('/genre/movie/list');
  return data;
}

/**
 * GET /discover/movie — filter by genre
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export async function getMoviesByGenre(
  genreId: number,
  params?: PaginationParams,
): Promise<DiscoverMoviesResponse> {
  const { data } = await apiClient.get<DiscoverMoviesResponse>(
    '/discover/movie',
    {
      params: {
        with_genres: genreId,
        ...params,
      },
    },
  );
  return data;
}

/**
 * GET /search/movie
 * @see https://developer.themoviedb.org/reference/search-movie
 */
export async function searchMovies(
  query: string,
  params?: PaginationParams,
): Promise<SearchMoviesResponse> {
  const { data } = await apiClient.get<SearchMoviesResponse>('/search/movie', {
    params: {
      query,
      ...params,
    },
  });
  return data;
}

/**
 * GET /movie/{movie_id}
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const { data } = await apiClient.get<MovieDetails>(`/movie/${movieId}`);
  return data;
}

/**
 * GET /movie/{movie_id}/credits
 * @see https://developer.themoviedb.org/reference/movie-credits
 */
export async function getMovieCredits(
  movieId: number,
): Promise<MovieCreditsResponse> {
  const { data } = await apiClient.get<MovieCreditsResponse>(
    `/movie/${movieId}/credits`,
  );
  return data;
}

/**
 * GET /movie/{movie_id}/similar
 * @see https://developer.themoviedb.org/reference/movie-similar-movies
 */
export async function getSimilarMovies(
  movieId: number,
  params?: PaginationParams,
): Promise<SimilarMoviesResponse> {
  const { data } = await apiClient.get<SimilarMoviesResponse>(
    `/movie/${movieId}/similar`,
    { params },
  );
  return data;
}

/**
 * Strict TMDB API v3 response types — no `any`.
 * @see https://developer.themoviedb.org/reference
 */

// ---------------------------------------------------------------------------
// Request params (client-side)
// ---------------------------------------------------------------------------

export interface PaginationParams {
  page?: number;
}

// ---------------------------------------------------------------------------
// Shared / primitives
// ---------------------------------------------------------------------------

export interface Genre {
  id: number;
  name: string;
}

/** GET /genre/movie/list */
export interface GenresListResponse {
  genres: Genre[];
}

/** `belongs_to_collection` on movie details */
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/** Present when `append_to_response=external_ids` is used */
export interface ExternalIds {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  wikidata_id: string | null;
}

/**
 * Movie object returned inside `results` for:
 * trending, top_rated, discover, search/movie, similar, recommendations, etc.
 */
export interface MovieListItem {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type?: 'movie' | 'tv';
  adult: boolean;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/** Paginated list wrapper — shared by multiple movie list endpoints */
export interface PaginatedMovieList {
  page: number;
  results: MovieListItem[];
  total_pages: number;
  total_results: number;
}

/** GET /trending/movie/week */
export type TrendingMoviesResponse = PaginatedMovieList;

/** GET /movie/top_rated */
export type TopRatedMoviesResponse = PaginatedMovieList;

/** GET /discover/movie */
export type DiscoverMoviesResponse = PaginatedMovieList;

/** GET /search/movie */
export type SearchMoviesResponse = PaginatedMovieList;

/** GET /movie/{id}/similar */
export type SimilarMoviesResponse = PaginatedMovieList;

/** GET /movie/{movie_id} */
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  /** Only when requested via `append_to_response=external_ids` */
  external_ids?: ExternalIds;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

/** GET /movie/{movie_id}/credits */
export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// ---------------------------------------------------------------------------
// Error JSON bodies (TMDB returns these on failed requests)
// ---------------------------------------------------------------------------

export interface TmdbErrorResponse {
  success?: false;
  status_code: number;
  status_message: string;
}

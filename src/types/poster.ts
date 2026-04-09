/**
 * Home carousel card model (UI) — mapped from TMDB `MovieListItem` in the screen/hook layer.
 */
export interface PosterItem {
  id: string;
  numericId: number;
  posterUri: string;
  title: string;
  subtitle: string;
}

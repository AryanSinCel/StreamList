/** Watchlist grid card (UI). */
export interface WatchlistGridDisplayItem {
  id: number;
  posterUri: string;
  title: string;
  ratingLabel: string | null;
  year: string;
  genres: string;
}

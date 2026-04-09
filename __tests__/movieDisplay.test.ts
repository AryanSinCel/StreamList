import type { MovieListItem } from '../src/api/types';
import { movieListItemToSearchGridItem } from '../src/utils/movieDisplay';

const baseMovie: MovieListItem = {
  id: 42,
  title: 'Test Movie',
  original_title: 'Test Movie',
  original_language: 'en',
  overview: '',
  poster_path: '/poster.jpg',
  backdrop_path: null,
  adult: false,
  genre_ids: [28],
  popularity: 1,
  release_date: '2024-01-01',
  video: false,
  vote_average: 8.2,
  vote_count: 100,
};

describe('movieListItemToSearchGridItem', () => {
  it('maps id, title, genre line, and rating label', () => {
    const genreMap = new Map<number, string>([[28, 'Action']]);
    const item = movieListItemToSearchGridItem(baseMovie, genreMap);
    expect(item.id).toBe(42);
    expect(item.title).toBe('Test Movie');
    expect(item.genre).toBe('Action');
    expect(item.ratingLabel).toBe('8.2 ★');
    expect(item.posterUri).toContain('poster.jpg');
  });
});

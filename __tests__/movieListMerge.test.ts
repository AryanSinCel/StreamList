import { mergeUniqueMovieListById } from '../src/utils/movieListMerge';
import type { MovieListItem } from '../src/api/types';

function stubMovie(id: number): MovieListItem {
  return {
    id,
    title: `T${id}`,
    original_title: '',
    original_language: 'en',
    overview: '',
    poster_path: null,
    backdrop_path: null,
    adult: false,
    genre_ids: [],
    popularity: 0,
    release_date: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
  };
}

describe('mergeUniqueMovieListById', () => {
  it('appends new ids and skips duplicates', () => {
    const a = [stubMovie(1), stubMovie(2)];
    const b = [stubMovie(2), stubMovie(3)];
    const out = mergeUniqueMovieListById(a, b);
    expect(out.map((m) => m.id)).toEqual([1, 2, 3]);
  });
});

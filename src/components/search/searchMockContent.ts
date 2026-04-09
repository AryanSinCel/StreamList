/**
 * Static layout from resources/search.html (search default state; no API wiring).
 */

export const SEARCH_PROFILE_URI =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCTeGvS_jcuJ7iy6UGYBwTdGWK23sx_-canmSGsd2_Odci9j-xc1YxOoR2f1h_rsc5hDZ-pqajZewz06Se6Pg6g2Xmkp8LX4_jRfVAD2cjjJyKQoWVzcmrUwkiMXWsl7acBuekMylo7VntV0C6siZ7pF54wUNKyol8rdJuerdd67euwFI281b9uFuyvBuEGOV74mvoFR02EhiwMXQ72kkPdokMvakSUrkx7fHzWRb9fj-szCf_GNHRM3aIkva-aqxQbBB1OaUbWg4mA';

export const SEARCH_GENRE_LABELS = [
  'Action',
  'Comedy',
  'Sci-Fi',
  'Drama',
  'Horror',
  'Documentary',
] as const;

export const RECENT_SEARCHES = [
  'Interstellar Journey',
  'The Dark Knight',
  'Quentin Tarantino',
] as const;

export const SEARCH_FEATURED_BACKDROP =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAoU6YtC8Ku4Fj23jJpF4lVS8iezatiZUg2qOdRQWmQlhKkqFfkAxJvNdZsdRSNwQssbHNjhRgM6Ap8pUKxWZWf0mNrBc3Z-JSweHlx666n91e31zTk4mI_VibLJoGA0urDh7KIUvU8iDV_YSoG3G4-mcwXEq2e26B6--exeQT65NArY7bF7xlZgm3Cl_SwOfj6mXGlslQjUZzDnooX-IpQxMHuwt-51mzEHSLP-PVnZfXNjwmv2c1EdHPkCcrLCPKyZR-EyVN4g-dZ';

export const SEARCH_FEATURED_TITLE = 'Neon Pulse';
export const SEARCH_FEATURED_META = 'Sci-Fi • 2024 • 2h 15m';

export interface SearchGridItem {
  posterUri: string;
  title: string;
  genre: string;
  ratingLabel: string;
}

export const SEARCH_TRENDING_GRID: SearchGridItem[] = [
  {
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcITrcyv0X1obti7DMUbw9UlF8cFRLrN9C_694lurda06imf8a5GR4BRACWLDbBlqW40c9CvUPm-ZMbcVw9zAAcLXOS9joFHO0rq-HZa_70kq2YcnkbvzHKIjuwLiyiS5YDtBJ8xLR9aoclAqOIuJB2dmRF11FAxfJGP6G0uZLFOWB3bLgT2JhEcjpWzOIu4KUlV48LDxVAZVbQZSUHWsZhQaXHppLnLiKLj7WEExcfCmEliDcbKsRiWycXsSXbVMF9xzJSXp-dPfQ',
    title: 'Vintage Reel',
    genre: 'Documentary',
    ratingLabel: '4.8 ★',
  },
  {
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAly0AImE__Eb7nxylzmGJTYvI_v54BBfYlYOfsBJZiWMKLpJYZKNa1Qinzfh-R1mCFFL02lx5w9OvUwFH1vZlEoJ1ihlXFC8zJQLbU1u67wA1-bpZjswuGPdYaidItGI_Fdf-vepL888KjtvVOStrjsHcRS1eBrKZPFnE_LRaghiRSnEHPjtqlxStcwvuKsc0TSEi6W6K7knaV1HnS3gKHGUvL81HXaSfQW8M6LdMRQNSgVW6YBZWPnvCFRa7BJghdyo9AGK1sOGPR',
    title: 'Silent Rows',
    genre: 'Thriller',
    ratingLabel: '4.5 ★',
  },
  {
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABIWt27fp86AUI3RMldMng778rUPe6rc2UaF4NRt9QsVbiwm0Jb9HUNPKEUodoQCDfuxGY8aRPBOFEp1INCFD1vkCziPyN0sixoSViOdxwgWNFslMojrIzM_Og4U4UwbCHGWFH6kssZ7GPgGI_RPTN4mmjX2FYdDL7XkDDrsHWyDEn32XkPGGb9zrxWI6PJ0zf7XgecpygYhePiX1GzsJwczbRed2yb5rp2yBbITMxtv4YZJzjJkIFW-o5DLMdY02_r8ENOcV7TbPG',
    title: 'Golden Ticket',
    genre: 'Romance',
    ratingLabel: '4.2 ★',
  },
];

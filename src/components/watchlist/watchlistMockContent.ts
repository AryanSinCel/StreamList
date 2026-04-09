/**
 * Static watchlist UI (resources/watchlist.html, empty-watchlist.html).
 * Toggle `MOCK_WATCHLIST_UI_EMPTY` to preview empty vs populated layouts — no store wiring.
 */

import { SEARCH_PROFILE_URI } from '../search/searchMockContent';

export { SEARCH_PROFILE_URI as WATCHLIST_PROFILE_URI };

/** Set to `true` to show empty state + ghost recommendations; `false` for grid + “Because you saved”. */
export const MOCK_WATCHLIST_UI_EMPTY = false;

export const WATCHLIST_KICKER = 'Your Collection';

export interface WatchlistGridItem {
  id: string;
  posterUri: string;
  title: string;
  year: string;
  genres: string;
  ratingLabel: string;
}

export const WATCHLIST_GRID_ITEMS: WatchlistGridItem[] = [
  {
    id: 'w1',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfBPIKJgRVK3kC5BbNq_q2jh-PYJDrS7OH4iFYfJmFv_u3udSXbzxa_nJYDZm5jiDPYD3M8n2bwgPWTcyrFW56eTWcAGDO9Upp5ux37Ms9PJgOvedeVv8Axr2t70qwDAXaOUUz8WJyYqRQR6ZTjRnLsFyo--mR-WGoPgweceen1YYO8HVm92AMCT0ZF3H5gUjSBO_nBLShvEGg2MThkEChEjqMWOPFFJm9C5PcbwUS_UWB3_qk4KLELqKzhLrIESpVcELfCl1g9I9y',
    title: 'Neon Drift',
    year: '2024',
    genres: 'Sci-Fi / Action',
    ratingLabel: '8.4',
  },
  {
    id: 'w2',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVNo1ZyPZ6NMdwqnZXK6DfMpaighquABC7cEqKFwdXVqWcrfkUtEfCONuzCo9hzgTKHYbs_c27UiPqCnAhCJ2Om0kU7U8jrmVa8z8mYVafSUuFsjpmaM65VeE1wsUvE7yWpJ0A4HZBvOmfa3NMfA8QnKrcKAJuINFs63ZoehFuhR-yVy3wbQQUwnljydunC7XbnqwbuLaLEfGWY1SiYZRmJgBznTe47nprQR_3ecR_r6aE1zO1N1Ma_3QvNNioQS2zgmUhhh7a8Rb-',
    title: 'The Silent Room',
    year: '2023',
    genres: 'Drama',
    ratingLabel: '9.1',
  },
  {
    id: 'w3',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_kuJKmZu8wSVEfQrV39hBPCzYSuQc_PvnL0LWRe0xVXYm7Cina0M5ZlyNrXT-GtWmqb9k0cauha2nQewsx3Kjp52iZwYvCDXrfDiQCEAMMeFR1zQWonpKIRqMyjhTDstirGoD5BhnPjU5HB1bAfLd63CrtrN9w0eBkq_XtbVvvVIKWcnH3OmjKyGl38_0KnzEWIKUFJ4Zcn3ach7daHZ0tYxdBE0D_hytQ6ePB8-MJm5QZlyLa-PZ1MzbPi_yJCRQUQ0ULceBEKY-',
    title: 'Interstellar Void',
    year: '2024',
    genres: 'Animation / Fantasy',
    ratingLabel: '7.8',
  },
  {
    id: 'w4',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvZv0gSTQBSXoivp6XS7CykhFV5Q8DIsgk44MfIweAFHZrMfkSDcGiU-78QIFvAz5Qr3LvIjYdQg2rMGIycAWQs3BS08O9dWLCBEkWbKDiFpsejInuGgS3_lckddGoziM1SOhzm9OrpUOwGP0tc7QYVnFM5jHyvrL1pkAQ2RhySVlQqY9edIPcXfUysbPB7Fy2wKj49CSbQyaeZwtd7HnahC9_jGTyz0yUZjhzeiHCH4ZZPvP5y6vNmVYCFE4oFfTLq5AGv92cRY7-',
    title: 'Shadow Manor',
    year: '2022',
    genres: 'Horror / Mystery',
    ratingLabel: '6.9',
  },
];

export const BECAUSE_SAVED_TITLE = 'Because you saved Neon Drift';

export interface WatchlistLandscapeItem {
  title: string;
  subtitle: string;
  imageUri: string;
}

export const BECAUSE_SAVED_ITEMS: WatchlistLandscapeItem[] = [
  {
    title: 'Chrome Rebels',
    subtitle: 'Sci-Fi Thriller',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFnJnLdOwA2XFH8a9lhc5JeQIxoVvli0NoZ6FVZQf6ln3Pmv_-JODHuBJxsFZS9wIEjLNvdVMT7zM83EUXt_ezti1Ung32G8ER1RvmJKr8EIaiw9htsI5MHwxFrpOgOx46lBsSdtsxc-vbvAKcw_KwxkcnnGQRh-gZq-uk65OvMJUoYn1QOIxYKIwMbxjThoXMbkE8P3LGCf75yYHVjeMBrHPPHcR9s1QTBJN_zBSTWMGVnxAYO7Zxanus-XZQo9GpsuoU5SCpp7ld',
  },
  {
    title: 'Mars Horizon',
    subtitle: 'Documentary',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFO9P-Ryt0O8S5SBv6HUWiduUw7iwCQpeDLygn0DBH2BVg9XzvOlEL3f8s7QofzPtlqb1uuZEYKvRe0sB39McfhPlBh5C-QrtdBn-S0W1-zVDXlQRzkl-ZXkkKaIJpiIIZxy0ukE6V3m8DQRCzuJAwoxZJguyZZdVBVvbZGpjRTqHssZMpRTkkiIxp4H2QoVgPrvkYy0WEHysEuSYwDg9HbXVkKSijSQXRh35KV3aC4QNB3ENV1aLM-rMH6cgucv-UBBM2db0t32D1',
  },
  {
    title: "Director's Cut",
    subtitle: 'Talk Show',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXG3UhobFNcExtF6XSYbCHFUKHutHIsyl8FuC8EmWimy-dQXWIbWX2MfQNJt2SKVCScodSJIm4MgJH3TcwC_U6XChcgD54dvKwmjVgVlE1PKqJOsx-salyTovs06nxUB02IBdiEUBhib5LPHeXMIO98vDhAKBkm6q_k2Y8z_hOthFHblmAG8efe0o0MNfSV9W6sUyRGdAPzlXEaExeMgPtbXpyN5BXNCuwa_ilsQoYtFhdm4_DbBCSLNoYQjrM9SAfmL0bsoESgYsV',
  },
];

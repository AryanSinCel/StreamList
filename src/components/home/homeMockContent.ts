/**
 * Static layout copy and image URLs from resources/home.html (UI shell only).
 */

export const HERO_BACKDROP_URI =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCvnjLaJe3ZORA6BbXF9G3dn9cP0re89cDxsg1e8ZyEXyxtkhU_qbiaz0J9oL3DisqQq2xV5hSE8bKBoRHXpFXZT0_qHdIsEIPncHjOX1ZGFPqju8ZRcYX1s6ebrryi-vQCd_qvABOYLctBbDrkRNVYIy9OgR5ny3_nHliizA6Os8HRyUif5zm-9BYARAEgkbaebRPrX8qCM_Ll65vuqfCHUGqX-8m_nOhA75P-BQQDoSUN3RMfCInjIJ672t2Kio4V2f57zYXuSWaW';

export const HERO_TITLE = 'NEON DRIFT';

export const HERO_OVERVIEW =
  'In a city that never sleeps, one driver must outrun the shadows of his past to secure a future he never thought possible.';

export const GENRE_LABELS = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Sci-Fi',
  'Horror',
  'Documentary',
] as const;

export interface PosterItem {
  id: string;
  posterUri: string;
  title: string;
  subtitle: string;
}

export const TRENDING_POSTERS: PosterItem[] = [
  {
    id: 't1',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdO_MYKEyjr_vA1c2dbTIi4kcS894zsVoh5_B2ZJ_5OSRrlfkXC9f7OjmPl2e_2x27CT8iDms_qj7s2SWYOL3YbwDfmmxn2KuoJLxOdaWwFYk_I7hbOfLx3EjggFWQwQzxizbjOxSgV7MRtcd1-NsuAxPzT7FPKxmGpBJub10vIAePvrx19YawITqBc3FNzVzbcCZvRr59pQn9jzd9TGpA68KRHBWOxgc3f2fR0WYHBRFwWrecXKb6yEeEimX1XN-ycN3lLxGKMUOR',
    title: 'The Last Empire',
    subtitle: '2024 • Action',
  },
  {
    id: 't2',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvoMx4LxGd6Fti70T5v7RA_aDaNVXyhMGaTHKTsJnXA701EurDI_Pd56FVdQ2z9mv29CvIWS44uk7uOE35mJL-2u3hwRuOznPZxLsPi71ilAGigEWWmiCqNw6dKg1EuWKRIo4xYcfAb0Ekew7UrUf385HGLX9hfg7cOzVCdwoTfWonCoXjE2ccU9rQg4VgHNw2g0b4pKLz42kdNJbw8gV5ssMdKTAhaAijF_JwqdveqMDt6qioARqvTC9_gZZ2DmjxbvnR7Dd-n32',
    title: "Director's Cut",
    subtitle: '2023 • Thriller',
  },
  {
    id: 't3',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjzkIhQmyAP6Avhye12b5V3rcwpMmneSbjupU3_23yXvhQfvXNsTQibOB9AUIwd0fzgO8s_c6U2vnzhan0yhSe6JXhmm4txDpdrLWNTrXVG2JEa1v13-BmD7cnI3-RN5IhsvHy4RIzE4DtkMV4MxLTikRg0dTA8fyNffp9e-ZZU5e6GnPgE_KjMlH5I9yhzmFxWGwKn-MNiBYpEyYdKziG3-4GLv-MBO7iVWdG1KSsKhnma_KWu97VKd4l-YT9JzfhSTAcbl7XzL-u',
    title: 'Silent Woods',
    subtitle: '2024 • Horror',
  },
  {
    id: 't4',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBby4UpnSNvDikEqfwc75k0EYAkqvatMl51oKi2E9E49XpF0lZSNVF8cbw7JkurCTqkbqFVdaZwS3aaw3Gz71t6ta5dAjjNterNKp8URpoDuMbsijrJmK1S7ymy9sf9IQsoA0qyCsxKSjh2bVPnXowQLPp0RwAnQp-DJtQnwXtzuhZ1o3jDkGv1hMcK2XYXPyvFZmDK83gb0Irpexwqy6k3Ch821wkO_QeE1SlxobYna3_9BWu6d9CGtqGrzPnUPunLsossybfh_uqM',
    title: 'Gold Rush',
    subtitle: '2024 • Documentary',
  },
  {
    id: 't5',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOOU664ni96TYH9l22mUYSXlrhhWXzuH44GL4GLp-FjXEvuFi_8jQKQfEngR7CmuD2lEOgO3KaqjOpvamKB-7Fkl58kerBBsSvWlNDGI0NjXdSIYlquF-8-GGzuc0JJywnr2QVjqEWYd-SNfvRK7Gf2tc4KKrzM7QY4c3Y9FXF6LDnwgym1jjVFls1W4Vcu2HVab-UUe2br4a2fRyCUBZ0BFiDuI6xbFVMUqTM3G5il8c_ShLkYBJRCJaV8XS2Av7wpI6m9TNz8P_A',
    title: 'Midnight Road',
    subtitle: '2023 • Noir',
  },
];

export const TOP_RATED_POSTERS: PosterItem[] = [
  {
    id: 'tr1',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtdXb6NirMh2jpNOPBxh8FZxBM4StTKyevol1gt-NzWS6LA1piiHI5Czuq2CZ-OEKzbIIy7ov6zn4Krwki-sncE1Dz4dM7kOOEjvpmrzMxnXs_v7aXVn0XTwLpT_CBcR-rr5VWBYYn7B-f_icqabwbnhcapdIJkbmDWWMF3Idt8BUwCWGZbJ_K0X3nlDbEvAqK66C0H97yJUJdv-KdpTbW1ffyQbb4k0yMT0BWDp_-4hOrQxJjGFZ2HnuO7WdBXbPqFaYsg_BzBiao',
    title: 'Star Bound',
    subtitle: '2024 • Sci-Fi',
  },
  {
    id: 'tr2',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5MdUu41VRQ6FJNIXbF9FpYTDUpa1IUdfBtBAcael0Jw5-1OwIAbi6Fr62gQDkh5hkBdXDOGCvOq4L5VXZJISbvMnOgPyqBclyp61Y09Feaud2Ll4OgkEcT6nt3hBCrXXu0-9qPIWukwGf9m9TK2b4WSblO-hcX4abAFb-DNgBQBObzEWP2mlqBL7bz2ti07aX2eHalctn6QRIZOSUAYZ2UuN22RdAwLUY4WZIhiB_LqeLZmzjR9XGwABQIwqYBgoqQZb4wZtY8OE3',
    title: 'Emerald Isle',
    subtitle: '2023 • Adventure',
  },
  {
    id: 'tr3',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1xJ5_Uu-ku9BbAAD4Z31l5VCDpHQTa0yYdGFc88XShrvoQ5285-aR8dk5OuGmZgBXZE_uAxOzGT6tDEde-ldhM9SiTxlj7vRvx61MnRSVIhjLv0_WOK9QoiqsV2c9pWyn6UtliPp2SVQSYywI-WQTF8M0m7bRoVW8MyLi6B2vZAsv0Nxx2F-vmA_YTeQTgHXyOhYgg1TFBjhtrgDc4A2cGO6GVAe_D-Xh_5acGLz5S5fkJbGtylvRVwMeQlyjni7d-zx6plmQuxfJ',
    title: 'Deep Blue',
    subtitle: '2024 • Drama',
  },
  {
    id: 'tr4',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWjaP45NxWlqMWFpVDdS5j9u6F_XfOgEVetak_gwun2RhFMXW0QPwCQFRSyOLYV0cPOlrDS5eTd_Z-4vHY3Rv1_LWCMuGBBhmV2TpzOirH8e5W7rMl4H_W61OYS6g49sduApalUz2Qk1QwORXpFSD3blVJu3XnfoENfLULThNVwVYkVZsiQ4VwKAWCtOPTI3e1sSjmzWEgZmG7Y814h6-i9Z43BO-yV7TyG--2JCmIkirk93j8aLRomkMShaEy-13wKWZyZutI56qR',
    title: 'The Eye',
    subtitle: '2022 • Sci-Fi',
  },
  {
    id: 'tr5',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAl4AdXY196xd3cAXQeqdzjEGCDnOthlx8Ly25KbQu18i2CYPnhcSshsa6eggQss2xNuRAzu3OjksFAzaPmIXCBe2YkpFsZS1fmKmGr8Ws6jVvZ4X0FiPh-SDtL1hAN1jv0_TvgjNZpuSurVemACt8hDBlaBHn60QSGDlOcGWgFI2kq_KrlunvAvPxC1-2mlH6S4-rTF7X1VfGsRydnCksfUwp0YBBjYBhkhBJBmKireVAagt80-6AUlSmJiyS9kKurJ9vLwQrSwWO',
    title: 'Last Stop',
    subtitle: '2024 • Indie',
  },
];

export const ACTION_POSTERS: PosterItem[] = [
  {
    id: 'a1',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFVevVoYVZYXfvzmpF-x1OHUJoi9YoXpJL-PdgDTmT-y6ctWKYovkNUyrijNXsozaB_IRg8mCC5NCg28qk4_TBhgVkW5AY6u9agWyby4nAh9rxc_MoXWcDBBabLZYOery2MvuArG1Jl26_lLvvQljgGG8uF5NLNabeqGc6y02A-R4woG9iQ3yqzjRrmUeIVkcgZY_RTkF0uoscSoFmoSgPuVTsgKgOIGptApvGQ0mODa7Fclf3UslGZHibVGOuFl35iEHVQpBkx-Sf',
    title: 'Speed Limit',
    subtitle: '2024 • Action',
  },
  {
    id: 'a2',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbHhbrtkGxmY1BBkM1OvADX434yd8De_0C-s4oF76ni9hJc1nlXNgOjfOm9eW2kZF15FvLplPHnS96brewurXLMbRf2GwNG-0dbBtNys7V56zRVH9RbtusnWYE2dqGgSI6hVOhXJcdbVmg-EFm6al8rA9nSuHA0MbzdP41ZIC-qNaWLAutoKH4f61I-m1acKif6CpqT8pg3w-X4XZkpRvnnv1RPaaQa0cabuvjRzFkZyEmtBw6jnKy8gHk7E5-B4VEJKSCr--NE2rp',
    title: 'Skyline Run',
    subtitle: '2023 • Action',
  },
  {
    id: 'a3',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiU0VMaJuErymvwvkaUMMYPYuDxu8xJiqbDHKqWFp6pUtAjqpavXWuO7_JLcq6P8bwUj83lcDuh5ULwLjuAmV9k3vpz236BCIzm5Nlini5CxEDUxLG9Ag2Z5lQ1WNvUBdY9XbuAsXb3yHHrCAzBSi0leYmJm6AzlMJ6njCAd8m8qvf7dNXFXO_26LCPwJxnPUf-X2uYSIepsu6E_20ZyOC_Cwq_TTT9BJwSQ-1timhHKkud7wZE2D06FZfe-I4s3OlqoHGvqSIMx5E',
    title: 'Katana',
    subtitle: '2024 • Action',
  },
  {
    id: 'a4',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtcNmZ3dBS0MWxH4NAA11Oc3BnzQhN2XOx0TLP3Z4QtQsJmOi3xJr4QJqYsSjGkST2iU9JGUI8QeguWryNGCTUNTQZX42U1UtBycPXdqMMrrSKZF3ErnZ44VhIhZyPshXel5K1kbw7d6wbZ89VOcmESk71J68VJc6EojbQo3rPLyh-199Ai-sQJv_h95OZpqGqFB9K5bxK5U43hTPBin_42vAxCOkm64e2j2K__uYekGCBnQKP6rwVyPtOAc6wxqQLPvtieKmfGQWn',
    title: 'Extraction',
    subtitle: '2024 • Action',
  },
  {
    id: 'a5',
    posterUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCi6XElt3xKGi8Dgvy0Dc1li79az-VydPg1EOSvy0lepJ3dUi18YZE7MS3Tl-Za0p69ZRXXHa8hCdlrIdqMjKkHxgmS_ZD5Y83l2aa386rHRH5RlFzNthTUzTSNjF-G1cHkImtU9va3BE779E2t0E32vrNyOoq-ycjWHQqYGDajvWLSW7VmcrlBFJLDyCGB3GjjC0MPSnM77_o7UBcCrJNLeWOdeaOLI4JHqPnQj7WHQnEccJk5RoKsFBrgXer595nnfk1UEHY-P439',
    title: 'Forge Master',
    subtitle: '2024 • Action',
  },
];

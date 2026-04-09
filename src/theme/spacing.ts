/**
 * Spacing scale — use for padding, margin, gaps, and layout rhythm.
 * No raw pixel literals in StyleSheet outside this module.
 */
export const spacing = {
  none: 0,
  /** Single dp — letter-spacing, hairlines (when allowed) */
  single: 1,
  /** Common “border-2” width (search.html avatar ring) */
  border_thick: 2,
  xxs: 4,
  xs: 8,
  /** 10px — chip vertical padding, micro type (home.html) */
  xsPlus: 10,
  sm: 12,
  /** 14px — body / title-sm per typography spec (between 12 and 16 grid) */
  smPlus: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 36,
  '5xl': 40,
  '6xl': 44,
  '7xl': 48,
  '8xl': 52,
  '9xl': 56,

  /** Featured home hero block (design reference: resources/home.html) */
  homeHeroHeight: 450,
  /** Top app bar height (home.html h-20) */
  headerBarHeight: 80,
  /** Portrait poster tile (home.html w-[160] h-[240]) */
  homePosterWidth: 160,
  homePosterHeight: 240,
  /** Large section gap before loading footer (home.html mb-20) */
  screenBlockLarge: 80,
  /** Hero text inset from edges (home.html bottom-10 left-10) */
  heroContentInset: 40,
  /** Synopsis max width (home.html max-w-md) */
  homeHeroCopyMax: 312,
  /** Inline icons (home.html loading spinner w-6) */
  iconMd: 24,
  /** Uppercase badge / footer tracking (home.html tracking-widest) */
  trackingWidest: 4,

  /** Detail screen — project-spec §7.3 + resources/movie-showDetail.html */
  detailHeroHeight: 220,
  /** Cast avatar diameter (project-spec §7.3) */
  detailCastAvatar: 60,
  /** “More like this” portrait tile (stitch reference; 2:3) */
  detailPosterCardWidth: 120,
  detailPosterCardHeight: 180,
  /** Title block pulled up over hero (-mt-8 in stitch) */
  detailContentOverlap: 32,
  /** Top bar icon tap targets (w-10) */
  detailIconButton: 40,
  /** px-6 horizontal page gutter in stitch */
  detailPagePaddingHorizontal: 24,
  /** Bottom safe-area fade strip (h-8) */
  detailBottomFade: 32,

  /** Search default screen — resources/search.html */
  searchPagePaddingHorizontal: 24,
  /** main pb-32 */
  searchScrollBottom: 128,
  /** gap-6 between grid cells */
  searchGridGap: 24,
  /** Rating badge inset (top-2 right-2) */
  searchRatingBadgeInset: 8,
  /** Avatar in header (w-10) */
  searchHeaderAvatar: 40,

  /** Watchlist — resources/watchlist.html / empty-watchlist.html */
  watchlistPagePaddingHorizontal: 24,
  watchlistScrollBottom: 128,
  /** Grid gap-4 / gap-6 hybrid (mobile 16px in stitch) */
  watchlistGridGap: 16,
  /** Landscape “Because you saved” tile width (w-48) */
  watchlistLandscapeWidth: 192,
  /** Large bookmark in empty state (text-8xl area) */
  watchlistEmptyBookmarkIcon: 96,
  /** Empty icon ring padding */
  watchlistEmptyIconPad: 32,
  /** Radial glow diameter behind empty bookmark */
  watchlistEmptyGlowDiameter: 224,
  /** Minimum vertical block for empty-state copy (layout balance) */
  watchlistEmptyBlockMin: 280,

  /** Profile screen — aligned with other tab scroll screens */
  profilePagePaddingHorizontal: 24,
  profileScrollBottom: 128,
  /** Hero avatar on profile */
  profileAvatarLarge: 120,
} as const;

export type SpacingName = keyof typeof spacing;

/**
 * Spacing scale — use for padding, margin, gaps, and layout rhythm.
 * No raw pixel literals in StyleSheet outside this module.
 */
export const spacing = {
  none: 0,
  /** Single dp — letter-spacing, hairlines (when allowed) */
  single: 1,
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
} as const;

export type SpacingName = keyof typeof spacing;

/** BlurView `blurAmount` — spec §6.4 (tab bar) vs general overlays */
export const blur = {
  tabBar: 20,
  sm: 8,
} as const;

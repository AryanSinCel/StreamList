/**
 * Spacing scale — use for padding, margin, gaps, and layout rhythm.
 * No raw pixel literals in StyleSheet outside this module.
 */
export const spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
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
} as const;

export type SpacingName = keyof typeof spacing;

/** BlurView `blurAmount` — spec §6.4 (tab bar) vs general overlays */
export const blur = {
  tabBar: 20,
  sm: 8,
} as const;

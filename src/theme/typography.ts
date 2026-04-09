import type { TextStyle } from 'react-native';

import { spacing } from './spacing';

/**
 * Font families — Manrope (display / headlines / card titles), Inter (body / labels).
 * Load via react-native-google-fonts (or equivalent) per project-spec §3 / §6.2.
 *
 * Pixel sizes align with Tailwind defaults in resources/home.html, search.html,
 * watchlist-empty.html, movie-showDetail.html (text-sm=14, text-base=16, text-lg=18, etc.).
 */
export const fontFamily = {
  manrope: 'Manrope',
  inter: 'Inter',
} as const;

const em = (size: number, emValue: number): number => size * emValue;

/**
 * Typography tokens (project-spec §6.2 + Stitch HTML references).
 * Font sizes reference `spacing` scale; apply `color` from `colors` at use site.
 */
export const typography = {
  /** Hero title — home.html `text-5xl` (~48px) */
  'display-lg': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing['7xl'],
    fontWeight: '800',
    letterSpacing: em(spacing['7xl'], -0.03),
  },
  /** Screen / watchlist title — movie-showDetail `text-4xl`, watchlist-empty `text-4xl` (~36px) */
  'display-md': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing['4xl'],
    fontWeight: '800',
    letterSpacing: em(spacing['4xl'], -0.02),
  },
  /** Section row title — home.html `text-2xl` (~24px) */
  'headline-md': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing.xl,
    fontWeight: '700',
    letterSpacing: em(spacing.xl, -0.01),
  },
  /** Search section titles — search.html `text-xl` (~20px) */
  'headline-sm': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing.lg,
    fontWeight: '700',
    letterSpacing: em(spacing.lg, -0.01),
  },
  /** Detail Synopsis / Cast / More Like This — movie-showDetail `text-lg` (~18px) */
  'headline-detail': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing.mdPlus,
    fontWeight: '700',
    letterSpacing: em(spacing.mdPlus, -0.01),
  },
  /** Large card title (20px) when design calls for Manrope title-lg */
  'title-lg': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing.lg,
    fontWeight: '600',
    letterSpacing: 0,
  },
  /** Search grid poster title — search.html `text-base` Manrope bold (~16px) */
  'title-md': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing.md,
    fontWeight: '700',
    letterSpacing: 0,
  },
  /** Chips, CTAs, “See All” — `text-sm` (~14px) */
  'title-sm': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.smPlus,
    fontWeight: '600',
    letterSpacing: 0,
  },
  /** Hero synopsis — home.html `text-base` (~16px) */
  'body-lg': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.md,
    fontWeight: '400',
    letterSpacing: 0,
  },
  'body-md': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.smPlus,
    fontWeight: '400',
    letterSpacing: 0,
  },
  'label-sm': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.sm,
    fontWeight: '400',
    letterSpacing: 0,
  },
  /** Badge / kicker (home.html "New Release") */
  'label-xs': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.xsPlus,
    fontWeight: '700',
    letterSpacing: spacing.single,
  },
  /** Bottom tab labels — search.html `text-[10px]` */
  'label-tab': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.xsPlus,
    fontWeight: '500',
    letterSpacing: spacing.single,
  },
  'label-cast-name': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.smNarrow,
    fontWeight: '600',
    letterSpacing: 0,
  },
  'label-cast-role': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.xsPlus,
    fontWeight: '400',
    letterSpacing: 0,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;

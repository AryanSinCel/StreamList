import type { TextStyle } from 'react-native';

import { spacing } from './spacing';

/**
 * Font families — Manrope (display / headlines / card titles), Inter (body / labels).
 * Load via react-native-google-fonts (or equivalent) per project-spec §3 / §6.2.
 */
export const fontFamily = {
  manrope: 'Manrope',
  inter: 'Inter',
} as const;

const em = (size: number, emValue: number): number => size * emValue;

/**
 * Typography tokens (project-spec §6.2).
 * Font sizes reference `spacing` scale where they align; apply `color` from `colors` at use site.
 */
export const typography = {
  'display-lg': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing['9xl'],
    fontWeight: '800',
    letterSpacing: em(spacing['9xl'], -0.02),
  },
  'display-md': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing['5xl'],
    fontWeight: '800',
    letterSpacing: em(spacing['5xl'], -0.02),
  },
  'headline-md': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing['2xl'],
    fontWeight: '700',
    letterSpacing: em(spacing['2xl'], -0.01),
  },
  'title-lg': {
    fontFamily: fontFamily.manrope,
    fontSize: spacing.lg,
    fontWeight: '600',
    letterSpacing: 0,
  },
  'title-sm': {
    fontFamily: fontFamily.inter,
    fontSize: spacing.smPlus,
    fontWeight: '600',
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
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;

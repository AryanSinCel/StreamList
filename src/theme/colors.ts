/**
 * Colour tokens — "The Cinematic Curator" (resources/project-spec.md §6.1).
 * All colour usage must reference this module.
 */
export const colors = {
  // Surfaces — layered from deepest to brightest
  surface: '#131313',
  surface_container_lowest: '#0E0E0E',
  surface_container_low: '#1C1B1B',
  surface_container: '#232323',
  surface_container_high: '#2A2A2A',
  surface_container_highest: '#353534',
  surface_bright: '#3A3939',

  // Primary accent (Coral-Red)
  primary: '#FFB3AE',
  primary_container: '#FF5351',
  secondary_container: '#822625',

  // Text
  on_surface: '#E5E2E1',
  on_surface_variant: '#E4BDBA',

  // Utility
  outline_variant: 'rgba(255,255,255,0.15)',

  /** Glass tab bar (project-spec §6.4) */
  tab_bar_background: 'rgba(35, 35, 35, 0.70)',
} as const;

export type ColorName = keyof typeof colors;

/** Primary CTA gradient (project-spec §6.3) */
export const primaryGradient = {
  colors: [colors.primary, colors.primary_container] as [string, string],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
} as const;

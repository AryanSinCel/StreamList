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
  /** Input placeholder (search.html placeholder:text-on-surface-variant/50) */
  on_surface_variant_muted: 'rgba(228, 189, 186, 0.5)',
  /** Text on `primary` / gradient CTAs (M3-style; resources/home.html) */
  on_primary: '#68000B',
  /** Text on `primary_container` badges */
  on_primary_container: '#5C0008',

  // Utility
  outline_variant: 'rgba(255,255,255,0.15)',
  /** Hero / card elevation (iOS shadow) */
  shadow: '#000000',
  /** Secondary hero button (surface_container_highest @ ~80% opacity, home.html) */
  surface_container_highest_backdrop: 'rgba(53, 53, 52, 0.8)',

  /** Poster / hero dim overlay (stitch “group-hover” scrim) */
  image_overlay: 'rgba(0, 0, 0, 0.2)',
  /** Top app bar scrim over hero (stitch bg-neutral-900/70) */
  detail_top_bar_scrim: 'rgba(23, 23, 23, 0.70)',

  /** Search poster rating pill (search.html black/40 + blur) */
  rating_badge_scrim: 'rgba(0, 0, 0, 0.4)',
  /** Profile avatar ring (outline-variant/20 in search.html) */
  avatar_ring: 'rgba(255, 255, 255, 0.2)',

  /** Ghost “Popular recommendations” placeholders */
  popular_skeleton: 'rgba(53, 53, 52, 0.35)',
  /** Empty bookmark icon plate (empty-watchlist.html ring + soft fill) */
  watchlist_empty_icon_plate: 'rgba(28, 27, 27, 0.35)',
  /** Solid “Browse Trending Now” CTA (watchlist-empty.html `bg-[#E5383B]`) */
  watchlist_empty_cta: '#E5383B',
} as const;

export type ColorName = keyof typeof colors;

/** Primary CTA gradient (project-spec §6.3) */
export const primaryGradient = {
  colors: [colors.primary, colors.primary_container] as [string, string],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
} as const;

/** Hero “Watch Now” — left-to-right coral → red (resources/home.html) */
export const primaryGradientHorizontal = {
  colors: [colors.primary, colors.primary_container] as [string, string],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
} as const;

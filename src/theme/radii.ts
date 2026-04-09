/**
 * Corner radii — align with project-spec §6.5 and resources/home.html (rounded-lg / rounded-xl / pill).
 */
export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export type RadiiName = keyof typeof radii;

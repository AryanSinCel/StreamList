import { DarkTheme, type Theme } from '@react-navigation/native';

import { colors } from '../theme/colors';

/**
 * React Navigation defaults use a light `background` / `card`, which shows as
 * white flashes during stack pushes (e.g. See All → Detail). Align with app surfaces.
 */
export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary_container,
    background: colors.surface,
    card: colors.surface,
    text: colors.on_surface,
    border: colors.outline_variant,
    notification: colors.primary_container,
  },
};

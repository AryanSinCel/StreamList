import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';

/**
 * Static poster-shaped block for home carousel skeletons (opacity pulses on parent).
 */
export function HomePosterSkeletonCard() {
  return (
    <View style={styles.wrap} accessibilityElementsHidden>
      <View style={styles.poster} />
      <View style={styles.lineWide} />
      <View style={styles.lineNarrow} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: spacing.homePosterWidth,
  },
  poster: {
    width: spacing.homePosterWidth,
    height: spacing.homePosterHeight,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface_container_highest,
  },
  lineWide: {
    height: spacing.sm,
    width: spacing['6xl'],
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing.xxs,
  },
  lineNarrow: {
    height: spacing.sm,
    width: spacing['4xl'],
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
  },
});

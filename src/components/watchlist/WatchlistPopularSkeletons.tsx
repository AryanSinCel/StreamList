import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export function WatchlistPopularSkeletons() {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Popular Recommendations</Text>
      <View style={styles.row}>
        <View style={styles.cell}>
          <View style={styles.poster} />
        </View>
        <View style={styles.gap} />
        <View style={styles.cell}>
          <View style={styles.poster} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.screenBlockLarge,
    opacity: 0.2,
  },
  heading: {
    ...typography['label-xs'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.sm,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  gap: {
    width: spacing.watchlistGridGap,
  },
  cell: {
    flex: 1,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: radii.lg,
    backgroundColor: colors.popular_skeleton,
  },
});

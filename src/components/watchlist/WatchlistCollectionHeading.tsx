import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistCollectionHeadingProps {
  kicker: string;
  title: string;
  countLabel?: string;
}

export function WatchlistCollectionHeading({
  kicker,
  title,
  countLabel,
}: WatchlistCollectionHeadingProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={styles.title}>{title}</Text>
      {countLabel ? (
        <Text style={styles.count}>{countLabel}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing['5xl'],
  },
  kicker: {
    ...typography['label-xs'],
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: spacing.trackingWidest,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography['display-md'],
    color: colors.on_surface,
  },
  count: {
    ...typography['body-md'],
    fontWeight: '500',
    color: colors.on_surface_variant,
    marginTop: spacing.xxs,
  },
});

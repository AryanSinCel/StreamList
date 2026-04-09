import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface ProfileStatItem {
  label: string;
  value: string;
}

export interface ProfileStatsRowProps {
  items: readonly ProfileStatItem[];
  onStatPress?: (index: number) => void;
}

export function ProfileStatsRow({ items, onStatPress }: ProfileStatsRowProps) {
  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <Pressable
          key={item.label}
          accessibilityRole="button"
          onPress={() => onStatPress?.(index)}
          style={({ pressed }) => [styles.cell, pressed && styles.cellPressed]}
        >
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.md,
    marginBottom: spacing['5xl'],
    borderRadius: radii.lg,
    backgroundColor: colors.surface_container_low,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  cellPressed: {
    opacity: 0.88,
  },
  value: {
    ...typography['headline-md'],
    color: colors.on_surface,
    marginBottom: spacing.xxs,
  },
  label: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    textAlign: 'center',
  },
});

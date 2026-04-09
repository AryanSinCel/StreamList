import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const FILTERS = ['All', 'Movies', 'Series'] as const;

export function WatchlistFilterChips() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.segment}>
      {FILTERS.map((label, index) => {
        const selected = index === selectedIndex;
        return (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => setSelectedIndex(index)}
            style={({ pressed }) => [
              styles.chip,
              selected ? styles.chipSelected : styles.chipIdle,
              pressed && !selected && styles.chipPressed,
            ]}
          >
            <Text
              style={[
                styles.chipLabel,
                selected ? styles.chipLabelSelected : styles.chipLabelIdle,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.single,
    borderRadius: radii.lg,
    backgroundColor: colors.surface_container_low,
    marginBottom: spacing['5xl'],
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
  },
  chipSelected: {
    backgroundColor: colors.secondary_container,
  },
  chipIdle: {
    backgroundColor: 'transparent',
  },
  chipPressed: {
    opacity: 0.88,
  },
  chipLabel: {
    ...typography['title-sm'],
  },
  chipLabelSelected: {
    color: colors.on_surface,
    fontWeight: '600',
  },
  chipLabelIdle: {
    color: colors.on_surface_variant,
    fontWeight: '500',
  },
});

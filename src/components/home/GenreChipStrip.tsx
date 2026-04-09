import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GENRE_LABELS } from './homeMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export function GenreChipStrip() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {GENRE_LABELS.map((label, index) => {
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
                pressed && styles.chipPressed,
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing['5xl'],
  },
  scrollContent: {
    paddingHorizontal: spacing['3xl'],
    gap: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.xsPlus,
    borderRadius: radii.full,
  },
  chipSelected: {
    backgroundColor: colors.secondary_container,
  },
  chipIdle: {
    backgroundColor: colors.surface_container_low,
  },
  chipPressed: {
    backgroundColor: colors.surface_container_high,
  },
  chipLabel: {
    ...typography['title-sm'],
  },
  chipLabelSelected: {
    color: colors.on_surface,
  },
  chipLabelIdle: {
    color: colors.on_surface_variant,
  },
});

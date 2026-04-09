import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface HorizontalSelectableChipsProps {
  labels: readonly string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  /** Home genre strip uses `low`; Search uses `highest` for idle chips. */
  idleBackground: 'low' | 'highest';
  contentContainerStyle?: StyleProp<ViewStyle>;
  wrapStyle?: StyleProp<ViewStyle>;
  /**
   * Background while pressed (selected or idle) — Home uses `high`, Search uses `bright`.
   * @default 'bright'
   */
  pressTint?: 'high' | 'bright';
  testID?: string;
}

export function HorizontalSelectableChips({
  labels,
  selectedIndex,
  onSelectIndex,
  idleBackground,
  contentContainerStyle,
  wrapStyle,
  pressTint = 'bright',
  testID,
}: HorizontalSelectableChipsProps) {
  const idleBg =
    idleBackground === 'low'
      ? colors.surface_container_low
      : colors.surface_container_highest;

  const pressedBg =
    pressTint === 'high'
      ? colors.surface_container_high
      : colors.surface_bright;

  return (
    <View style={[styles.wrap, wrapStyle]} testID={testID}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      >
        {labels.map((label, index) => {
          const selected = index === selectedIndex;
          return (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onSelectIndex(index)}
              style={({ pressed }) => [
                styles.chip,
                selected ? styles.chipSelected : { backgroundColor: idleBg },
                pressed && { backgroundColor: pressedBg },
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

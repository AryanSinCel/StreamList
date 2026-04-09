import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface OutlinedGhostCtaButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  testID?: string;
}

/**
 * Outlined CTA — `surface_container_highest` + `outline_variant` (spec §7.3).
 */
export function OutlinedGhostCtaButton({
  label,
  icon,
  onPress,
  testID,
}: OutlinedGhostCtaButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      testID={testID}
    >
      <View style={styles.inner}>
        {icon}
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: radii.md,
    borderWidth: spacing.single,
    borderColor: colors.outline_variant,
    backgroundColor: colors.surface_container_highest,
    minHeight: spacing['6xl'],
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.surface_bright,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  label: {
    ...typography['title-sm'],
    color: colors.primary,
  },
});

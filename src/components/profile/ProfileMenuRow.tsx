import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { ChevronRightIcon } from '../icons/svgIcons';
import type { ProfileMenuItem } from './profileMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface ProfileMenuRowProps {
  item: ProfileMenuItem;
  onPress?: () => void;
  /** Accent label (e.g. sign out) — uses `primary_container`. */
  variant?: 'default' | 'accent';
}

export function ProfileMenuRow({
  item,
  onPress,
  variant = 'default',
}: ProfileMenuRowProps) {
  const accent = variant === 'accent';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Text
        style={[styles.label, accent && styles.labelAccent]}
        numberOfLines={1}
      >
        {item.label}
      </Text>
      <ChevronRightIcon
        color={accent ? colors.primary_container : colors.on_surface_variant}
        size={spacing.lg}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface_container_low,
  },
  pressed: {
    backgroundColor: colors.surface_container_high,
  },
  label: {
    ...typography['body-md'],
    color: colors.on_surface,
    flex: 1,
    minWidth: 0,
  },
  labelAccent: {
    color: colors.primary_container,
    fontWeight: '600',
  },
});

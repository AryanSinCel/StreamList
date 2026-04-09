import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';

export interface IconScrimButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel: string;
  /** Defaults to detail hero scrim token. */
  backgroundColor?: string;
  testID?: string;
}

export function IconScrimButton({
  children,
  onPress,
  accessibilityLabel,
  backgroundColor = colors.detail_top_bar_scrim,
  testID,
}: IconScrimButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.hit, pressed && styles.pressed]}
      testID={testID}
    >
      <View style={[styles.inner, { backgroundColor }]}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    minWidth: spacing.detailIconButton,
    minHeight: spacing.detailIconButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.88,
  },
  inner: {
    width: spacing.detailIconButton,
    height: spacing.detailIconButton,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

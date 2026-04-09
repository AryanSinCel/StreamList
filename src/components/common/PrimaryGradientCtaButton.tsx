import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors, primaryGradient } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface PrimaryGradientCtaButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  testID?: string;
}

export function PrimaryGradientCtaButton({
  label,
  icon,
  onPress,
  testID,
}: PrimaryGradientCtaButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      testID={testID}
    >
      <LinearGradient
        colors={primaryGradient.colors}
        start={primaryGradient.start}
        end={primaryGradient.end}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {icon}
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  gradient: {
    borderRadius: radii.md,
    minHeight: spacing['6xl'],
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  label: {
    ...typography['title-sm'],
    color: colors.on_primary,
  },
});

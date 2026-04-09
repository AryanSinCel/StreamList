import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors, primaryGradient } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistBrowseTrendingButtonProps {
  onPress?: () => void;
}

export function WatchlistBrowseTrendingButton({
  onPress,
}: WatchlistBrowseTrendingButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={primaryGradient.colors}
        start={primaryGradient.start}
        end={primaryGradient.end}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.label}>Browse Trending Now</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    width: '100%',
  },
  pressed: {
    opacity: 0.92,
  },
  gradient: {
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography['headline-detail'],
    color: colors.on_primary,
  },
});

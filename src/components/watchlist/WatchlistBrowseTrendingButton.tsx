import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistBrowseTrendingButtonProps {
  onPress?: () => void;
}

/**
 * Solid primary CTA — matches resources/watchlist-empty.html (`bg-[#E5383B] rounded-xl`).
 */
export function WatchlistBrowseTrendingButton({
  onPress,
}: WatchlistBrowseTrendingButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <View style={styles.inner}>
        <Text style={styles.label}>Browse Trending Now</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: colors.watchlist_empty_cta,
    shadowColor: colors.secondary_container,
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.2,
    shadowRadius: spacing.md,
    elevation: spacing.xs,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  inner: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography['title-lg'],
    fontWeight: '700',
    color: colors.on_surface,
  },
});

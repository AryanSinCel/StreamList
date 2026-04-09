import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { WatchlistLandscapeItem } from '../../types/watchlistLandscape';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistLandscapeCardProps {
  item: WatchlistLandscapeItem;
  onPress?: () => void;
}

export function WatchlistLandscapeCard({
  item,
  onPress,
}: WatchlistLandscapeCardProps) {
  const inner = (
    <View style={styles.card}>
      <View style={styles.thumbWrap}>
        <Image
          accessibilityIgnoresInvertColors
          source={{ uri: item.imageUri }}
          style={styles.thumb}
          resizeMode="cover"
        />
        <View style={styles.scrim} pointerEvents="none" />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {item.subtitle}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.flex, pressed && styles.pressed]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={styles.flex}>{inner}</View>;
}

const styles = StyleSheet.create({
  flex: {
    width: spacing.watchlistLandscapeWidth,
  },
  pressed: {
    opacity: 0.94,
  },
  card: {
    width: spacing.watchlistLandscapeWidth,
  },
  thumbWrap: {
    width: spacing.watchlistLandscapeWidth,
    aspectRatio: 16 / 9,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    backgroundColor: colors.surface_container_low,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.image_overlay,
  },
  title: {
    ...typography['title-sm'],
    fontWeight: '700',
    color: colors.on_surface,
  },
  subtitle: {
    ...typography['label-xs'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.single,
    marginTop: spacing.xxs,
  },
});

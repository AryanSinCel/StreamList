import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { SearchGridItem } from '../../types/searchGrid';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface SearchGridPosterCardProps {
  item: SearchGridItem;
  onPress?: () => void;
}

export function SearchGridPosterCard({
  item,
  onPress,
}: SearchGridPosterCardProps) {
  const card = (
    <View style={styles.card}>
      <View style={styles.posterWrap}>
        <Image
          accessibilityIgnoresInvertColors
          source={{ uri: item.posterUri }}
          style={styles.poster}
          resizeMode="cover"
        />
        {item.ratingLabel ? (
          <View style={styles.ratingBadge} pointerEvents="none">
            <Text style={styles.ratingText}>{item.ratingLabel}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.genre} numberOfLines={1}>
        {item.genre}
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
        {card}
      </Pressable>
    );
  }

  return <View style={styles.flex}>{card}</View>;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.94,
  },
  card: {
    gap: spacing.sm,
  },
  posterWrap: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface_container_low,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.searchRatingBadgeInset,
    right: spacing.searchRatingBadgeInset,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radii.sm,
    backgroundColor: colors.rating_badge_scrim,
  },
  ratingText: {
    ...typography['label-xs'],
    color: colors.on_surface,
  },
  title: {
    ...typography['title-md'],
    color: colors.on_surface,
  },
  genre: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
  },
});

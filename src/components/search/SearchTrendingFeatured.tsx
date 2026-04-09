import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  SEARCH_FEATURED_BACKDROP,
  SEARCH_FEATURED_META,
  SEARCH_FEATURED_TITLE,
} from './searchMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface SearchTrendingFeaturedProps {
  onPress?: () => void;
}

export function SearchTrendingFeatured({ onPress }: SearchTrendingFeaturedProps) {
  const inner = (
    <ImageBackground
      accessibilityRole="image"
      source={{ uri: SEARCH_FEATURED_BACKDROP }}
      style={styles.image}
      imageStyle={styles.imageInner}
    >
      <LinearGradient
        colors={['transparent', colors.surface_container_lowest]}
        locations={[0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.copy}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Featured</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {SEARCH_FEATURED_TITLE}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {SEARCH_FEATURED_META}
        </Text>
      </View>
    </ImageBackground>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.outer, pressed && styles.pressed]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={styles.outer}>{inner}</View>;
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.searchGridGap,
    backgroundColor: colors.surface_container_high,
  },
  pressed: {
    opacity: 0.94,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'flex-end',
  },
  imageInner: {
    resizeMode: 'cover',
  },
  copy: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radii.sm,
    backgroundColor: colors.primary_container,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography['label-xs'],
    color: colors.on_primary_container,
    textTransform: 'uppercase',
  },
  title: {
    ...typography['headline-md'],
    fontWeight: '800',
    color: colors.on_surface,
  },
  meta: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
    marginTop: spacing.xxs,
  },
});

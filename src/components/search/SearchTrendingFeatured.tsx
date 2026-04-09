import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { MovieIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface SearchTrendingFeaturedProps {
  backdropUri: string | null;
  title: string;
  meta: string;
  loading?: boolean;
  onPress?: () => void;
}

export function SearchTrendingFeatured({
  backdropUri,
  title,
  meta,
  loading = false,
  onPress,
}: SearchTrendingFeaturedProps) {
  const hasBackdrop = backdropUri != null && backdropUri.length > 0;

  const copy = (
    <View style={styles.copy}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Featured</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {loading ? ' ' : title}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {loading ? ' ' : meta}
      </Text>
    </View>
  );

  const inner = hasBackdrop ? (
    <ImageBackground
      accessibilityRole="image"
      source={{ uri: backdropUri as string }}
      style={styles.image}
      imageStyle={styles.imageInner}
    >
      <LinearGradient
        colors={['transparent', colors.surface_container_lowest]}
        locations={[0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      {copy}
    </ImageBackground>
  ) : (
    <View style={[styles.image, styles.placeholder]}>
      <MovieIcon color={colors.on_surface_variant} size={spacing['5xl']} />
      <LinearGradient
        colors={['transparent', colors.surface_container_lowest]}
        locations={[0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      {copy}
    </View>
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
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: colors.secondary_container,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography['label-xs'],
    color: colors.on_surface,
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

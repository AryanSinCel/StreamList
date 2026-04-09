import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { CloseIcon, StarIcon } from '../icons/svgIcons';
import type { WatchlistGridItem } from './watchlistMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistGridCardProps {
  item: WatchlistGridItem;
  onDetailsPress?: () => void;
  onRemovePress?: () => void;
}

export function WatchlistGridCard({
  item,
  onDetailsPress,
  onRemovePress,
}: WatchlistGridCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.posterBlock}>
        <ImageBackground
          source={{ uri: item.posterUri }}
          style={styles.poster}
          imageStyle={styles.posterImage}
        >
          <LinearGradient
            colors={['transparent', colors.surface_container_lowest]}
            locations={[0.45, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.ratingBadge} pointerEvents="none">
            <StarIcon color={colors.primary} size={spacing.sm} />
            <Text style={styles.ratingText}>{item.ratingLabel}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Pressable
            accessibilityLabel={`Remove ${item.title}`}
            hitSlop={spacing.xs}
            onPress={onRemovePress}
            style={({ pressed }) => pressed && styles.removePressed}
          >
            <CloseIcon color={colors.on_surface_variant} size={spacing.xl} />
          </Pressable>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{item.year}</Text>
          <View style={styles.dot} />
          <Text style={styles.meta} numberOfLines={1}>
            {item.genres}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onDetailsPress}
          style={({ pressed }) => [
            styles.detailsBtn,
            pressed && styles.detailsPressed,
          ]}
        >
          <Text style={styles.detailsLabel}>Details</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'column',
    backgroundColor: colors.surface_container_low,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  posterBlock: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    justifyContent: 'flex-end',
  },
  posterImage: {
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest_backdrop,
  },
  ratingText: {
    ...typography['label-xs'],
    color: colors.primary,
    fontWeight: '700',
  },
  body: {
    padding: spacing.md,
    flex: 1,
    justifyContent: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xxs,
  },
  title: {
    ...typography['title-lg'],
    flex: 1,
    minWidth: 0,
    color: colors.on_surface,
  },
  removePressed: {
    opacity: 0.72,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  meta: {
    ...typography['label-sm'],
    fontSize: spacing.xsPlus,
    color: colors.on_surface_variant,
  },
  dot: {
    width: spacing.xxs,
    height: spacing.xxs,
    borderRadius: radii.full,
    backgroundColor: colors.outline_variant,
  },
  detailsBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface_container_highest,
    borderWidth: spacing.single,
    borderColor: colors.outline_variant,
  },
  detailsPressed: {
    backgroundColor: colors.surface_bright,
  },
  detailsLabel: {
    ...typography['title-sm'],
    color: colors.on_surface,
    fontWeight: '700',
  },
});

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { MovieIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface DetailPortraitCardProps {
  title: string;
  posterUri: string | null;
}

export function DetailPortraitCard({ title, posterUri }: DetailPortraitCardProps) {
  const hasPoster = posterUri != null && posterUri.length > 0;

  return (
    <View style={styles.card} accessibilityRole="image">
      <View style={styles.posterWrap}>
        {hasPoster ? (
          <Image
            accessibilityIgnoresInvertColors
            source={{ uri: posterUri as string }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <MovieIcon color={colors.on_surface_variant} size={spacing['3xl']} />
          </View>
        )}
        <View style={styles.scrim} pointerEvents="none" />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: spacing.detailPosterCardWidth,
  },
  posterWrap: {
    width: spacing.detailPosterCardWidth,
    height: spacing.detailPosterCardHeight,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface_container_low,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface_container_high,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.image_overlay,
  },
  title: {
    ...typography['label-sm'],
    fontWeight: '500',
    color: colors.on_surface,
  },
});

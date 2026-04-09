import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { PlayIcon } from '../icons/svgIcons';
import {
  HERO_BACKDROP_URI,
  HERO_OVERVIEW,
  HERO_TITLE,
} from './homeMockContent';
import { colors, primaryGradientHorizontal } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface HomeHeroCardProps {
  onPressWatch?: () => void;
  onPressDetails?: () => void;
}

export function HomeHeroCard({
  onPressWatch,
  onPressDetails,
}: HomeHeroCardProps) {
  return (
    <View style={styles.outer}>
      <ImageBackground
        accessibilityRole="image"
        source={{ uri: HERO_BACKDROP_URI }}
        style={styles.heroBg}
        imageStyle={styles.heroImage}
      >
        <LinearGradient
          colors={['transparent', colors.surface]}
          locations={[0.45, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroContent}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>New Release</Text>
          </View>
          <Text style={styles.heroTitle}>{HERO_TITLE}</Text>
          <Text style={styles.heroBody} numberOfLines={2}>
            {HERO_OVERVIEW}
          </Text>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onPressWatch}
              style={({ pressed }) => [
                styles.watchPressable,
                pressed && styles.watchPressed,
              ]}
            >
              <LinearGradient
                colors={primaryGradientHorizontal.colors}
                start={primaryGradientHorizontal.start}
                end={primaryGradientHorizontal.end}
                style={styles.watchGradient}
              >
                <View style={styles.watchContent}>
                  <PlayIcon color={colors.on_primary} size={spacing.lg} />
                  <Text
                    style={styles.watchLabel}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                  >
                    Watch Now
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onPressDetails}
              style={({ pressed }) => [
                styles.detailsBtn,
                pressed && styles.detailsPressed,
              ]}
            >
              <Text style={styles.detailsLabel}>Details</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: spacing['3xl'],
    marginBottom: spacing['9xl'],
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface_container_lowest,
  },
  heroBg: {
    height: spacing.homeHeroHeight,
    justifyContent: 'flex-end',
  },
  heroImage: {
    opacity: 0.6,
    borderRadius: radii.lg,
  },
  heroContent: {
    padding: spacing.heroContentInset,
    paddingBottom: spacing['5xl'],
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radii.sm,
    backgroundColor: colors.primary_container,
    marginBottom: spacing.md,
  },
  badgeText: {
    ...typography['label-xs'],
    color: colors.on_primary_container,
    textTransform: 'uppercase',
  },
  heroTitle: {
    ...typography['display-lg'],
    color: colors.on_surface,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  heroBody: {
    ...typography['body-md'],
    color: colors.on_surface,
    marginBottom: spacing['3xl'],
    maxWidth: spacing.homeHeroCopyMax,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: spacing.md,
    alignItems: 'stretch',
  },
  /** Primary CTA gets more width so “Watch Now” stays on one line beside Details. */
  watchPressable: {
    flex: 2,
    minWidth: 0,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  watchPressed: {
    opacity: 0.9,
  },
  watchGradient: {
    borderRadius: radii.md,
    width: '100%',
  },
  watchContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: spacing['6xl'],
  },
  watchLabel: {
    ...typography['title-sm'],
    color: colors.on_primary,
    marginLeft: spacing.sm,
    flexShrink: 1,
  },
  detailsBtn: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    minHeight: spacing['6xl'],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface_container_highest_backdrop,
  },
  detailsPressed: {
    backgroundColor: colors.surface_container_highest,
  },
  detailsLabel: {
    ...typography['title-sm'],
    color: colors.on_surface,
  },
});

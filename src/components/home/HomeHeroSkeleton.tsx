import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';

/**
 * Full-width hero placeholder while trending/hero data loads (matches `HomeHeroCard` frame).
 */
export function HomeHeroSkeleton() {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.88,
          duration: 800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View style={styles.outer} accessibilityLabel="Loading featured title">
      <Animated.View style={[styles.heroBg, { opacity }]}>
        <View style={styles.heroContent}>
          <View style={styles.badge} />
          <View style={styles.titleLine} />
          <View style={styles.titleLineShort} />
          <View style={styles.bodyLine} />
          <View style={styles.bodyLine} />
          <View style={styles.actions}>
            <View style={styles.watchBlock} />
            <View style={styles.detailsBlock} />
          </View>
        </View>
      </Animated.View>
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
    backgroundColor: colors.surface_container_high,
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: spacing.heroContentInset,
    paddingBottom: spacing['5xl'],
  },
  badge: {
    alignSelf: 'flex-start',
    width: spacing['8xl'],
    height: spacing.md,
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing.md,
  },
  titleLine: {
    height: spacing['3xl'],
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing.sm,
    maxWidth: spacing['9xl'],
  },
  titleLineShort: {
    height: spacing['3xl'],
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing['3xl'],
    maxWidth: spacing['7xl'],
  },
  bodyLine: {
    height: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing.sm,
    maxWidth: spacing.homeHeroCopyMax,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  watchBlock: {
    flex: 2,
    minHeight: spacing['6xl'],
    borderRadius: radii.md,
    backgroundColor: colors.surface_container_highest,
  },
  detailsBlock: {
    flex: 1,
    minHeight: spacing['6xl'],
    borderRadius: radii.md,
    backgroundColor: colors.surface_container_highest,
  },
});

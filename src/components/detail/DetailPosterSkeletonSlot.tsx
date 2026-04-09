import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';

/** Stitch annotation: placeholder tile in “More like this”. */
export function DetailPosterSkeletonSlot() {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.wrap, { opacity }]}>
      <View style={styles.poster} />
      <View style={styles.line} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: spacing.detailPosterCardWidth,
  },
  poster: {
    width: spacing.detailPosterCardWidth,
    height: spacing.detailPosterCardHeight,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface_container_highest,
  },
  line: {
    height: spacing.sm,
    width: spacing['5xl'],
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
  },
});

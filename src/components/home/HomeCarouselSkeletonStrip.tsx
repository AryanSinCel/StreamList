import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { HomePosterSkeletonCard } from './HomePosterSkeletonCard';
import { spacing } from '../../theme/spacing';

const SKELETON_SLOTS = 5;

/**
 * Horizontal row of pulsing poster skeletons — matches `ContentRow` loading state.
 */
export function HomeCarouselSkeletonStrip() {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
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
    <View style={styles.wrap}>
      <Animated.View style={[styles.row, { opacity }]}>
        {Array.from({ length: SKELETON_SLOTS }, (_, i) => (
          <HomePosterSkeletonCard key={i} />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing['3xl'],
  },
  row: {
    flexDirection: 'row',
    gap: spacing['3xl'],
  },
});

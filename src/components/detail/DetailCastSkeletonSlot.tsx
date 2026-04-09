import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';

/** Stitch annotation: placeholder slot in cast row (shimmer). */
export function DetailCastSkeletonSlot() {
  const opacity = useRef(new Animated.Value(0.55)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.55,
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
      <View style={styles.avatar} />
      <View style={styles.lineWide} />
      <View style={styles.lineNarrow} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: spacing.detailCastAvatar,
    alignItems: 'center',
  },
  avatar: {
    width: spacing.detailCastAvatar,
    height: spacing.detailCastAvatar,
    borderRadius: radii.full,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface_container_highest,
  },
  lineWide: {
    height: spacing.xs,
    width: spacing['3xl'],
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing.xxs,
  },
  lineNarrow: {
    height: spacing.xs,
    width: spacing.xl,
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
  },
});

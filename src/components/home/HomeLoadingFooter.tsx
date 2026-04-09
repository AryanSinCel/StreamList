import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface HomeLoadingFooterProps {
  visible?: boolean;
}

const PILL_COUNT = 3;

/**
 * Pulsing skeleton pills + label while a row loads more pages.
 */
export function HomeLoadingFooter({ visible = false }: HomeLoadingFooterProps) {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    if (!visible) {
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [visible, opacity]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.row}>
      <Animated.View style={[styles.pills, { opacity }]}>
        {Array.from({ length: PILL_COUNT }, (_, i) => (
          <View key={i} style={styles.pill} />
        ))}
      </Animated.View>
      <Text style={styles.label}>Loading more content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['5xl'],
    gap: spacing.md,
  },
  pills: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  pill: {
    width: spacing['5xl'],
    height: spacing.md,
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
  },
  label: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.xxs,
    fontWeight: '700',
    opacity: 0.55,
  },
});

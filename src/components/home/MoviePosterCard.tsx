import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface MoviePosterCardProps {
  posterUri: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export function MoviePosterCard({
  posterUri,
  title,
  subtitle,
  onPress,
}: MoviePosterCardProps) {
  const card = (
    <View style={styles.card}>
      <View style={styles.posterWrap}>
        <Image
          accessibilityIgnoresInvertColors
          source={{ uri: posterUri }}
          style={styles.poster}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        {card}
      </Pressable>
    );
  }

  return <View style={styles.pressable}>{card}</View>;
}

const styles = StyleSheet.create({
  pressable: {
    width: spacing.homePosterWidth,
  },
  pressed: {
    opacity: 0.92,
  },
  card: {
    width: spacing.homePosterWidth,
  },
  posterWrap: {
    width: spacing.homePosterWidth,
    height: spacing.homePosterHeight,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface_container_low,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: spacing.xs },
        shadowOpacity: 0.35,
        shadowRadius: spacing.sm,
      },
      android: {
        elevation: spacing.xs,
      },
    }),
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...typography['title-sm'],
    color: colors.on_surface,
  },
  subtitle: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    marginTop: spacing.xxs,
  },
});

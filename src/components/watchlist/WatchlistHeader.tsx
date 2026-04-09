import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { MovieIcon, SearchIcon } from '../icons/svgIcons';
import { WATCHLIST_PROFILE_URI } from './watchlistMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistHeaderProps {
  onSearchPress?: () => void;
}

export function WatchlistHeader({ onSearchPress }: WatchlistHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <MovieIcon color={colors.primary_container} size={spacing['3xl']} />
        <Text style={styles.wordmark}>StreamList</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          accessibilityLabel="Search"
          accessibilityRole="button"
          onPress={onSearchPress}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
          hitSlop={spacing.xs}
        >
          <SearchIcon color={colors.on_surface_variant} size={spacing.xl} />
        </Pressable>
        <View style={styles.avatarRing}>
          <Image
            accessibilityIgnoresInvertColors
            accessibilityLabel="Profile"
            source={{ uri: WATCHLIST_PROFILE_URI }}
            style={styles.avatar}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['3xl'],
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  wordmark: {
    ...typography['display-md'],
    fontSize: spacing.xl,
    color: colors.primary_container,
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBtn: {
    padding: spacing.xs,
    borderRadius: radii.full,
  },
  iconBtnPressed: {
    backgroundColor: colors.surface_container_highest,
  },
  avatarRing: {
    width: spacing.searchHeaderAvatar,
    height: spacing.searchHeaderAvatar,
    borderRadius: radii.full,
    borderWidth: spacing.border_thick,
    borderColor: colors.outline_variant,
    overflow: 'hidden',
    backgroundColor: colors.surface_container_high,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});

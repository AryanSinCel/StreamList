import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { MovieIcon } from '../icons/svgIcons';
import { SEARCH_PROFILE_URI } from './searchMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export function SearchHeader() {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <MovieIcon color={colors.primary_container} size={spacing.xl} />
        <Text style={styles.wordmark}>StreamList</Text>
      </View>
      <View style={styles.avatarRing}>
        <Image
          accessibilityIgnoresInvertColors
          accessibilityLabel="Profile"
          source={{ uri: SEARCH_PROFILE_URI }}
          style={styles.avatar}
        />
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
  avatarRing: {
    width: spacing.searchHeaderAvatar,
    height: spacing.searchHeaderAvatar,
    borderRadius: radii.full,
    borderWidth: spacing.border_thick,
    borderColor: colors.avatar_ring,
    overflow: 'hidden',
    backgroundColor: colors.surface_container_highest,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});

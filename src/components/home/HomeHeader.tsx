import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MovieIcon, NotificationIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export function HomeHeader() {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <MovieIcon color={colors.primary_container} size={spacing.xl} />
        <Text style={styles.wordmark}>StreamList</Text>
      </View>
      <Pressable
        accessibilityLabel="Notifications"
        accessibilityRole="button"
        hitSlop={spacing.sm}
        style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
      >
        <NotificationIcon color={colors.on_surface_variant} size={spacing.xl} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: spacing.headerBarHeight,
    paddingHorizontal: spacing['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  iconBtn: {
    padding: spacing.xs,
    borderRadius: spacing['7xl'],
  },
  iconBtnPressed: {
    backgroundColor: colors.surface_container_highest,
  },
});

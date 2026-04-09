import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppHeaderBar } from '../common/AppHeaderBar';
import { NotificationIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export function HomeHeader() {
  return (
    <AppHeaderBar
      paddingVariant="compact"
      rightSlot={
        <Pressable
          accessibilityLabel="Notifications"
          accessibilityRole="button"
          hitSlop={spacing.sm}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        >
          <NotificationIcon color={colors.on_surface_variant} size={spacing.xl} />
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    padding: spacing.xs,
    borderRadius: spacing['7xl'],
  },
  iconBtnPressed: {
    backgroundColor: colors.surface_container_highest,
  },
});

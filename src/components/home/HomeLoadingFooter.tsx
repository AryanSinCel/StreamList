import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface HomeLoadingFooterProps {
  visible?: boolean;
}

export function HomeLoadingFooter({ visible = false }: HomeLoadingFooterProps) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.row}>
      <ActivityIndicator color={colors.primary_container} size="small" />
      <Text style={styles.label}>Loading more content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['5xl'],
    opacity: 0.4,
    gap: spacing.sm,
  },
  label: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.xxs,
    fontWeight: '700',
  },
});
